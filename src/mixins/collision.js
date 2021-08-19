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
      this.$_gameFinish()
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
