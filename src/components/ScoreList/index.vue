<style lang="less" scoped>
.border-container {
	position: absolute;
	background: #fdcb6e;
	width: 80%;
	height: 800px;
	border-radius: 10px;
	box-shadow: 1px 5px 20px 1px #718093;
	z-index: 10000;
	transition: 0.5s;

	&__title {
		width: 100%;
		margin-left: 98%;
		margin-top: 1%;
		color: white;
	}

	&__score {
		background: transparent;


	}

	&__mission {
		background: #fdcb6e;
		width: 100%;
		height: 700px;
	}
}

.svg-class {
	width: 20px;
	height: 20px;
	cursor: pointer;
}

</style>

<template>
	<el-collapse-transition>
		<div class="border-container">
			<div class="border-container__title">
				<SvgIcon class="svg-class" svg-name="close" @click.native="closeBtnClick">
				</SvgIcon>
			</div>
			<div class="border-container__score">
				<el-tabs type="card" v-model="activeName">
					<el-tab-pane label="全部成绩" name="all">
						<div class="border-container__mission">
								<MissionAll></MissionAll>
						</div>
					</el-tab-pane>
					<el-tab-pane label="第一关成绩" name="first">
						<div class="border-container__mission">
								<MissionOne></MissionOne>
						</div>
					</el-tab-pane>
					<el-tab-pane label="第二关成绩" name="second">
						<div class="border-container__mission">
								<MissionTwo></MissionTwo>
						</div>
					</el-tab-pane>
					<el-tab-pane label="第三关成绩" name="third">
						<div class="border-container__mission">
								<MissionThree></MissionThree>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</el-collapse-transition>
</template>

<script>
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'

const MissionOne = () => import('@/components/ScoreList/MissionOneList')
const MissionTwo = () => import('@/components/ScoreList/MissionTwoList')
const MissionThree = () => import('@/components/ScoreList/MissionThreeList')
const MissionAll = () => import('@/components/ScoreList/MissionAllList')
export default {
	name: 'index',
	data () {
		return {
			activeName: 'all'
		}
	},
	components: {
		MissionOne,
		MissionTwo,
		MissionThree,
		MissionAll
	},
	methods: {
		closeBtnClick () {
			Observe.$emit(EVENT_NAME.showScoreList)
		},
	}
}
</script>
