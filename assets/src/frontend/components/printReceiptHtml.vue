<template>
    <div class="wepos-checkout-print-wrapper" v-if="settings.wepos_receipts">
        <div class="header" v-html="settings.wepos_receipts.receipt_header"></div>
        <div class="order-info">
            <span class="wepos-left"><strong>{{ __( 'Order ID', 'wepos' ) }}: #{{ printdata.order_id }}</strong></span>
            <span class="wepos-right"><strong>{{ __( 'Order Date', 'wepos' ) }}: {{ formatDate( printdata.order_date ) }}</strong></span>
            <div class="wepos-clearfix"></div>
        </div>
        <div class="content">
            <table class="sale-summary">
                <tbody>
                    <tr v-for="item in printdata.line_items">
                        <td class="name">
                            {{ item.name }}
                            <div class="attribute" v-if="item.attribute.length > 0">
                                <ul>
                                    <li v-for="attribute_item in item.attribute"><span class="attr_name">{{ attribute_item.name }}</span>: <span class="attr_value">{{ attribute_item.option }}</span></li>
                                </ul>
                            </div>
                        </td>
                        <td class="quantity">{{ item.quantity }}</td>
                        <td class="price">
                            <template v-if="item.on_sale">
                                <span class="regular-price">{{ formatPrice( item.quantity*item.regular_price ) }}</span>
                                <span class="sale-price">{{ formatPrice( item.quantity*item.sale_price ) }}</span>
                            </template>
                            <template v-else>
                                <span class="sale-price">{{ formatPrice( item.quantity*item.regular_price ) }}</span>
                            </template>
                        </td>
                    </tr>
                    <tr class="cart-meta-data">
                        <td colspan="2" class="name">
                            {{ __( 'Subtotal', 'wepos' ) }}
                            <span class="metadata" v-if="settings.woo_tax.wc_tax_display_cart == 'incl'">
                                {{ __( 'Includes Tax', 'wepos' ) }} {{ formatPrice( $store.getters['Cart/getTotalLineTax'] ) }}
                            </span>
                        </td>
                        <td class="price">{{ formatPrice( printdata.subtotal ) }}</td>
                    </tr>
                    <tr v-for="(fee,key) in printdata.fee_lines" class="cart-meta-data">
                        <template v-if="fee.type=='discount'">
                            <td colspan="2" class="name">{{ __( 'Discount', 'wepos' ) }} <span class="metadata">{{ fee.discount_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ) }}</span></td>
                            <td class="price">-{{ formatPrice( Math.abs( fee.total ) ) }}</td>
                        </template>
                        <template v-else>
                            <td colspan="2" class="name">{{ __( 'Fee', 'wepos' ) }} <span class="metadata">{{ fee.name }} {{ fee.fee_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ) }}</span></td>
                            <td class="price">-{{ formatPrice( Math.abs( fee.total ) ) }}</td>
                        </template>
                    </tr>
                    <tr v-if="printdata.taxtotal">
                        <td colspan="2" class="name">{{ __( 'Tax', 'wepos' ) }}</td>
                        <td class="price">{{ formatPrice(printdata.taxtotal) }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="name">{{ __( 'Order Total', 'wepos' ) }}</td>
                        <td class="price">{{ formatPrice(printdata.ordertotal) }}</td>
                    </tr>
                    <tr class="divider">
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ __( 'Payment method', 'wepos' ) }}</td>
                        <td class="price">{{ printdata.gateway.title || '' }}</td>
                    </tr>
                    <template v-if="printdata.gateway.id='wepos_cash'">
                        <tr>
                            <td colspan="2">{{ __( 'Cash Given', 'wepos' ) }}</td>
                            <td class="price">{{ formatPrice( printdata.cashamount ) }}</td>
                        </tr>
                        <tr>
                            <td colspan="2">{{ __( 'Change Money', 'wepos' ) }}</td>
                            <td class="price">{{ formatPrice( printdata.changeamount ) }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="footer" v-html="settings.wepos_receipts.receipt_footer"></div>
    </div>
</template>
<script>

export default {
    name: 'ReceiptPrintHtml',

    props: {
        printdata: {
            type: Object,
            default() {
                return {};
            }
        },
        settings: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        formatDate( date ) {
            var date = new Date( date );
            return date.toLocaleString();
        }
    }
};

</script>
<style lang="less">

[v-cloak] {display: none}

@media print {
    body * {
        visibility: hidden;
    }

    .wepos-modal-content {
        // display: none;
        visibility: hidden;
    }

    .wepos-checkout-print-wrapper {
        color: #181818;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        display: inline-block !important;
    }

    .wepos-checkout-print-wrapper * {
        visibility: visible;
    }

    .wepos-checkout-print-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;

        .header, .footer{
            padding: 5px;
            text-align: center;
        }

        .order-info {
            margin: 10px 0px 10px;
            border-bottom: 1px dashed #b7b7b7;
            padding: 10px 5px;
        }

        .content {
            table.sale-summary {
                width: 100%;
                border-collapse: collapse;
                tbody {
                    tr {
                        td {
                            font-size: 14px;
                            padding: 8px 10px;
                            &.name {
                                width: 60%;
                                font-weight: bold;
                                .attribute {
                                    margin-top: 2px;
                                    ul {
                                        margin: 0;
                                        padding: 0;
                                        list-style: none;
                                        li {
                                            display: inline-block;
                                            margin-right: 5px;
                                            font-size: 12px;
                                            font-weight: normal;

                                            .attr_name {
                                                color: #758598;
                                            }
                                        }
                                    }
                                }
                            }
                            &.quantity {
                                width: 12%;
                                color: #758598;
                            }
                            &.price {
                                text-align: right;
                                color: #758598;
                                span {
                                    color: #758598;

                                    &.regular-price {
                                        font-size: 12px;
                                        text-decoration: line-through;
                                        color: #9095A5;
                                        padding-right: 3px;
                                    }
                                }
                            }
                        }

                        &.cart-meta-data {
                            td {
                                .metadata {
                                    margin-left: 6px;
                                    color: #758598;
                                    font-size: 13px;
                                    font-weight: normal;
                                }
                            }
                        }

                        &.divider {
                            border-bottom: 1px dashed #b7b7b7;
                            color: #b5b5b5;
                        }
                    }
                }
            }
        }
    }
}
</style>
