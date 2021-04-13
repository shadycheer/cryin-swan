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
      direction: new THREE.Matrix4(),
      modelProperty: new Map(),
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
      this.jump = info.jump
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

      this.move.multiplyScalar(this.speed / 60)
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
