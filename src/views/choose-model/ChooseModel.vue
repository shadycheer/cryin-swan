<style scoped lang="less">
#container {
	width: 100%;
	height: 100vh;
}
</style>

<template>
	<div>
		<div id="container"></div>
	</div>
</template>

<script>
import * as THREE from 'three'
import { modelOrder, threeInit } from '@/common'
import modelService from '@/api/model-service'
import * as TWEEN from '@tweenjs/tween.js'

export default {
	name: 'HelloThree',
	data () {
		return {
			thM: null,
			mouse: new THREE.Vector2(),
			rayCaster: null,
			group: new THREE.Group(),
			tween: null,
			choose: null,
			model: new THREE.Object3D(),
			map: new Map()
		}
	},
	methods: {
		init () {
			const container = document.getElementById('container')
			this.thM = new threeInit(container)
			this.thM.renderer.setClearColor('#fbc531', 1.0)
			this.initCamera()
			this.initLight()
			this.initModel()
			this.initControls()
			this.render()
			this.update()
			window.onclick = this.onMouseClick
		},
		initCamera () {
			this.thM.camera.position.set(0, 0, 200)
			this.thM.camera.lookAt(new THREE.Vector3(0, 0, 0))
		},
		initLight () {
			this.thM.pointLight.position.set(0, 100, 0)
		},
		async initModel () {
			await modelService.fetchModelData().then((res) => {
				res.data.forEach((item, index) => {
					modelOrder.loadModel(item.modelUrl).then(mesh => {
						mesh.scale.set(8, 8, 8)
						mesh.position.x = Math.sin(2 * Math.PI / 8 * index) * 140
						mesh.position.z = Math.cos(2 * Math.PI / 8 * index) * 140
						mesh.rotation.y = Math.PI + Math.PI / 4 * index
						mesh.updateMatrix()
						mesh.info = item
						this.map.set(mesh.info.characterId, mesh.rotation.y)
						console.log(this.map)
						this.group.add(mesh)
					})
				})
				this.thM.add(this.group)
			})
		},
		initControls () {
			this.thM.controls.autoRotate = true
			this.thM.controls.minDistance = 250
			this.thM.controls.maxDistance = 250
			this.thM.controls.enableDamping = false
		},
		onMouseClick (e) {
			this.rayCaster = new THREE.Raycaster()
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			this.rayCaster.setFromCamera(this.mouse, this.thM.camera)
			let intersects = this.rayCaster.intersectObjects(this.group.children, true)
			intersects = intersects[0]
			if (intersects) {
				if (this.choose !== null) this.model.parent.rotation.y = this.map.get(this.model.parent.info.characterId)
				this.model = intersects.object
				let pos = intersects.object.parent.position
				console.log(intersects)
				this.choose = true
				this.thM.controls.autoRotate = false
				this.thM.camera.position.set(pos.x, pos.y + 10, pos.z)
			} else {
				this.choose = false
				this.model.parent.rotation.y = this.map.get(this.model.parent.info.characterId)
				this.thM.controls.autoRotate = true
			}
		},
		render () {
			// TWEEN.update()
			if (this.choose) {
				this.model.parent.rotation.y += 0.02
			}
			this.thM.controls.update()
			this.thM.renderer.render(this.thM.scene, this.thM.camera)
		},
		update () {
			const update = () => {
				this.render()
				requestAnimationFrame(update)
			}
			update()
		},
		initTween () {
			this.tween = new TWEEN.Tween(this.thM.camera.position).to({ y: +10 }, 1000)
			this.tween.easing(TWEEN.Easing.Sinusoidal.InOut)
		}
	},
	mounted () {
		this.init()
	}
}
</script>
