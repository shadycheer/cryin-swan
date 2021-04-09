<style lang="less" scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC,
	Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;

	h1 {
		color: white;
	}
}
.login-form {
	z-index: 1;
}
.change {
	position: absolute;
	font-size: 24px;
	top: 20px;
	right: 20px;
	cursor: pointer;
	color: white;

	.re-page {
		color: white;
	}
}
.login-form, .register-form {
	position: absolute;
	width: 400px;
	height: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #7ed6df;
	box-shadow: 1px 5px 20px 1px #718093;
	border-radius: 6px;
	transition: 1s cubic-bezier(0.81, -0.4, 0.02, 1.33);
}
.txt-block {
	width: 240px;
	height: 50px;
	background: #ffffff28;
	margin-top: 30px;
	padding: 10px 20px;
	box-sizing: border-box;
	border: 1px solid white;
	color: white;
	outline: none;
	border-radius: 6px;
	text-align: center;
}
.txt-border-useful {
	width: 240px;
	height: 50px;
	background: #ffffff28;
	margin-top: 30px;
	padding: 10px 20px;
	box-sizing: border-box;
	border: 1px solid #2ecc71;
	color: white;
	outline: none;
	border-radius: 6px;
	text-align: center;
}
.txt-border-wrong {
	width: 240px;
	height: 50px;
	background: #ffffff28;
	margin-top: 30px;
	padding: 10px 20px;
	box-sizing: border-box;
	color: white;
	outline: none;
	border-radius: 6px;
	text-align: center;
	border: 1px solid #ff6b6b;
}
.login-btn {
	margin-top: 100px;
	width: 140px;
	height: 50px;
	border-radius: 6px;
	border: 0;
	background-color: #27ae60;
	font-weight: bold;
	color: #bdc3c7;
	cursor: not-allowed;
}
.login-btn-full {
	margin-top: 100px;
	width: 140px;
	height: 50px;
	border-radius: 6px;
	border: 0;
	font-weight: bold;
	color: white;
	background: #2ecc71;
	cursor: pointer;
}
.hide-login-btn, .hide-us-btn {
	position: absolute;
	right: 20px;
	top: 20px;
	color: whitesmoke;
	transition: 0.4s;
	font-size: 30px;
	cursor: pointer;
}
.register-form {
	transform: rotateY(180deg);
}
.re-turn {
	transform: rotateY(0deg);
}
.lo-turn {
	z-index: 0;
	transform: rotateY(-180deg);
}
</style>

<template>
	<div>
		<div class="login-container">
			<div class="login-form" :class="{'lo-turn':toggleClass}">
				<div>
					<h1>GOT IT!</h1>
				</div>
				<input
						v-model="loginUser"
						id="username"
						:class="[colorControl.loginUserInput === '' ?
						'txt-block' : colorControl.loginUserInput ?
						'txt-border-useful': 'txt-border-wrong']"
						type="text"
						name="username"
						placeholder="Username"
						autocomplete="off"
				/>
				<input
						v-model="loginPwd"
						id="password"
						:class="[colorControl.loginPwdInput === '' ?
						'txt-block' : colorControl.loginPwdInput ?
						'txt-border-useful': 'txt-border-wrong']"
						type="password"
						name="username"
						placeholder="Password"
						autocomplete="off"
				/>
				<input
						id="login"
						:class="[colorControl.loginUserInput && colorControl.loginPwdInput ? 'login-btn-full' : 'login-btn']"
						type="submit"
						name="sub"
						value="Login"
						@click="loginBtnClick"
						:disabled="!colorControl.loginUserInput && !colorControl.loginPwdInput"
				/>
				<div class="change lo-page" @click="togglePage">1</div>
			</div>
			<div class="register-form" :class="{'re-turn':toggleClass}">
				<div>
					<h1>REGISTER</h1>
				</div>
				<input
						v-model="registerUser"
						id="sign-name"
						:class="[colorControl.registerUserInput === '' ?
						'txt-block' : colorControl.registerUserInput ?
						'txt-border-useful': 'txt-border-wrong']"
						type="text"
						name="username"
						placeholder="Username"
						autocomplete="off"
				/>
				<input
						v-model="registerPwd"
						id="sign-pwd"
						:class="[colorControl.registerPwdInput === '' ?
						'txt-block' : colorControl.registerPwdInput ?
						'txt-border-useful': 'txt-border-wrong']"
						type="password"
						name="username"
						placeholder="Password"
						autocomplete="off"
				/>
				<input
						v-model="registerRepeat"
						id="pwd-repeat"
						:class="[colorControl.registerRepeatInput === '' ?
						'txt-block' : colorControl.registerRepeatInput ?
						'txt-border-useful': 'txt-border-wrong']"
						type="password"
						name="username"
						placeholder="Repeat Password"
						autocomplete="off"
				/>
				<input
						id="signup"
						:class="[colorControl.registerUserInput && colorControl.registerPwdInput && colorControl.registerRepeatInput ? 'login-btn-full' : 'login-btn']"
						type="submit"
						name="sub"
						value="Register"
						@click="registerBtnClick"
						:disabled="!colorControl.registerUserInput && !colorControl.registerPwdInput && colorControl.registerRepeatInput"
				/>
				<div class="change re-page" @click="togglePage">1</div>
			</div>
		</div>
	</div>
