<template>
    <div id="wepos-print-raw-receipt">
        <button class="print-btn" @click.prevent="printRawReceipt()">
            <span class="icon flaticon-printer"></span>
            <span class="label">{{ __( 'Print Raw', 'wepos' ) }}</span>
        </button>

        <div v-if="isPrinting">
            <div class="order-info">
                <span class="wepos-left"><strong>{{ __( 'Order ID', 'wepos' ) }}: #{{ printdata.order_id }}</strong></span>
                <span class="wepos-right"><strong>{{ __( 'Order Date', 'wepos' ) }}: {{ formatDate( printdata.order_date ) }}</strong></span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PrintRawReceipt',

    data() {
        return {
            isPrinting: false,
        }
    },

    props: {
        printData: {
            type: Object,
            required: true
        }
    },

    methods: {
        printRawReceipt() {
            this.isPrinting = true;
            console.log(this.printData);
        }
    }
};

</script>

<style lang="less">

#wepos-print-raw-receipt {

}

</style>
