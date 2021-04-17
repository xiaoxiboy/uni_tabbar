<template>
	<view class="content">h
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
    <mytabbar bcolor="#1cd66c" :selindex=0 :uniqueindex=1 :tabbarlist="$tabbarlist"></mytabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
        }
    },
		onLoad() {
		},
		methods: {

		}
	}
</script>

<style>
	.content {
    height: 100vh;
    background-color: #007AFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