</template>

<script>
import Utils from '@/common/utils'
import { COLOR_CONTROL } from '@/config'
import { loginService } from '@/api/login-service'
import { Notification } from 'element-ui'
import { MsgBoxMixin } from '@/mixins'

let debounce = Utils.debounce(500)

export default {
	name: 'LoginPage',
	mixins: [MsgBoxMixin],
	data () {
		return {
			colorControl: { ...COLOR_CONTROL },
			toggleClass: false,
			loginUser: '',
			loginPwd: '',
			registerUser: '',
			registerPwd: '',
			registerRepeat: '',
		}
	},
	watch: {
		loginUser (val) {
			debounce(() => {
				console.log(val)
				this.colorControl.loginUserInput = !!(val && val.trim())
			})
		},
		loginPwd (val) {
			this.colorControl.loginPwdInput = !!(val && val.trim())
		},
		registerUser (val) {
			if (val && val.trim()) {
				debounce(() => {
					this.checkUsernameIsAvailable(val)
				})
			} else {
				this.colorControl.registerUserInput = false
			}
		},
		registerPwd (val) {
			if (val && val.trim()) {
				this.colorControl.registerPwdInput = !(this.registerRepeat && val !== this.registerRepeat)
			} else {
				this.colorControl.registerPwdInput = false
			}
		},
		registerRepeat (val) {
			if (val && val.trim()) {
				this.registerRepeat === this.registerPwd ?
						this.colorControl.registerRepeatInput = true :
						this.colorControl.registerRepeatInput = false
			} else {
				this.colorControl.registerRepeatInput = false
			}
		}
	},
	methods: {
		async checkUsernameIsAvailable (username) {
			const res = await loginService.checkUsernameIsAvailable(username)
			if (res.status === false) {
				this.popError()
			} else {
				this.popSuccess()
			}
			this.colorControl.registerUserInput = res.status
		},
		togglePage () {
			this.toggleClass = !this.toggleClass
		},
		async loginBtnClick () {
			const res = await loginService.userLogin(this.loginUser, this.loginPwd)
			await this.$_openLoginMessage(res)
		},
		async registerBtnClick () {
			const res = await loginService.userRegister(this.registerUser, this.registerPwd)
			this.$_openRegisterMessage(res.status)
		},
		popError () {
			Notification({
				position: 'top-right',
				duration: 3000,
				type: 'error',
				title: 'ERROR!',
				message: '用户名已被注册'
			})
		},
		popSuccess () {
			Notification({
				position: 'top-right',
				duration: 3000,
				type: 'success',
				title: 'SUCCESS!',
				message: '该用户名可用',
			})
		}
	}
}
</script>
