<style lang="less" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	background: #00a8ff;
	border: 10px solid #fdcb6e;
	border-radius: 50px;
	color: white;
	font-family: '.AppleSystemUIFontMonospaced', sans-serif;
	width: 500px;
	height: 100px;
}
</style>

<template>
	<div class="container" v-if="textAreaShow">
		{{ textArray[index] }}
	</div>
</template>

<script>
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import Utils from '@/common/utils'

export default {
	name: 'index',
	data () {
		return {
			index: 0,
			keyboard: {
				w: false,
				a: false,
				s: false,
				d: false
			},
			keyboardContinue: true,
			textAreaShow: false,
			textArray: [
				'欢迎来到threejs的世界！',
				'试着使用WSAD进行前后左右移动吧！',
				'使用鼠标左键可以更改视角',
				'注意, 有一些小小英雄是无法进行冲刺和跳跃的',
				'如果你掉落出平面的话，就会减去你的血量',
				'当你的血量为0时，游戏结束',
				'请小心驾驶！',
				'并尝试更换角色去冲击别的关卡吧！',
				'现在, 地图上已经出现了终点, 试着和他触碰吧！'
			]
		}
	},
	methods: {
		textAreaShowTime () {
			this.textAreaShow = !this.textAreaShow
			let timer = setTimeout(() => {
				this.index++
				Utils.clearTimerOut(timer)
			}, 3000)
			this.monitorKeyBoard()
		},
		monitorKeyBoard () {
			const onKeyDown = (event) => {
				switch (event.keyCode) {
					case 87: // w
						this.keyboard.w = true
						break
					case 65: // a
						this.keyboard.a = true
						break
					case 83: // s
						this.keyboard.s = true
						break
					case 68: // d
						this.keyboard.d = true
						break
				}
				this.judgeKeyboard()
			}
			window.addEventListener('keydown', onKeyDown, false)
		},
		checkOutKeyBoard () {
			if (this.keyboard.w && this.keyboard.a && this.keyboard.s && this.keyboard.d) {
				let timer = setInterval(() => {
					if (this.index === 7) {
						Utils.clearTimerInterval(timer)
						this.initDoorText()
					}
					this.index++
				}, 3000)
			}
		},
		judgeKeyboard () {
			if (this.keyboard.w && this.keyboard.a && this.keyboard.s && this.keyboard.d && this.keyboardContinue) {
				this.checkOutKeyBoard()
				this.keyboardContinue = false
			}
		},
		initDoorText () {
			Observe.$emit(EVENT_NAME.initDoorStart)
		}
	},
	mounted () {
		Observe.$on(EVENT_NAME.textShowStart, this.textAreaShowTime)
	},
	destroyed () {
		Observe.$off(EVENT_NAME.textShowStart, this.textAreaShowTime)
	}
}
</script>
