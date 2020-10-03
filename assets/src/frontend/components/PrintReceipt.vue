<template>
    <div id="wepos-print-receipt" v-cloak>
        <button class="print-btn" @click.prevent="printReceipt()">
            <span class="icon flaticon-printer"></span>
            <span class="label">{{ __( 'Print Receipt', 'wepos' ) }}</span>
        </button>
    </div>
</template>

<script>

export default {
    name: 'ReceiptPrint',

    methods: {
        printReceipt() {
            var self = this;

            setTimeout( () => {
                window.print();
            }, 500);
        }
    }
};

</script>

<style lang="less">

#wepos-print-receipt {
    display: inline;
}

</style>
