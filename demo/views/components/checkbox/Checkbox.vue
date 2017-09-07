<template>
    <w-frame title="复选框">
        <div id="checkbox" class="component-body">
            <h3>属性</h3>
            <h4>:options</h4>
            <p class="p-sub-item">传入的选项列表，以{id:'',name:''}键值对传入</p>
            <h4>chosenTopics</h4>
            <p class="p-sub-item">绑定value，被选中的输入列表 例如:v-model="chosenTopics" chosenTopics:[]</p>
            <h4>theme</h4>
            <p class="p-sub-item">选中状态的表示样式[positive,assertive,balanced,energized,calm,royal,dark]</p>

            <w-checkbox :options="topics" v-model="chosenTopics" theme="positive"></w-checkbox>
            <p>{{chosenTopics}}</p>
        </div>
    </w-frame>
</template>
<script>
    import Frame from '../Frame'
    export default{
        data:function(){
            return {
                chosenTopics: [],
                topics: [{id:"a",name:"娱乐"},{id:"b",name:"电影"},{id:"c",name:"减肥"},{id:"d",name:"搞笑"},{id:"e",name:"科技"}],
            }
        },
        components: {
            'w-frame': Frame
        }
    }
</script>