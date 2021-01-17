<!--
 * @author: Shadycheer
 * @Date: 2021-01-16 02:31:06
 * @LastEditTime: 2021-01-17 17:39:09
 * @LastEditor: Shadycheer
-->
<style scoped lang="less">

</style>

<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { BackGroundCreate, ModelOrder } from '@/mixins'

export default {
  mixins: [ModelOrder, BackGroundCreate],
  name: 'HelloThree',
  data () {
    return {
      renderer: null,
      camera: null,
      scene: null,
      ambientLight: null,
      pointLight: null,
      model: new THREE.Object3D(),
      controls: null
    }
  },
  methods: {
    init () {
      const container = document.getElementById('container')
      this.initRender()
      this.initScene()
      this.initCamera()
      this.initLight()
      this.initCubeBackGround()
      this.initModel()
      this.initControls()
      this.animate()
      container.appendChild(this.renderer.domElement)
      window.onresize = this.onWindowResize
    },
    initRender () {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(('#fbc531'), 1.0)
      document.body.appendChild(this.renderer.domElement)
    },
    initScene () {
      this.scene = new THREE.Scene()
    },
    initCamera () {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.set(0, 10, 20)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    },
    initLight () {
      this.ambientLight = new THREE.AmbientLight(0xffffff)
      this.scene.add(this.ambientLight)
      this.pointLight = new THREE.PointLight(0xffffff)
      this.pointLight.position.set(0, 100, 300)
      this.scene.add(this.pointLight)
    },
    async initModel () {
      this.model = await this.$_modelOrder_loadModel('models/person4.fbx')
      this.model = this.$_modelOrder_setShadow(this.model, true)
      this.model.position.set(0, -10, 0)
      this.model.scale.set(25, 25, 25)
      this.model.rotateY(180)
      this.scene.add(this.model)
    },
    initCubeBackGround () {
      const preset = 25
      const cube = new THREE.CubeGeometry(preset, preset, preset)
      for (let i = 0; i < 1000; i++) {
        const material = new THREE.MeshBasicMaterial({ color: this.$_backGroundCreate_randomColor() })
        const mesh = new THREE.Mesh(cube, material)
        mesh.position.x = 800 * (2.0 * Math.random() - 1.0)
        mesh.position.y = 800 * (2.0 * Math.random() - 1.0)
        mesh.position.z = 800 * (2.0 * Math.random() - 1.0)
        mesh.rotation.x = Math.random() * Math.PI
        mesh.rotation.y = Math.random() * Math.PI
        mesh.rotation.z = Math.random() * Math.PI
        mesh.updateMatrix()
        this.scene.add(mesh)
      }
    },
    initControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.enableZoom = true
      this.controls.autoRotate = true
      this.controls.minDistance = 250
      this.controls.maxDistance = 1000
      this.controls.enablePan = false
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    },
    animate () {
      this.render()
      this.controls.update()
      requestAnimationFrame(this.animate)
    },
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.render()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

