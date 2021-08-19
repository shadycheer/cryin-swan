<style lang="less" scoped>
@import "~@/assets/less/index.less";
</style>

<template>
	<div>
		<Clock class="clock" ref="clock"></Clock>
		<BigPageLoadingStatus></BigPageLoadingStatus>
		<CharacterStatus class="character-status"></CharacterStatus>
		<el-collapse-transition>
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

export default {
	name: 'index',
	components: {
		CharacterStatus,
		BigPageLoadingStatus,
		TextControl,
		FinishMask,
		Clock
	}
}
</script>
