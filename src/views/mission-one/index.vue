<style scoped>
.character-status {
	position: absolute;
	margin-left: 20px;
	margin-top: 20px;
}
</style>

<template>
	<div>
		<BigPageLoadingStatus></BigPageLoadingStatus>
		<CharacterStatus class="character-status"></CharacterStatus>
		<router-view></router-view>
	</div>
</template>

<script>
import CharacterStatus from '@/components/CharacterStatus/index'
import BigPageLoadingStatus from '@/components/BigPageLoadingStatus/index'

export default {
	name: 'index',
	components: {
		CharacterStatus,
		BigPageLoadingStatus
	}
}
</script>
