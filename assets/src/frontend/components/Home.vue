<template>
    <div id="wepos-main" v-cloak v-hotkey="hotkeys">
        <div class="content-product">
            <div class="top-panel wepos-clearfix">
                <div class="search-bar">
                    <product-search @onProductAdded="addToCart" :products="products" :settings="settings"></product-search>
                </div>
                <div class="category">
                    <multiselect
                        class="wepos-multiselect"
                        v-model="selectedCategory"
                        :options="categories"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        @select="handleCategorySelect"
                        @remove="handleCategoryRemove"
                    >
                        <template slot="singleLabel" slot-scope="props">
                            {{props.option.name}}
                        </template>
                        <template slot="option" slot-scope="props">
                            <span>
                                <template v-for="pad in props.option.level">
                                    &nbsp;
                                </template>
                                {{ props.option.name }}
                            </span>
                        </template>

                        <template slot="noResult">
                            <div class="no-data-found">{{ __( 'Not found', 'wepos' ) }}</div>
                        </template>
                    </multiselect>
                </div>

                <div class="toggle-view">
                    <div class="product-toggle">
                        <span class="toggle-icon list-view flaticon-menu-button-of-three-horizontal-lines" @click="productView = 'list'" :class="{ active: productView == 'list'}"></span>
                        <span class="toggle-icon grid-view flaticon-menu" @click="productView = 'grid'" :class="{ active: productView == 'grid'}"></span>
                    </div>
                </div>
            </div>
            <div class="breadcrumb" v-if="getBreadCrums.length > 0">
                <ul>
                    <template v-for="breadcrumb in getBreadCrums">
                        <router-link tag="li" :to="{ name: 'Home', query: { category: breadcrumb.id }}">
                            <a>{{ breadcrumb.name }}</a>
                        </router-link>
                    </template>
                </ul>
                <span class="close-breadcrumb flaticon-cancel-music" @click.prevent="removeBreadcrums"></span>
            </div>
            <div class="items-wrapper" :class="productView" ref="items-wrapper">
                <template v-if="!productLoading">
                    <div class="item" v-if="getFilteredProduct.length > 0" v-for="product in getFilteredProduct">
                        <template v-if="product.type == 'simple'">
                            <div class="item-wrap" @click.prevnt="addToCart(product)">
                                <div class="img">
                                    <!-- https://via.placeholder.com/138x90  -->
                                    <img :src="getProductImage(product)" :alt="getProductImageName( product )">
                                </div>
                                <div class="title" v-if="productView=='grid'">
                                    {{ truncate( product.name, 20, '...' ) }}
                                </div>
                                <div class="title" v-else>
                                    {{ product.name }}
                                </div>
                                <span class="add-product-icon flaticon-add" :class="productView"></span>
                            </div>
                        </template>

                        <template v-if="product.type == 'variable'">
                            <v-popover offset="10" popover-base-class="product-variation tooltip popover" placement="left-end">
                                <div class="item-wrap" @click="selectVariationProduct( product )">
                                    <div class="img">
                                        <img :src="getProductImage(product)" :alt="getProductImageName( product )">
                                    </div>
                                    <div class="title" v-if="productView=='grid'">
                                        {{ truncate( product.name, 20, '...' ) }}
                                    </div>
                                    <div class="title" v-else>
                                        {{ product.name }}
                                    </div>
                                    <span class="add-product-icon flaticon-add" :class="productView"></span>
                                </div>
                                <template slot="popover">
                                    <div class="variation-header">
                                        {{ __( 'Select Variations', 'wepos' ) }}
                                    </div>
                                    <div class="variation-body">
                                        <template v-for="attribute in product.attributes">
                                            <div class="attribute">
                                                <p>{{ attribute.name }}</p>
                                                <div class="options">
                                                    <template v-for="option in attribute.options">
                                                        <label>
                                                            <input type="radio" v-model="selectedAttribute[attribute.name]" :value="option">
                                                            <div class="box">
                                                                {{ option }}
                                                            </div>
                                                        </label>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="variation-footer">
                                        <button :disabled="attributeDisabled" @click.prevent="addVariationProduct">{{ __( 'Add Product', 'wepos' ) }}</button>
                                    </div>
                                </template>
                            </v-popover>
                        </template>
                    </div>
                    <div class="no-product-found" v-if="getFilteredProduct.length <= 0">
                        <img :src="wepos.assets_url+ '/images/no-product.png'" alt="" width="120px">
                        <p>{{ __( 'No Product Found', 'wepos' ) }}</p>
                    </div>
                </template>
                <div class="product-loading" v-if="productLoading">
                    <div class="spinner spinner-loading"></div>
                </div>
            </div>
        </div>
        <div class="content-cart">
            <div class="top-panel">
                <customer-search @onCustomerSelected="selectCustomer"></customer-search>
                <div class="action">
                    <div class="more-options">
                        <span class="dropdown right-align">
                            <button><span class="more-icon flaticon-more"></span></button>
                            <label>
                                <input type="checkbox">
                                <ul>
                                    <li><a href="#" @click.prevent="emptyCart">{{ __( 'Empty Cart', 'wepos' ) }}</a></li>
                                    <li><a href="#" @click.prevent="openHelp">{{ __( 'Help', 'wepos' ) }}</a></li>
                                    <li class="divider"></li>
                                    <li><a :href="getLogoutUrl()">{{ __( 'Logout', 'wepos' ) }}</a></li>
                                </ul>
                            </label>
                        </span>
                    </div>
                </div>
            </div>
            <div class="cart-panel">
                <div class="cart-content">
                    <table class="cart-table">
                        <thead>
                            <tr>
                                <th width="65%">{{ __( 'Product', 'wepos' ) }}</th>
                                <th width="15%">{{ __( 'Qty', 'wepos' ) }}</th>
                                <th width="30%">{{ __( 'Price', 'wepos' ) }}</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="orderdata.line_items.length > 0">
                                <template v-for="(item,key) in orderdata.line_items">
                                    <tr>
                                        <td class="name" @click="toggleEditQuantity( item, key )">
                                            {{ item.name }}
                                            <div class="attribute" v-if="item.attribute.length > 0">
                                                <ul>
                                                    <li v-for="attribute_item in item.attribute"><span class="attr_name">{{ attribute_item.name }}</span>: <span class="attr_value">{{ attribute_item.option }}</span></li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td class="qty" @click="toggleEditQuantity( item, key )">{{ item.quantity }}</td>
                                        <td class="price" @click="toggleEditQuantity( item, key )">
                                            <template v-if="item.on_sale">
                                                <span class="sale-price">{{ formatPrice( item.quantity*item.sale_price ) }}</span>
                                                <span class="regular-price">{{ formatPrice( item.quantity*item.regular_price ) }}</span>
                                            </template>
                                            <template v-else>
                                                <span class="sale-price">{{ formatPrice( item.quantity*item.regular_price ) }}</span>
                                            </template>
                                        </td>
                                        <td class="action">
                                            <span class="flaticon-right-arrow" :class="{ open: item.editQuantity }" @click.prevent="toggleEditQuantity( item, key )"></span>
                                        </td>
                                        <td class="remove">
                                            <span class="flaticon-cancel-music" @click.prevent="removeItem(key)"></span>
                                        </td>
                                    </tr>
                                    <tr v-if="item.editQuantity" class="update-quantity-wrap">
                                        <td colspan="5">
                                            <span class="qty">{{ __( 'Quantity', 'wepos' ) }}</span>
                                            <span class="qty-number"><input type="number" min="1" step="1" v-model="item.quantity"></span>
                                            <span class="qty-action">
                                                <a href="#" class="add" @click.prevent="addQuantity(item)">&#43;</a>
                                                <a href="#" class="minus" @click.prevent="removeQuantity(item)">&#45;</a>
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr class="no-item">
                                    <td colspan="5">
                                        <img :src="wepos.assets_url+ '/images/empty-cart.png'" alt="" width="120px">
                                        <p>{{ __( 'Empty Cart', 'wepos' ) }}</p>
                                    </td>
                                </tr>
                            </template>
                         </tbody>
                    </table>
                </div>
                <div class="cart-calculation">
                    <form autocomplete="off">
                        <table class="cart-total-table">
                            <tbody>
                                <tr>
                                    <td class="label">{{ __( 'Subtotal', 'wepos' ) }}</td>
                                    <td class="price">{{ formatPrice( getSubtotal ) }}</td>
                                    <td class="action"></td>
                                </tr>
                                <template v-if="orderdata.fee_lines.length > 0">
                                    <tr class="cart-meta-data" v-for="(fee,key) in orderdata.fee_lines">
                                        <template v-if="fee.type=='discount'">
                                            <td class="label">{{ __( 'Discount', 'wepos' ) }} <span class="name">{{ fee.discount_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ) }}</span></td>
                                            <td class="price">-{{ formatPrice( Math.abs( fee.total ) ) }}</td>
                                            <td class="action"><span class="flaticon-cancel-music" @click="removeFeeLine(key)"></span></td>
                                        </template>
                                        <template v-else>
                                            <template v-if="fee.isEdit">
                                                <td class="label" colspan="2">
                                                    <input type="text" class="fee-name" v-model="orderdata.fee_lines[key].name" :placeholder="__( 'Fee Name', 'wepos' )" ref="fee_name">
                                                    <template v-if="settings.wepos_general.enable_fee_tax == 'yes'">
                                                        <label for="fee-tax-status"><input type="checkbox" id="fee-tax-status" class="fee-tax-status" v-model="orderdata.fee_lines[key].tax_status" :true-value="'taxable'" :false-value="'none'"> Taxable</label>
                                                        <select class="fee-tax-class" v-model="orderdata.fee_lines[key].tax_class" v-if="orderdata.fee_lines[key].tax_status=='taxable'">
                                                            <option v-for="feeTax in availableTax" :value="feeTax.class == 'standard' ? '' : feeTax.class">{{ unSanitizeString( feeTax.class ) }} - {{ feeTax.percentage_rate }}</option>
                                                        </select>
                                                    </template>
                                                    <button :disabled="orderdata.fee_lines[key].name == ''" @click="saveFee(key);">{{ __( 'Apply', 'wepos' ) }}</button>
                                                </td>
                                                <td class="action"><span class="flaticon-cancel-music" @click="removeFeeLine(key)"></span></td>
                                            </template>
                                            <template v-else>
                                                <td class="label" @dblclick="orderdata.fee_lines[key].isEdit = true">{{ __( 'Fee', 'wepos' ) }} <span class="name">{{ fee.name }} {{ fee.fee_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ) }}</span></td>
                                                <td class="price">{{ formatPrice( Math.abs( fee.total ) ) }}</td>
                                                <td class="action"><span class="flaticon-cancel-music" @click="removeFeeLine(key)"></span></td>
                                            </template>
                                        </template>
                                    </tr>
                                </template>
                                <tr class="tax" v-if="getTotalTax">
                                    <td class="label">{{ __( 'Tax', 'wepos' ) }}</td>
                                    <td class="price">{{ formatPrice( getTotalTax ) }}</td>
                                    <td class="action"></td>
                                </tr>
                                <tr class="cart-action">
                                    <td colspan="3">
                                        <fee-keypad @inputfee="setDiscount" :name="__( 'Discount', 'wepos' )" short-key="discount"></fee-keypad>
                                        <fee-keypad @inputfee="setFee" :name="__( 'Fee', 'wepos' )" short-key="fee"></fee-keypad>
                                        <customer-note @addnote="addCustomerNote" v-if="orderdata.customer_note == ''"></customer-note>
                                    </td>
                                </tr>
                                <tr class="note" v-if="orderdata.customer_note">
                                    <td colspan="2" class="note-text">
                                        {{ orderdata.customer_note }}
                                    </td>
                                    <td class="action"><span class="flaticon-cancel-music" @click.prevent="orderdata.customer_note = ''"></span></td>
                                </tr>
                                <tr class="pay-now" @click="initPayment()">
                                    <td>{{ __( 'Pay Now', 'wepos' ) }}</td>
                                    <td class="amount">{{ formatPrice( getTotal ) }}</td>
                                    <td class="icon"><span class="flaticon-right-arrow"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>

        <modal v-if="showPaymentReceipt" @close="createNewSale()" width="600px" height="400px" >
            <template slot="body">
                <div class="wepos-payment-receipt">
                    <div class="sale-completed">
                        <img :src="wepos.assets_url+ '/images/sale-completed.png'" alt="" width="120px">
                        <h2>{{ __( 'Sale Completed', 'wepos' ) }}</h2>
                    </div>

                    <div class="print-section">
                        <print-receipt></print-receipt>
                        <button class="new-sale-btn" @click.prevent="createNewSale()">
                            <span class="icon flaticon-add"></span>
                            <span class="label">{{ __( 'New Sale', 'wepos' ) }}</span>
                        </button>
                    </div>
                </div>
            </template>
        </modal>

        <modal v-if="showHelp" @close="closeHelp()" width="700px" height="500px">
            <template slot="body">
                <div class="wepos-help-wrapper">
                    <h2>{{ __( 'Shortcut Keys', 'wepos' ) }}</h2>
                    <ul>
                        <li>
                            <span class="code"><code>f1</code></span>
                            <span class="title">{{ __( 'Search Product', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f2</code></span>
                            <span class="title">{{ __( 'Scan Product', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f3</code></span>
                            <span class="title">{{ __( 'Toggle Product View', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f4</code></span>
                            <span class="title">{{ __( 'Add Fee in cart', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f5</code></span>
                            <span class="title">{{ __( 'Add Discount in cart', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f6</code></span>
                            <span class="title">{{ __( 'Add Customer note', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f7</code></span>
                            <span class="title">{{ __( 'Customer Search', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>shift+f7</code></span>
                            <span class="title">{{ __( 'Add new Customer', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f8</code></span>
                            <span class="title">{{ __( 'Create New Sale', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>shift+f8</code></span>
                            <span class="title">{{ __( 'Empty your cart', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f9</code></span>
                            <span class="title">{{ __( 'Go to payment receipt', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>f10</code></span>
                            <span class="title">{{ __( 'Process Payment', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>ctrl/cmd+p</code></span>
                            <span class="title">{{ __( 'Print Receipt', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>ctrl/cmd+?</code></span>
                            <span class="title">{{ __( 'Show/Close(Toggle) Help', 'wepos' ) }}</span>
                        </li>
                        <li>
                            <span class="code"><code>esc</code></span>
                            <span class="title">{{ __( 'Close anything', 'wepos' ) }}</span>
                        </li>
                    </ul>
                </div>
            </template>
        </modal>

        <modal v-if="showModal" @close="backToSale()" width="98%" height="95vh">
            <template slot="body">
                <div class="wepos-checkout-wrapper">
                    <div class="left-content">
                        <div class="header">
                            {{ __( 'Sale Summary', 'wepos' ) }}
                        </div>
                        <div class="content" :style="{ height: modalLeftContentHeight }">
                            <table class="sale-summary-cart">
                                <tbody>
                                    <tr v-for="item in orderdata.line_items">
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
                                                <span class="sale-price">{{ formatPrice( item.quantity*item.sale_price ) }}</span>
                                                <span class="regular-price">{{ formatPrice( item.quantity*item.regular_price ) }}</span>
                                            </template>
                                            <template v-else>
                                                <span class="sale-price">{{ formatPrice( item.quantity*item.regular_price ) }}</span>
                                            </template>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="footer">
                            <ul>
                                <li class="wepos-clearfix">
                                    <span class="wepos-left">{{ __( 'Subtotal', 'wepos' ) }}</span>
                                    <span class="wepos-right">{{ formatPrice( getSubtotal ) }}</span>
                                </li>
                                <template v-if="orderdata.fee_lines.length > 0">
                                    <li class="wepos-clearfix" v-for="(fee,key) in orderdata.fee_lines">
                                        <template v-if="fee.type=='discount'">
                                            <span class="wepos-left">{{ __( 'Discount', 'wepos' ) }} <span class="metadata">{{ fee.name }} {{ fee.discount_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ) }}</span></span>
                                            <span class="wepos-right">-{{ formatPrice( Math.abs( fee.total ) ) }}</span>
                                        </template>
                                        <template v-else>
                                            <span class="wepos-left">{{ __( 'Fee', 'wepos' ) }} <span class="metadata">{{ fee.name }} {{ fee.fee_type == 'percent' ? fee.value + '%' : formatPrice( fee.value ) }}</span></span>
                                            <span class="wepos-right">{{ formatPrice( fee.total ) }}</span>
                                        </template>
                                    </li>
                                </template>
                                <li class="wepos-clearfix" v-if="getTotalTax">
                                    <span class="wepos-left">{{ __( 'Tax', 'wepos' ) }}</span>
                                    <span class="wepos-right">{{ formatPrice( getTotalTax ) }}</span>
                                </li>
                                <li class="wepos-clearfix">
                                    <span class="wepos-left">{{ __( 'Order Total', 'wepos' ) }}</span>
                                    <span class="wepos-right">{{ formatPrice( getTotal ) }}</span>
                                </li>
                                <li class="wepos-clearfix">
                                    <span class="wepos-left">{{ __( 'Pay', 'wepos' ) }}</span>
                                    <span class="wepos-right">{{ formatPrice( getTotal ) }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="right-content">
                        <div class="header wepos-clearfix">
                            <h2 class="wepos-left">{{ __( 'Pay', 'wepos' ) }}</h2>
                            <span class="pay-amount wepos-right">{{ formatPrice( getTotal ) }}</span>
                        </div>

                        <div class="content">
                            <div class="payment-gateway">
                                <template v-if="availableGateways.length > 0">
                                    <label v-for="gateway in availableGateways">
                                        <input type="radio" name="gateway" checked v-model="orderdata.payment_method" :value="gateway.id">
                                        <span class="gateway">
                                            {{ gateway.title }}
                                        </span>
                                    </label>
                                    <template v-if="emptyGatewayDiv > 0">
                                        <label v-for="n in emptyGatewayDiv" :key="n">
                                            <span class="grid-placeholder"></span>
                                        </label>
                                    </template>
                                </template>
                                <template v-else>
                                    <p>{{ __( 'No gateway found', 'wepos' ) }}</p>
                                </template>
                            </div>
                            <template v-if="orderdata.payment_method=='wepos_cash'">
                                <div class="payment-option">
                                    <div class="payment-amount">
                                        <div class="input-part">
                                            <div class="input-wrap">
                                                <p>{{ __( 'Cash', 'wepos' ) }}</p>
                                                <div class="input-addon">
                                                    <span class="currency">{{ wepos.currency_format_symbol }}</span>
                                                    <input type="text" v-model="cashAmount" ref="cashamount">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="change-money">
                                            <p>{{ __( 'Change money', 'wepos' ) }}: {{ formatPrice( changeAmount ) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div class="footer wepos-clearfix">
                            <a href="#" class="back-btn wepos-left" @click.prevent="backToSale()">{{ __( 'Back to Sale', 'wepos' ) }}</a>
                            <button class="process-checkout-btn wepos-right" @click.prevent="processPayment" :disabled="!ableToProcess()">{{ __( 'Process Payment', 'wepos' ) }}</button>
                        </div>
                    </div>
                </div>
            </template>
        </modal>

        <overlay :show="showOverlay"></overlay>

        <print-receipt-html v-show="createprintreceipt" :printdata="printdata" :settings="settings.wepos_receipts"></print-receipt-html>
    </div>
</template>

<script>

import Overlay from './Overlay.vue';
import ProductSearch from './ProductSearch.vue';
import CustomerSearch from './CustomerSearch.vue';
import FeeKeypad from './FeeKeypad.vue';
import Modal from './Modal.vue';
import MugenScroll from 'vue-mugen-scroll';
import PrintReceipt from './PrintReceipt.vue';
import PrintReceiptHtml from './PrintReceiptHtml.vue';
import CustomerNote from './CustomerNote.vue';

export default {

    name: 'Home',

    components : {
        ProductSearch,
        CustomerSearch,
        Overlay,
        Modal,
        MugenScroll,
        FeeKeypad,
        PrintReceipt,
        PrintReceiptHtml,
        CustomerNote
    },

    data () {
        return {
            showHelp: false,
            productView: 'grid',
            productLoading: false,
            viewVariationPopover: false,
            showModal: false,
            showPaymentReceipt: false,
            products: [],
            filteredProducts: [],
            totalPages: 1,
            page: 1,
            showOverlay: false,
            selectedVariationProduct: {},
            attributeDisabled: true,
            selectedAttribute: {},
            availableGateways: [],
            modalLeftContentHeight: '',
            emptyGatewayDiv: 0,
            cashAmount: '',
            availableTax: [],
            settings: {},
            printdata: {
                gateway: {
                    id: '',
                    title: ''
                },
            },
            createprintreceipt: false,
            orderdata: {
                billing: {},
                shipping: {},
                line_items: [],
                fee_lines: [],
                customer_note: '',
            },
            selectedCategory: '',
            categories: [],
        }
    },
    computed: {
        hotkeys() {
            return {
                'f3': this.toggleProductView,
                'f9': this.initPayment,
                'f10': this.processPayment,
                'f8': this.createNewSale,
                'shift+f8': this.emptyCart,
                'esc': this.backToSale,
                'meta+/': this.openHelp,
                'ctrl+/': this.openHelp
            }
        },
        getFilteredProduct() {
            if ( this.$route.query.category !== undefined ) {
                return  this.products.filter( (product) => {
                    var foundCat = weLo_.find( product.categories, { id : parseInt( this.$route.query.category ) } );
                    return foundCat != undefined && Object.keys(foundCat).length > 0;
                } );
            } else {
                return this.products;
            }
        },
        getSubtotal() {
            var subtotal = 0;
            weLo_.forEach( this.orderdata.line_items, function( item, key ) {
                if ( item.on_sale ) {
                    subtotal += (item.quantity*item.sale_price)
                } else {
                    subtotal += (item.quantity*item.regular_price)
                }
            });

            return subtotal;
        },
        getTotalFee() {
            var fee = 0;
            weLo_.forEach( this.orderdata.fee_lines, function( item, key ) {
                if ( item.type == 'fee' ) {
                    fee += Math.abs(item.total)
                }
            });
            return fee;
        },
        getTotalDiscount() {
            var discount = 0;
            weLo_.forEach( this.orderdata.fee_lines, function( item, key ) {
                if ( item.type == 'discount' ) {
                    discount += Number( Math.abs( item.total ) );
                }
            });

            return discount;
        },
        getTotalTax() {
            var self = this,
                taxLineTotal = 0,
                taxFeeTotal = 0;
            weLo_.forEach( this.orderdata.line_items, function( item, key ) {
                taxLineTotal += Math.abs( item.tax_amount * item.quantity );
            });

            weLo_.forEach( this.orderdata.fee_lines, function( item, key ) {
                if ( item.type == 'fee' ) {
                    if ( item.tax_status == 'taxable' ) {
                        var taxClass = weLo_.find( self.availableTax, { 'class' : item.tax_class } );
                        taxFeeTotal += ( Math.abs(item.total)*Math.abs( taxClass.rate ) )/100;
                    }
                }
            });

            return taxLineTotal + taxFeeTotal;
        },
        getOrderTotal() {
            return (this.getSubtotal + this.getTotalFee + this.getTotalTax );
        },
        getTotal() {
            return this.getOrderTotal-this.getTotalDiscount;
        },
        changeAmount() {
            var returnMoney = this.cashAmount-this.getTotal;
            return returnMoney > 0 ? returnMoney : 0;
        },
        getBreadCrums() {
            if ( this.$route.query.category !== undefined ) {
                var categories = jQuery.extend(true, [], this.categories ),
                    selectedCat = weLo_.find( this.categories, { id: parseInt( this.$route.query.category ) } ),
                    selectedCatIndex = weLo_.findIndex( this.categories, selectedCat );

                var categoriesLoop = categories.splice(0, selectedCatIndex+1);
                var choosenCat = [];
                if ( categoriesLoop.length > 0 ) {
                    for ( var i = categoriesLoop.length-1; i >= 0; i-- ) {
                        if ( choosenCat.length > 0 ) {
                            var foundCat = weLo_.find( categoriesLoop, { id: categoriesLoop[i+1].parent_id } );
                            if ( foundCat != undefined ) {
                                choosenCat.push( foundCat );
                                if (  foundCat.parent_id == null ) {
                                    break
                                }
                            }
                        } else {
                            choosenCat.push( categoriesLoop[i] );
                        }
                    }

                    return choosenCat.slice().reverse();
                }
            }
            return [];
        }
    },

    watch: {
        selectedAttribute( newdata, olddata ) {
            if( Object.keys(newdata).length == this.selectedVariationProduct.attributes.length ) {
                this.attributeDisabled = false;
            }
        },
        '$route.query.order_key'() {
            if ( this.$route.query.order_key != '' && this.$route.query.payment == 'success' ) {
                this.showModal = false;
                this.showPaymentReceipt = true;
            };
        },
        '$route.query.category'() {
            if ( this.$route.query.category != 'undefined' ) {
                this.selectedCategory = weLo_.find( this.categories, { id : parseInt( this.$route.query.category ) } )
            };
        },
    },

    methods: {
        openHelp(e) {
            e.preventDefault();
            this.showHelp = true;
        },
        closeHelp() {
            this.showHelp = false;
        },
        addCustomerNote( note ) {
            this.orderdata.customer_note = note.trim();
        },
        removeBreadcrums() {
            this.$router.push( { name: 'Home' } );
        },
        getLogoutUrl() {
            return wepos.logout_url.toString();
        },
        emptyCart() {
            this.orderdata = {
                billing: {},
                shipping: {},
                line_items: [],
                fee_lines: [],
                customer_note: ''
            };
            this.printdata = {
                gateway: {
                    id: '',
                    title: ''
                },
            };
            this.showPaymentReceipt = false;
            this.cashAmount = '';
        },
        toggleProductView(e) {
            e.preventDefault();
            this.productView = ( this.productView == 'grid' ) ? 'list' : 'grid';
        },
        createNewSale() {
            this.$router.push({
                name: 'Home',
            });
            this.emptyCart();
        },
        ableToProcess() {
            return this.orderdata.line_items.length > 0 && this.isSelectGateway();
        },
        processPayment(e) {
            e.preventDefault();
            if ( ! this.ableToProcess() ) {
                return;
            }
            var self = this,
                gateway = weLo_.find( this.availableGateways, { 'id' : this.orderdata.payment_method } );

            self.orderdata.payment_method_title = gateway.title;
            self.orderdata.meta_data = [
                {
                    key: '_wepos_is_pos_order',
                    value: true
                },
                {
                    key: '_wepos_cash_tendered_amount',
                    value: self.cashAmount.toString()
                },
                {
                    key: '_wepos_cash_change_amount',
                    value: self.changeAmount.toString()
                }
            ];

            var $contentWrap = jQuery('.wepos-checkout-wrapper .right-content').find('.content');
            $contentWrap.block({ message: null, overlayCSS: { background: '#fff url(' + wepos.ajax_loader + ') no-repeat center', opacity: 0.4 } });

            wepos.api.post( wepos.rest.root + wepos.rest.wcversion + '/orders', this.orderdata )
            .done( response => {
                wepos.api.post( wepos.rest.root + wepos.rest.posversion + '/payment/process', response )
                .done( data => {
                    if ( data.result == 'success' ) {
                        this.$router.push({
                            name: 'Home',
                            query: {
                                order_key: response.order_key,
                                payment: 'success'
                            }
                        });
                        this.printdata = {
                            line_items: this.orderdata.line_items,
                            fee_lines: this.orderdata.fee_lines,
                            subtotal: this.getSubtotal,
                            taxtotal: this.getTotalTax,
                            ordertotal: this.getTotal,
                            gateway: {
                                id: response.payment_method,
                                title: response.payment_method_title
                            },
                            order_id: response.id,
                            order_date: response.date_created,
                            cashamount: this.cashAmount.toString(),
                            changeamount: this.changeAmount.toString()
                        }
                    } else {
                        $contentWrap.unblock();
                    }
                }).fail( data => {
                    $contentWrap.unblock();
                    alert( data.responseJSON.message );
                });
            }).fail( response => {
                $contentWrap.unblock();
                alert( response.responseJSON.message );
            } );
        },
        backGatewaySelection() {
            this.orderdata.payment_method = '';
            this.orderdata.payment_method_title = '';
        },
        initPayment() {
            this.showModal = true;
            this.orderdata.payment_method = this.availableGateways[0].id;
        },
        backToSale() {
            // e.preventDefault();
            this.showModal = false;
            this.showHelp = false;
            this.orderdata.payment_method = '';
        },
        isSelectGateway() {
            return !( this.orderdata.payment_method == undefined || this.orderdata.payment_method == '' );
        },
        getProductImage(product) {
            return ( product.images.length > 0 ) ? product.images[0].shop_thumbnail : wepos.placeholder_image;
        },
        getProductImageName(product) {
            return ( product.images.length > 0 ) ? product.images[0].name : product.name;
        },
        setDiscount( value, type ) {
            this.orderdata.fee_lines.push({
                name: this.__( 'Discount', 'wepos' ),
                type: 'discount',
                value: value.toString(),
                isEdit: false,
                discount_type: type,
                tax_status: 'none',
                tax_class: '',
                total: 0
            });
            this.calculateDiscount();
            this.calculateFee();
        },
        saveFee( key ) {
            this.orderdata.fee_lines[key].isEdit = false;
            this.$nextTick(() => {
                jQuery( this.$refs.fee_name ).focus();
            })
        },
        setFee( value, type ) {
            this.orderdata.fee_lines.push({
                name: this.__( 'Fee', 'wepos' ),
                type: 'fee',
                value: value.toString(),
                isEdit: false,
                fee_type: type,
                tax_status: 'none',
                tax_class: '',
                total: 0
            });
            this.calculateFee();
            this.calculateDiscount();
        },
        removeFeeLine( key ) {
            this.orderdata.fee_lines.splice( key, 1 );
        },
        calculateDiscount() {
            if ( this.orderdata.fee_lines.length > 0 ) {
                weLo_.forEach( this.orderdata.fee_lines, ( item,key ) => {
                    if ( item.type == "discount" ) {
                        if ( item.discount_type == 'percent' ) {
                            this.orderdata.fee_lines[key].total = '-' + this.formatNumber( ( this.getOrderTotal*Math.abs( item.value ) )/100 );
                        } else {
                            this.orderdata.fee_lines[key].total = '-' + this.formatNumber( Math.abs( item.value ) );
                        }
                    }
                } );
            }
        },
        calculateFee() {
            if ( this.orderdata.fee_lines.length > 0 ) {
                weLo_.forEach( this.orderdata.fee_lines, ( item,key ) => {
                    if ( item.type == 'fee' ) {
                        if ( item.fee_type == 'percent' ) {
                            this.orderdata.fee_lines[key].total = this.formatNumber( ( this.getOrderTotal*Math.abs( item.value ) )/100 );
                        } else {
                            this.orderdata.fee_lines[key].total = this.formatNumber( Math.abs( item.value ) );
                        }
                    }
                } );
            }
        },
        fetchProducts() {
            if ( this.page == 1 ) {
                this.productLoading = true;
            }

            if ( ( this.totalPages >= this.page ) ) {
                wepos.api.get( wepos.rest.root + wepos.rest.wcversion + '/products?status=publish&per_page=30&page=' + this.page )
                .done( ( response, status, xhr ) => {
                    this.products = this.products.concat( response );
                    this.page += 1;
                    this.totalPages = parseInt( xhr.getResponseHeader('X-WP-TotalPages') );
                    this.productLoading = false;
                }).then( ( response, status, xhr ) => {
                    this.fetchProducts();
                });
            } else {
                this.productLoading = false;
            }
        },
        selectCustomer( customer ) {
            if ( Object.keys( customer ).length > 0 ) {
                this.orderdata.billing = customer.billing;
                this.orderdata.shipping = customer.shipping;
                this.orderdata.customer_id = customer.id;
            } else {
                this.orderdata.billing = {};
                this.orderdata.shipping = {};
                this.orderdata.customer_id = 0;
            }
        },
        selectVariationProduct( product ) {
            this.viewVariationPopover = true;
            this.selectedVariationProduct = product;
        },
        addVariationProduct() {
            var chosenVariationProduct = this.findMatchingVariations( this.selectedVariationProduct.variations, this.selectedAttribute );
            var variationProduct       = chosenVariationProduct[0];
            variationProduct.parent_id = this.selectedVariationProduct.id;
            variationProduct.type      = this.selectedVariationProduct.type;
            variationProduct.name      = this.selectedVariationProduct.name;
            this.selectedAttribute     = {};
            this.attributeDisabled     = true;
            this.addToCart( variationProduct );
        },
        addToCart( product ) {
            var self = this;
            var cartObject = {};

            cartObject.product_id    = ( product.parent_id === 0 ) ? product.id : product.parent_id;
            cartObject.name          = product.name;
            cartObject.quantity      = 1;
            cartObject.regular_price = product.regular_display_price;
            cartObject.sale_price    = product.sales_display_price;
            cartObject.on_sale       = product.on_sale;
            cartObject.attribute     = product.attributes;
            cartObject.variation_id  = ( product.parent_id !== 0 ) ? product.id : 0;
            cartObject.editQuantity  = false;
            cartObject.tax_amount    = product.tax_amount;

            var index = weLo_.findIndex( self.orderdata.line_items, { product_id: cartObject.product_id, variation_id: cartObject.variation_id} );

            if ( index < 0 ) {
                self.orderdata.line_items.push( cartObject );
            } else {
                self.orderdata.line_items[index].quantity += 1;
            }

            this.calculateDiscount();
            this.calculateFee();
        },
        toggleEditQuantity( product, index ) {
            this.orderdata.line_items[index].editQuantity = ! this.orderdata.line_items[index].editQuantity;
        },
        removeItem( key ) {
            this.orderdata.line_items.splice( key, 1 );
            this.calculateDiscount();
            this.calculateFee();
        },
        addQuantity(item) {
            item.quantity++;
            this.calculateDiscount();
            this.calculateFee();
        },
        removeQuantity(item) {
            if ( item.quantity <= 1 ) {
                this.calculateDiscount();
                this.calculateFee();
                return 1;
            }
            item.quantity--;
            this.calculateDiscount();
            this.calculateFee();
        },
        fetchGateway() {
            wepos.api.get( wepos.rest.root + wepos.rest.posversion + '/payment/gateways' )
            .done( response => {
                this.availableGateways = response;
                this.emptyGatewayDiv = 4-(this.availableGateways.length%4);
            });
        },
        truncate( text, length, clamp ) {
            text   = text || '';
            clamp  = clamp || '...';
            length = length || 30;

            if (text.length <= length) return text;

            var tcText = text.slice(0, length - clamp.length);
            var last = tcText.length - 1;

            while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

            // Fix for case when text dont have any `space`
            last = last || length - clamp.length;
            tcText =  tcText.slice(0, last);
            return tcText + clamp;
        },
        unSanitizeString( str ) {
            return str.split('-').map(function capitalize(part) {
                return part.charAt(0).toUpperCase() + part.slice(1);
            }).join(' ');
        },
        fetchSettings() {
            wepos.api.get( wepos.rest.root + wepos.rest.posversion + '/settings' )
            .done( response => {
                this.settings = response;
            });
        },
        fetchTaxes() {
            wepos.api.get( wepos.rest.root + wepos.rest.wcversion + '/taxes' )
            .done( response => {
                this.availableTax = response;
            });
        },
        handleCategorySelect( selectedOption, id ) {
            this.$router.push( { name: 'Home', query: { 'category' : selectedOption.id } } );
        },
        handleCategoryRemove( selectedOption, id ) {
            this.$router.push( { name: 'Home' } );
        },
        fetchCategories() {
            wepos.api.get( wepos.rest.root + wepos.rest.wcversion + '/products/categories?hide_empty=true&_fields=id,name,parent_id' )
            .then( response => {
                response.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                var tree = function (response, root) {
                    var r = [], o = {};
                    response.forEach(function (a) {
                        o[a.id] = { response: a, children: o[a.id] && o[a.id].children };
                        if (a.parent_id === root) {
                            r.push(o[a.id]);
                        } else {
                            o[a.parent_id] = o[a.parent_id] || {};
                            o[a.parent_id].children = o[a.parent_id].children || [];
                            o[a.parent_id].children.push(o[a.id]);
                        }
                    });
                    return r;
                }(response, null);

                var sorted = tree.reduce(function traverse(level) {
                    return function (r, a) {
                        a.response.level = level
                        return r.concat(a.response, (a.children || []).reduce(traverse(level + 1), []));
                    };
                }(0), []);
                this.categories = sorted;

                if ( this.$route.query.category !== undefined ) {
                    this.selectedCategory = weLo_.find( response, { id : parseInt( this.$route.query.category ) } );
                }
            } );
        },
        filterProducts() {
            this.products = this.products.filter( ( product ) => {
                return weLo_.findIndex( product.categories, { id : this.$route.query.category } ) > 0;
            } );
        }
    },

    created() {
        this.fetchSettings();
        this.fetchTaxes();
        this.fetchProducts();
        this.fetchGateway();
        this.fetchCategories();

        if ( typeof(localStorage) != 'undefined' ) {
            var cartdata = JSON.parse( localStorage.getItem('cartdata') );
            this.orderdata = cartdata ? cartdata : this.orderdata;
        }

        window.addEventListener('beforeunload', () => {
            if ( typeof( localStorage ) != 'undefined' ) {
                localStorage.setItem('cartdata', JSON.stringify( this.orderdata ) );
            }
        }, false)
    }
};
</script>

<style lang="less">

#wepos-main {
    padding: 20px;
    display: flex;

    .content-product {
        flex: 2;
        margin-right: 20px;

        .top-panel {
            // display: flex;
            margin-bottom: 20px;

            .search-bar {
                width: 56%;
                margin-right: 2%;
                float:left;

                .search-box {
                    position: relative;

                    input#product-search {
                        width: 100%;
                        font-size: 14px;
                        height: 35px;
                        border: 1px solid #E9EDF0;
                        line-height: 10px;
                        padding-right: 120px;
                        padding-left: 32px;
                        box-sizing: border-box;
                        border-radius: 3px;
                        box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);

                        &::placeholder {
                            color: #999DAC;
                            font-size: 13px;
                        }

                        &:-ms-input-placeholder {
                            color: #999DAC;
                            font-size: 13px;
                        }

                        &::-ms-input-placeholder {
                            color: #999DAC;
                            font-size: 13px;
                        }

                        &:focus {
                            outline: none;
                        }
                    }

                    span.search-icon {
                        position: absolute;
                        left: 10px;
                        top: 8px;
                        color: #3B80F4;
                        height: 10px;

                        &:before {
                            font-size: 14px;
                        }
                    }

                    .search-type {
                        position: absolute;
                        top: 0px;
                        right: 0;

                        a {
                            text-decoration: none;
                            font-size: 13px;
                            display: inline-block;
                            height: 35px;
                            padding: 10px;
                            box-sizing: border-box;
                            margin-left: -2px;
                            color: #BDC0C9;
                            line-height: 14px;

                            &.active {
                                background: #3B80F4;
                                color: #fff;
                            }
                            &:first-child {
                                border-left: 1px solid #E9EBED;
                            }
                            &:last-child {
                                border-top-right-radius: 3px;
                                border-bottom-right-radius: 3px;
                            }
                        }
                    }

                    .search-result {
                        background: #fff;
                        position: absolute;
                        width: 100%;
                        box-sizing: border-box;
                        border: 1px solid #e9edf0;
                        border-top: none;
                        border-bottom-left-radius: 3px;
                        border-bottom-right-radius: 3px;
                        box-shadow: 0 30px 45px -10px rgba(0,0,0,.2);
                        z-index: 999;
                        .no-data-found {
                            padding: 20px;
                            text-align: center;
                            color: #758598;
                        }

                        ul {
                            margin: 0;
                            padding: 0;
                            list-style-type: none;
                            max-height: 300px;
                            overflow: scroll;
                            li {
                                a {
                                    text-decoration: none;
                                    color: #212121;
                                    padding: 8px 10px;
                                    display: block;
                                    border-bottom: 1px solid #e9edf0;

                                    span {
                                        font-size: 11px;
                                        color: #758598;
                                        margin-left: 10px;

                                        &.action {
                                            visibility: hidden;

                                            &:before {
                                                font-size: 12px;
                                            }
                                        }
                                    }

                                    &:hover {
                                        span.action {
                                            visibility: visible;
                                        }
                                    }
                                }

                                &:last-child {
                                    a {
                                        border-bottom: none;
                                    }
                                }

                                &.selected {
                                    background: #f6f7fb;
                                    a {
                                        span.action {
                                            visibility: visible;
                                        }
                                    }
                                }
                            }
                        }

                        .suggession {
                            padding: 12px;
                            background: #F6F7FB;
                            color: #999DAC;
                            font-size: 11px;
                            border-top: 1px solid #ECEEF0;

                            span.term {
                                margin-right: 15px;

                                span {
                                    &:before {
                                        font-size: 9px;
                                        color: #5D5D5D;
                                        margin-right: 2px;
                                    }
                                }

                                strong {
                                    color: #5D5D5D;
                                    margin-right: 2px;
                                }
                            }
                        }
                    }
                }
            }

            .category {
                width: 26%;
                margin-right: 2%;
                float:left;
                position: relative;

                select#product-category {
                    -moz-appearance:none; /* Firefox */
                    -webkit-appearance:none; /* Safari and Chrome */
                    appearance:none;

                    width: 100%;
                    border: 1px solid #E9EDF0;
                    background: #fff;
                    padding: 9px;
                    border-radius: 3px;
                    box-sizing: border-box;
                    font-size: 13px;
                    color: #758598;
                    box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);

                    &:focus {
                        outline: none;
                    }
                }

                span.select-arrow {
                    position: absolute;
                    top: 9px;
                    right: 9px;

                    &:before {
                        font-size: 13px;
                        color: #758598;
                        margin-left: 0px;
                    }
                }

            }
            .toggle-view {
                width: 14%;
                float: left;
                text-align: right;

                .toggle-icon {
                    padding: 8px 10px;
                    background: #fff;
                    display: inline-block;
                    border: 1px solid #E9EDF0;
                    box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);
                    color: #BDC0C9;
                    cursor: pointer;

                    &.active {
                        color: #3B80F4;
                    }

                    &:before {
                        margin-left: 0px;
                        font-size: 13px;
                    }

                    &.list-view {
                        margin-right: -4px;
                        border-right: none;
                    }
                }
            }
        }

        .breadcrumb {
            background: #fff;
            box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);
            padding: 8px 12px;
            position: relative;
            margin-bottom: 20px;

            span.close-breadcrumb {
                position: absolute;
                top: 5px;
                right: 15px;
                color: #9b59b6;
                cursor: pointer;

                &:before {
                    font-size: 9px;
                }
            }

            ul {
                margin: 0px;
                padding: 0px;
                line-height: 16px;

                li {
                    display: inline-block;

                    &:after {
                        font-family: 'Flaticon';
                        content: '\f10b';
                        font-size: 9px;
                        margin-left: 7px;
                        margin-right: 4px;
                        color: #758598;
                    }

                    &:last-child {
                        &:after {
                            content: '';
                        }
                    }

                    a {
                        font-size: 13px;
                        color: #9B59B6;
                        text-decoration: none;
                    }
                }
            }
        }

        .items-wrapper {
            &.grid {
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                margin: 0 -10px;
                overflow: auto;
                height: 84.9vh;
                .item {
                    flex-basis: 20%;
                    -ms-flex: auto;
                    box-sizing: border-box;
                    text-align: center;
                    padding: 0 10px;
                    margin-bottom: 20px;
                    &:focus {
                        outline: none;
                    }
                    .item-wrap {
                        background: #fff;
                        margin-bottom: -2px;
                        cursor: pointer;
                        position: relative;
                        &:focus {
                            outline: none;
                            -webkit-appearance:none
                        }
                        img {
                            width: 100%;
                        }

                        .title {
                            padding: 10px 5px;
                            margin-top: -3px;
                            color: #212121;
                            font-size: 13px;
                            border-top: 1px solid #E9EDF0;
                        }
                        .add-product-icon {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,0.3);
                            visibility: hidden;
                            &:before {
                                color: #fff;
                                font-weight: normal;
                                margin-top: 40%;
                                display: inline-block;
                                font-size: 35px;
                                text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
                            }
                        }

                        &:hover {
                            .add-product-icon {
                                visibility: visible;
                            }
                        }
                    }
                }
            }
            &.list {
                overflow: auto;
                height: 84.9vh;
                .item {
                    .item-wrap {
                        background: #fff;
                        overflow: hidden;
                        position: relative;
                        margin-bottom: 20px;
                        cursor: pointer;
                        border-radius: 3px;
                        box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);
                        .img {
                            width: 100px;
                            height: 80px;
                            float: left;
                            margin-right: 20px;
                            border-right: 1px solid #F0F2F4;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .title {
                            float: left;
                            height: 100%;
                            line-height: 80px;
                            font-size: 14px;
                            font-weight: bold;
                        }
                        .add-product-icon {
                            position: absolute;
                            top: 35%;
                            right: 3%;
                            &:before {
                                color: #1A9ED4;
                                font-weight: normal;
                            }
                        }
                    }
                }
            }
            .product-loading {
                display: block;
                position: relative;
                width: 100%;
                padding: 10px;
                text-align: center;
                font-size: 16px;
                color: #c6cace;
            }
            .no-product-found {
                text-align: center;
                width: 100%;
                vertical-align: middle;
                margin: auto 0px;

                p {
                    font-size: 18px;
                    color: #c6cace;
                }
            }
        }
    }

    .content-cart {
        flex: 1.3;
        height: 94.5vh;

        .top-panel {
            display: flex;

            .customer-search-box {
                flex: 7;
                position: relative;

                input#customer-search {
                    width: 100%;
                    padding: 10px;
                    height: 33px;
                    font-size: 14px;
                    height: 35px;
                    border: 1px solid #E9EDF0;
                    line-height: 10px;
                    padding-left: 35px;
                    box-sizing: border-box;
                    border-radius: 3px;
                    box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);

                    &::placeholder {
                        color: #999DAC;
                        font-size: 13px;
                    }

                    &:-ms-input-placeholder {
                        color: #999DAC;
                        font-size: 13px;
                    }

                    &::-ms-input-placeholder {
                        color: #999DAC;
                        font-size: 13px;
                    }

                    &:focus {
                        outline: none;
                    }
                }

                span.add-new-customer {
                    position: absolute;
                    top: 9px;
                    right: 10px;

                    &:before {
                        font-size: 15px;
                        color: #BDC0C9;
                        cursor: pointer;
                    }
                }

                .search-result {
                    background: #fff;
                    position: absolute;
                    width: 100%;
                    z-index: 99;
                    box-sizing: border-box;
                    border: 1px solid #e9edf0;
                    border-top: none;
                    border-bottom-left-radius: 3px;
                    border-bottom-right-radius: 3px;
                    box-shadow: 0 30px 45px -10px rgba(0,0,0,.2);

                    .no-data-found {
                        padding: 20px;
                        text-align: center;
                        color: #758598;
                    }

                    ul {
                        margin: 0;
                        padding: 0;
                        list-style-type: none;
                        max-height: 300px;
                        overflow: scroll;
                        li {
                            a {
                                text-decoration: none;
                                color: #212121;
                                padding: 8px 10px;
                                display: block;
                                border-bottom: 1px solid #e9edf0;

                                span {
                                    font-size: 13px;
                                    color: #758598;
                                    margin-left: 10px;

                                    &.avatar {
                                        img {
                                            width: 20px;
                                            border-radius: 20px;
                                        }
                                    }

                                    &.name {
                                        font-size: 14px;
                                        color: #212121;
                                        margin-left: 6px;
                                        line-height: 18px;
                                    }

                                    &.action {
                                        visibility: hidden;

                                        &:before {
                                            font-size: 12px;
                                        }
                                    }
                                }

                                &:hover {
                                    span.action {
                                        visibility: visible;
                                    }
                                }
                            }

                            &:last-child {
                                a {
                                    border-bottom: none;
                                }
                            }
                            &.selected {
                                background: #f6f7fb;
                                a {
                                    span.action {
                                        visibility: visible;
                                    }
                                }
                            }
                        }
                    }

                    .suggession {
                        padding: 12px;
                        background: #F6F7FB;
                        color: #999DAC;
                        font-size: 11px;
                        border-top: 1px solid #ECEEF0;

                        span.term {
                            margin-right: 15px;

                            span {
                                &:before {
                                    font-size: 9px;
                                    color: #5D5D5D;
                                    margin-right: 2px;
                                }
                            }

                            strong {
                                color: #5D5D5D;
                                margin-right: 2px;
                            }
                        }
                    }
                }


                svg.customer-icon {
                    position: absolute;
                    left: 10px;
                    top: 8px;
                }
            }

            .action {
                flex: 1;

                .more-options {
                    text-align: right;

                    span.more-icon {
                        &:before {
                            font-size: 13px;
                            color: #BDC0C9;
                        }
                    }
                }
            }
        }

        .cart-panel {
            background: #fff;
            margin-top: 20px;
            height: 90%;
            box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);
            position: relative;
            display: flex;
            flex-flow: column wrap;
            border-radius: 3px;

            .cart-calculation {
                width: 100%;
                flex-grow: 0;

                table.cart-total-table {
                    width: 100%;
                    border-collapse: collapse;

                    tbody {
                        tr {
                            border-bottom: 1px solid #ECEEF0;
                            height: 35px;
                            display: table-row;
                            line-height: 20px;

                            &:first-child {
                                border-top: 1px solid #ECEEF0;
                            }

                            &:last-child {
                                border-bottom: none;
                            }

                            &:nth-child(odd) {
                                background: #FAFBFE;
                            }

                            td {
                                padding: 9px 12px;
                                font-weight: bold;
                                line-height: 20px;

                                &:last-child {
                                    text-align: right;
                                }

                                &.label {
                                    width: 45%;
                                }
                                &.price {
                                    width: 45%;
                                    text-align: right;
                                }
                                &.action {
                                    width: 6%;

                                    span {
                                        &:before {
                                            font-size: 7px;
                                            padding: 5px;
                                            border-radius: 50px;
                                            cursor: pointer;
                                            background: #BDC0C9;
                                            color: #FFFFFF;
                                            border: none;
                                        }

                                        &:hover {
                                            &:before {
                                                background: #E9485E;
                                                color: #FFFFFF;
                                                border: none;
                                            }
                                        }
                                    }
                                }
                            }

                            &.cart-action {
                                td {
                                    text-align: left;

                                    a {
                                        text-decoration: none;
                                        color: #3B80F4;
                                        font-size: 12px;
                                        padding: 5px 8px;
                                        background: #fff;
                                        border: 1px solid #E0E5EA;
                                        border-radius: 3px;
                                        margin-right: 5px;
                                    }
                                }
                            }

                            &.cart-meta-data {
                                td {
                                    &.label {
                                        span.name {
                                            color: #758598;
                                            font-size: 12px;
                                            margin-left: 5px;
                                            font-weight: normal;
                                        }
                                        label {
                                            font-weight: normal;
                                            margin-right: 5px;
                                        }
                                        .fee-name {
                                            width: 20%;
                                        }
                                        .fee-amount {
                                            width: 10%;
                                            margin-right: 5px;
                                        }
                                        select.fee-tax-class {
                                            width: 22%;
                                            border: 1px solid #E9EBED;
                                            background: #fff;
                                            border-radius: 3px;
                                            padding: 5px 5px;
                                            height: 24px;
                                            &:focus {
                                                outline: none;
                                            }
                                        }

                                    }
                                    input[type=text],
                                    input[type=number] {
                                        border: 1px solid #ECEEF0;
                                        border-radius: 3px;
                                        padding: 5px 8px;
                                        width: 50%;

                                        &:focus {
                                            outline: none;
                                            -webkit-appearance:none;
                                        }

                                        &::placeholder {
                                            color: #999DAC;
                                            font-size: 13px;
                                        }

                                        &:-ms-input-placeholder {
                                            color: #999DAC;
                                            font-size: 13px;
                                        }

                                        &::-ms-input-placeholder {
                                            color: #999DAC;
                                            font-size: 13px;
                                        }
                                    }
                                    button {
                                        border: 1px solid #3B80F4;
                                        background: #3B80F4;
                                        color: #fff;
                                        padding: 5px 8px;
                                        border-radius: 3px;
                                        cursor: pointer;
                                        margin-left: 5px;

                                        &:disabled {
                                            background: #76A2ED;
                                            border-color: #76A2ED;
                                        }
                                    }
                                }
                            }

                            &.note {
                                .note-text {
                                    font-weight: normal;
                                }
                            }

                            &.pay-now {
                                background: #1ABC9C;
                                color: #fff;
                                cursor: pointer;
                                font-size: 16px;

                                td {
                                    padding: 18px 10px 18px 12px;
                                    &.amount {
                                        text-align: right;
                                    }
                                    &.icon {
                                        padding: 0px 5px;
                                        text-align: left;
                                        line-height: 25px;
                                    }
                                }
                            }

                        }
                    }
                }
            }

            .cart-content {
                flex: 5;
                overflow-x: scroll;
                table.cart-table {
                    width: 100%;
                    border-collapse: collapse;

                    thead {
                        tr {
                            text-align: left;
                            border-bottom: 1px solid #ECEEF0;
                            box-shadow: 0 3px 15px 0px rgba(0,0,0,.04);
                            color: #3B80F4;
                            font-size: 13px;

                            th {
                                padding: 8px 12px;
                                line-height: 19px;
                            }
                        }
                    }

                    tbody {
                        tr {
                            border-bottom: 1px solid #eceef0;
                            height: 35px;
                            display: table-row;
                            line-height: 20px;

                            &.no-item {
                                height: 55vh;
                                border-bottom: none;
                                text-align: center;

                                p {
                                    color: #C6CACE;
                                    font-size: 17px;
                                }
                            }

                            td {
                                padding: 8px 12px;
                                font-size: 13px;

                                &.name {
                                    font-weight: bold;

                                    .attribute {
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

                                &.price {
                                    span {
                                        display: block;

                                        &.regular-price {
                                            font-size: 11px;
                                            text-decoration: line-through;
                                            color: #9095A5;
                                            padding-left: 5px;
                                        }
                                    }
                                }

                                &.action, &.remove {
                                    span {
                                        &:before {
                                            font-size: 8px;
                                            background: #BDC0C9;
                                            color: #fff;
                                            border-radius: 50px;
                                            border: .84px solid #BDC0C9;
                                            cursor: pointer;
                                            display: inline-block;
                                            width: 20px;
                                            text-align: center;
                                        }

                                        &.open {
                                            &:before {
                                                -webkit-transform: rotate(90deg);
                                                -moz-transform: rotate(90deg);
                                                -o-transform: rotate(90deg);
                                                -ms-transform: rotate(90deg);
                                                transform: rotate(89deg);
                                                background: #3b80f4;
                                                border: .84px solid #3b80f4;
                                            }
                                        }
                                    }
                                }

                                &.remove {
                                    span {
                                        &:before {
                                            color: #FFFFFF;
                                            border: none;
                                        }

                                        &:hover {
                                            &:before {
                                                background: #E9485E;
                                                color: #FFFFFF;
                                                border: none;
                                            }
                                        }
                                    }
                                }
                            }

                            &.update-quantity-wrap {
                                td {
                                    padding: 10px;
                                    background: #F6F7FB;
                                    span {
                                        margin-right: 5px;

                                        input[type=number] {
                                            -webkit-appearance: none;
                                            outline: none;
                                            border: 1px solid #ECEEF0;
                                            padding: 5px;
                                            font-size: 13px;
                                            border-radius: 3px;
                                            width: 60px;
                                            margin-right: 5px;

                                            &::-webkit-inner-spin-button,
                                            &::-webkit-outer-spin-button {
                                                -webkit-appearance: none;
                                                margin: 0;
                                            }
                                        }

                                        &.qty-action {
                                            a {
                                                text-decoration: none;
                                                display: inline-block;
                                                font-size: 18px;
                                                font-weight: bold;
                                                color: #999DAC;
                                                background: #fff;
                                                margin-right: 3px;
                                                width: 25px;
                                                height: 23px;
                                                text-align: center;
                                                border-radius: 3px;
                                                border: 1px solid #ECEEF0;

                                                &.add {
                                                    color: #fff;
                                                    background: #3B80F4;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .wepos-help-wrapper {
        padding: 15px 20px;
        margin-top: 20px;
        h2 {
            margin: 0px;
            padding: 0px 0px 15px;
            margin-bottom: 15px;
            border-bottom: 1px solid #ECEEF0;
            color: #C6CACE;
            font-weight: normal;
        }

        ul {
            margin: 0px;
            padding: 0px;
            list-style: none;

            li {
                display: inline-block;
                width: 48%;
                margin-right: 2%;
                margin-bottom: 20px;

                &:nth-child(even) {
                    margin-right: 0px;
                }

                span {
                    display: block;

                    &.code {
                        float: left;
                        width: 40%;
                        color: #758598;
                        font-size: 15px;
                    }

                    &.title {
                        float: left;
                        display: block;
                        width: 58%;
                    }
                }
            }
        }

    }
}
</style>
