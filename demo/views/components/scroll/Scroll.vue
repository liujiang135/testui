<template>
    <w-frame title="下拉刷新/上拉加载">
        <div id="scroll">
            <h3>属性</h3>
            <h4>:offset</h4>
            <p class="p-sub-item">下拉和上拉的距离</p>
            <h4>:on-refresh</h4>
            <p class="p-sub-item">下拉刷新回调函数，接受一个fn参数，下拉完成后执行fn(),初始化样式</p>
            <h4>:on-infinite</h4>
            <p class="p-sub-item">上拉加载回调函数，接受一个fn参数，上拉完成后执行fn(),初始化样式</p>
            <w-scroll class="page-content"
                      :on-refresh="onRefresh"
                      :on-infinite="onInfinite" :offset="offset" style="top:269px">
                <div v-for="(item, index) in items" @click="onItemClick(index)"
                     class="item thin-border" :class="{'item-stable': index % 2 == 0}">
                    {{ item }}
                </div>
                <div v-if="infiniteCount>=allCount" slot="infinite" class="text-center">没有更多数据</div>
            </w-scroll>
        </div>
    </w-frame>
</template>
<script>
    import Frame from '../Frame'
    export default{
        data(){
            return{
                items:[],
                infiniteCount:0,
                allCount:3,
                offset:44,
                top:1,
                bottom:20
            }
        },
        mounted() {
            for (let i = 1; i <= 20; i++) {
                this.items.push(i + ' - keep walking, be 2 with you.')
            }
        },
        methods:{
            onRefresh:function(fn){
                //下拉
                var that=this;
                setTimeout(function(){
                    let start = that.top - 1
                    for (let i = start; i > start - 10; i--) {
                        that.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
                    }
                    that.top = that.top - 10;
                    fn()
                },150)
             },
            onInfinite:function(fn){
                var that=this;
                setTimeout(function(){
                    if (that.infiniteCount <that.allCount) {
                        var start = that.bottom + 1;
                        for (var i = start; i < start +5; i++) {
                            that.items.push(i+' - keep walking, be 2 with you.');
                        }
                        that.bottom = that.bottom + 5;
                        that.infiniteCount++;
                    }
                    fn()
                },1500)
            },
            onItemClick:function(index){
                console.log(index);
            }
        },
        components: {
            'w-frame': Frame
        }
    }
</script>