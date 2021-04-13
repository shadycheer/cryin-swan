<style lang="less" scoped>
.container {
	position: absolute;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	font-family: '.AppleSystemUIFontMonospaced', sans-serif;
	width: 100%;
	height: 100vh;
	color: white;
	background: rgba(42, 42, 42, 0.7);
	z-index: 10;

	&__title {
		margin-top: 10%;
		opacity: 1;
		font-size: 160px;
		font-weight: bold;
		z-index: 20;
	}

	&__time {
		font-size: 80px;
		font-weight: bold;
		z-index: 20;
		opacity: 1;
	}

	&__button {
		margin-top: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		z-index: 20;
		opacity: 1;
		cursor: pointer;

		&-next {
			margin-top: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 200px;
			height: 50px;
			border-radius: 25px;
			background: #fdcb6e;
			color: white;
			transition: 0.3s;

			&:hover {
				background: white;
				color: black;
			}
		}

		&-back {
			margin-top: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 200px;
			height: 50px;
			border-radius: 25px;
			background: #b2bec3;
			color: white;
			transition: 0.3s;

			&:hover {
				background: white;
				color: black;
			}
		}
	}
}
</style>

<template>
	<div class="container">
		<div class="container__title">
			完成!
		</div>
		<div class="container__time">
			用时: {{ finishTime }}秒
		</div>
		<div class="container__button">
			<div class="container__button-next" v-if="nextShow">
				下一关
			</div>
			<div class="container__button-back" @click="returnEntryHome">
				返回主页面
			</div>
		</div>
	</div>
</template>

<script>
import userInfoUpdate from '@/common/user-info-update'
import { ENTRY_ROUTE_NAME } from '@/router/constant'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'

export default {
	name: 'index',
	data () {
		return {
			finishTime: 0,
			nextShow: false
		}
	},
	methods: {
		judgeNextShow () {
			this.nextShow = userInfoUpdate.updateNextMissionShowGetter()
		},
		returnEntryHome () {
			this.$router.push({ name: ENTRY_ROUTE_NAME.ThreeFrame })
		},
		getTime (val) {
			console.log(val)
			this.finishTime = val
			console.log(this.finishTime)
		}
	},
	mounted () {
		this.judgeNextShow()
		Observe.$on(EVENT_NAME.gameFinishTime, this.getTime)
	},
}
</script>
