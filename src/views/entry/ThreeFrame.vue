<style scoped lang="less">
body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
}

#cool {
	top: 70%;
	left: 48%;
	transform: translate(-30%, -52%);
	position: absolute;
	text-align: center;
	line-height: 30px;
	height: 30px;
	text-decoration: none;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
	"Lucida Sans", Arial, sans-serif;
	padding: 12px 36px;
	letter-spacing: 2px;
	font-size: 18px;
	text-transform: uppercase;
	color: white;
	border-radius: 60px;
	background: linear-gradient(45deg, #755bea, #ff72c0);
	cursor: pointer;
	overflow: hidden;
	transition: 1s;
}

.btn-closed {
	opacity: 0;
	visibility: hidden;
}
</style>

<template>
	<div>
		<div id="cool" :class="{'btn-closed': closed}" @click.self="btnClick">更换角色</div>
		<div id="container"></div>
	</div>
</template>

<script>
import * as THREE from 'three'
import backgroundCreate from '@/common/background-create'
import modelOrder from '@/common/model-order'
import threeInit from '@/common/three-init'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import { CHOOSE_MODEL_ROUTE_NAME } from '@/router/constant'
import { mapState } from 'vuex'
import userInfoUpdate from '@/common/user-info-update'

let thM
export default {
	name: 'HelloThree',
	data () {
		return {
			model: new THREE.Object3D(),
			closed: true
		}
	},
	computed: {
		...mapState('common', ['token'])
	},
	methods: {
		init () {
			const container = document.getElementById('container')
			thM = new threeInit(container)
			thM.renderer.setClearColor('#fbc531', 1.0)
			this.initCamera()
			this.initLight()
			this.initCubeBackGround()
			this.initModel()
			this.initControls()
			this.update()
			this.render()
		},
		initCamera () {
			thM.camera.position.set(0, 10, 20)
			thM.camera.lookAt(new THREE.Vector3(0, 0, 0))
		},
		initLight () {
			thM.pointLight.position.set(0, 100, 300)
		},
		async initModel () {
			const characterId = await userInfoUpdate.userCharacterGetter()
			this.model = await modelOrder.loadModel(`/model/person${characterId}.fbx`)
			this.model = modelOrder.setShadow(this.model, true)
			this.model.position.set(0, -10, 0)
			this.model.scale.set(25, 25, 25)
			this.model.rotateY(180)
			thM.add(this.model)
		},
		initCubeBackGround () {
			thM.add(backgroundCreate.Cube(1000))
		},
		initControls () {
			thM.controls.autoRotate = true
		},
		render () {
			thM.controls.update()
			thM.renderer.render(thM.scene, thM.camera)
		},
		update () {
			const update = () => {
				this.render()
				requestAnimationFrame(update)
			}
			update()
		},
		btnClosed () {
			this.closed = !this.closed
		},
		btnClick () {
			this.$router.push({ name: CHOOSE_MODEL_ROUTE_NAME.Home })
		}
	},
	mounted () {
		this.init()
	},
	created () {
		Observe.$on(EVENT_NAME.setThreeFrameResize, this.btnClosed)
	},
	beforeDestroy () {
		cancelAnimationFrame(this.update)
		this.model = null
		thM.destroyMesh()
		Observe.$off(EVENT_NAME.setThreeFrameResize)
	}
}
</script>
