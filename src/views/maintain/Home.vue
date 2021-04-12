<style lang="less" scoped>
* {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
	Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.container {
	position: absolute;
	overflow: hidden;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100vh;
	background: black;
}

.menubar {
	position: absolute;

	.show-login-page, .show-us-page {
		background: #fbc531;
		border: 1px solid white;
	}
}

.hide-login-btn:hover, .hide-us-btn:hover {
	transform: rotate(360deg);
}

.main {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 100vh;
}

.show-login-page {
	width: 100px;
	text-align: center;
	border: 1px solid white;
	color: white;
	font-size: 12px;
	padding: 10px;
	cursor: pointer;
}

.show-us-page {
	text-align: center;
	margin-top: 20px;
	width: 100px;
	border: 1px solid white;
	color: white;
	font-size: 12px;
	padding: 10px;
	cursor: pointer;
}

.show-login-page:hover, .show-us-page:hover {
	background: white;
	color: black;
}

.showed-us {
	right: 0;
}

a {
	text-decoration: none;
}


</style>
<template>
	<div>
		<div class="container">
			<div class="main">
				<video
						src=""
						width="100%"
						autoplay muted
				>
				</video>
				<div class="menubar">
					<div class="show-login-page" @click="loginBtnClick">
						登录
					</div>
					<div class="show-us-page" @click="aboutUsBtnClick">
						关于我们
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LoginPage from '@/components/Login/login-page'
import { MAINTAIN_ROUTE_NAME } from '@/router/constant'

export default {
	data () {
		return {
			isActive: false
		}
	},
	components: {
		LoginPage
	},
	methods: {
		loginBtnClick () {
			this.$router.push({ name: MAINTAIN_ROUTE_NAME.Login })
		},
		aboutUsBtnClick () {
			this.$router.push({ name: MAINTAIN_ROUTE_NAME.AboutUs })
		}
	},
}
</script>
