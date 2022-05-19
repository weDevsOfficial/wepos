<template>
    <div class="wepos-modal-dialog">
        <div class="wepos-modal">
            <div class="wepos-modal-content" :style="{ width: width }">
                <section :class="['wepos-modal-main', { 'has-footer': footer }]">
                    <header class="modal-header" v-if="header">
                        <slot name="header">
                            <h1>{{ title }}</h1>
                        </slot>
                    </header>
                    <div class="modal-body" :style="{ height: height}">
                        <slot name="body"></slot>
                    </div>
                    <footer class="modal-footer" v-if="footer">
                        <div class="inner">
                            <slot name="footer"></slot>
                        </div>
                    </footer>
                    <span class="modal-close modal-close-link flaticon-cancel-music" @click="$emit('close')"></span>
                </section>
            </div>
        </div>
        <div class="wepos-modal-backdrop" :style="{ opacity: backdropOpacity }"></div>
    </div>
</template>

<script>
export default {

    name: 'Modal',

    props: {

        footer: {
            type: Boolean,
            required: false,
            default: false
        },
        header: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        width: {
            type: String,
            required: false,
            default: '600px'
        },
        height: {
            type: String,
            required: false,
            default: 'auto'
        },
        backdropOpacity: {
            type: String,
            required: false,
            default: '0.2'
        }
    },

    data () {
        return {

        };
    },

    methods: {
        handleModalSubmit() {
            let self = this;

            document.addEventListener("keypress", function(evt) {
                if ("Enter" === evt.code) {
                    self.$emit( 'enterpressed' );
                }
            });
        }
    },

    mounted() {
        this.$emit( 'open' );
        this.handleModalSubmit();
    }
};
</script>

<style lang="less">

</style>
