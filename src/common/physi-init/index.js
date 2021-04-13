/**
 *
 * @description: 初始化threejs类，集成了三大组件及常用方法
 *
 * @author shadycheer
 *
 **/
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class physiInit {
  constructor (dom) {
    // 初始化渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    })
    // 初始化场景
    this.scene = new Physijs.Scene()
    this.scene.setGravity(new THREE.Vector3(0, -500, 0))
    console.log(this.scene)
    // 初始化相机
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // 初始化光源
    this.ambientLight = new THREE.AmbientLight()
    this.pointLight = new THREE.PointLight()
    // 初始化模型
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

  changeCamera (fov, aspect, near, far, types = 'PerspectiveCamera') {
    this.camera = new THREE[types](fov, aspect, near, far)
    // 更改之后需要重新初始化controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
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

  addConstraint (constraint) {
    this.scene.addConstraint(constraint)
  }

  dispose (parent, child) {
    if (child.children.length) {
      let arr = child.children.filter(x => x)
      arr.forEach(a => this.dispose(child, a))
    }
    if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
      try {
        child.material.dispose()
        child.geometry.dispose()
        child.renderTarget.dispose()
      } catch (e) {
        child = null
      }
    } else if (child.material) {
      child.material.dispose()
    } else {
      return
    }
    parent.remove(child)
  }

  destroyMesh () {
    let arr = this.scene.children.filter(item => item)
    arr.forEach(item => this.dispose(this.scene, item))
    this.model = null
    this.scene.remove()
    this.renderer.forceContextLoss()
    this.renderer.renderLists.dispose()
    try {
      this.renderer = null
    } catch (e) {
      this.renderer = null
    }
  }
}

export default physiInit
