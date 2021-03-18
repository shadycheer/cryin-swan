<style scoped>

</style>

<template>
	<div id="container"></div>
</template>

<script>

import * as THREE from 'three'
import modelOrder from '@/common/model-order'
import threeInit from '@/common/three-init'

export default {
	name: 'Guide',
	mixins: [],
	data () {
		return {
			model: new THREE.Object3D()
		}
	},
	methods: {
		init () {
			const container = document.getElementById('container')
			this.threeManager = new threeInit(container)
			this.threeManager.renderer.setClearColor('#fbc531', 1.0)
			this.initCamera()
			this.initLight()
			this.initModel()
			this.initControls()
		},
		initCamera () {
			this.threeManager.camera.position.set(0, 10, 20)
			this.threeManager.camera.lookAt(new THREE.Vector3(0, 0, 0))
		},
		initLight () {
			this.threeManager.pointLight.position.set(0, 100, 300)
		},
		initModel () {
			modelOrder.loadModel('/model/person4.fbx').then((res) => {
				this.model = res
				this.model = modelOrder.setShadow(this.model, true)
				this.model.position.set(0, -10, 0)
				this.model.scale.set(25, 25, 25)
				this.model.rotateY(180)
			}).then(() => this.threeManager.add(this.model))
		},
		initControls () {
			this.threeManager.controls.autoRotate = false
		}
	},
	mounted () {
		this.init()
	}
}
</script>
