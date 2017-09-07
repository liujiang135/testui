<template>
    <w-frame title="图标">
        <!--icon-->
        <div id="icon" class="component-body">
            <h3>属性</h3>
            <h4>type</h4>
            <p class="p-sub-item">图标的类型</p>
            <h4>color</h4>
            <p class="p-sub-item">图片颜色【assertive, positive, balanced, energized, calm, royal, dark, light, clear】</p>
            <p>
                <w-icon type="home" color="assertive" size="29"></w-icon>
                <w-icon type="home" color="positive" size="29"></w-icon>
                <w-icon type="home" color="balanced" size="29"></w-icon>
                <w-icon type="home" color="energized" size="29"></w-icon>
                <w-icon type="home" color="calm" size="29"></w-icon>
                <w-icon type="home" color="royal" size="29"></w-icon>
                <w-icon type="home" color="dark" size="29"></w-icon>
                <w-icon type="home" color="light" size="29"></w-icon>
                <w-icon type="clear" color="light" size="29"></w-icon>
            </p>
            <h4>size</h4>
            <p class="p-sub-item">图标大小</p>
            <w-icon type="checkmark" color="assertive" size="15"></w-icon>
            <w-icon type="checkmark" color="assertive" size="26"></w-icon>
            <w-icon type="checkmark" color="assertive" size="29"></w-icon>
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