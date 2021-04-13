import * as THREE from 'three'

/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

export default {
  data () {
    return {
      modelPosition: new THREE.Vector3(),
    }
  },
  methods: {
    $_initModelResurgence (physiInit) {
      let modelPosition = new THREE.Vector3(0, 20, 20)
      this.modelPosition.copy(modelPosition)
      let startGeometry = new THREE.BoxGeometry(140, 1, 50)
      let startMaterial = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#e3d254',
        restitution: 1,
        friction: 1
      }))
      let startFirst = new Physijs.BoxMesh(startGeometry, startMaterial, 0)
      this.$_initPosition(startFirst, 0, 0, 0)
      physiInit.add(startFirst)
      let startSecond = new Physijs.BoxMesh(startGeometry, startMaterial, 0)
      this.$_initPosition(startSecond, 0, 5, 60)
      physiInit.add(startSecond)
      let startThird = new Physijs.BoxMesh(startGeometry, startMaterial, 0)
      this.$_initPosition(startThird, 0, 15, 120)
      physiInit.add(startThird)

      let shape = new THREE.Shape()
      shape.moveTo(0, 0)//起点
      shape.lineTo(0, 140)//第2点
      shape.lineTo(35, 140)//第3点
      shape.lineTo(0, 0)
      let slopeGeometry = new THREE.ExtrudeGeometry(
        shape,
        {
          amount: 140,
          bevelEnabled: false
        }
      )
      let slopeMaterial = new THREE.MeshPhongMaterial({ color: '#4b8eaa' })
      let slopeMesh = new Physijs.ConvexMesh(slopeGeometry, slopeMaterial, 0)
      slopeMesh.rotation.y = Math.PI / 2
      slopeMesh.rotation.z = Math.PI / 2
      slopeMesh.translateZ(-70)
      slopeMesh.translateY(150)
      physiInit.add(slopeMesh)

      let s1_geometry = new THREE.BoxGeometry(140, 35, 50)
      let s1_material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#4b8eaa',
        restitution: 0.5,
        friction: 0.5
      }))

      let start1 = new Physijs.BoxMesh(s1_geometry, s1_material, 0)
      start1.position.x = 0
      start1.position.y = 17.5
      start1.position.z = 315
      physiInit.add(start1)

      // 圆柱
      let cyl_geometry = new THREE.CylinderGeometry(2, 2, 28, 10)

      const cyl_material = new THREE.MeshBasicMaterial({ color: '#4b8eaa' })
      let cylinder = new Physijs.ConvexMesh(cyl_geometry, cyl_material, 0)//网格模型对象
      cylinder.position.y = 14
      cylinder.position.z = 400

      physiInit.add(cylinder)

      // 旋转台

      let cyl_cube_geometry = new THREE.BoxGeometry(110, 1, 20)
      let cyl_cube_material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#235689',
        restitution: 0.5,     //弹性系数
        friction: 0.9       //摩擦系数
      }))
      let cyl_cube = new Physijs.BoxMesh(cyl_cube_geometry, cyl_cube_material, 1)
      cyl_cube.position.y = 28
      cyl_cube.position.z = 400
      cyl_cube.rotation.y = Math.PI / 2
      physiInit.add(cyl_cube)

      //创建约束对象
      let constraint = new Physijs.DOFConstraint(cylinder, cyl_cube, cyl_cube.position)
      physiInit.addConstraint(constraint)

      cyl_cube.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      cyl_cube.setAngularVelocity(new THREE.Vector3(0, 1, 0))  // 自己的的旋转力

      //圆柱 1

      let cylinder1 = new Physijs.ConvexMesh(cyl_geometry, cyl_material, 0)//网格模型对象
      cylinder1.position.y = 14
      cylinder1.position.z = 530
      physiInit.add(cylinder1)

      //
      let cyl_geometry1 = new THREE.CylinderGeometry(40, 40, 2, 50)
      let cyl_cube1 = new Physijs.BoxMesh(cyl_geometry1, cyl_cube_material, 1)
      cyl_cube1.position.y = 28
      cyl_cube1.position.z = 530
      cyl_cube1.rotation.z = Math.PI
      physiInit.add(cyl_cube1)

      //创建约束对象
      let constraint1 = new Physijs.DOFConstraint(cylinder1, cyl_cube1, cyl_cube1.position)
      physiInit.addConstraint(constraint1)

      cyl_cube1.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      cyl_cube1.setAngularVelocity(new THREE.Vector3(0, 20000, 0))  // 自己的的旋转力

      // 大铁锤平台
      let geometry_2 = new THREE.BoxGeometry(10, 1, 160)
      let material_2 = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#935959',
        restitution: 0.5,
        friction: 0  //摩檫力
      }))
      let checkpoint_2 = new Physijs.BoxMesh(geometry_2, material_2, 0)
      // checkpoint_2.position.x=0;
      checkpoint_2.position.y = 25
      checkpoint_2.position.z = 680
      physiInit.add(checkpoint_2)

      // 大铁锤
      let geometry_2_1 = new THREE.BoxGeometry(1, 1, 1)
      let material_2_1 = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#1c1b1e',
      }))
      let cube_point = new Physijs.BoxMesh(geometry_2_1, material_2_1, 0)
      this.$_initPosition(cube_point, 0, 61, 630)
      physiInit.add(cube_point)

      //大铁锤_棍
      let geometry_2_1_B = new THREE.CylinderGeometry(0.5, 0.5, 20, 20)
      let material_2_1_B = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#54afa4',
      }))
      let check_2_1 = new Physijs.ConvexMesh(geometry_2_1_B, material_2_1_B, 1)//网格模型对象
      this.$_initPosition(check_2_1, 0, 50, 630)
      physiInit.add(check_2_1)

      //大铁锤_铁头
      let geometry_2_1_A = new THREE.CylinderGeometry(5, 5, 12, 20)
      let material_2_1_A = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
        color: '#a95ed2',
      }))
      let check_2_1_A = new Physijs.ConvexMesh(geometry_2_1_A, material_2_1_A, 5)//网格模型对象
      check_2_1_A.rotation.z = Math.PI / 2
      this.$_initPosition(check_2_1_A, 0, 35, 630)
      physiInit.add(check_2_1_A)
      //约束
      let check_2_1_point = new THREE.Vector3(cube_point.position.x, cube_point.position.y, cube_point.position.z)
      let check_constraint_2_1_A = new Physijs.DOFConstraint(cube_point, check_2_1, check_2_1_point)
      physiInit.addConstraint(check_constraint_2_1_A)
      let check_2_1_point1 = new THREE.Vector3(check_2_1_A.position.x, check_2_1_A.position.y, check_2_1_A.position.z)
      let check_constraint_2_1_B = new Physijs.DOFConstraint(check_2_1, check_2_1_A, check_2_1_point1)
      physiInit.addConstraint(check_constraint_2_1_B)

      check_2_1_A.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_2_1_A.setAngularVelocity(new THREE.Vector3(0, 0, 4))  // 自己的的旋转力
      check_2_1.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_2_1.setAngularVelocity(new THREE.Vector3(0, 0, 4))  // 自己的的旋转力

      // 大铁锤_2

      let cube_point_1 = new Physijs.BoxMesh(geometry_2_1, material_2_1, 0)
      this.$_initPosition(cube_point_1, 0, 61, 670)
      physiInit.add(cube_point_1)

      //大铁锤_棍
      let check_2_2 = new Physijs.ConvexMesh(geometry_2_1_B, material_2_1_B, 1)//网格模型对象
      this.$_initPosition(check_2_2, 0, 50, 670)
      physiInit.add(check_2_2)

      //大铁锤_铁头
      let check_2_2_A = new Physijs.ConvexMesh(geometry_2_1_A, material_2_1_A, 5)//网格模型对象
      check_2_2_A.rotation.z = Math.PI / 2
      this.$_initPosition(check_2_2_A, 0, 35, 670)
      physiInit.add(check_2_2_A)
      //约束

      let check_constraint_2_2_A = new Physijs.DOFConstraint(cube_point_1, check_2_2, cube_point_1.position)
      physiInit.addConstraint(check_constraint_2_2_A)
      let check_constraint_2_2_B = new Physijs.DOFConstraint(check_2_2, check_2_2_A, check_2_2_A.position)
      physiInit.addConstraint(check_constraint_2_2_B)

      check_2_2_A.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_2_2_A.setAngularVelocity(new THREE.Vector3(0, 0, -4))  // 自己的的旋转力
      check_2_2.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_2_2.setAngularVelocity(new THREE.Vector3(0, 0, -4))  // 自己的的旋转力

      // 风车

      // 中心轴 圆
      let check_3_A
      let check_3_A_geometry = new THREE.CylinderGeometry(3, 3, 7, 30)

      const check_3_A_material = new THREE.MeshBasicMaterial({ color: '#4b8eaa' })
      check_3_A = new Physijs.ConvexMesh(check_3_A_geometry, check_3_A_material, 0)//网格模型对象
      this.$_initPosition(check_3_A, 0, 68, 770)
      check_3_A.rotation.x = Math.PI / 2
      physiInit.add(check_3_A)

      let check_3_B_1_geometry = new THREE.BoxGeometry(1, 36, 7)
      let check_3_B_1_material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: '#e3d254' }))
      let check_3_B_1 = new Physijs.BoxMesh(check_3_B_1_geometry, check_3_B_1_material, 1)
      check_3_B_1.rotation.y = Math.PI / 6
      this.$_initPosition(check_3_B_1, 0, 47, 770)
      physiInit.add(check_3_B_1)

      let check_3_B_2 = new Physijs.BoxMesh(check_3_B_1_geometry, check_3_B_1_material, 1)
      check_3_B_2.rotation.z = Math.PI / 2
      check_3_B_2.rotation.x = Math.PI / 6
      this.$_initPosition(check_3_B_2, 21, 68, 770)
      physiInit.add(check_3_B_2)
      let check_3_B_3 = new Physijs.BoxMesh(check_3_B_1_geometry, check_3_B_1_material, 1)
      check_3_B_3.rotation.z = Math.PI / 2
      check_3_B_3.rotation.x = Math.PI / 6
      this.$_initPosition(check_3_B_3, -21, 68, 770)
      physiInit.add(check_3_B_3)
      let check_3_B_4 = new Physijs.BoxMesh(check_3_B_1_geometry, check_3_B_1_material, 1)
      check_3_B_4.rotation.y = Math.PI / 6
      this.$_initPosition(check_3_B_4, -0, 89, 770)
      physiInit.add(check_3_B_4)

      let constraint_3_1 = new Physijs.DOFConstraint(check_3_B_1, check_3_A, check_3_A.position)
      physiInit.addConstraint(constraint_3_1)
      check_3_B_1.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_3_B_1.setAngularVelocity(new THREE.Vector3(0, 0, 3))  // 自己的的旋转力

      let constraint_3_2 = new Physijs.DOFConstraint(check_3_B_2, check_3_A, check_3_A.position)
      physiInit.addConstraint(constraint_3_2)
      check_3_B_2.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_3_B_2.setAngularVelocity(new THREE.Vector3(0, 0, 3))  // 自己的的旋转力

      let constraint_3_4 = new Physijs.DOFConstraint(check_3_B_4, check_3_A, check_3_A.position)
      physiInit.addConstraint(constraint_3_4)
      check_3_B_4.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_3_B_4.setAngularVelocity(new THREE.Vector3(0, 0, 3))  // 自己的的旋转力
      let constraint_3_3 = new Physijs.DOFConstraint(check_3_B_3, check_3_A, check_3_A.position)
      physiInit.addConstraint(constraint_3_3)
      check_3_B_3.setAngularFactor(new THREE.Vector3(0, 0, 0))   // 接收旋转力
      check_3_B_3.setAngularVelocity(new THREE.Vector3(0, 0, 3))  // 自己的的旋转力

      let check_4_1_geometry = new THREE.BoxGeometry(10, 2, 10)
      let check_4_1_material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: '#e3d254' }))
      let check_4_1 = new Physijs.BoxMesh(check_4_1_geometry, check_4_1_material, 0)
      this.$_initPosition(check_4_1, 0, 28, 780)
      physiInit.add(check_4_1)

      let check_4_2 = new Physijs.BoxMesh(check_4_1_geometry, check_4_1_material, 0)
      this.$_initPosition(check_4_2, 10, 30, 810)
      physiInit.add(check_4_2)
      let check_4_3 = new Physijs.BoxMesh(check_4_1_geometry, check_4_1_material, 0)
      this.$_initPosition(check_4_3, -10, 28, 840)
      physiInit.add(check_4_3)
      let check_4_4 = new Physijs.BoxMesh(check_4_1_geometry, check_4_1_material, 0)
      this.$_initPosition(check_4_4, 0, 28, 870)
      physiInit.add(check_4_4)
      let check_4_5 = new Physijs.BoxMesh(check_4_1_geometry, check_4_1_material, 0)
      this.$_initPosition(check_4_5, -10, 28, 900)
      physiInit.add(check_4_5)
      let check_4_6 = new Physijs.BoxMesh(check_4_1_geometry, check_4_1_material, 0)
      this.$_initPosition(check_4_6, 0, 28, 930)
      physiInit.add(check_4_6)

      let check_5_geometry = new THREE.BoxGeometry(30, 2, 40)
      let check_5_material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: '#e3d254' }))
      let check_5 = new Physijs.BoxMesh(check_5_geometry, check_5_material, 0)
      this.$_initPosition(check_5, 0, 28, 950)
      physiInit.add(check_5)

    },
    $_initPosition (point, x, y, z) {
      point.position.set(x, y, z)
    }
  }
}
