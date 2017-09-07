const popup_enter_duration = 200
const popup_leave_duration = 300

const extend = (target, source) => {
  for (let key in source) {
    target[key] = source[key];
  }

  return target
}

export default {
  destroyed() {
    console.log('[Wingconn] dialog destroyed.');
    let parent = this.$el.parentNode;
    parent.removeChild(this.$el);
  },

  methods: {
    show(options) {
      extend(this, options);

      if ($backdrop.getState() == 0){
        $backdrop.show();
      }

      this.state = 1;

      this.promise = new Promise((resolve, reject) => {
        this.$on('AlertOkEvent', (callback) => {
          if(callback != undefined){
            let returnValue = callback();
            if((typeof returnValue).toLowerCase() != 'boolean'){
              console.error('the function "callback" belongs to "okButton" must return Boolean type !');
              return;
            }else if(returnValue != true){
              console.warn('the function "callback" belongs to "okButton" must return true, but return false !');
              return;
            }
          }
          // console.log('AlertOkEvent');
          this.hide();
          resolve();
        });
      });

      document.body.classList.add('popup-open');

      return this.promise;
    },

    hide() {
      if (document.querySelectorAll('[wingconn-dialog]').length == 1)  { // 只剩最后一个dialog实例的时候，backdrop才隐藏
        $backdrop.hide();
        document.body.classList.remove('popup-open');
      }

      this.state = 2;

      setTimeout(() => {
        this.state = 0;
        this.$destroy();
      }, popup_leave_duration);
    },

    onOk() {
      let callback = this.okButton.callback;
      if(callback != undefined && (typeof callback).toLowerCase() != 'function'){
        console.error('the attribute "callback" belongs to "okButton" must be a function !');
        return;
      }
      this.$emit('AlertOkEvent', callback);
    }
  }
}
