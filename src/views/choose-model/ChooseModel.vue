<style scoped lang="less">
@import (reference) "~@/assets/less/index";

.container {
	width: 100%;
	height: 100vh;
}

.drawer {
	font-family: '.AppleSystemUIFontMonospaced', sans-serif;
	background: #7ed6df;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-flow: column;
	font-size: 16px;

	img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}

	&__text {
		margin-top: 10%;

		&-child {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-top: 20px;

			span {
				font-size: 20px;
			}
		}
	}

	&__description {
		margin-bottom: 10%;
		margin-top: 30%;
		font-size: 30px;
		font-style: italic;
	}

	&__button {
		margin-bottom: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		color: white;
		background: rgb(55, 139, 255);
		width: 95%;
		height: 50px;
		border-radius: 6px;
		transition: 0.3s;

		&:hover {
			background: rgb(88, 161, 255);
		}
	}
}
</style>

<template>
	<div>
		<div @click.stop="">
			<el-drawer
					:title="objectInfo.name"
					direction="rtl"
					:size="'20%'"
					:visible.sync="drawer"
					:with-header="true"
			>
				<div class="drawer">
					<img :src="'/../../../img/picLogo/' + objectInfo.characterId + '.png'" width="50px" height="50px"/>
					<div class="drawer__text">
						<div class="drawer__text-child">
							<span>HEALTH:</span>
							<template v-for="(item, index) in objectInfo.health">
								<SvgIcon svg-name="heart" width="30px" height="30px" style="margin-left: 5px">></SvgIcon>
							</template>
						</div>
						<div class="drawer__text-child">
							<span>SPEED:</span>
							<template v-for="(item, index) in objectInfo.speed">
								<SvgIcon svg-name="speed" width="30px" height="30px" style="margin-left: 5px">></SvgIcon>
							</template>
						</div>
						<div class="drawer__text-child">
							<span>DASH:</span>
							<span v-if="!objectInfo.dash" style="margin-left: 10px">无法冲刺</span>
							<template v-else v-for="(item, index) in objectInfo.dash">
								<SvgIcon svg-name="dash" width="30px" height="30px" style="margin-left: 5px">></SvgIcon>
							</template>
						</div>
						<div class="drawer__text-child">
							<span>JUMP:</span>
							<span v-if="!objectInfo.jump" style="margin-left: 10px">无法跳跃</span>
							<template v-else v-for="(item, index) in objectInfo.jump">
								<SvgIcon svg-name="jump" width="30px" height="30px" style="margin-left: 5px">></SvgIcon>
							</template>
						</div>
					</div>
					<div class="drawer__description">
						{{ '"' + objectInfo.description + '"' }}
					</div>
					<div class="drawer__button" @click="$_openChooseModelMessage(objectInfo)">
						确定
					</div>
				</div>
			</el-drawer>
		</div>
		<div id="container"></div>
	</div>
</template>

<script>
import * as THREE from 'three'
import modelService from '@/api/model-service'
import { MsgBoxMixin, StatusMixin } from '@/mixins'
import threeInit from '@/common/three-init'
import modelOrder from '@/common/model-order'
import { OBJECT_INFO } from '@/config'
import { mapState } from 'vuex'

let thM
export default {
	name: 'HelloThree',
	mixins: [MsgBoxMixin, StatusMixin],
	data () {
		return {
			loading: true,
			mouse: new THREE.Vector2(),
			rayCaster: null,
			group: new THREE.Group(),
			choose: null,
			model: new THREE.Object3D(),
			map: new Map(),
			drawer: false,
			objectInfo: { ...OBJECT_INFO }
		}
	},
	methods: {
		async init () {
			this.$_statusLoading()
			const container = document.getElementById('container')
			thM = new threeInit(container)
			thM.renderer.setClearColor('#fbc531', 1.0)
			this.initCamera()
			this.initLight()
			await this.initModel()
			this.initControls()
			this.render()
			this.update()
			this.$_statusFinish()
			window.addEventListener('click', this.onMouseClick)
		},
		initCamera () {
			thM.camera.position.set(0, 0, 200)
			thM.camera.lookAt(new THREE.Vector3(0, 0, 0))
		},
		initLight () {
			thM.pointLight.position.set(0, 100, 0)
		},
		initModel () {
			modelService.fetchModelData().then((res) => {
				res.data.forEach((item, index) => {
					modelOrder.loadModel(item.modelUrl).then(mesh => {
						mesh.scale.set(8, 8, 8)
						mesh.position.x = Math.sin(2 * Math.PI / 8 * index) * 140
						mesh.position.z = Math.cos(2 * Math.PI / 8 * index) * 140
						mesh.rotation.y = Math.PI + Math.PI / 4 * index
						mesh.updateMatrix()
						mesh.info = item
						this.map.set(mesh.info.characterId, mesh.rotation.y)
						this.group.add(mesh)
					})
				})
				thM.add(this.group)
			})
		},
		initControls () {
			thM.controls.autoRotate = true
			thM.controls.minDistance = 250
			thM.controls.maxDistance = 250
			thM.controls.enableDamping = false
		},
		onMouseClick (e) {
			this.rayCaster = new THREE.Raycaster()
			this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
			this.rayCaster.setFromCamera(this.mouse, thM.camera)
			let intersects = this.rayCaster.intersectObjects(this.group.children, true)
			intersects = intersects[0]
			if (intersects) {
				if (intersects.object.children === this.model.children) return
				if (this.choose !== null) this.model.parent.rotation.y = this.map.get(this.model.parent.info.characterId)
				this.model = intersects.object
				const pos = intersects.object.parent.position
				console.log(intersects)
				this.objectInfo = intersects.object.parent.info
				this.choose = true
				this.drawer = true
				thM.controls.autoRotate = false
				thM.camera.position.set(pos.x, pos.y + 10, pos.z)
			} else {
				if (!this.model.parent) return
				this.choose = false
				this.drawer = false
				this.model.parent.rotation.y = this.map.get(this.model.parent.info.characterId)
				thM.controls.autoRotate = true
			}
		},
		render () {
			if (this.choose) {
				this.model.parent.rotation.y += 0.02
			}
			thM.controls.update()
			thM.renderer.render(thM.scene, thM.camera)
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
	},
	computed: {
		...mapState('common', ['userInfo', 'token'])
	},
	beforeDestroy () {
		thM.destroyMesh()
		window.removeEventListener('click', this.onMouseClick)
		this.model = null
		this.group = null
	}
}
</script>
