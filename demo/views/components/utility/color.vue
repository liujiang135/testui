<template>
    <w-frame title="颜色类">
        <div id="color">
            <w-list>
                    <li class="item dark">
                        light
                        <span class="color-demo light-bg light-border"></span>
                    </li>
                    <li class="item stable-dark">
                        stable
                        <span class="color-demo stable-bg stable-border"></span>
                    </li>
                    <li class="item positive">
                        positive
                        <span class="color-demo positive-bg positive-border"></span>
                    </li>
                    <li class="item calm">
                        calm
                        <span class="color-demo calm-bg calm-border"></span>
                    </li>
                    <li class="item balanced">
                        balanced
                        <span class="color-demo balanced-bg balanced-border"></span>
                    </li>
                    <li class="item energized">
                        energized
                        <span class="color-demo energized-bg energized-border"></span>
                    </li>
                    <li class="item assertive">
                        assertive
                        <span class="color-demo assertive-bg assertive-border"></span>
                    </li>
                    <li class="item royal">
                        royal
                        <span class="color-demo royal-bg royal-border"></span>
                    </li>
                    <li class="item dark">
                        dark
                        <span class="color-demo dark-bg dark-border"></span>
                    </li>
            </w-list>
        </div>
    </w-frame>
</template>
<script>
    import Frame from '../Frame'
    export default{
        components: {
            'w-frame': Frame
        }
    }
</script>
<style scoped>
.color-demo {
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
        float: right;
        height: 20px;
        width: 20px;
    }
</style>