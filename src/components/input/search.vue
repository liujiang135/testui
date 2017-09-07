<template>
    <div class="item-input-inset">
        <label class="item-input-wrapper">
            <i class="icon ion-ios-search placeholder-icon"></i>
            <form action='' :id="formId" >
                <input ref="input" type="search" :placeholder="placeholder" :value="value" @change="updateValue($event.target.value)">
            </form>
        </label>
        <button class="button button-clear button-positive" :class="[cancelText?'':'button-hide']"
                @click='cancel()' v-text="cancelText">
        </button>
    </div>
</template>
<script>
    export default {
        name:'w-search',
        props: {
            value: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: 'Search'
            },
            cancelText: {
                type: String,
                default:''
            },
            onSearch: Function,
            onCancel: Function
        },

        data() {
            return {
                formId: 'w-search-' + Math.random().toString(36).substring(3, 6)
            }
        },

        mounted() {
            document.getElementById(this.formId).onsubmit = this.search;
        },

        methods: {
            search(e) {
                e.preventDefault();
                var search = document.querySelector('#' + this.formId + ' > [type=search]');
                search.blur();
                if (this.onSearch) this.onSearch();
            },
            cancel() {
                if (this.onCancel) this.onCancel()
            },

            updateValue(value) {
                this.$refs.input.value = value,
                    this.$emit('input', value)
            }
        }
    }
</script>