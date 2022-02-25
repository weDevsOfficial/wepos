<template>
    <div id="wepos-print-receipt" v-cloak>
        <button class="print-btn" @click.prevent="printReceipt()">
            <span class="icon flaticon-printer"></span>
            <span class="label">{{ __( 'Print Receipt', 'wepos' ) }}</span>
        </button>
    </div>
</template>

<script>
import qz from 'qz-tray';

export default {
    name: 'ReceiptPrint',

    methods: {
        printReceipt() {
            // var self = this;
            //
            // setTimeout( () => {
            //     window.print();
            // }, 500);

            qz.websocket.connect().then(async function () {
                const config = qz.configs.create(await qz.printers.getDefault(), {
                    margins: { left: 0.1, bottom: 0.1 }
                });
                const data = [{
                    type: 'pixel',
                    format: 'html',
                    flavor: 'plain', // or 'plain' if the data is raw HTML
                    data: document.getElementsByClassName('wepos-checkout-print-wrapper')[0].innerHTML
                }];
                qz.print(config, data).catch(function (e) {
                    console.error(e);
                });
            });
        }
    }
};

</script>

<style lang="less">

#wepos-print-receipt {
    display: inline;
}

</style>
