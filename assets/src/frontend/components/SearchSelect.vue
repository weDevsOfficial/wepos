<template>
    <multiselect
        class="wepos-multiselect"
        v-model="value"
        :options="options"
        selectLabel=""
        deselectLabel=""
        selectedLabel=""
        @input="inputEvent"
        @select="selectEvent"
        @remove="removeEvent"
    >
        <template slot="noResult">
            <div class="no-data-found" v-html="notFoundText"></div>
        </template>
    </multiselect>
</template>

<script>
    export default {
        name: 'SearchSelect',
        props: {
            options: {
                type: Array,
                required: true
            },
            notFoundText: {
                type: String,
                default: 'Oops! No data found'
            }
        },

        data() {
            return {
                value: null
            }
        },

        methods: {
            inputEvent( value, id ) {
                this.$emit( 'oninput', value, id );
            },
            selectEvent( selectedOption, id ) {
                this.$emit( 'onselect', selectedOption, id );
            },
            removeEvent( removedOption, id ) {
                this.$emit( 'onremove', removedOption, id );
            }
        }
    };
</script>

<style lang="less">

</style>