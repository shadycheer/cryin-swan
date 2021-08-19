<style scoped>

</style>

<template>
	<div id="container"></div>
</template>

<script>

import * as THREE from 'three'
import modelOrder from '@/common/model-order'
import userInfoUpdate from '@/common/user-info-update'
import Observe from '@/common/global-event/observe'
import { CollisionMixin, GameControlMixin, GameRenderMixin, StatusMixin } from '@/mixins'
import { EVENT_NAME } from '@/common/global-event/constant'
import physiInit from '@/common/physi-init'
import { mapMaker } from '@/common/map-maker'

let phM
export default {
	name: 'Guide',
	mixins: [GameControlMixin, StatusMixin, CollisionMixin, GameRenderMixin],
	data () {
		return {
			model: new THREE.Object3D(),
		}
	},
	methods: {
		async init () {
			this.$_statusLoading()
			const container = document.getElementById('container')
			phM = new physiInit(container)
			await this.$_fetchCharacterInfo()
			this.$_propertySetter()
			this.initRender()
			this.initCamera()
			this.initLight()
			this.initPlane()
			this.$_initPhysicalBox(phM, 0, 20, 0)
			await this.initModel()
			this.initControls()
			this.$_gameOrbitControls(phM.controls)
			this.$_gameControlKeyBoard(phM.camera)
			await this.$_statusFinish()
			this.update()
			this.render()
		},
		initRender () {
			phM.renderer.setPixelRatio(window.devicePixelRatio)
			phM.renderer.setSize(window.innerWidth, window.innerHeight)
			phM.renderer.setClearColor('#ffffff', 1.0)
			phM.renderer.shadowMap.enabled = true
			phM.renderer.shadowMap.type = THREE.PCFSoftShadowMap
		},
		initCamera () {
			this.cruiseCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
			this.cruiseCamera.position.set(0, 300, 300)
			phM.add(this.cruiseCamera)
			this.isCruiseCamera = true
			phM.changeCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
			phM.camera.position.set(0, 300, 300)
		},
		initLight () {
			phM.pointLight.position.set(0, 300, 300)
		},
		async initModel () {
			const characterId = await userInfoUpdate.userCharacterGetter()
			this.model = await modelOrder.loadModel(`/model/person${characterId}.fbx`)
			this.model = modelOrder.setShadow(this.model, true)
			this.model.position.set(0, 0, 0)
			this.objMixer = new THREE.AnimationMixer(this.model)
			this.objAction = this.objMixer.clipAction(this.model.animations[0])
			phM.add(this.model)
		},
		initControls () {
			phM.controls.enablePan = false //是否开启右键拖拽
			phM.controls.minDistance = 50
			phM.controls.maxDistance = 500
		},
		initPlane () {
			// 地板
			let startGeometry = new THREE.BoxGeometry(200, 1, 200)
			let startMaterial = new Physijs.createMaterial(new THREE.MeshPhongMaterial({
				color: 0xffffff,
				depthWrite: false
			}))
			let startFirst = new Physijs.BoxMesh(startGeometry, startMaterial, 0)
			mapMaker.initPosition(startFirst, 0, 0, 0)
			phM.add(startFirst)
			//添加地板割线
			let grid = new THREE.GridHelper(200, 20, 0x000000, 0x000000)
			grid.material.opacity = 0.2//地板割线透明度
			grid.material.transparent = true//地板材质透明
			phM.add(grid)
		},
		render () {
			let time = this.clock.getDelta()
			if (this.objMixer) {
				this.objMixer.update(time)
			}
			phM.renderer.render(phM.scene, phM.camera)
			phM.controls.update()
			this.$_freeFallRender(phM, 0, 20, 0)
			this.$_boxPositionChange(phM)
			this.$_rayCasterInit(phM)
		},
		update () {
			const update = () => {
				this.render()
				if (this.isCruiseCamera) {
					console.log(this.isCruiseCamera)
					this.$_renderCruiseCameraGuide(phM)
				}
				phM.scene.simulate()
				requestAnimationFrame(update)
			}
			update()
		},
		createDoor () {
			this.$_createDoor(phM, -90, 4, -90)
		}
	},
	mounted () {
		this.init()
		Observe.$on(EVENT_NAME.initDoorStart, this.createDoor)
	},
	beforeDestroy () {
		cancelAnimationFrame(this.update)
		this.model = null
		phM.destroyMesh()
	},
	destroyed () {
		Observe.$off(EVENT_NAME.initDoorStart, this.createDoor)
	}
}
</script>
