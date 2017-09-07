<template>
	<div class="action-sheet-backdrop" :class="{'active': state == 1}" >
    <div class="action-sheet-wrapper" :class="{'action-sheet-up': state == 1}">
      <div class="action-sheet">
        <div class="action-sheet-group">
          <div class="action-sheet-title">
            <span v-text="title">标题</span>
          </div>
          <button class="button action-sheet-option"
            v-for="(b, index) in buttons" @click="hide(index)">
            <div class="hairline-top" v-if="index == 0"></div>
            <span :style="b.color ? 'color: ' + b.color : ''" v-text="b.text"></span>
            <div class="hairline-bottom"></div>
          </button>
        </div>

        <div class="action-sheet-group action-sheet-cancel">
          <button class="button" @click="hide(-1)" v-text="cancelText"></button>
        </div>
      </div>
    </div>
  </div>	
	
</template>

<script>
	
	export default{
		name:'w-actionsheet',
		data() {
			return {
				title: '标题',
        buttons: [{text:"按钮1", color: "red", callback: function(){
          //按钮1的点击事件
        }},{text:"按钮2", color: "blue", callback: function(){
          //按钮2的点击事件
        }}],
        cancelText: '取消',
        state: 0
      }
    },
	    
	  mounted() {
      this.$el.setAttribute('von-action-sheet', '')
    },
    destroyed() {
      document.body.removeChild(this.$el)
    },
    methods: {
/*      _buttonList(buttons) {
        let buttonList = []
        for (let b in buttons) {
          buttonList.push({
            text: b,
            callback: buttons[b]
          })
        }
        return buttonList
      },*/

      show(options) {
        this.title = options.title;
//        this.buttons = this._buttonList(options.buttons);
        this.buttons = options.buttons || [];
        this.cancelText =options.cancelText;
        this.state = 1;

        document.body.addEventListener('touchmove',function(e){
        	e.preventDefault()
        })
      },

      hide(buttonIndex) {
        this.state = 0;

        document.body.removeEventListener('touchmove',function(e){
        	  e.preventDefault()
        });

        if (buttonIndex > -1) {
          this.buttons[buttonIndex].callback();
        }

        let wrapper = document.querySelector('[von-action-sheet] > .action-sheet-wrapper');
        if(!!wrapper)
        {
        	 wrapper.addEventListener('webkitTransitionEnd', () => {
	          this.$destroy()
	        }, false)
        }
       
      },

      getState() {
        return this.state
      }
     
    },
    
	}
</script>
