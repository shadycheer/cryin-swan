<style scoped>
.character-status {
	position: absolute;
	margin-left: 20px;
	margin-top: 20px;
}

.text-control {
	position: absolute;
	left: 50%;
	top: 70%;
	transform: translate(-50%, -30%);
}

.clock {
	position: absolute;
	left: 90%;
	top: 10%;
	transform: translate(-10%, -90%);
}
</style>

<template>
	<div>
		<Clock class="clock" ref="clock"></Clock>
		<BigPageLoadingStatus></BigPageLoadingStatus>
		<CharacterStatus class="character-status"></CharacterStatus>
		<el-collapse-transition v-if="gameFinish$">
			<FinishMask></FinishMask>
		</el-collapse-transition>
		<TextControl class="text-control"></TextControl>
		<router-view></router-view>
	</div>
</template>

<script>
import CharacterStatus from '@/components/CharacterStatus'
import BigPageLoadingStatus from '@/components/BigPageLoadingStatus'
import TextControl from '@/components/TextControl'
import FinishMask from '@/components/FinishMask'
import Clock from '@/components/Clock'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import { StatusMixin } from '@/mixins'
import Utils from '@/common/utils'

export default {
	name: 'index',
	components: {
		CharacterStatus,
		BigPageLoadingStatus,
		TextControl,
		FinishMask,
		Clock
	},
	mixins: [StatusMixin],
	mounted () {
		Observe.$on(EVENT_NAME.gameFinish, this.gameFinishEmit)
	},
	methods: {
		gameFinishEmit () {
			this.$refs.clock.stop()
			let timer = setTimeout(() => {
				this.$_gameFinishTodo()
				Utils.clearTimerOut(timer)
			}, 100)
		}
	},
	destroyed () {
		Observe.$off(EVENT_NAME.gameFinish, this.gameFinishEmit)
	}
}
</script>
