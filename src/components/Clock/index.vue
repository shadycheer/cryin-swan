<template>
	<div class="timer" :style="{height:height+'px',width:width+'px',fontSize:fontsize+'px'}">
		<div>{{ time }}s</div>
	</div>
</template>

<script>
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'

export default {
	name: 'index',
	mounted () {
		this.start()
	},
	props: {
		width: {
			type: Number,
			default: 70
		},
		height: {
			type: Number,
			default: 70
		},
		fontsize: {
			type: Number,
			default: 20
		}
	},
	data () {
		return {
			time: 0,
			index: 0,
			requestAnimationFrameValue: null
		}
	},
	methods: {
		// 渲染
		render () {
			if (this.index) {
				if (this.index % 120 === 0) {
					this.time++
				}
			}
			this.index++
		},
		// 开始
		start () {
			this.render()
			this.requestAnimationFrameValue = requestAnimationFrame(this.start)
		},
		// 暂停
		stop () {
			window.cancelAnimationFrame(this.requestAnimationFrameValue)
			this.requestAnimationFrameValue = null
			Observe.$emit(EVENT_NAME.gameFinishTime, this.getTime())
		},
		// 返回时间
		getTime () {
			return this.time
		},
		beforeDestroy () {
			cancelAnimationFrame(this.start)
		}
	}

}
</script>

<style scoped>
.timer {
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: cornflowerblue;
	color: azure;
	border-radius: 10px;
}
</style>
