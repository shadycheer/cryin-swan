<style scoped lang="less">
@import (reference) "~@/assets/less/index";
.container {
	width: 100%;
	height: 100vh;
}
.drawer {
	font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC,
	Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
	background: #7ed6df;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	font-size: 16px;
}
</style>

<template>
	<div>
		<div @click.stop="">
			<el-drawer
					:title="objectInfo.name"
					direction="rtl"
					:visible.sync="drawer"
					:with-header="true"
			>
				<img src="public/img/picLogo/bine.png"/>
				<div class="drawer">
					<div>{{ '生命：' + objectInfo.health }}</div>
					<div>{{ '速度：' + objectInfo.speed }}</div>
					<div>{{ '跳跃：' + objectInfo.jump }}</div>
					<div>{{ '冲刺：' + objectInfo.dash }}</div>
					<div>{{ objectInfo.description }}</div>
					<el-button @click.stop="$_openChooseModelMessage(objectInfo)">确定</el-button>
				</div>
			</el-drawer>
		</div>
		<div :class="{'container': !loading}" id="container"></div>
	</div>
</template>

<script>
import * as THREE from 'three'
import modelService from '@/api/model-service'
import { MsgBoxMixin } from '@/mixins'
import threeInit from '@/common/three-init'
import modelOrder from '@/common/model-order'
import { OBJECT_INFO } from '@/config'
import userInfoUpdate from '@/common/user-info-update'
import { mapState } from 'vuex'

let thM
export default {
	name: 'HelloThree',
	mixins: [MsgBoxMixin],
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
			const container = document.getElementById('container')
			thM = new threeInit(container)
			thM.renderer.setClearColor('#fbc531', 1.0)
			this.initCamera()
			this.initLight()
			await this.initModel()
			this.initControls()
			this.render()
			this.update()
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
