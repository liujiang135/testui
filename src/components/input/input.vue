<template>
    <label class="item item-input thin-border w-input">
        <span v-if="label != ''" class="input-label"
              v-text="label">
        </span>

        <input :type="type" :placeholder="placeholder" ref="input"
               :value="value" @keyup="updateValue($event.target.value)">

        <span class="input-clear ion-close-circled" :class="{'active':showClearButton}" @click="clear"></span>
    </label>
</template>
<script>
export default{
    name:'w-input',
    props:{
        type:{
            type:String,
            default: 'text'
        },
        label:{
            type:String,
            default:''
        },
        placeholder: {
            type: String,
            default: ''
        },
        value:{
            type: [String, Number],
        }
    },
    data:function(){
        return {
            showClearButton: false
        }
    },
    methods:{
        clear:function(){
            this.$refs.input.value = ''
            this.$emit('input', '')
            this.showClearButton = false
        },
        updateValue:function(value){
            this.$refs.input.value = value;
            this.$emit('input', value);
        }
    },
    watch:{
        value:function (newValue) {
            this.showClearButton = !!newValue;
        }
    }
}
</script>
<style>
</style>