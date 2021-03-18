/**
 *
 * @description: 初始化threejs类，集成了三大组件及常用方法
 *
 * @author shadycheer
 *
 **/
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class threeInit {
  constructor (dom) {
    // 初始化渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    })
    // 初始化场景
    this.scene = new THREE.Scene()
    // 初始化相机
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // 初始化光源
    this.ambientLight = new THREE.AmbientLight()
    this.pointLight = new THREE.PointLight()
    // 初始化模型
    this.model = new THREE.Object3D()
    // 初始化控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.initRender(dom)
    this.initParams()
  }

  initParams () {
    this.initLight()
    this.initControls()
    window.onresize = () => this.onWindowResize()
  }

  initRender (dom, color = '#fff') {
    this.renderer.setClearColor(color, 1.0)
    this.renderer.shadowMap.enabled = true
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    dom.appendChild(this.renderer.domElement)
  }

  initLight () {
    this.scene.add(this.ambientLight)
    this.scene.add(this.pointLight)
  }

  initControls () {
    this.controls.autoRotate = false
    this.controls.minDistance = 250
    this.controls.maxDistance = 1000
    this.controls.enableDamping = true
    this.controls.enableZoom = true
    this.controls.enablePan = false
  }

  onWindowResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  add (mesh) {
    this.scene.add(mesh)
  }
}

export default threeInit
