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
            setTimeout( () => {
                window.print();
            }, 500);
        },
        handlePrintingPopup(evt) {
            let self = this;

            if ( ( "Enter" === evt.code ) && self.$store.getters['Order/getCanProcessPayment'] ) {
                self.printReceipt();
            }
        },
        handlePrintReceiptSubmit() {
            document.addEventListener( "keypress", this.handlePrintingPopup );
        },
    },

    mounted() {
        this.handlePrintReceiptSubmit();
    },

    destroyed() {
        document.removeEventListener( "keypress", this.handlePrintingPopup );
    }
};

</script>

<style lang="less">

#wepos-print-receipt {
    display: inline;
}

</style>
