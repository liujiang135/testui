<template>
    <w-frame title="搜索框">
        <div id="search" class="component-body">
            <h3>属性</h3>
            <h4>value:</h4>
            <p class="p-sub-item"> 输入的搜索值</p>
            <h4>:on-search</h4>
            <p class="p-sub-item">绑定搜索操作方法回车触发这个搜索方法</p>
            <h4>:on-cancel</h4>
            <p class="p-sub-item">绑定清空输入框方法</p>
            <h4>cancel-text</h4>
            <p class="p-sub-item">清空按钮文本内容</p>

            <w-search v-model="keywords" :on-search="onSearch" :on-cancel="onCancel" placeholder="搜索" cancel-text="清空"></w-search>
        </div>
    </w-frame>
</template>
<script>
    import Frame from '../Frame'
    export default{
        data:function(){
            return {
                keywords:'',
            }
        },
        components: {
            'w-frame': Frame
        },
        methods:{
            onSearch:function(){

            },
            onCancel:function(){
                this.keywords = '';
            }
        }
    }
</script>