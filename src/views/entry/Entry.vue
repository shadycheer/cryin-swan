<style lang="less" scoped>
.container {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-flow: row;
}

.menu {
	width: 15%;
	height: 100vh;
	background: #3498db;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	transition: 0.5s;
}

.menu-inside {
	height: 100vh;
	background: #3498db;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.menu-inside div {
	width: 200px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	margin-top: 60px;
	cursor: pointer;
	color: white;
	letter-spacing: 2px;
	border-radius: 50px;
	background: #74b9ff;
	transition: 1s;
}

.nav-closed {
	transition: 0.4s;
	width: 0;
}

.inside-closed {
	display: none;
}

.SemiCircle {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 35px;
	height: 50px;
	background: #3498db;
	border-radius: 0 4px 4px 0;
	z-index: 1000;
	text-align: center;
}

.menu-btn {
	display: flex;
	width: 25px;
	height: 25px;
	border: 1px solid white;
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

.iframe {
	width: 85%;
	height: 100vh;
}
</style>

<template>
	<div class="container">
		<div class="menu" :class="{'nav-closed': show}">
			<div class="menu-inside" :class="{'inside-closed': show}">
				<div>开始游戏</div>
				<div>选择关卡</div>
				<div>排行榜</div>
				<div>退出登录</div>
			</div>
		</div>
		<div class="SemiCircle" @click="onSemiClick">
			<div class="menu-btn" :class="{'closed': !show}">
				<div class="menu-line"></div>
				<div class="menu-line"></div>
				<div class="menu-line"></div>
			</div>
		</div>
		<div class="iframe">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'

export default {
	name: 'page-container',
	data () {
		return {
			show: false
		}
	},
	methods: {
		onSemiClick () {
			this.show = !this.show
			Observe.$emit(EVENT_NAME.setThreeFrameResize)
		}
	}
}
</script>
