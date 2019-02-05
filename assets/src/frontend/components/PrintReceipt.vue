<template>
    <div id="wepos-print-receipt" v-cloak>
        <button class="print-btn" @click.prevent="printReceipt()">
            <span class="icon flaticon-printer"></span>
            <span class="label">Print Receipt</span>
        </button>
    </div>
</template>

<script>

let EventBus = wepos_get_lib( 'EventBus' );

export default {
    name: 'ReceiptPrint',

    methods: {
        printReceipt() {
            var self = this;
            var beforePrint = function() {
                EventBus.$emit( 'openprinthtml', true );
            };
            var afterPrint = function() {
                EventBus.$emit( 'closeprinthtml', false );
            };

            if (window.matchMedia) {
                var mediaQueryList = window.matchMedia('print');
                mediaQueryList.addListener(function(mql) {
                    if (mql.matches) {
                        beforePrint();
                    } else {
                        afterPrint();
                    }
                });
            }

            window.onbeforeprint = beforePrint;
            setTimeout( () => {
                window.print();
            }, 500)
            window.onafterprint = afterPrint;
        }
    }
};

</script>

<style lang="less">

#wepos-print-receipt {
    display: inline;
}

</style>
