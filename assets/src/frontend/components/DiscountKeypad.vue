<template>
    <div class="wepos-discount-keypad-wrap" :class="className">
        <v-popover offset="5" popover-base-class="discount-keypad tooltip popover" placement="top" :open="viewDiscountKeypad">
            <a href="#" @click.prevent="showDiscountKeypad()">Add Discount</a>
            <template slot="popover">
                <form>
                    <input type="text" v-model="displayValue" ref="discountinput" @keyup="inputChange">
                </form>
                <keyboard v-model="input" :layouts="layout()" @percent="percentDiscount" @flat="flatDiscount" @input="change"/>
            </template>
        </v-popover>
    </div>
</template>

<script>
import keyboard from './Keyboard.vue';

export default {

    name: 'DiscountKeypad',

    components : {
        keyboard
    },
    props: {
        className: {
            type: String,
            default: ''
        },
    },
    data () {
        return {
            input: '',
            displayValue: '',
            viewDiscountKeypad: false
        };
    },
    methods: {
        layout() {
            return '123|456|789|{<span class="keypord-icon flaticon-backspace"></span>:backspace}0'+wepos.currency_format_decimal_sep+'|{% Discount:percent}{'+ wepos.currency_format_symbol +' Discount:flat}';
        },
        percentDiscount( keyboard ) {
            this.$emit( 'discount', keyboard.value.toString(), 'percent' );
            this.viewDiscountKeypad = false;
            this.input='';
            this.displayValue='';
        },
        flatDiscount( keyboard ) {
            this.$emit( 'discount', keyboard.value.toString(), 'flat' );
            this.viewDiscountKeypad = false;
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
        },
        inputChange() {
            if ( !isNaN( this.displayValue ) ) {
                this.input = this.displayValue;
            } else {
                this.displayValue = this.input;
            }
        },
        showDiscountKeypad() {
            this.viewDiscountKeypad = true;
            this.$nextTick( () => this.$refs.discountinput.focus() );
        }
    }
};
</script>

<style lang="less">
.wepos-discount-keypad-wrap {
    display: inline-block;
    float: left;
}

.discount-keypad {
    .tooltip-inner {
        input {
            width: 87%;
            border: none;
            font-size: 20px;
            padding: 13px;
            height: 25px;
        }
    }
}

</style>