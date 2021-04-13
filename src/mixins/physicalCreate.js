/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/
import * as THREE from 'three'

export default {
  data () {
    return {
      box: null
    }
  },
  methods: {
    // $_initPhysicalBox (threeInit) {
    //   let playGeometry = new THREE.SphereGeometry(3.3314, 128, 128, 6, 6.3, 6, 6.3)
    //   let material = new THREE.MeshPhongMaterial({
    //     color: '#6d80c0',
    //     restitution: 0.5,
    //     friction: 0.5,
    //     opacity: 1,
    //     visible: true
    //   })
    //   this.box = new THREE.Mesh(playGeometry, material)
    //   this.box.position.copy(this.model)
    //   console.log(this.box)
    //   threeInit.scene.add(this.box)
    // },
    // $_boxPositionChange (threeInit) {
    //   const phi = threeInit.controls.getPolarAngle(); //获取当前用弧度表示的垂直旋转角度
    //   const theta = threeInit.controls.getAzimuthalAngle(); //获取当前用弧度表示的水平旋转角度
    //   const distance = threeInit.controls.object.position.distanceTo(threeInit.controls.target); //获取两点之间的距离
    //
    //   this.model.position.x += this.move.x;
    //   this.model.position.z += this.move.z;
    //   this.model.rotation.y = theta;
    //   if (this.box && this.model) {
    //     threeInit.controls.target.copy(this.model.position)
    //     threeInit.controls.setAngle(phi, theta, distance)
    //     this.box.position.copy(model.position);
    //     this.box.position.y = model.position.y + 2;
    //   }
    // }
  }
}
