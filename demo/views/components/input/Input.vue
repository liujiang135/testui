<template>
    <w-frame title="input输入框">
        <div id="input" class="component-body">
            <h3>属性</h3>
            <h4>value:</h4>
            <p class="p-sub-item">输入框的值</p>
            <h4>type:</h4>
            <p class="p-sub-item">输入框类型text,password,email,tel </p>
            <h4>label:</h4>
            <p class="p-sub-item">输入框右边输入类型</p>
            <h4>placeholder:</h4>
            <p class="p-sub-item">要输入类型值</p>

            <h3>带标签</h3>
            <w-input label="用户名" type="text" v-model="username" placeholder="输入用户名"></w-input>
            <w-input label="密码" type="password" v-model="useremail" placeholder="输入密码"></w-input>
            <h3>不带标签</h3>
            <w-input type="text" v-model="username" placeholder="输入用户名"></w-input>
            <w-input type="password" v-model="useremail" placeholder="输入密码"></w-input>

        </div>
    </w-frame>
</template>
<script>
    import Frame from '../Frame'
    export default{
        data:function(){
            return {
                username:'',
                useremail:''
            }
        },
        components: {
            'w-frame': Frame
        }
    }
</script>