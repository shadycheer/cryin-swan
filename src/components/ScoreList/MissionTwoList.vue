<style lang="less" scoped>
.container {
	width: 100%;
	height: 700px;
	overflow-y: scroll;
	font-family: '.AppleSystemUIFontMonospaced', sans-serif;

	&__text {
		margin-left: 10px;
		color: white;
	}

	&__data {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background: #ff6b6b;
		border: 1px solid orange;
		border-radius: 10px;
		margin-left: 4px;
		margin-right: 4px;

		&-myself-rank {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-border {
			margin-left: 30px;
			background: black;
			height: 40px;
			width: 4px;
		}

		&-myself-name {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
			p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-wrap: normal;
			}
		}

		&-myself-character {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-myself-img {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			margin-left: 50px;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: #fdcb6e;

			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
		}

		&-myself-time {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-right: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}
	}

	&__all-data {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background: #74b9ff;
		border: 1px solid orange;
		border-radius: 10px;
		margin-left: 4px;
		margin-right: 4px;

		&-rank {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-border {
			margin-left: 30px;
			background: black;
			height: 40px;
			width: 4px;
		}

		&-name {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
			p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-wrap: normal;
			}
		}

		&-character {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-img {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			margin-left: 50px;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: #fdcb6e;

			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
		}

		&-time {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-right: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}
	}
}
</style>

<template>
	<div class="container">
		<div class="container__text">
			我的排名
		</div>
		<div class="container__data">
			<div class="container__data-myself-rank">
				{{ missionUserRank }}
			</div>
			<div class="container__data-border">
			</div>
			<div class="container__data-myself-name">
				<p>
					{{ '用户名:' + missionUserName }}
				</p>
			</div>
			<div class="container__data-myself-character">
				{{ '使用角色:' + judgeCharacterName(missionUserCharacter) }}
			</div>
			<div class="container__data-myself-img">
				<img v-if="missionUserIcon" :src="missionUserIcon" alt="">
			</div>
			<div class="container__data-myself-character">
				{{ '用时:' + missionUserStatus }}
			</div>
		</div>
		<div style="margin-top: 10px">
			<div class="container__text">
				第二关排名
			</div>
			<template v-for="(item, index) in allData">
				<div class="container__all-data">
					<div class="container__all-data-rank">
						{{ index + 1 }}
					</div>
					<div class="container__all-data-border">
					</div>
					<div class="container__all-data-name">
						<p>
							{{ '用户名:' + item.username }}
						</p>
					</div>
					<div class="container__all-data-character">
						{{ '使用角色:' + judgeCharacterName(item.score.m2CharacterId) }}
					</div>
					<div class="container__all-data-img">
						<img :src="judgeIcon(item.score.m2CharacterId)" alt="">
					</div>
					<div class="container__all-data-character">
						{{ '用时:' + changeTimeStructure(item.score.m2Time) }}
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import { scoreService } from '@/api/score-service'
import userInfoUpdate from '@/common/user-info-update'
import modelService from '@/api/model-service'

export default {
	name: 'MissionTwo',
	data () {
		return {
			userInfo: {},
			myselfData: {},
			allData: {},
			characterMap: new Map()
		}
	},
	computed: {
		missionUserRank () {
			return this.myselfData.m2Rank >= 100 ? '100+' : `${this.myselfData.m2Rank}`
		},
		missionUserName () {
			return this.userInfo.username
		},
		missionUserCharacter () {
			return this.myselfData.score.m2CharacterId === 0 ? '未使用角色' : this.myselfData.score.m2CharacterId
		},
		missionUserStatus () {
			return this.myselfData.score.m2State === 0 ? '未完成' : Math.floor(this.myselfData.score.m2Time / 1000) + '秒'
		},
		missionUserIcon () {
			return this.myselfData.score.m2CharacterId === 0 ? '' : this.judgeIcon(this.myselfData.score.m2CharacterId)
		}
	},
	methods: {
		async initMap () {
			let characterArr = await modelService.fetchModelData().then(res => res.data)
			characterArr.map(item => this.characterMap.set(item.characterId, item.name))
		},
		async fetchMyselfData () {
			this.userInfo = await userInfoUpdate.userInfoGetter()
			this.myselfData = await scoreService.fetchMyselfData()
		},
		async fetchAllData () {
			this.allData = await scoreService.fetchAllData(2)
		},
		judgeCharacterName (val) {
			if (typeof val !== 'number') return val
			return this.characterMap.get(val)
		},
		changeTimeStructure (val) {
			return Math.floor(val / 1000) + '秒'
		},
		judgeIcon (val) {
			return '/../../../img/picLogo/' + val + '.png'
		}
	},
	mounted () {
		this.initMap()
		this.fetchMyselfData()
		this.fetchAllData()
	},
	activated () {
		this.fetchMyselfData()
		this.fetchAllData()
	}
}
</script>
