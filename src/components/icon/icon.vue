<template>
        <i class="icon"
           :class="[
            type ? 'ion-' + type : ' ',
            color? color : '',
            size?  'w-' + size : '',
        ]"
        ><slot></slot>
        </i>
</template>
<script>
    export default {
        name:'w-icon',
        props:{
            type:{
                type:String,
                required:false,
                default:''
            },
            color:{
                type:String,
            },
            size:{
                type:[String,Number]
            }
        }
    }

</script>