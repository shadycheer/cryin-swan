<style lang="less" scoped>
.container {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	flex-direction: row;
	font-family: 'AppleSystemUIFontMonospaced', sans-serif;
	align-items: center;
	background: #2a2a2a;

	&__svgIcon {
		position: absolute;
		color: white;
		left: 98%;
		top: 5%;
		transform: translate(-2%, -95%);
		cursor: pointer;
	}

	&__img {
		margin-right: 300px;
	}

	&__text {
		display: flex;
		justify-items: center;
		align-items: center;
		color: white;
		flex-direction: column;
		height: 230px;
		overflow: hidden;

		p {
			display: flex;
			justify-content: center;
			animation: shuffling 15s linear forwards;
		}
	}
}

@keyframes shuffling {
	100% {
		transform: translateY(-235px);
	}
}
</style>

<template>
	<div class="container">
		<div class="container__svgIcon" @click="routerBackClick()">
			<SvgIcon svgName="close" width="24px" height="24px"></SvgIcon>
		</div>
		<div class="container__img">
			<img :src="shufflingImg" alt="" width="400px">
		</div>
		<div class="container__text">
			<div>
				<p>前端框架: Vue</p>
				<p>WebGL框架: Three.js</p>
				<p>物理引擎: Physi.js</p>
				<p>后台框架: Java SpringBoot</p>
				<p>模型工具: Maya</p>
				<p>游戏策划: 戚桐桐</p>
				<p>前端架构: 黄非凡</p>
				<p>物理引擎: 蔡坡峰</p>
				<p>后台开发: 杨潇童</p>
				<p>模型制作: 吴淑君</p>
			</div>
		</div>
	</div>
</template>

<script>
import Utils from '@/common/utils'

export default {
	name: 'AboutUs',
	data () {
		return {
			index: 0,
			imgName: ['vue.jpeg', 'threejs.png', 'physijs.jpeg', 'springboot.jpeg', 'maya.jpeg']
		}
	},
	computed: {
		shufflingImg () {
			return '/../../../img/logo/' + this.imgName[this.index]
		}
	},
	methods: {
		routerBackClick () {
			this.$router.back()
		},
		imgChange () {
			let timer = setInterval(() => {
				if (this.index === 3) {
					Utils.clearTimerInterval(timer)
				}
				this.index++
			}, 3000)
		}
	},
	mounted () {
		this.imgChange()
	}
}
</script>
