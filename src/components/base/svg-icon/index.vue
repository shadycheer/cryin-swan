<style lang="less">
.svg-icon {
	fill: currentColor;
	overflow: hidden;
}
</style>

<template>
	<svg :class="svgClass" aria-hidden="true" :width="width" :height="height">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
const requireAll = requireContext => {
	return requireContext.keys().map(requireContext)
}
const req = require.context('../../../assets/svg', false, /\.svg$/)
requireAll(req)
export default {
	name: 'index',
	props: {
		svgName: {
			type: String,
			required: true
		},
		className: {
			type: String
		},
		width: {
			type: String,
			default: '14px'
		},
		height: {
			type: String,
			default: '14px'
		},
		type: {
			type: String,
			default: ''
		}
	},
	computed: {
		iconName () {
			return `#svg-${this.svgName}`
		},
		svgClass () {
			return `svg-icon svg-${this.svgName} ${this.className || ''}`
		}
	}
}
</script>
