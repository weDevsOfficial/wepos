<template>
    <div class="wepos-discount-keypad" id="wepos-discount-keypad">
        <a href="#" v-popover.left="{ name: 'add-discount-popover' }">Add Discount</a>
        <popover name="add-discount-popover" :width="237" class="discount-keypad">
            <keyboard layouts="123|456|789|0{X:backspace}" v-model="keyboardBtn"/>
        </popover>
    </div>
</template>

<script>
import keyboard from 'vue-keyboard';

export default {

    name: 'DiscountKeypad',

    props: {
        orderTotal: {
            type: Number,
            required: false,
            default: 0
        }
    },

    components : {
        keyboard
    },

    data () {
        return {
            keyboardBtn: ''
        };
    }
};
</script>

<style lang="less">
</style>