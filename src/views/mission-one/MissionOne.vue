<style scoped>

</style>

<template>
	<div>
		<div id="container"></div>
	</div>
</template>

<script>
import * as THREE from 'three'
import { CollisionMixin, FirstMapMixin, GameControlMixin, StatusMixin } from '@/mixins'
import threeInit from '@/common/three-init'
import userInfoUpdate from '@/common/user-info-update'
import modelOrder from '@/common/model-order'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import physiInit from '@/common/physi-init'

let phM
export default {
	name: 'MissionOne',
	mixins: [GameControlMixin, StatusMixin, CollisionMixin, FirstMapMixin],
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
			phM = new physiInit(container)
			await this.$_fetchCharacterInfo()
			this.$_propertySetter()
			this.initRender()
			this.initCamera()
			this.initLight()
			this.$_initModelResurgence(phM)
			await this.initModel()
			this.initControls()
			this.$_initPhysicalBox(phM)
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
			this.cruiseCamera.position.set(0, 300, 300)
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
			phM.controls.maxDistance = 500
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

			this.$_boxPositionChange(phM)
			this.$_rayCasterInit(phM)
		},
		update () {
			const update = () => {
				this.render()
				if (this.cruiseCamera && this.cruiseCamera.position.y > 71) {
					this.cruiseCamera.position.z -= 0.5
					this.cruiseCamera.position.y -= 0.5
					phM.camera.position.set(this.cruiseCamera.position.x, this.cruiseCamera.position.y, this.cruiseCamera.position.z)
				} else {
					this.cruiseCamera = null
					if (this.textShow) {
						Observe.$emit(EVENT_NAME.gameStart)
						Observe.$emit(EVENT_NAME.textShowStart)
						this.textShow = false
					}
				}
				phM.scene.simulate()
				requestAnimationFrame(update)
			}
			update()
		},
		createDoor () {
			// this.$_createDoor(phM, 0, 35, 950)
			this.$_createDoor(phM, 90, 0, 90)
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
