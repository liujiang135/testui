<template>
	<w-frame title="弹出框" class='title'>
		<div>
			<w-button class='btn w-popup-2' @click.native="popupVisible2 = true">右侧弹出</w-button>
			<w-button class='btn w-popup-2' @click.native="popupVisible4 = true">下侧弹出</w-button>
			
			<w-popup v-model="popupVisible2" position="right" class="mint-popup-2" :modal="false">
				<w-button class='close' @click.native="popupVisible2 = false">关闭popup</w-button>
			</w-popup>
			<w-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
				<w-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false" ></w-picker>
			</w-popup>
		</div>
	</w-frame>
</template>

<script>
	import Frame from '../Frame'
	export default {
		components: {
			'w-frame': Frame
		},
		data() {
			return {
				popupVisible2: false,
				popupVisible4: false,
				dateSlots: [{
					flex: 1,
					values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
					className: 'slot1',
					textAlign: 'right'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
					className: 'slot3',
					textAlign: 'left'
				}]
			}
		},
		watch: {

		},
		methods: {
			onDateChange: function() {

			}
		}
	}
</script>

<style scoped>
	.btn {
		color: #656b79;
		background-color: #f6f8fa;
		box-shadow: 0 0 1px #b8bbbf;
		width: 100%;
		margin-top: 10px;
	}
	 .mint-popup-2 {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }

      .mint-popup-2 .close {
        position: absolute;
        width: 90%;
        top: 50%;
        left: 5%;
        transform: translateY(-50%);
        background-color: #26a2ff;
        color: white;
      }
	.mint-popup-4{
		width: 100%;
	}
</style>