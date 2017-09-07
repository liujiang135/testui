<template>
    <div class="list w-checkbox" thin-border>
        <label class="item item-icon-right"
               v-for="(option, i) in options">
            <input type="checkbox" :name="checkboxName" :id="checkboxName + '-' + i"
                    @click="onClick(option)">
            <span v-text="option.name"></span>
            <i
                    :class="{
          'icon ion-ios-checkmark-empty assertive': list.indexOf(option.id) > -1 && theme == 'assertive',
          'icon ion-ios-checkmark-empty positive': list.indexOf(option.id) > -1 && theme == 'positive',
          'icon ion-ios-checkmark-empty balanced': list.indexOf(option.id) > -1 && theme == 'balanced',
          'icon ion-ios-checkmark-empty energized': list.indexOf(option.id) > -1 && theme == 'energized',
          'icon ion-ios-checkmark-empty calm': list.indexOf(option.id) > -1 && theme == 'calm',
          'icon ion-ios-checkmark-empty royal': list.indexOf(option.id) > -1 && theme == 'royal',
          'icon ion-ios-checkmark-empty dark': list.indexOf(option.id) > -1 && theme == 'dark'
        }"
            >
            </i>
        </label>

    </div>
</template>
<script>
    export default{
        name:'w-checkbox',
        props: {
            options: {
                type: Array,
                required: true
            },
            value: {
                type: [Array],
                required: true
            },
            theme: {
                type: String,
                default: 'assertive'
            }
        },
        computed: {
            v: function () {
                return this.value
            }
        },
        data() {
            return {
                checkboxName: 'von-checkbox-' + Math.random().toString(36).substring(3, 6),
                list:[]
            }
        },

        methods: {
            onClick(option) {
                let index =  this.list.indexOf(option.id)
                if (index == -1) {
                    this.v.push(option);
                    this.list.push(option.id);
                } else {
                    this.v.splice(index, 1)
                    this.list.splice(index, 1);
                }
            }
        }
    }
</script>
