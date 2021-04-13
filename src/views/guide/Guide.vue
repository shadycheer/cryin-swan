<style scoped>

</style>

<template>
	<div id="container"></div>
</template>

<script>

import * as THREE from 'three'
import modelOrder from '@/common/model-order'
import threeInit from '@/common/three-init'
import userInfoUpdate from '@/common/user-info-update'
import Observe from '@/common/global-event/observe'
import { CollisionMixin, GameControlMixin, StatusMixin } from '@/mixins'
import { EVENT_NAME } from '@/common/global-event/constant'

let thM
export default {
	name: 'Guide',
	mixins: [GameControlMixin, StatusMixin, CollisionMixin],
	data () {
		return {
			cruiseCamera: new THREE.PerspectiveCamera(),
			model: new THREE.Object3D(),
			textShow: true,
		}
	},
	methods: {
		async init () {
			this.$_statusLoading()
			const container = document.getElementById('container')
			thM = new threeInit(container)
			await this.$_fetchCharacterInfo()
			this.$_propertySetter()
			this.initRender()
			this.initCamera()
			this.initLight()
			this.initPlane()
			await this.initModel()
			this.initControls()
			this.$_initPhysicalBox(thM)
			this.$_gameOrbitControls(thM.controls)
			this.$_gameControlKeyBoard(thM.camera)
			await this.$_statusFinish()
			this.update()
			this.render()
		},
		initRender () {
			thM.renderer.setPixelRatio(window.devicePixelRatio)
			thM.renderer.setSize(window.innerWidth, window.innerHeight)
			thM.renderer.setClearColor('#ffffff', 1.0)
			thM.renderer.shadowMap.enabled = true
			thM.renderer.shadowMap.type = THREE.PCFSoftShadowMap
		},
		initCamera () {
			this.cruiseCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
			this.cruiseCamera.position.set(0, 300, 300)
			thM.add(this.cruiseCamera)
			thM.changeCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
			thM.camera.position.set(0, 300, 300)
		},
		initLight () {
			thM.pointLight.position.set(0, 300, 300)
		},
		async initModel () {
			const characterId = await userInfoUpdate.userCharacterGetter()
			this.model = await modelOrder.loadModel(`/model/person${characterId}.fbx`)
			this.model = modelOrder.setShadow(this.model, true)
			this.model.position.set(0, 0, 0)
			this.objMixer = new THREE.AnimationMixer(this.model)
			this.objAction = this.objMixer.clipAction(this.model.animations[0])
			thM.add(this.model)
		},
		initControls () {
			thM.controls.enablePan = false //是否开启右键拖拽
			thM.controls.minDistance = 50
			thM.controls.maxDistance = 500
		},
		initPlane () {
			// 地板
			let plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200),
					new THREE.MeshPhongMaterial({
						color: 0xffffff,
						depthWrite: false
					}))
			plane.rotation.x = -Math.PI / 2
			modelOrder.setShadow(plane, true)
			thM.add(plane)
			//添加地板割线
			let grid = new THREE.GridHelper(200, 20, 0x000000, 0x000000)
			grid.material.opacity = 0.2//地板割线透明度
			grid.material.transparent = true//地板材质透明
			thM.add(grid)
		},
		render () {
			let time = this.clock.getDelta()
			if (this.objMixer) {
				this.objMixer.update(time)
			}
			thM.renderer.render(thM.scene, thM.camera)
			thM.controls.update()

			this.$_boxPositionChange(thM)
			this.$_rayCasterInit(thM)
		},
		update () {
			const update = () => {
				this.render()
				if (this.cruiseCamera && this.cruiseCamera.position.y > 71) {
					this.cruiseCamera.position.z -= 0.5
					this.cruiseCamera.position.y -= 0.5
					thM.camera.position.set(this.cruiseCamera.position.x, this.cruiseCamera.position.y, this.cruiseCamera.position.z)
				} else {
					this.cruiseCamera = null
					if (this.textShow) {
						Observe.$emit(EVENT_NAME.textShowStart)
						this.textShow = false
					}
				}
				requestAnimationFrame(update)
			}
			update()
		},
		createDoor () {
			this.$_createDoor(thM, -90, 4, -90)
		}
	},
	mounted () {
		this.init()
		Observe.$on(EVENT_NAME.initDoorStart, this.createDoor)
	},
	beforeDestroy () {
		cancelAnimationFrame(this.update)
		this.model = null
		thM.destroyMesh()
	},
	destroyed () {
		Observe.$off(EVENT_NAME.initDoorStart, this.createDoor)
	}
}
</script>
