<style scoped>
.character-status {
	position: absolute;
	margin-left: 20px;
	margin-top: 20px;
}
</style>

<template>
	<div>
		<CharacterStatus class="character-status"></CharacterStatus>
		<router-view></router-view>
	</div>
</template>

<script>
import ScoreList from '@/components/ScoreList'
import CharacterStatus from '@/components/CharacterStatus'

export default {
	name: 'index',
	components: {
		ScoreList,
		CharacterStatus
	}
}
</script>
