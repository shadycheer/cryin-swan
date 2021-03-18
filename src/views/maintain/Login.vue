<style scoped>
.container {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(45deg, #f6e58d, #f9ca24);
	transition: 0.4s;
}
</style>

<template>
	<div class="container">
		<SvgIcon svgName="close"></SvgIcon>
		<LoginPage></LoginPage>
	</div>
</template>

<script>
import LoginPage from '@/components/Login/login-page'

export default {
	name: 'login',
	components: {
		LoginPage,
	}
}
</script>
