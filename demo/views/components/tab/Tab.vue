<template>
    <w-frame title="选项卡">
        <div id="tab">
            <w-tab :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick" position="top" ></w-tab>
            <div style="padding:55px 15px;">
                <h3>属性</h3>
                <h4>:tab-items</h4>
                <p class="p-sub-item">绑定选项卡内容，是个数组，例如["tab 1","tab 2","tab 3"]</p>
                <h4>:tab-index</h4>
                <p class="p-sub-item">绑定当前选中的选项卡,例如可以给初始值1</p>
                <h4>:on-tab-click</h4>
                <p class="p-sub-item">绑定点击选项卡的方法，接受一个index参数，获取点击选项卡的index下标</p>
                <h4>position</h4>
                <p class="p-sub-item">选中卡的位置，可以设置为bottom ,top</p>
                <h4>bg-color</h4>
                <p class="p-sub-item">背景颜色，可以设置的值为：assertive, positive, balanced, energized, calm, royal, dark, light, clear</p>
                <h4>tab-color</h4>
                <p class="p-sub-item">设置字体颜色,可是设置的值为:assertive, positive, balanced, energized, calm, royal, dark, light, clear</p>
            </div>
        </div>
    </w-frame>
</template>
<script>
    import Frame from '../Frame'
    export default{
        data:function(){
            return {
                tabs:[
                    "tab 1",
                    "tab 2",
                    "tab 3"],
                tabIndex:1
            }
        },
        methods:{
            onTabClick:function(index){
                console.log(index);
                this.tabIndex = index;
            }
        },
        components: {
            'w-frame': Frame
        }

    }
</script>