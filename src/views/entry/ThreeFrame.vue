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
	left: 50%;
	transform: translate(-50%, -30%);
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
	transition: 0.5s;
}

.navbar {
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 50%;
	top: 70%;
	transform: translate(-50%, -30%);
}

.button-style {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	background: #00a8ff;
	border: 1px solid white;
	width: 150px;
	text-align: center;
	color: white;
	font-size: 16px;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
	"Lucida Sans", Arial, sans-serif;
	padding: 10px;
	cursor: pointer;
	transition: 0.5s;

	&:hover {
		background: white;
		color: black;
	}
}

.choose-mission {
	display: flex;
	flex-direction: row;
	align-items: center;

	&_text {
	}

	&__circle {
		display: flex;
		flex-direction: row;
		justify-items: center;
		align-items: center;
		transition: 0.5s;
	}
}

.choose-mission-click {
	transform: translateX(-100px);
}

.choose-mission-circle {
	transform: translateX(-100px);
}


.button-style-transform {
	transform: translateY(100px);
	opacity: 0;
	visibility: hidden;
}

.mission-circle {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10px;
	margin-left: 25px;
	width: 36px;
	height: 36px;
	background: black;
	color: white;
	border-radius: 50%;
	font-size: 16px;
	font-family: '.AppleSystemUIFontMonospaced', sans-serif;
	z-index: 1000;
	transition: 0.3s;
	cursor: pointer;

	&:hover {
		background: white;
		color: black;
	}
}

.SemiCircle {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	width: 36px;
	height: 36px;
	background: #b2bec3;
	border-radius: 50%;
	z-index: 1000;
	transition: 0.5s;
}

.semi-circle-transform {
	transform: translateY(-100px);
}

.menu-btn {
	cursor: pointer;
	display: flex;
	width: 25px;
	height: 25px;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.menu-btn .menu-line {
	width: 10px;
	border: 1px solid white;
	margin-top: 2px;
	transition: 0.5s;
}

.menu-btn.closed .menu-line:nth-child(1) {
	transform: translateY(4px) rotate(45deg);
}

.menu-btn.closed .menu-line:nth-child(2) {
	opacity: 0;
}

.menu-btn.closed .menu-line:nth-child(3) {
	transform: translateY(-4px) rotate(-45deg);
}

.btn-closed {
	transform: translateX(-100px);
	opacity: 0;
	visibility: hidden;
}

.page-loading {
	transition: 0.4s;
}
</style>

<template>
	<div>
		<div>
			<div class="navbar">
				<div class="button-style" :class="{'button-style-transform': !closed}" @click="onStartGameClick">
					开始游戏
				</div>
				<div class="choose-mission">
					<div class="choose-mission__text button-style"
							 :class="{'button-style-transform': !closed, 'choose-mission-click': chooseClick}" @click="onChooseClick">
						选择关卡
					</div>
					<div class="choose-mission__circle" :class="{'choose-mission-circle': chooseClick}">
						<div class="mission-circle" v-show="chooseClick" @click="onChooseMissionClick(1)">1</div>
						<div class="mission-circle" v-show="chooseClick" @click="onChooseMissionClick(2)">2</div>
						<div class="mission-circle" v-show="chooseClick" @click="onChooseMissionClick(3)">3</div>
					</div>
				</div>
				<div @click="onScoreBtnClick" class="button-style" :class="{'button-style-transform': !closed}">
					积分排行
				</div>
				<div class="button-style" :class="{'button-style-transform': !closed}" @click="onLogoutClick">
					退出登录
				</div>
				<div class="SemiCircle" @click="btnClosed" :class="{'semi-circle-transform': !closed}">
					<div class="menu-btn" :class="{'closed': !closed}">
						<div class="menu-line"></div>
						<div class="menu-line"></div>
						<div class="menu-line"></div>
					</div>
				</div>
			</div>
			<div id="cool" :class="{'btn-closed': closed}" @click.self="btnClick">更换角色</div>
			<div id="container"></div>
		</div>
	</div>
</template>

<script>
import * as THREE from 'three'
import backgroundCreate from '@/common/background-create'
import modelOrder from '@/common/model-order'
import threeInit from '@/common/three-init'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import { CHOOSE_MODEL_ROUTE_NAME, GUIDE_ROUTE_NAME } from '@/router/constant'
import { mapState } from 'vuex'
import userInfoUpdate from '@/common/user-info-update'
import Utils from '@/common/utils'
import { MsgBoxMixin, StatusMixin } from '@/mixins'

let thM
export default {
	name: 'HelloThree',
	data () {
		return {
			model: new THREE.Object3D(),
			closed: true,
			timer: null,
			chooseClick: false,
			renderColor: ['#00cec9', '#e17055', '#fd79a8', '#00b894', '#636e72', '#6c5ce7']
		}
	},
	mixins: [MsgBoxMixin, StatusMixin],
	computed: {
		...mapState('common', ['token'])
	},
	methods: {
		async init () {
			this.$_statusLoading()
			const container = document.getElementById('container')
			thM = new threeInit(container)
			this.initCamera()
			this.initLight()
			thM.renderer.setClearColor('#fbc531', 1.0)
			this.initCubeBackGround()
			await this.initModel()
			this.initControls()
			this.update()
			this.render()
			this.updateColor()
			this.$_statusFinish()
		},
		updateColor () {
			let i = 0
			this.timer = setInterval(() => {
				if (i === 6) {
					i = 0
				}
				thM.renderer.setClearColor(`${this.renderColor[i]}`, 1.0)
				i++
			}, 5000)
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
			thM.controls.autoRotateSpeed = 0.5
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
		},
		onChooseClick () {
			this.chooseClick = !this.chooseClick
		},
		onChooseMissionClick (mission) {
			this.$_chooseMissionMessage(mission)
		},
		onScoreBtnClick () {
			Observe.$emit(EVENT_NAME.showScoreList)
		},
		onLogoutClick () {
			this.$_logoutMessage()
		},
		onStartGameClick () {
			userInfoUpdate.updateNextMissionShowSetter(true)
			this.$router.push({ name: GUIDE_ROUTE_NAME.Home })
		}
	},
	mounted () {
		this.init()
	},
	created () {
	},
	beforeDestroy () {
		cancelAnimationFrame(this.update)
		this.model = null
		if (this.timer) Utils.clearTimerInterval(this.timer)
		thM.destroyMesh()
	}
}
</script>
