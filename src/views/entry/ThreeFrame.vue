<style scoped lang="less">

</style>

<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from 'three'
import { modelOrder, backgroundCreate, threeInit } from '@/common'

export default {
  name: 'HelloThree',
  data () {
    return {
			model: new THREE.Object3D()
		}
  },
  methods: {
		init () {
			const container = document.getElementById('container')
			this.thM = new threeInit(container)
			this.thM.renderer.setClearColor('#fbc531', 1.0)
			this.initCamera()
			this.initLight()
			this.initCubeBackGround()
			this.initModel()
			this.initControls()
			this.update()
			this.render()
		},
		initCamera () {
			this.thM.camera.position.set(0, 10, 20)
			this.thM.camera.lookAt(new THREE.Vector3(0, 0, 0))
		},
		initLight () {
			this.thM.pointLight.position.set(0, 100, 300)
		},
		async initModel () {
			this.model = await modelOrder.loadModel('/model/person4.fbx')
			this.model = modelOrder.setShadow(this.model, true)
			this.model.position.set(0, -10, 0)
			this.model.scale.set(25, 25, 25)
			this.model.rotateY(180)
			this.thM.add(this.model)
		},
		initCubeBackGround () {
			this.thM.add(backgroundCreate.Cube(1000))
		},
		initControls () {
			this.thM.controls.autoRotate = true
		},
		render () {
			this.thM.controls.update()
			this.thM.renderer.render(this.thM.scene, this.thM.camera)
		},
		update () {
			const update = () => {
				this.render()
				requestAnimationFrame(update)
			}
			update()
		}
	},
	mounted () {
		this.init()
	}
}
</script>
