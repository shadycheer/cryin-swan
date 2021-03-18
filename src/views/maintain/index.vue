<style lang="less" scoped>
.transitionLogin-enter-active,
.transitionLogin-leave-active,
.transitionHome-enter-active,
.transitionHome-leave-active {
	transition: all 0.4s;
}

.transitionLogin-enter,
.transitionLogin-leave {
	transform: translate3d(-100%, 0, 0);
}

.transitionHome-enter,
.transitionHome-leave {
	transform: translate3d(100%, 0, 0);
}
</style>

<template>
	<transition :name="transitionName" mode="out-in">
		<keep-alive v-if="$route.meta && $route.meta.keepAlive">
			<router-view class="router-view"></router-view>
		</keep-alive>
		<router-view v-else></router-view>
	</transition>
</template>

<script>
export default {
	name: 'index',
	data () {
		return {
			transitionName: ''
		}
	},
	watch: {
		$route (to, from) {
			if (to.meta.index < from.meta.index) {
				this.transitionName = 'transitionLogin'
			} else {
				this.transitionName = 'transitionHome'
			}
		}
	}
}
</script>
