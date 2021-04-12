<style lang="less" scoped>
.container {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(45deg, #f6e58d, #f9ca24);
	transition: 0.4s;

	&__svgIcon {
		position: absolute;
		color: white;
		left: 98%;
		top: 5%;
		transform: translate(-2%, -95%);
		cursor: pointer;
	}
}
</style>

<template>
	<div class="container">
		<div class="container__svgIcon" @click="routerBackClick()">
			<SvgIcon svgName="close" width="24px" height="24px"></SvgIcon>
		</div>
		<LoginPage></LoginPage>
	</div>
</template>

<script>
import LoginPage from '@/components/Login/login-page'

export default {
	name: 'login',
	components: {
		LoginPage,
	},
	methods: {
		routerBackClick () {
			this.$router.back()
		}
	}
}
</script>
