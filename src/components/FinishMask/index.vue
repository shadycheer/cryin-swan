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
	<div class="container" v-if="finishTime !== 0">
		<div class="container__title">
			{{ changeText }}
		</div>
		<div class="container__time" v-if="isGameFinish">
			用时: {{ finishTime }}秒
		</div>
		<div class="container__timer" v-if="!isGameFinish">
			请再接在厉！
		</div>
		<div class="container__button">
			<div class="container__button-next" v-if="nextShow && isGameFinish" @click="nextMission">
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
import {
	ENTRY_ROUTE_NAME,
	MISSION_ONE_ROUTE_NAME,
	MISSION_THREE_ROUTE_NAME,
	MISSION_TWO_ROUTE_NAME
} from '@/router/constant'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import { StatusMixin } from '@/mixins'
import { scoreService } from '@/api/score-service'
import userService from '@/api/user-service'

export default {
	name: 'index',
	data () {
		return {
			finishTime: 0,
			mission: {
				nowMission: '',
				startGame: ''
			},
			type: 0,
			characterId: 0,
			nextShow: false
		}
	},
	computed: {
		isGameFinish () {
			return this.finishTime !== 99999999
		},
		changeText () {
			return this.isGameFinish ? '完成' : '未完成'
		}
	},
	methods: {
		async judgeNextShow () {
			this.mission = await userInfoUpdate.updateNextMissionShowGetter()
			console.log(this.mission)
			this.characterId = await userInfoUpdate.userCharacterGetter()
			console.log(this.characterId)
			switch (this.mission.nowMission) {
				case MISSION_ONE_ROUTE_NAME.Home:
					this.type = 1
					break
				case MISSION_TWO_ROUTE_NAME.Home:
					this.type = 2
					break
				case MISSION_THREE_ROUTE_NAME.Home:
					this.type = 3
					break
				default:
					this.type = 0
			}
			this.nextShow = this.mission.startGame
		},
		async returnEntryHome () {
			if (this.isGameFinish) {
				await this.postUserScore()
			}
			if (this.type === 0) {
				let statusCheck = await userService.updateStatus()
				if (statusCheck) await userInfoUpdate.updateUserStatus()
			}
			this.$router.push({ name: ENTRY_ROUTE_NAME.ThreeFrame })
		},
		getTime (val) {
			this.finishTime = val
		},
		nextMission () {
			this.postUserScore()
			switch (this.mission.nowMission) {
				case MISSION_ONE_ROUTE_NAME.Home:
					this.nextMissionControl(MISSION_TWO_ROUTE_NAME.Home, true)
					break
				case MISSION_TWO_ROUTE_NAME.Home:
					this.nextMissionControl(MISSION_THREE_ROUTE_NAME.Home, false)
					break
				default:
					break
			}
		},
		nextMissionControl (routerName, nextShow) {
			userInfoUpdate.updateNextMissionShowSetter(routerName, nextShow)
			this.$router.push({ name: routerName })
		},
		async postUserScore () {
			if (this.type === 0) return
			await scoreService.updateUserScore(this.type, this.characterId, this.finishTime * 1000)
		}
	},
	mounted () {
		this.judgeNextShow()
		Observe.$on(EVENT_NAME.gameFinishTime, this.getTime)
	},
}
</script>
