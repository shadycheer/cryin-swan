<style lang="less" scoped>
.status-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 270px;
	height: 80px;
	border-radius: 50px;
	box-shadow: 1px 5px 20px 1px #718093;
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

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				object-fit: cover;
			}
		}

		&-text {
			display: flex;
			flex-flow: column wrap;

			span {
				color: white;
				font-family: 'ken_pixel', serif;
			}

			&--style {
				margin-top: 2px;
				margin-bottom: 2px;
			}
		}
	}

}
</style>

<template>
	<div class="status-container">
		<div class="status-container__sec-border">
			<div class="status-container__sec-border-icon">
				<img :src="locationInfo + info.characterId + '.png'" alt="">
			</div>
			<div class="status-container__sec-border-text">
				<div class="status-container__sec-border-text--style">
					<span style="margin-left: 10px">
						HP:
					<SvgIcon style="margin-left: 4px" svg-name="heart" v-for="(item, index) of info.health"
									 :key="item + '_' + index"></SvgIcon>
					</span>
				</div>
				<div class="status-container__sec-border-text--style">
					<span style="margin-left: 10px">
						DP:
						<SvgIcon style="margin-left: 4px" svg-name="dash" v-for="(item, index) of info.dash"
										 :key="item + '_' + index"></SvgIcon>
					</span>
				</div>
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
			info: {
				characterId: 0,
				dash: 0,
				health: 0
			}
		}
	},
	computed: {
		locationInfo () {
			return '/../../../img/picLogo/'
		}
	},
	methods: {
		matchingData (value) {
			this.info = value
			console.log(this.info)
		},
		updateHealth (bool) {
			bool ? this.info.health++ : this.health.dash--
		},
		updateDash (bool) {
			bool ? this.info.dash++ : this.info.dash--
		}
	},
	mounted () {
		Observe.$on(EVENT_NAME.transferCharacterData, this.matchingData)
		Observe.$on(EVENT_NAME.updateHealth, this.updateHealth)
		Observe.$on(EVENT_NAME.updateDash, this.updateDash)
	},
	destroyed () {
		Observe.$off(EVENT_NAME.transferCharacterData, this.matchingData)
		Observe.$off(EVENT_NAME.updateHealth, this.updateHealth)
		Observe.$off(EVENT_NAME.updateDash, this.updateDash)
	}
}
</script>
