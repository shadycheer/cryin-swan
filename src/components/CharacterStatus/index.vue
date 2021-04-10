<style lang="less" scoped>
.status-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 270px;
	height: 80px;
	border-radius: 50px;
	border: 5px solid #feca57;

	&__sec-border {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 260px;
		height: 70px;
		border-radius: 60px;
		background: #48dbfb;
		border: 5px solid #ff6b6b;

		&-icon {
			margin-left: 5px;
			width: 60px;
			height: 60px;
			border: 2px solid #f5f6fa;
			background: white;
			border-radius: 50%;
		}
	}

}
</style>

<template>
	<div class="status-container">
		<div class="status-container__sec-border">
			<div class="status-container__sec-border-icon">
			</div>

		</div>
	</div>
</template>

<script>
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'

export default {
	name: 'index',
	data () {
		return {
			info: ''
		}
	},
	methods: {
		matchingData (value) {

		}
	},
	mounted () {
		Observe.$on(EVENT_NAME.transferCharacterData, this.matchingData)
	},
	destroyed () {
	}
}
</script>
