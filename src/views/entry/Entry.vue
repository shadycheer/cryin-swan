<style lang="less" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;

	&__score-list {
	}
}
</style>

<template>
	<div class="container">
		<BigPageLoadingStatus></BigPageLoadingStatus>
		<el-collapse-transition>
			<ScoreList class="container__score-list" v-if="toggleScore"></ScoreList>
		</el-collapse-transition>
		<router-view></router-view>
	</div>
</template>

<script>

import userInfoUpdate from '@/common/user-info-update'
import MsgBoxMixin from '@/mixins/elementMessage'
import ScoreList from '@/components/ScoreList'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import BigPageLoadingStatus from '@/components/BigPageLoadingStatus'

export default {
	name: 'page-container',
	data () {
		return {
			toggleScore: false
		}
	},
	components: {
		ScoreList,
		BigPageLoadingStatus
	},
	mixins: [MsgBoxMixin],
	methods: {
		showScoreList () {
			this.toggleScore = !this.toggleScore
		},
		async checkStatusAvailable () {
			let bool = await userInfoUpdate.userInfoGetter()
			if (!bool.status) {
				await this.$_openGuideRouterMessage()
			}
		},
	},
	mounted () {
		Observe.$on(EVENT_NAME.showScoreList, this.showScoreList)
		this.checkStatusAvailable()
	},
	destroyed () {
		Observe.$off(EVENT_NAME.showScoreList, this.showScoreList)
	}
}
</script>
