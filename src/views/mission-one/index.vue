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
		<router-view></router-view>
	</div>
</template>

<script>
import CharacterStatus from '@/components/CharacterStatus/index'
import BigPageLoadingStatus from '@/components/BigPageLoadingStatus/index'
import Clock from '@/components/Clock'
import FinishMask from '@/components/FinishMask'

export default {
	name: 'index',
	components: {
		CharacterStatus,
		BigPageLoadingStatus,
		Clock,
		FinishMask
	}
}
</script>
