<template>
    <div class="wepos-modal-dialog">
        <div class="wepos-modal">
            <div class="wepos-modal-content" :style="{ width: width, height: height}">
                <section :class="['wepos-modal-main', { 'has-footer': footer }]">
                    <header class="modal-header" v-if="header">
                        <slot name="header">
                            <h1>{{ title }}</h1>
                        </slot>
                    </header>
                    <div class="modal-body">
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
        <div class="wepos-modal-backdrop"></div>
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
            default: '300px'
        },
    },

    data () {
        return {

        };
    },
};
</script>

<style lang="less">
.wepos-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 360px;
    background: #000;
    opacity: 0.2;
    z-index: 99999;
}

.wepos-modal {

    * {
        box-sizing: border-box;
    }

    .wepos-modal-content {
        position: fixed;
        background: #fff;
        z-index: 100000;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }

    .wepos-modal-main.has-footer {
        padding-bottom: 55px;
    }

    header.modal-header {
        height: auto;
        background: #fcfcfc;
        padding: 1em 1.5em;
        border-bottom: 1px solid #ddd;

        h1 {
            margin: 0;
            padding: 0;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.5em
        }
    }

    .modal-close-link {
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;

        &:before {
            font-size: 14px;
            color: #909090;
        }
    }

    .modal-body {
        min-height: 100px;
        overflow-y: scroll;
    }

    footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -30px;
        z-index: 100;
        padding: 10px;
        background: #fcfcfc;
        border-top: 1px solid #dfdfdf;
        -webkit-box-shadow: 0 -4px 4px -4px rgba(0,0,0,.1);
        box-shadow: 0 -4px 4px -4px rgba(0,0,0,.1);

        .inner {
            text-align: right;
            line-height: 23px;
        }
    }
}

@media only screen and (max-width: 500px) {
    .wepos-modal-content {
        width: 400px !important;
        top: 300px !important;
    }
}

@media only screen and (max-width: 376px) {
    .wepos-modal-content {
        width: 350px !important;
        top: 300px !important;
    }
}

@media only screen and (max-width: 320px) {
    .wepos-modal-content {
        width: 300px !important;
        top: 300px !important;
    }
}

</style>
