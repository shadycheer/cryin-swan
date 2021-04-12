<style lang="less" scoped>
.container {
	position: absolute;
	display: flex;
	width: 100%;
	height: 100vh;
	color: white;
	font-family: '.AppleSystemUIFontMonospaced', sans-serif;
	background-size: cover;
	z-index: 99999;
	transition: 0.5s;

	&__text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-style: italic;
		font-size: 40px;
		margin-bottom: 20px;
	}

	&__progress {
		position: absolute;
		display: flex;
		width: 300px;
		flex-flow: column wrap;
		align-items: center;
		justify-items: center;
		left: 85%;
		top: 85%;
		transform: translate(-15%, -15%);

		&-text {
			font-size: 40px;
			margin-bottom: 20px;
		}

		&-timer {
			width: 200px;
			height: 5px;
		}
	}
}
</style>

<template>
	<el-collapse-transition>
		<div class="container" v-if="maskLoading$" :style="{'background-image': `url(${backgroundImg})`}">
			<div class="container__text">
				{{ changeTipsText }}
			</div>
			<div class="container__progress">
				<div class="container__progress-text">
					{{ progressNumber }}
				</div>
				<div class="container__progress-timer">
					<el-progress :show-text="false" status="warning" :percentage="progressNumber" color="#f56c6c"></el-progress>
				</div>
			</div>
		</div>
	</el-collapse-transition>
</template>

<script>
import Utils from '@/common/utils'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import { StatusMixin } from '@/mixins'

export default {
	name: 'index',
	mixins: [StatusMixin],
	data () {
		return {
			tipsText: [
				'不同角色具有不同的属性，去找寻你最喜欢的角色！',
				'如果某一关你无法通过，试图尝试换个角色？',
				'通过不同的角色去刷新世界排行，突破自我！',
				'游戏有问题？找找自己的问题！',
				'JavaScript是世界上最好的语言！'
			],
			backgroundImg: require('../../../public/img/background/background1.png'),
			timer: null,
			progressNumber: 0
		}
	},
	computed: {
		changeTipsText () {
			return this.tipsText[Math.floor(Math.random() * 5)]
		}
	},
	methods: {
		progressIncrease () {
			this.timer = setInterval(() => {
				if (this.progressNumber >= 95) {
					Utils.clearTimerInterval(this.timer)
				}
				this.progressNumber++
			}, 10)
		},
		progressFinish () {
			if (this.timer) Utils.clearTimerInterval(this.timer)
			this.progressNumber = 100
			let timer = setTimeout(() => {
				this.$_statusMaskFinish()
				Utils.clearTimerOut(timer)
			}, 300)
		}
	},
	mounted () {
		Observe.$on(EVENT_NAME.statusLoading, this.progressIncrease)
		Observe.$on(EVENT_NAME.statusFinish, this.progressFinish)
	},
	destroyed () {
		Observe.$off(EVENT_NAME.statusLoading, this.progressIncrease)
		Observe.$off(EVENT_NAME.statusFinish, this.progressFinish)
	}
}
</script>
