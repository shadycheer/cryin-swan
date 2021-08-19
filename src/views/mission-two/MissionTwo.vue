<style scoped>

</style>

<template>
	<div>
		<div id="container"></div>
	</div>
</template>

<script>
import * as THREE from 'three'
import { CollisionMixin, GameControlMixin, GameRenderMixin, StatusMixin } from '@/mixins'
import userInfoUpdate from '@/common/user-info-update'
import modelOrder from '@/common/model-order'
import physiInit from '@/common/physi-init'
import { mapMaker } from '@/common/map-maker'

let phM
export default {
	name: 'MissionTwo',
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
			mapMaker.secondMap(phM)
			phM.initSceneSkyBox()
			await this.initModel()
			this.initControls()
			this.$_initPhysicalBox(phM, 0, 20, 320)
			this.$_gameOrbitControls(phM.controls)
			this.$_gameControlKeyBoard(phM.camera)
			await this.$_statusFinish()
			this.createDoor()
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
			this.cruiseCamera.position.set(-300, 300, 325)
			this.isCruiseCamera = true
			phM.add(this.cruiseCamera)
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
			phM.controls.maxDistance = 5000
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
			phM.add(plane)
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
			this.$_freeFallRender(phM, 0, 20, 320)
			this.$_boxPositionChange(phM)
			this.$_rayCasterInit(phM)
		},
		update () {
			const update = () => {
				this.render()
				if (this.isCruiseCamera) {
					this.$_renderCruiseCameraMissionTwo(phM)
				}
				phM.scene.simulate()
				requestAnimationFrame(update)
			}
			update()
		},
		createDoor () {
			this.$_createDoor(phM, 520, 10, 400)
		},

	},
	mounted () {
		this.init()
	},
	beforeDestroy () {
		cancelAnimationFrame(this.update)
		this.model = null
		phM.destroyMesh()
	}
}
</script>
