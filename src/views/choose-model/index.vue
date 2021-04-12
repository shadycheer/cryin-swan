<style scoped>

</style>

<template>
	<div>
		<BigPageLoadingStatus></BigPageLoadingStatus>
		<router-view></router-view>
	</div>
</template>

<script>
import BigPageLoadingStatus from '@/components/BigPageLoadingStatus'
export default {
	name: 'index',
	components: {
		BigPageLoadingStatus
	}
}
</script>
