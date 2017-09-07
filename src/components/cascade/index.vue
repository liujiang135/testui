<template>
   <div class="list-ios von-cascade">
    <label v-for="(f, index) in fields"
           class="item item-ios item-icon-right"
           @click="showCascadePanel(index)">
      <span v-text="f"></span>
      <i class="icon ion-ios-arrow-right"></i>
      <span class="item-note" v-text="value[index]"></span>
    </label>
  </div>
</template>
<style  scoped>
  .von-cascade {
    padding-left: 16px;
    background: #FFF;

  }
  .item-icon-right {
    font-size: 14px;
    line-height: 14px;
    color: #444;
    min-height: 50px;
    padding-left: 0;
    padding-right: 54px;
    border-width: 0px;
    position: relative;
    margin: 0px;
   }
   .item-icon-right:after{content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
     transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
  .icon {
        color: #DDD;
      }
</style>
<script>
  import Vue from 'vue'
  import channel from './channel'

   const filter = (filters, data) => {
    let options = []

    data.forEach((d) => {
      let r = true
      filters.forEach((f, i) => {
        r = r && f == d[i]
      })
      if (r) {
        let option = d[filters.length]

        if (!!option && options.indexOf(option) == -1) {
          options.push(option)
        }
      }
    })

    return options
  }

  export default {
	name:'w-cascade',
    props: {
      fields: {
        type: Array,
        required: true
      },

      ajaxUrl: {
        type: String,
        default: undefined
      },

      ajaxData: {
        type: String,
        default: undefined
      },

      data: {
        type: Array
      },

      value: {
        type: Array,
        required: true
      },

      onChange: {
        type: Function,
        required: true
      }
    },

    data() {
      return {
        options: []
      }
    },

    mounted() {
    
        this.options = this.filter()
      
    },

    methods: {
      showCascadePanel(index) {
        let v = this.value, f = this.fields

        if (index > v.length) {
//      	console.log(index);
//        channel.$emit('VonicNotification', {
//          message: '请先选择' + f[index - 1]
//        })
		this.hint("请先选择"+f[index - 1]);
          return
        }

        let title = f[index]
        let options = this.filter(index)
        // console.log('show cascade panel =>', title, options)

        $cascadePanel
          .show(title, options)
          .then((optionIndex) => {
            if (optionIndex == -1) return

            this.value.splice(index, 1, options[optionIndex])
            this.resetDown(index)

            this.onChange(this.value)
          })
      },

      filter(index) {
        let filters = [];
        for (let i = 0; i < index; i++) filters.push(this.value[i])
        return filter(filters, this.data)
      },

      resetDown(index) {
        let len = index + 1
        this.value.splice(len, this.value.length - len)
      },
      hint:function(message){
			$toast.show(message, 1000).then(function(){
	         
	        });
		},
    }
  }
</script>
