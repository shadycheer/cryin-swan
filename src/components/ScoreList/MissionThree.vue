<style lang="less" scoped>
.container {
	width: 100%;
	height: 700px;
	overflow-y: scroll;
	font-family: '.AppleSystemUIFontMonospaced', sans-serif;

	&__text {
		margin-left: 10px;
		color: white;
	}

	&__data {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background: #ff6b6b;
		border: 1px solid orange;
		border-radius: 10px;
		margin-left: 4px;
		margin-right: 4px;

		&-myself-rank {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-border {
			margin-left: 30px;
			background: black;
			height: 40px;
			width: 4px;
		}

		&-myself-name {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;

			p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-wrap: normal;
			}
		}

		&-myself-character {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-myself-img {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			margin-left: 50px;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: #fdcb6e;

			img {

			}
		}

		&-myself-time {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-right: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}
	}

	&__all-data {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		background: #74b9ff;
		border: 1px solid orange;
		border-radius: 10px;
		margin-left: 4px;
		margin-right: 4px;

		&-rank {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-border {
			margin-left: 30px;
			background: black;
			height: 40px;
			width: 4px;
		}

		&-name {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 200px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;

			p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-wrap: normal;
			}
		}

		&-character {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-left: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}

		&-img {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			margin-left: 50px;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: #fdcb6e;

			img {

			}
		}

		&-time {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-family: '.AppleSystemUIFontMonospaced', sans-serif;
			margin-right: 50px;
			width: 400px;
			height: 40px;
			border-radius: 5px;
			background: #fdcb6e;
		}
	}
}
</style>

<template>
	<div class="container">
		<div class="container__text">
			我的排名
		</div>
		<div class="container__data">
			<div class="container__data-myself-rank">
				3
			</div>
			<div class="container__data-border">
			</div>
			<div class="container__data-myself-name">
				<p>用户名:123321312312312312</p>
			</div>
			<div class="container__data-myself-character">
				使用角色: 小糖人
			</div>
			<div class="container__data-myself-img">
				<img src="" alt="">
			</div>
			<div class="container__data-myself-character">
				总用时: 180秒
			</div>
		</div>
		<div style="margin-top: 10px">
			<div class="container__text">
				总排名
			</div>
			<template v-for="(item, index) in 100">
				<div class="container__all-data">
					<div class="container__all-data-rank">
						{{ index + 1 }}
					</div>
					<div class="container__all-data-border">
					</div>
					<div class="container__all-data-name">
						<p>用户名:123321312312312312</p>
					</div>
					<div class="container__all-data-character">
						使用角色: 小糖人
					</div>
					<div class="container__all-data-img">
						<img src="" alt="">
					</div>
					<div class="container__all-data-character">
						总用时: 180秒
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MissionThree'
}
</script>
