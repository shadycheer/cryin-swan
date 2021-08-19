/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import * as THREE from 'three'
import Utils from '@/common/utils'
import userInfoUpdate from '@/common/user-info-update'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
const debounce = Utils.debounce(300)
export default {
  data () {
    return {
      clock: new THREE.Clock(),
      move: new THREE.Vector3(),
      boxMove: new THREE.Vector3(),
      direction: new THREE.Matrix4(),
      modelProperty: new Map(),
      jumpJudge: true,
      jumpStep: 0,
      jumpTemp: false,
      moveDirection: {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        space: false,
        shift: false
      },
      objMixer: null,
      objAction: null,
      speed: 0,
      health: 0,
      jump: 0,
      dash: 5,
      speedUpTimer: null,
      speedDownTimer: null
    }
  },
  methods: {
    async $_fetchCharacterInfo () {
      let info = await userInfoUpdate.characterStatusGetter()
      console.log(info)
      this.speed = info.speed * 10
      this.dash = info.dash
      this.health = info.health
      this.jump = info.jump * 15
      Observe.$emit(EVENT_NAME.transferCharacterData, info)
    },
    $_propertySetter () {
      this.modelProperty.set('speed', this.speed)
      this.modelProperty.set('health', this.health)
      this.modelProperty.set('jump', this.jump)
      this.modelProperty.set('dash', this.dash)
    },
    $_gameOrbitControls (controls) {
      controls.setAngle = (phi, theta, distance) => {
        let r = distance || controls.object.position.distanceTo(controls.target)
        let x = r * Math.cos(phi - Math.PI / 2) * Math.sin(theta) + controls.target.x
        let y = r * Math.sin(phi + Math.PI / 2) + controls.target.y
        let z = r * Math.cos(phi - Math.PI / 2) * Math.cos(theta) + controls.target.z
        controls.object.position.set(x, y, z)
        controls.object.lookAt(controls.target)
      }
      controls.rotateSpeed = 0.8
      controls.target.set(0, 0, 0)
    },
    $_initPhysicalBox (newInit, x, y, z) {
      let playGeometry = new THREE.BoxGeometry(4, 4, 4, 8, 8, 8)
      let material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#6d80c0',
        restitution: 0.5,
        transparent: false,
        friction: 0.5,
        opacity: 1,
        visible: false
      }))
      this.box = new Physijs.BoxMesh(playGeometry, material, 10)
      this.box.position.set(x, y, z)
      newInit.add(this.box)
    },
    $_freeFallRender (newInit, x, y, z) {
      if (this.model.position.y < -30) {
        this.health--
        Observe.$emit(EVENT_NAME.updateHealth, this.health)
        this.box = null
        this.$_initPhysicalBox(newInit, x, y, z)
      }
    },
    $_boxPositionChange (newInit) {
      const phi = newInit.controls.getPolarAngle() //获取当前用弧度表示的垂直旋转角度
      const theta = newInit.controls.getAzimuthalAngle() //获取当前用弧度表示的水平旋转角度
      const distance = newInit.controls.object.position.distanceTo(newInit.controls.target) //获取两点之间的距离

      if (this.box && this.model) {
        this.boxMove.x = this.move.x * this.speed
        this.boxMove.z = this.move.z * this.speed

        if (this.jumpJudge) {
          this.boxMove.y = this.jump * Math.cos(this.jumpStep)
          this.jumpStep += 0.05
          if (this.jumpStep > Math.PI / 2) this.jumpJudge = false
        } else {
          this.boxMove.y = 20 * Math.cos(this.jumpStep)
          if (this.jumpStep < Math.PI && this.jumpStep > Math.PI / 2) {
            this.jumpStep += 0.05
          }
        }
        this.box.setLinearVelocity(this.boxMove)

        this.model.position.x = this.box.position.x
        this.model.position.y = this.box.position.y - 2
        this.model.position.z = this.box.position.z

        this.box.rotation.y = theta
        this.model.rotation.y = this.box.rotation.y

        newInit.controls.target.copy(this.model.position)
        newInit.controls.setAngle(phi, theta, distance)

      }
    },
    $_gameControlKeyBoard (camera) {

      let center = new THREE.Vector2()
      let mouse = new THREE.Vector2()

      //获取两点间的距离以及偏转位置
      const getRadian = (event) => {
        if (event) {
          //获取当前鼠标按下的位置
          mouse.x = event.clientX
          mouse.y = event.clientY
        } else {
          mouse.x = this.move.x
          mouse.y = this.move.z
        }
        //计算两点之间的夹角
        mouse.x = mouse.x - center.x
        mouse.y = mouse.y - center.y
        this.$_setDistance(camera, mouse.normalize(), 0.8)
      }

      //计算夹角
      const rad = () => {
        this.move.set(0, 0, 0)
        const step = 50

        if (this.moveDirection.moveForward) this.move.z -= step
        if (this.moveDirection.moveLeft) this.move.x -= step
        if (this.moveDirection.moveBackward) this.move.z += step
        if (this.moveDirection.moveRight) this.move.x += step
        getRadian()
      }

      //绑定键盘按键
      const onKeyDown = (event) => {
        switch (event.keyCode) {
          case 87: // w
            this.moveDirection.moveForward = true
            break
          case 65: // a
            this.moveDirection.moveLeft = true
            break
          case 83: // s
            this.moveDirection.moveBackward = true
            break
          case 68: // d
            this.moveDirection.moveRight = true
            break
          case 16: // shift
            if (this.dash && this.$_judgeKeyBoardDown()) {
              this.$_speedUpStart()
            }
            break
          case 32: // space
            this.jumpJudge = true
            this.jumpStep = 0
            break
        }
        this.objAction.play()
        rad()
      }
      const onKeyUp = (event) => {
        switch (event.keyCode) {
          case 87: // w
            this.moveDirection.moveForward = false
            break
          case 65: // a
            this.moveDirection.moveLeft = false
            break
          case 83: // s
            this.moveDirection.moveBackward = false
            break
          case 68: // d
            this.moveDirection.moveRight = false
            break
          case 16: //shift
            this.$_speedDownStart()
            break
          case 32: //space
            break

        }
        this.objAction.stop()
        rad()
      }
      window.onkeydown = onKeyDown
      window.onkeyup = onKeyUp
    },
    $_setDistance (camera, vector) {
      //重置矩阵
      this.direction.identity()
      //获取相机的四元数
      let quaternion = camera.quaternion
      this.direction.makeRotationFromQuaternion(quaternion)
      this.move.x = vector.x
      this.move.y = 0
      this.move.z = vector.y

      this.move.applyMatrix4(this.direction)
      this.move.normalize()

      this.move.multiplyScalar(this.speed / 30)
    },
    $_judgeKeyBoardDown () {
      return (
        this.moveDirection.moveForward
        || this.moveDirection.moveBackward
        || this.moveDirection.moveRight
        || this.moveDirection.moveLeft
        || this.moveDirection.space)
    },
    $_speedUpStart () {
      if (!this.dash) return
      Utils.clearTimerInterval(this.speedDownTimer)
      debounce(() => {
        this.speed = this.speed * 2
        this.speedUpTimer = setInterval(() => {
          console.log(this.dash)
          if (this.dash === 1) {
            this.speed = this.modelProperty.get('speed')
            Utils.clearTimerInterval(this.speedUpTimer)
          }
          this.dash--
          Observe.$emit(EVENT_NAME.updateDash, false)
        }, 1000)
      })
    },
    $_speedDownStart () {
      Utils.clearTimerInterval(this.speedUpTimer)
      if (this.dash === this.modelProperty.get('dash')) return
      debounce(() => {
        Utils.clearTimerInterval(this.speedUpTimer)
        this.speed = this.modelProperty.get('speed')
        this.speedDownTimer = setInterval(() => {
          console.log(this.dash)
          if (this.dash === this.modelProperty.get('dash') - 1) {
            Utils.clearTimerInterval(this.speedDownTimer)
          }
          this.dash++
          Observe.$emit(EVENT_NAME.updateDash, true)
        }, 1000)
      })
    },

  }
}
