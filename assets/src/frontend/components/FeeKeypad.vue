<template>
    <div class="wepos-fee-keypad-wrap" :class="className" v-hotkey="hotkeys">
        <v-popover offset="5" popover-base-class="fee-keypad tooltip popover" placement="top" :open="viewFeeKeypad">
            <a href="#" @click="showFeeKeypad">{{ __( 'Add', 'wepos' ) }} {{ name }}</a>
            <template slot="popover">
                <form>
                    <input type="text" v-model="displayValue" ref="feeinput" @keyup="inputChange">
                </form>
                <keyboard v-model="input" :layouts="layout()" @percent="percentFee" @flat="flatFee" @input="change"/>
            </template>
        </v-popover>
    </div>
</template>

<script>
import keyboard from './Keyboard.vue';

export default {

    name: 'FeeKeypad',

    components : {
        keyboard
    },
    computed: {
        hotkeys() {
            var keymap = {
                discount : {
                    'f4' : this.showFeeKeypad,
                    'esc': this.hideFeeKepad
                },
                fee : {
                    'f5' : this.showFeeKeypad,
                    'esc': this.hideFeeKepad
                },
            }
            return keymap[this.shortKey];
        }
    },
    props: {
        name: {
            type: String,
            default: 'Fee'
        },
        className: {
            type: String,
            default: ''
        },
        shortKey: {
            type: String,
            default: ''
        },
    },
    data () {
        return {
            input: '',
            displayValue: '',
            viewFeeKeypad: false
        };
    },
    methods: {
        hideFeeKepad(e) {
            this.viewFeeKeypad = false;
        },
        layout() {
            return '123|456|789|{<span class="keypord-icon flaticon-backspace"></span>:backspace}0'+wepos.currency_format_decimal_sep+'|{% '+this.name+':percent}{'+ wepos.currency_format_symbol + ' '+ this.name+':flat}';
        },
        percentFee( keyboard ) {
            this.$emit( 'inputfee', keyboard.value.toString(), 'percent' );
            this.viewFeeKeypad = false;
            this.input='';
            this.displayValue='';
        },
        flatFee( keyboard ) {
            this.$emit( 'inputfee', keyboard.value.toString(), 'flat' );
            this.viewFeeKeypad = false;
            this.input='';
            this.displayValue='';
        },
        change(value){
            if ( !isNaN(value) ) {
                this.displayValue = value;
                this.input = this.displayValue;
            } else {
                this.input = this.displayValue;
                if ( this.displayValue == '' ) {
                    this.input = '';
                }
            }

            jQuery( this.$refs.feeinput ).focus();

            if ( this.input == '' ) {
                jQuery( this.$refs.feeinput ).focus();
            }
        },
        inputChange() {
            if ( !isNaN( this.displayValue ) ) {
                this.input = this.displayValue;
            } else {
                this.displayValue = this.input;
            }

            if ( this.input == '' ) {
                jQuery( this.$refs.feeinput ).focus();
            }
        },
        showFeeKeypad(e) {
            e.preventDefault();
            this.viewFeeKeypad = true;
            setTimeout( () => {
                jQuery( this.$refs.feeinput ).focus();
            }, 500 );
        }
    }
};
</script>

<style lang="less">
.wepos-fee-keypad-wrap {
    display: inline-block;
    float: left;
}

.fee-keypad {
    .tooltip-inner {
        input {
            width: 87%;
            border: none;
            font-size: 20px;
            padding: 13px;
            height: 25px;
        }

        button[data-action="percent"],button[data-action="flat"] {
            cursor: pointer;
        }
    }
}

</style>