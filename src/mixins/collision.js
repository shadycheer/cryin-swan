/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import * as THREE from 'three'
import { EVENT_NAME } from '@/common/global-event/constant'
import Observe from '@/common/global-event/observe'

export default {
  data () {
    return {
      box: null,
      directionVector: null,
      sphere: null,
      createRay: false,
    }
  },
  methods: {
    $_initPhysicalBox (threeInit) {
      let playGeometry = new THREE.BoxGeometry(2, 4, 2, 8, 8, 8)
      let material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#6d80c0',
        restitution: 0.5,
        transparent: false,
        friction: 0.5,
        opacity: 1,
        visible: true
      }))
      this.box = new Physijs.Mesh(playGeometry, material)
      this.box.position.copy(this.model)
      console.log(this.box)
      threeInit.scene.add(this.box)
    },
    $_boxPositionChange (threeInit) {
      const phi = threeInit.controls.getPolarAngle() //获取当前用弧度表示的垂直旋转角度
      const theta = threeInit.controls.getAzimuthalAngle() //获取当前用弧度表示的水平旋转角度
      const distance = threeInit.controls.object.position.distanceTo(threeInit.controls.target) //获取两点之间的距离

      this.model.position.x += this.move.x
      this.model.position.z += this.move.z
      this.model.rotation.y = theta

      if (this.box && this.model) {
        threeInit.controls.target.copy(this.model.position)
        threeInit.controls.setAngle(phi, theta, distance)
        this.box.position.copy(this.model.position)
        this.box.position.y = this.model.position.y + 2
      }
    },
    $_rayCasterInit (threeInit) {
      if (this.createRay) {
        let originPoint = this.box.position.clone()
        for (let vertexIndex = 0; vertexIndex < this.box.geometry.vertices.length; vertexIndex++) {
          // 顶点原始坐标
          let localVertex = this.box.geometry.vertices[vertexIndex].clone()
          // 顶点经过变换后的坐标
          let globalVertex = localVertex.applyMatrix4(this.box.matrix)
          this.directionVector = globalVertex.sub(this.box.position)
        }
        let ray = new THREE.Raycaster(originPoint, this.directionVector.clone().normalize())
        let collisionResults = ray.intersectObject(this.sphere)
        let rayBool = collisionResults.length > 0 && collisionResults[0].distance < this.directionVector.length()
        if (rayBool) {
          this.$_collisionFinish(threeInit)
          rayBool = false
          this.createRay = false
        }
      }
    },
    $_createDoor (threeInit, x, y, z) {
      const geometry = new THREE.BoxGeometry(8, 8, 8)
      const material = new THREE.MeshNormalMaterial()
      this.sphere = new THREE.Mesh(geometry, material)

      this.sphere.position.set(x, y, z)
      console.log(this.sphere)

      this.sphere.verticesNeedUpdate = true
      threeInit.scene.add(this.sphere)
      console.log(this.sphere.geometry.vertices)
      this.createRay = true
    },
    $_collisionFinish (threeInit) {
      threeInit.controls.autoRotate = true
      Observe.$emit(EVENT_NAME.gameFinish)
    },
    beforeDestroy () {
      this.box.dispose()
      this.box = null
      this.sphere.dispose()
      this.sphere = null
      this.directionVector = null
    }
  }
}
