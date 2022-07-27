<template>
    <div class="wepos-fee-keypad-wrap" :class="className" v-hotkey="hotkeys">
        <v-popover offset="5" popover-base-class="fee-keypad tooltip popover" placement="top" :open="viewFeeKeypad">
            <a href="#" @click="showFeeKeypad">{{ __( 'Add', 'wepos' ) }} {{ name }}</a>
            <template slot="popover">
                <form>
                    <input type="text" v-model="displayValue" ref="feeinput">
                </form>
                <keyboard v-model="displayValue" :layouts="layout()" @percent="percentFee" @flat="flatFee"/>
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
    watch: {
        displayValue( newValue, oldValue ) {
            this.inputChange();
        }
    },
    methods: {
        hideFeeKepad(e) {
            this.viewFeeKeypad = false;
        },
        layout() {
            return '123|456|789|{<span class="keypord-icon flaticon-backspace"></span>:backspace}0'+wepos.currency_format_decimal_sep+'|{% '+this.name+':percent}{'+ wepos.currency_format_symbol + ' '+ this.name+':flat}';
        },
        percentFee() {
            this.$emit( 'inputfee', this.input, 'percent' );
            this.viewFeeKeypad = false;
            this.input='';
            this.displayValue='';
        },
        flatFee() {
            this.$emit( 'inputfee', this.input, 'flat' );
            this.viewFeeKeypad = false;
            this.input='';
            this.displayValue='';
        },
        inputChange() {
            if ( this.isValidAmount( this.displayValue ) ) {
                this.input = this.getFormattedValue( this.displayValue, wepos.currency_format_decimal_sep, "." );
            } else {
                this.displayValue = this.getFormattedValue( this.input, ".", wepos.currency_format_decimal_sep );
            }

            jQuery( this.$refs.feeinput ).focus();
        },
        getFormattedValue( value, charFrom, charTo ) {
            let formattedValue = value;

            if ( "." !== wepos.currency_format_decimal_sep ) {
                formattedValue = value.replace( charFrom, charTo );
            }

            return formattedValue;
        },
        isValidAmount( amount ) {
            const decimalSep   = wepos.currency_format_decimal_sep;
            const allowedChars = "^[0-9]*[" + decimalSep + "]{0,1}[0-9]*$";
            const regexPattern = new RegExp( allowedChars, "gi" );

            return amount.match( regexPattern );
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
