pluginWebpack([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Modal_vue__ = __webpack_require__(27);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_54348248_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Modal_vue__ = __webpack_require__(81);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(80)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Modal_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_54348248_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Modal_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/Modal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54348248", Component.options)
  } else {
    hotAPI.reload("data-v-54348248", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'App'
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Overlay_vue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProductInlineSearch_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomerSearch_vue__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DiscountKeypad_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Modal_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_mugen_scroll__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_mugen_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_mugen_scroll__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Home',

    components: {
        ProductInlineSearch: __WEBPACK_IMPORTED_MODULE_1__ProductInlineSearch_vue__["a" /* default */],
        CustomerSearch: __WEBPACK_IMPORTED_MODULE_2__CustomerSearch_vue__["a" /* default */],
        Overlay: __WEBPACK_IMPORTED_MODULE_0__Overlay_vue__["a" /* default */],
        Modal: __WEBPACK_IMPORTED_MODULE_4__Modal_vue__["a" /* default */],
        MugenScroll: __WEBPACK_IMPORTED_MODULE_5_vue_mugen_scroll___default.a,
        DiscountKeypad: __WEBPACK_IMPORTED_MODULE_3__DiscountKeypad_vue__["a" /* default */]
    },

    data() {
        return {
            productView: 'grid',
            productLoading: false,
            togglePopover: true,
            showModal: false,
            showPaymentReceipt: false,
            products: [],
            totalPages: 0,
            page: 1,
            showOverlay: false,
            selectedVariationProduct: {},
            attributeDisabled: true,
            selectedAttribute: {},
            availableGateways: [],
            modalLeftContentHeight: '',
            emptyGatewayDiv: 0,
            cashAmount: '',
            showCustomerNote: false,
            availableTax: [],
            settings: {},
            orderdata: {
                billing: {},
                shipping: {},
                line_items: [],
                fee_lines: [],
                customer_note: ''
            }
        };
    },
    computed: {
        getSubtotal() {
            var subtotal = 0;
            weLo_.forEach(this.orderdata.line_items, function (item, key) {
                if (item.on_sale) {
                    subtotal += item.quantity * item.sale_price;
                } else {
                    subtotal += item.quantity * item.regular_price;
                }
            });

            return subtotal;
        },

        getTotalFee() {
            var fee = 0;
            weLo_.forEach(this.orderdata.fee_lines, function (item, key) {
                if (item.type == 'fee') {
                    fee += Math.abs(item.total);
                }
            });
            return fee;
        },

        getTotalDiscount() {
            var discount = 0;
            weLo_.forEach(this.orderdata.fee_lines, function (item, key) {
                if (item.type == 'discount') {
                    discount += Math.abs(item.total);
                }
            });
            return discount;
        },

        getTotalTax() {
            var self = this,
                taxLineTotal = 0,
                taxFeeTotal = 0;
            weLo_.forEach(this.orderdata.line_items, function (item, key) {
                taxLineTotal += Math.abs(item.tax_amount * item.quantity);
            });

            weLo_.forEach(this.orderdata.fee_lines, function (item, key) {
                if (item.type == 'fee') {
                    if (item.tax_status == 'taxable') {
                        var taxClass = weLo_.find(self.availableTax, { 'class': item.tax_class });
                        taxFeeTotal += Math.abs(item.total) * Math.abs(taxClass.rate) / 100;
                    }
                }
            });

            return taxLineTotal + taxFeeTotal;
        },

        getTotal() {
            return this.getSubtotal + this.getTotalFee + this.getTotalTax - this.getTotalDiscount;
        },

        changeAmount() {
            var returnMoney = this.cashAmount - this.getTotal;
            return returnMoney > 0 ? returnMoney : 0;
        }
    },

    watch: {
        selectedAttribute(newdata, olddata) {
            if (Object.keys(newdata).length == this.selectedVariationProduct.attributes.length) {
                this.attributeDisabled = false;
            }
        },
        '$route.query.order_key'() {
            if (this.$route.query.order_key != '' && this.$route.query.payment == 'success') {
                this.showModal = false;
                this.showPaymentReceipt = true;
            };
        }
    },

    methods: {
        createNewSale() {
            this.$router.push({
                name: 'Home'
            });
            this.orderdata = {
                billing: {},
                shipping: {},
                line_items: [],
                fee_lines: []
            };
            this.showPaymentReceipt = false;
            this.cashAmount = '';
        },
        ableToProcess() {
            return this.orderdata.line_items.length > 0 && this.isSelectGateway();
        },
        processPayment() {
            var self = this,
                gateway = weLo_.find(this.availableGateways, { 'id': this.orderdata.payment_method });

            self.orderdata.payment_method_title = gateway.title;
            self.orderdata.meta_data = [{
                key: '_wepos_is_pos_order',
                value: true
            }, {
                key: '_wepos_cash_tendered_amount',
                value: self.cashAmount.toString()
            }, {
                key: '_wepos_cash_change_amount',
                value: self.changeAmount.toString()
            }];

            // var $contentWrap = jQuery('.wepos-checkout-wrapper .right-content').find('.payment-option');
            // $contentWrap.block({ message: null, overlayCSS: { background: '#fff url(' + wepos.ajax_loader + ') no-repeat center', opacity: 0.4 } });

            // wepos.api.post( wepos.rest.root + wepos.rest.wcversion + '/orders', this.orderdata )
            // .done( response => {
            //     wepos.api.post( wepos.rest.root + wepos.rest.posversion + '/payment/process', response )
            //     .done( data => {
            //         if ( data.result == 'success' ) {
            //             this.$router.push({
            //                 name: 'Home',
            //                 query: {
            //                     order_key: response.order_key,
            //                     payment: 'success'
            //                 }
            //             });
            //         } else {
            //             $contentWrap.unblock();
            //         }
            //     }).fail( data => {
            //         $contentWrap.unblock();
            //         alert( data.responseJSON.message );
            //     });

            //     $contentWrap.unblock();
            // }).fail( response => {
            //     $contentWrap.unblock();
            //     alert( response.responseJSON.message );
            // } );
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
            this.showModal = false;
            this.orderdata.payment_method = '';
        },
        isSelectGateway() {
            return !(this.orderdata.payment_method == undefined || this.orderdata.payment_method == '');
        },
        getProductImage(product) {
            return product.images.length > 0 ? product.images[0].src : wepos.placeholder_image;
        },

        getProductImageName(product) {
            return product.images.length > 0 ? product.images[0].name : product.name;
        },
        addFee(type) {
            this.orderdata.fee_lines.push({
                name: '',
                total: '0',
                isEdit: true,
                type: type,
                tax_status: 'none',
                tax_class: 'standard'
            });
        },
        addCustomerNote() {},
        setFee(key, type) {
            this.orderdata.fee_lines[key].isEdit = false;
            if ('discount' == this.orderdata.fee_lines[key].type) {
                this.orderdata.fee_lines[key].total = '-' + Math.abs(this.orderdata.fee_lines[key].total).toString();
            } else {
                this.orderdata.fee_lines[key].total = Math.abs(this.orderdata.fee_lines[key].total).toString();
            }
        },
        removeFee(key) {
            this.orderdata.fee_lines.splice(key, 1);
        },

        fetchProducts() {
            this.productLoading = true;
            if (this.totalPages >= this.page || this.totalPages === 0) {
                wepos.api.get(wepos.rest.root + wepos.rest.wcversion + '/products?per_page=30&page=' + this.page).done((response, status, xhr) => {
                    this.products = this.products.concat(response);
                    this.page += 1;
                    this.totalPages = parseInt(xhr.getResponseHeader('X-WP-TotalPages'));
                    this.productLoading = false;
                });
            } else {
                this.productLoading = false;
            }
        },
        selectCustomer(customer) {
            if (Object.keys(customer).length > 0) {
                this.orderdata.billing = customer.billing;
                this.orderdata.shipping = customer.shipping;
                this.orderdata.customer_id = customer.id;
            } else {
                this.orderdata.billing = {};
                this.orderdata.shipping = {};
                this.orderdata.customer_id = 0;
            }
        },

        selectVariationProduct(product) {
            this.togglePopover = true;
            this.selectedVariationProduct = product;
        },

        addVariationProduct() {
            var chosenVariationProduct = this.findMatchingVariations(this.selectedVariationProduct.variations, this.selectedAttribute);
            var variationProduct = chosenVariationProduct[0];
            variationProduct.parent_id = this.selectedVariationProduct.id;
            variationProduct.type = this.selectedVariationProduct.type;
            variationProduct.name = this.selectedVariationProduct.name;
            this.togglePopover = false;

            this.addToCart(variationProduct);
        },
        addToCart(product) {
            var self = this;
            var cartObject = {};

            cartObject.product_id = product.parent_id === 0 ? product.id : product.parent_id;
            cartObject.name = product.name;
            cartObject.quantity = 1;
            cartObject.regular_price = product.regular_display_price;
            cartObject.sale_price = product.sales_display_price;
            cartObject.on_sale = product.on_sale;
            cartObject.attribute = product.attributes;
            cartObject.variation_id = product.parent_id !== 0 ? product.id : 0;
            cartObject.editQuantity = false;
            cartObject.tax_amount = product.tax_amount;

            var index = weLo_.findIndex(self.orderdata.line_items, { product_id: cartObject.product_id, variation_id: cartObject.variation_id });

            if (index < 0) {
                self.orderdata.line_items.push(cartObject);
            } else {
                self.orderdata.line_items[index].quantity += 1;
            }
        },
        toggleEditQuantity(product, index) {
            this.orderdata.line_items[index].editQuantity = !this.orderdata.line_items[index].editQuantity;
        },
        removeItem(key) {
            this.orderdata.line_items.splice(key, 1);
        },
        removeQuantity(item) {
            if (item.quantity <= 1) {
                return 1;
            }

            return item.quantity--;
        },
        fetchGateway() {
            wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/payment/gateways').done(response => {
                this.availableGateways = response;
                this.emptyGatewayDiv = 4 - this.availableGateways.length % 4;
            });
        },
        truncate(text, length, clamp) {
            text = text || '';
            clamp = clamp || '...';
            length = length || 30;

            if (text.length <= length) return text;

            var tcText = text.slice(0, length - clamp.length);
            var last = tcText.length - 1;

            while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

            // Fix for case when text dont have any `space`
            last = last || length - clamp.length;
            tcText = tcText.slice(0, last);
            return tcText + clamp;
        },
        unSanitizeString(str) {
            return str.split('-').map(function capitalize(part) {
                return part.charAt(0).toUpperCase() + part.slice(1);
            }).join(' ');
        },
        fetchSettings() {
            wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/settings').done(response => {
                this.settings = response;
            });
        },
        fetchTaxes() {
            wepos.api.get(wepos.rest.root + wepos.rest.wcversion + '/taxes').done(response => {
                this.availableTax = response;
            });
        }
    },

    created() {
        this.fetchSettings();
        this.fetchTaxes();
        this.fetchProducts();
        this.fetchGateway();
    }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'Overlay',

    props: {
        show: {
            type: Boolean
        }
    }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal_vue__ = __webpack_require__(15);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'ProductInlineSearch',

    components: {
        Modal: __WEBPACK_IMPORTED_MODULE_0__Modal_vue__["a" /* default */]
    },

    data() {
        return {
            showResults: false,
            showVariationModal: false,
            mode: 'scan',
            serachInput: '',
            products: [],
            selectedVariationProduct: {},
            attributeDisabled: true,
            chosenAttribute: {},
            zindex: false
        };
    },

    computed: {
        placeholder() {
            return this.mode == 'scan' ? 'Scan your product' : 'Search product by typing';
        }
    },

    watch: {
        chosenAttribute(newdata, olddata) {
            if (Object.keys(newdata).length == this.selectedVariationProduct.attributes.length) {
                this.attributeDisabled = false;
            }
        }
    },

    methods: {
        triggerFocus() {
            this.showResults = true;
            this.$emit('onfocus');
        },
        outside() {
            this.showResults = false;
            this.$emit('onblur');
        },
        changeMode(mode) {
            this.mode = mode;
        },
        searchProduct() {
            if (this.serachInput) {
                wepos.api.get(wepos.rest.root + wepos.rest.wcversion + '/products?search=' + this.serachInput).done(response => {
                    this.products = response;
                });
            }
        },

        selectVariation(product) {
            this.selectedVariationProduct = product;
            this.showVariationModal = true;
        },

        addVariationProduct() {
            var chosenVariationProduct = this.findMatchingVariations(this.selectedVariationProduct.variations, this.chosenAttribute);
            var variationProduct = chosenVariationProduct[0];
            variationProduct.parent_id = this.selectedVariationProduct.id;
            variationProduct.type = this.selectedVariationProduct.type;
            variationProduct.name = this.selectedVariationProduct.name;

            this.$emit('onProductAdded', variationProduct);
            this.showVariationModal = false;
            this.chosenAttribute = {};
        },

        addToCartAction(product) {
            this.$emit('onProductAdded', product);
        }

    }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Modal',

    props: {

        footer: {
            type: Boolean,
            required: false,
            default: false
        },
        header: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        width: {
            type: String,
            required: false,
            default: '600px'
        },
        height: {
            type: String,
            required: false,
            default: '300px'
        }
    },

    data() {
        return {};
    }
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal_vue__ = __webpack_require__(15);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'CustomerSearch',

    components: {
        Modal: __WEBPACK_IMPORTED_MODULE_0__Modal_vue__["a" /* default */]
    },

    data() {
        return {
            submitDisable: false,
            customers: [],
            customer: {},
            showCustomerResults: false,
            serachInput: '',
            showNewCustomerModal: false
        };
    },

    methods: {
        triggerFocus() {
            this.showCustomerResults = true;
            this.$emit('onfocus');
        },
        onblur() {
            this.showCustomerResults = false;
            this.$emit('onblur');
        },
        searchCustomer() {
            if (this.serachInput) {
                wepos.api.get(wepos.rest.root + wepos.rest.wcversion + '/customers?search=' + this.serachInput).done(response => {
                    this.customers = response;
                });
            } else {
                this.$emit('onCustomerSelected', {});
            }
        },
        selectCustomer(customer) {
            this.$emit('onCustomerSelected', customer);
            this.serachInput = customer.first_name + ' ' + customer.last_name;
            this.showCustomerResults = false;
        },
        createCustomer() {
            if (this.customer.email) {
                var customerData = {
                    email: this.customer.email,
                    first_name: this.customer.first_name,
                    last_name: this.customer.last_name,
                    billing: {
                        first_name: this.customer.first_name,
                        last_name: this.customer.last_name,
                        address_1: this.customer.address_1,
                        address_2: this.customer.address_2,
                        phone: this.customer.phone,
                        email: this.customer.email
                    }
                };
                wepos.api.post(wepos.rest.root + wepos.rest.wcversion + '/customers', customerData).done(response => {
                    this.serachInput = response.first_name + ' ' + response.last_name;
                    this.$emit('onCustomerSelected', response);
                    this.showNewCustomerModal = false;
                    this.customer = {};
                }).fail(response => {
                    alert(response.responseJSON.message);
                });
            } else {
                alert('Please enter an email address for customer');
            }
        }
    }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_keyboard__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_keyboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_keyboard__);
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'DiscountKeypad',

    props: {
        orderTotal: {
            type: Number,
            required: false,
            default: 0
        }
    },

    components: {
        keyboard: __WEBPACK_IMPORTED_MODULE_0_vue_keyboard___default.a
    },

    data() {
        return {
            keyboardBtn: ''
        };
    }
});

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Profile',

    data() {
        return {};
    }
});

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(69);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(72);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Vue from 'vue'
var Vue = wepos_get_lib('Vue');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#vue-frontend-app',
    router: _router2.default,
    render: function render(h) {
        return h(_App2.default);
    }
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(23);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_152fd186_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(71);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(70)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_152fd186_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-152fd186", Component.options)
  } else {
    hotAPI.reload("data-v-152fd186", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 70 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "vue-frontend-app" } },
    [_c("router-view")],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-152fd186", esExports)
  }
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Home = __webpack_require__(73);

var _Home2 = _interopRequireDefault(_Home);

var _Profile = __webpack_require__(94);

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = wepos_get_lib('Vue');
var Router = wepos_get_lib('Router');

Vue.use(Router);

exports.default = new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: _Home2.default
    }, {
        path: '/profile',
        name: 'Profile',
        component: _Profile2.default
    }]
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(24);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76253014_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(93);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(74)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76253014_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/Home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76253014", Component.options)
  } else {
    hotAPI.reload("data-v-76253014", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Overlay_vue__ = __webpack_require__(25);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b9b24aa_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Overlay_vue__ = __webpack_require__(77);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(76)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Overlay_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b9b24aa_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Overlay_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/Overlay.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b9b24aa", Component.options)
  } else {
    hotAPI.reload("data-v-7b9b24aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 76 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.show ? _c("div", { staticClass: "overlay" }) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7b9b24aa", esExports)
  }
}

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductInlineSearch_vue__ = __webpack_require__(26);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_74453d0b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProductInlineSearch_vue__ = __webpack_require__(82);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(79)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductInlineSearch_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_74453d0b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProductInlineSearch_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/ProductInlineSearch.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74453d0b", Component.options)
  } else {
    hotAPI.reload("data-v-74453d0b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wepos-modal-dialog" }, [
    _c("div", { staticClass: "wepos-modal" }, [
      _c(
        "div",
        {
          staticClass: "wepos-modal-content",
          style: { width: _vm.width, height: _vm.height }
        },
        [
          _c(
            "section",
            { class: ["wepos-modal-main", { "has-footer": _vm.footer }] },
            [
              _vm.header
                ? _c(
                    "header",
                    { staticClass: "modal-header" },
                    [_vm._t("header", [_c("h1", [_vm._v(_vm._s(_vm.title))])])],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [_vm._t("body")], 2),
              _vm._v(" "),
              _vm.footer
                ? _c("footer", { staticClass: "modal-footer" }, [
                    _c("div", { staticClass: "inner" }, [_vm._t("footer")], 2)
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("span", {
                staticClass:
                  "modal-close modal-close-link flaticon-cancel-music",
                on: {
                  click: function($event) {
                    _vm.$emit("close")
                  }
                }
              })
            ]
          )
        ]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "wepos-modal-backdrop" })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-54348248", esExports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "click-outside",
          rawName: "v-click-outside",
          value: _vm.outside,
          expression: "outside"
        }
      ],
      staticClass: "search-box"
    },
    [
      _c("form", { attrs: { action: "", autocomplete: "off" } }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.serachInput,
              expression: "serachInput"
            }
          ],
          attrs: {
            type: "text",
            name: "search",
            id: "product-search",
            placeholder: _vm.placeholder
          },
          domProps: { value: _vm.serachInput },
          on: {
            focus: function($event) {
              $event.preventDefault()
              _vm.triggerFocus($event)
            },
            keyup: _vm.searchProduct,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.serachInput = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _vm.mode == "product"
          ? _c("span", { staticClass: "search-icon flaticon-musica-searcher" })
          : _vm._e(),
        _vm._v(" "),
        _vm.mode == "scan"
          ? _c("span", {
              staticClass: "search-icon flaticon-supermarket-scanner"
            })
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "search-type" }, [
          _c(
            "a",
            {
              class: { active: _vm.mode == "product" },
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.changeMode("product")
                }
              }
            },
            [_vm._v("Product")]
          ),
          _vm._v(" "),
          _c(
            "a",
            {
              class: { active: _vm.mode == "scan" },
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.changeMode("scan")
                }
              }
            },
            [_vm._v("Scan")]
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showResults,
                expression: "showResults"
              }
            ],
            staticClass: "search-result"
          },
          [
            _vm.products.length
              ? _c(
                  "ul",
                  _vm._l(_vm.products, function(product) {
                    return _c(
                      "li",
                      [
                        product.type == "simple"
                          ? [
                              _c(
                                "a",
                                {
                                  staticClass: "wepos-clearfix",
                                  attrs: { href: "#" },
                                  on: {
                                    click: function($event) {
                                      _vm.addToCartAction(product)
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(product.name) +
                                      "\n                            "
                                  ),
                                  _c("span", { staticClass: "price" }, [
                                    _vm._v(
                                      _vm._s(_vm.formatPrice(product.price))
                                    )
                                  ]),
                                  _vm._v(" "),
                                  product.sku
                                    ? _c("span", { staticClass: "sku" }, [
                                        _vm._v(_vm._s(product.sku))
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("span", {
                                    staticClass:
                                      "action flaticon-enter-arrow wepos-right"
                                  })
                                ]
                              )
                            ]
                          : _vm._e(),
                        _vm._v(" "),
                        product.type == "variable"
                          ? [
                              _c(
                                "a",
                                {
                                  attrs: { href: "#" },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.selectVariation(product)
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    _vm._s(product.name) +
                                      "\n                            "
                                  ),
                                  _c("span", { staticClass: "price" }, [
                                    _vm._v(
                                      _vm._s(_vm.formatPrice(product.price))
                                    )
                                  ]),
                                  _vm._v(" "),
                                  product.sku
                                    ? _c("span", { staticClass: "sku" }, [
                                        _vm._v(_vm._s(product.sku))
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("span", {
                                    staticClass:
                                      "action flaticon-enter-arrow wepos-right"
                                  })
                                ]
                              )
                            ]
                          : _vm._e()
                      ],
                      2
                    )
                  })
                )
              : _c("div", { staticClass: "no-data-found" }, [
                  _vm._v("\n                No product found\n            ")
                ]),
            _vm._v(" "),
            _vm._m(0)
          ]
        )
      ]),
      _vm._v(" "),
      _vm.showVariationModal
        ? _c(
            "modal",
            {
              attrs: {
                title: "Select Variations",
                width: "500px",
                height: "auto",
                footer: true,
                header: true
              },
              on: {
                close: function($event) {
                  _vm.showVariationModal = false
                }
              }
            },
            [
              _c(
                "template",
                { slot: "body" },
                _vm._l(_vm.selectedVariationProduct.attributes, function(
                  attribute
                ) {
                  return _c(
                    "div",
                    { staticClass: "variation-attribute-wrapper" },
                    [
                      _c("div", { staticClass: "attribute" }, [
                        _c("p", [_vm._v(_vm._s(attribute.name))]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "options" },
                          [
                            _vm._l(attribute.options, function(option) {
                              return [
                                _c("label", [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value:
                                          _vm.chosenAttribute[attribute.name],
                                        expression:
                                          "chosenAttribute[attribute.name]"
                                      }
                                    ],
                                    attrs: { type: "radio" },
                                    domProps: {
                                      value: option,
                                      checked: _vm._q(
                                        _vm.chosenAttribute[attribute.name],
                                        option
                                      )
                                    },
                                    on: {
                                      change: function($event) {
                                        _vm.$set(
                                          _vm.chosenAttribute,
                                          attribute.name,
                                          option
                                        )
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "box" }, [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(option) +
                                        "\n                                "
                                    )
                                  ])
                                ])
                              ]
                            })
                          ],
                          2
                        )
                      ])
                    ]
                  )
                })
              ),
              _vm._v(" "),
              _c("template", { slot: "footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "add-variation-btn",
                    attrs: { disabled: _vm.attributeDisabled },
                    on: {
                      click: function($event) {
                        _vm.addVariationProduct()
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.__("Add Product", "wepos")))]
                )
              ])
            ],
            2
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "suggession" }, [
      _c("span", { staticClass: "term" }, [
        _c("span", { staticClass: "flaticon-swap" }),
        _vm._v(" to navigate\n                ")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "term" }, [
        _c("span", { staticClass: "flaticon-enter-arrow" }),
        _vm._v(" to select\n                ")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "term" }, [
        _c("strong", [_vm._v("esc")]),
        _vm._v(" to dismiss\n                ")
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-74453d0b", esExports)
  }
}

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CustomerSearch_vue__ = __webpack_require__(28);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_414ef29b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CustomerSearch_vue__ = __webpack_require__(85);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(84)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CustomerSearch_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_414ef29b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CustomerSearch_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/CustomerSearch.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-414ef29b", Component.options)
  } else {
    hotAPI.reload("data-v-414ef29b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 84 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "click-outside",
          rawName: "v-click-outside",
          value: _vm.onblur,
          expression: "onblur"
        }
      ],
      staticClass: "customer-search-box"
    },
    [
      _c("form", { attrs: { action: "", autocomplete: "off" } }, [
        _c(
          "svg",
          {
            staticClass: "customer-icon",
            attrs: {
              width: "19px",
              height: "19px",
              viewBox: "0 0 19 19",
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              "xmlns:xlink": "http://www.w3.org/1999/xlink"
            }
          },
          [
            _c(
              "defs",
              [
                _c(
                  "linearGradient",
                  {
                    attrs: {
                      x1: "14.5524094%",
                      y1: "14.6909544%",
                      x2: "82.7722259%",
                      y2: "85.2519444%",
                      id: "linearGradient-1"
                    }
                  },
                  [
                    _c("stop", {
                      attrs: { "stop-color": "#C444FB", offset: "0%" }
                    }),
                    _vm._v(" "),
                    _c("stop", {
                      attrs: { "stop-color": "#5B56D7", offset: "100%" }
                    })
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "g",
              {
                attrs: {
                  id: "Page-1",
                  stroke: "none",
                  "stroke-width": "1",
                  fill: "none",
                  "fill-rule": "evenodd"
                }
              },
              [
                _c(
                  "g",
                  {
                    attrs: {
                      id: "POS-Design---Dokan-P2",
                      transform: "translate(-759.000000, -27.000000)"
                    }
                  },
                  [
                    _c(
                      "g",
                      {
                        attrs: {
                          id: "Group",
                          transform: "translate(759.000000, 27.000000)"
                        }
                      },
                      [
                        _c("circle", {
                          attrs: {
                            id: "Oval",
                            fill: "url(#linearGradient-1)",
                            "fill-rule": "nonzero",
                            cx: "9.5",
                            cy: "9.5",
                            r: "9.5"
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "g",
                          {
                            attrs: {
                              id: "flaticon1543304699-svg-2",
                              transform:
                                "translate(9.500000, 9.500000) scale(-1, 1) translate(-9.500000, -9.500000) translate(6.000000, 5.000000)"
                            }
                          },
                          [
                            _c(
                              "g",
                              { attrs: { id: "flaticon1543304699-svg" } },
                              [
                                _c("path", {
                                  attrs: {
                                    d:
                                      "M3.31578947,4.40159143 C4.27870463,4.40159143 5.0593751,3.41627143 5.0593751,2.20080857 C5.0593751,0.98532 4.80306952,0 3.31578947,0 C1.82850943,0 1.57215436,0.98532 1.57215436,2.20080857 C1.57215436,3.41627143 2.35282482,4.40159143 3.31578947,4.40159143 Z",
                                    id: "Path",
                                    fill: "#FFFFFF"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    d:
                                      "M0.0616980658,7.82884897 C0.0604730658,7.62453402 0.0592480658,7.77128348 0.0616980658,7.82884897 Z",
                                    id: "Path",
                                    fill: "#000000"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    d:
                                      "M6.64682715,7.85749962 C6.65070632,7.82585407 6.64815424,7.63794608 6.64682715,7.85749962 Z",
                                    id: "Path",
                                    fill: "#000000"
                                  }
                                }),
                                _vm._v(" "),
                                _c("path", {
                                  attrs: {
                                    d:
                                      "M6.60522584,7.67306571 C6.57293401,5.5557 6.30682954,4.95236571 4.27051414,4.57045714 C4.27051414,4.57045714 3.98387156,4.95002571 3.31576473,4.95002571 C2.64765789,4.95002571 2.36096583,4.57045714 2.36096583,4.57045714 C0.34687117,4.9482 0.0645836606,5.54258571 0.0274666143,7.60428 C0.0244230165,7.77263143 0.0230125687,7.78147714 0.0224681854,7.76193429 C0.0225919089,7.79855143 0.0227403771,7.86628286 0.0227403771,7.98438857 C0.0227403771,7.98438857 0.507538492,9 3.31576473,9 C6.12394148,9 6.60878908,7.98438857 6.60878908,7.98438857 C6.60878908,7.90850571 6.60883857,7.85574 6.6089128,7.81984286 C6.60836842,7.83192857 6.60727965,7.80850286 6.60522584,7.67306571 Z",
                                    id: "Path",
                                    fill: "#FFFFFF"
                                  }
                                })
                              ]
                            )
                          ]
                        )
                      ]
                    )
                  ]
                )
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.serachInput,
              expression: "serachInput"
            }
          ],
          attrs: {
            type: "text",
            name: "customer_search",
            id: "customer-search",
            placeholder: "Search customer"
          },
          domProps: { value: _vm.serachInput },
          on: {
            focus: function($event) {
              $event.preventDefault()
              _vm.triggerFocus($event)
            },
            keyup: _vm.searchCustomer,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.serachInput = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c("span", {
          staticClass: "add-new-customer flaticon-add",
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.showNewCustomerModal = true
            }
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showCustomerResults,
                expression: "showCustomerResults"
              }
            ],
            staticClass: "search-result"
          },
          [
            _vm.customers.length
              ? _c(
                  "ul",
                  _vm._l(_vm.customers, function(customer) {
                    return _c("li", [
                      _c(
                        "a",
                        {
                          staticClass: "wepos-clearfix",
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              _vm.selectCustomer(customer)
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "avatar wepos-left" }, [
                            _c("img", {
                              attrs: {
                                src: customer.avatar_url,
                                alt:
                                  customer.first_name + " " + customer.last_name
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "name wepos-left" }, [
                            _vm._v(
                              _vm._s(
                                customer.first_name + " " + customer.last_name
                              )
                            ),
                            _c("span", { staticClass: "metadata" }, [
                              _vm._v(_vm._s(customer.email))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("span", {
                            staticClass:
                              "action flaticon-enter-arrow wepos-right"
                          })
                        ]
                      )
                    ])
                  })
                )
              : _c("div", { staticClass: "no-data-found" }, [
                  _vm._v("\n                No customer found\n            ")
                ]),
            _vm._v(" "),
            _vm._m(0)
          ]
        )
      ]),
      _vm._v(" "),
      _vm.showNewCustomerModal
        ? _c(
            "modal",
            {
              attrs: {
                title: "Add New Customer",
                width: "700px",
                height: "400px",
                footer: true,
                header: true
              },
              on: {
                close: function($event) {
                  _vm.showNewCustomerModal = false
                }
              }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { staticClass: "wepos-new-customer-form" }, [
                  _c(
                    "form",
                    { staticClass: "wepos-form", attrs: { action: "" } },
                    [
                      _c("div", { staticClass: "form-row col-2" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customer.first_name,
                              expression: "customer.first_name"
                            }
                          ],
                          attrs: { type: "text", placeholder: "First Name" },
                          domProps: { value: _vm.customer.first_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "first_name",
                                $event.target.value
                              )
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customer.last_name,
                              expression: "customer.last_name"
                            }
                          ],
                          attrs: { type: "text", placeholder: "Last Name" },
                          domProps: { value: _vm.customer.last_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "last_name",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-row" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customer.email,
                              expression: "customer.email"
                            }
                          ],
                          attrs: { type: "email", placeholder: "Email" },
                          domProps: { value: _vm.customer.email },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "email",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-row col-2" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customer.address_1,
                              expression: "customer.address_1"
                            }
                          ],
                          attrs: { type: "text", placeholder: "Address 1" },
                          domProps: { value: _vm.customer.address_1 },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "address_1",
                                $event.target.value
                              )
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customer.address_2,
                              expression: "customer.address_2"
                            }
                          ],
                          attrs: {
                            type: "text",
                            placeholder: "Address 2 (optional)"
                          },
                          domProps: { value: _vm.customer.address_2 },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "address_2",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-row col-2" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customer.city,
                              expression: "customer.city"
                            }
                          ],
                          attrs: {
                            type: "text",
                            placeholder: "City (optional)"
                          },
                          domProps: { value: _vm.customer.city },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "city",
                                $event.target.value
                              )
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customer.phone,
                              expression: "customer.phone"
                            }
                          ],
                          attrs: {
                            type: "text",
                            placeholder: "Phone (optional)"
                          },
                          domProps: { value: _vm.customer.phone },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "phone",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("template", { slot: "footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "add-variation-btn",
                    attrs: {
                      disabled:
                        _vm.customer.email == undefined ||
                        _vm.customer.email == ""
                    },
                    on: {
                      click: function($event) {
                        _vm.createCustomer()
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.__("Add Customer", "wepos")))]
                )
              ])
            ],
            2
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "suggession" }, [
      _c("span", { staticClass: "term" }, [
        _c("span", { staticClass: "flaticon-swap" }),
        _vm._v(" to navigate\n                ")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "term" }, [
        _c("span", { staticClass: "flaticon-enter-arrow" }),
        _vm._v(" to select\n                ")
      ]),
      _vm._v(" "),
      _c("span", { staticClass: "term" }, [
        _c("strong", [_vm._v("esc")]),
        _vm._v(" to dismiss\n                ")
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-414ef29b", esExports)
  }
}

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DiscountKeypad_vue__ = __webpack_require__(29);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_524a232c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DiscountKeypad_vue__ = __webpack_require__(91);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(87)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DiscountKeypad_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_524a232c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DiscountKeypad_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/DiscountKeypad.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-524a232c", Component.options)
  } else {
    hotAPI.reload("data-v-524a232c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 87 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wepos-discount-keypad",
      attrs: { id: "wepos-discount-keypad" }
    },
    [
      _c(
        "a",
        {
          directives: [
            {
              name: "popover",
              rawName: "v-popover.left",
              value: { name: "add-discount-popover" },
              expression: "{ name: 'add-discount-popover' }",
              modifiers: { left: true }
            }
          ],
          attrs: { href: "#" }
        },
        [_vm._v("Add Discount")]
      ),
      _vm._v(" "),
      _c(
        "popover",
        {
          staticClass: "discount-keypad",
          attrs: { name: "add-discount-popover", width: 237 }
        },
        [
          _c("keyboard", {
            attrs: { layouts: "123|456|789|0{X:backspace}" },
            model: {
              value: _vm.keyboardBtn,
              callback: function($$v) {
                _vm.keyboardBtn = $$v
              },
              expression: "keyboardBtn"
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-524a232c", esExports)
  }
}

/***/ }),
/* 92 */,
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "wepos-main" } },
    [
      _c("div", { staticClass: "content-product" }, [
        _c("div", { staticClass: "top-panel" }, [
          _c(
            "div",
            { staticClass: "search-bar" },
            [
              _c("product-inline-search", {
                on: { onProductAdded: _vm.addToCart }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "category" }, [
            _c(
              "select",
              { attrs: { name: "product_category", id: "product-category" } },
              [
                _c("option", { attrs: { value: "-1" } }, [
                  _vm._v(_vm._s(_vm.__("All", "wepos")))
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "2" } }, [_vm._v("Shirt")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "3" } }, [_vm._v("Pant")])
              ]
            ),
            _vm._v(" "),
            _c("span", {
              staticClass: "select-arrow flaticon-arrow-down-sign-to-navigate"
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "toggle-view" }, [
            _c("div", { staticClass: "product-toggle" }, [
              _c("span", {
                staticClass:
                  "toggle-icon list-view flaticon-menu-button-of-three-horizontal-lines",
                class: { active: _vm.productView == "list" },
                on: {
                  click: function($event) {
                    _vm.productView = "list"
                  }
                }
              }),
              _vm._v(" "),
              _c("span", {
                staticClass: "toggle-icon grid-view flaticon-menu",
                class: { active: _vm.productView == "grid" },
                on: {
                  click: function($event) {
                    _vm.productView = "grid"
                  }
                }
              })
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            ref: "items-wrapper",
            staticClass: "items-wrapper",
            class: _vm.productView
          },
          [
            _vm._l(_vm.products, function(product) {
              return _vm.products.length > 0
                ? _c(
                    "div",
                    { staticClass: "item" },
                    [
                      product.type == "simple"
                        ? [
                            _c(
                              "div",
                              {
                                staticClass: "item-wrap",
                                on: {
                                  click: function($event) {
                                    if (
                                      !("button" in $event) &&
                                      _vm._k(
                                        $event.keyCode,
                                        "prevnt",
                                        undefined,
                                        $event.key
                                      )
                                    ) {
                                      return null
                                    }
                                    _vm.addToCart(product)
                                  }
                                }
                              },
                              [
                                _c("div", { staticClass: "img" }, [
                                  _c("img", {
                                    attrs: {
                                      src: _vm.getProductImage(product),
                                      alt: _vm.getProductImageName(product)
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _vm.productView == "grid"
                                  ? _c("div", { staticClass: "title" }, [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(
                                            _vm.truncate(
                                              product.name,
                                              20,
                                              "..."
                                            )
                                          ) +
                                          "\n                        "
                                      )
                                    ])
                                  : _c("div", { staticClass: "title" }, [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(product.name) +
                                          "\n                        "
                                      )
                                    ]),
                                _vm._v(" "),
                                _c("span", {
                                  staticClass: "add-product-icon flaticon-add",
                                  class: _vm.productView
                                })
                              ]
                            )
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      product.type == "variable"
                        ? [
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "popover",
                                    rawName: "v-popover.right",
                                    value: { name: "variation-" + product.id },
                                    expression:
                                      "{ name: 'variation-' + product.id }",
                                    modifiers: { right: true }
                                  }
                                ],
                                staticClass: "item-wrap",
                                on: {
                                  click: function($event) {
                                    _vm.selectVariationProduct(product)
                                  }
                                }
                              },
                              [
                                _c("div", { staticClass: "img" }, [
                                  _c("img", {
                                    attrs: {
                                      src: _vm.getProductImage(product),
                                      alt: _vm.getProductImageName(product)
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _vm.productView == "grid"
                                  ? _c("div", { staticClass: "title" }, [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(
                                            _vm.truncate(
                                              product.name,
                                              20,
                                              "..."
                                            )
                                          ) +
                                          "\n                        "
                                      )
                                    ])
                                  : _c("div", { staticClass: "title" }, [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(product.name) +
                                          "\n                        "
                                      )
                                    ]),
                                _vm._v(" "),
                                _c("span", {
                                  staticClass: "add-product-icon flaticon-add",
                                  class: _vm.productView
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _vm.togglePopover
                              ? _c(
                                  "popover",
                                  {
                                    staticClass: "product-variation",
                                    attrs: {
                                      name: "variation-" + product.id,
                                      width: 237
                                    }
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "variation-header" },
                                      [
                                        _vm._v(
                                          "\n                            Select Variations\n                        "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "variation-body" },
                                      [
                                        _vm._l(product.attributes, function(
                                          attribute
                                        ) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "attribute" },
                                              [
                                                _c("p", [
                                                  _vm._v(_vm._s(attribute.name))
                                                ]),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "options" },
                                                  [
                                                    _vm._l(
                                                      attribute.options,
                                                      function(option) {
                                                        return [
                                                          _c("label", [
                                                            _c("input", {
                                                              directives: [
                                                                {
                                                                  name: "model",
                                                                  rawName:
                                                                    "v-model",
                                                                  value:
                                                                    _vm
                                                                      .selectedAttribute[
                                                                      attribute
                                                                        .name
                                                                    ],
                                                                  expression:
                                                                    "selectedAttribute[attribute.name]"
                                                                }
                                                              ],
                                                              attrs: {
                                                                type: "radio"
                                                              },
                                                              domProps: {
                                                                value: option,
                                                                checked: _vm._q(
                                                                  _vm
                                                                    .selectedAttribute[
                                                                    attribute
                                                                      .name
                                                                  ],
                                                                  option
                                                                )
                                                              },
                                                              on: {
                                                                change: function(
                                                                  $event
                                                                ) {
                                                                  _vm.$set(
                                                                    _vm.selectedAttribute,
                                                                    attribute.name,
                                                                    option
                                                                  )
                                                                }
                                                              }
                                                            }),
                                                            _vm._v(" "),
                                                            _c(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "box"
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "\n                                                    " +
                                                                    _vm._s(
                                                                      option
                                                                    ) +
                                                                    "\n                                                "
                                                                )
                                                              ]
                                                            )
                                                          ])
                                                        ]
                                                      }
                                                    )
                                                  ],
                                                  2
                                                )
                                              ]
                                            )
                                          ]
                                        })
                                      ],
                                      2
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "variation-footer" },
                                      [
                                        _c(
                                          "button",
                                          {
                                            attrs: {
                                              disabled: _vm.attributeDisabled
                                            },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                _vm.addVariationProduct($event)
                                              }
                                            }
                                          },
                                          [_vm._v("Add Product")]
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e()
                          ]
                        : _vm._e()
                    ],
                    2
                  )
                : _vm._e()
            }),
            _vm._v(" "),
            _c(
              "mugen-scroll",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.productLoading,
                    expression: "productLoading"
                  }
                ],
                staticClass: "product-loading",
                attrs: {
                  handler: _vm.fetchProducts,
                  "should-handle": !_vm.productLoading,
                  "scroll-container": "items-wrapper"
                }
              },
              [_vm._v("\n                Loading...\n            ")]
            ),
            _vm._v(" "),
            _c(
              "v-popover",
              {
                attrs: {
                  offset: "10",
                  "popover-base-class": "product-variation tooltip popover",
                  placement: "left-end"
                }
              },
              [
                _c("button", { staticClass: "tooltip-target b3" }, [
                  _vm._v("Click me")
                ]),
                _vm._v(" "),
                _c("template", { slot: "popover" }, [
                  _vm._v(
                    "\n                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, vel error? Optio ipsa ratione, culpa itaque alias, minus autem corrupti sunt debitis adipisci nesciunt, quo, voluptatum quia aliquid laborum minima!\n              "
                  )
                ])
              ],
              2
            )
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "content-cart" }, [
        _c(
          "div",
          { staticClass: "top-panel" },
          [
            _c("customer-search", {
              on: { onCustomerSelected: _vm.selectCustomer }
            }),
            _vm._v(" "),
            _vm._m(0)
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "cart-panel" }, [
          _c("div", { staticClass: "cart-content" }, [
            _c("table", { staticClass: "cart-table" }, [
              _vm._m(1),
              _vm._v(" "),
              _c(
                "tbody",
                [
                  _vm.orderdata.line_items.length > 0
                    ? [
                        _vm._l(_vm.orderdata.line_items, function(item, key) {
                          return [
                            _c("tr", [
                              _c("td", { staticClass: "name" }, [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(item.name) +
                                    "\n                                        "
                                ),
                                item.attribute.length > 0
                                  ? _c("div", { staticClass: "attribute" }, [
                                      _c(
                                        "ul",
                                        _vm._l(item.attribute, function(
                                          attribute_item
                                        ) {
                                          return _c("li", [
                                            _c(
                                              "span",
                                              { staticClass: "attr_name" },
                                              [
                                                _vm._v(
                                                  _vm._s(attribute_item.name)
                                                )
                                              ]
                                            ),
                                            _vm._v(": "),
                                            _c(
                                              "span",
                                              { staticClass: "attr_value" },
                                              [
                                                _vm._v(
                                                  _vm._s(attribute_item.option)
                                                )
                                              ]
                                            )
                                          ])
                                        })
                                      )
                                    ])
                                  : _vm._e()
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "qty" }, [
                                _vm._v(_vm._s(item.quantity))
                              ]),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "price" },
                                [
                                  item.on_sale
                                    ? [
                                        _c(
                                          "span",
                                          { staticClass: "sale-price" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.formatPrice(
                                                  item.quantity *
                                                    item.sale_price
                                                )
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "regular-price" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.formatPrice(
                                                  item.quantity *
                                                    item.regular_price
                                                )
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    : [
                                        _c(
                                          "span",
                                          { staticClass: "sale-price" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.formatPrice(
                                                  item.quantity *
                                                    item.regular_price
                                                )
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c("td", { staticClass: "action" }, [
                                _c("span", {
                                  staticClass: "flaticon-right-arrow",
                                  class: { open: item.editQuantity },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.toggleEditQuantity(item, key)
                                    }
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "remove" }, [
                                _c("span", {
                                  staticClass: "flaticon-cancel-music",
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm.removeItem(key)
                                    }
                                  }
                                })
                              ])
                            ]),
                            _vm._v(" "),
                            item.editQuantity
                              ? _c(
                                  "tr",
                                  { staticClass: "update-quantity-wrap" },
                                  [
                                    _c("td", { attrs: { colspan: "5" } }, [
                                      _c("span", { staticClass: "qty" }, [
                                        _vm._v("Quantity")
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "qty-number" },
                                        [
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: item.quantity,
                                                expression: "item.quantity"
                                              }
                                            ],
                                            attrs: {
                                              type: "number",
                                              min: "1",
                                              step: "1"
                                            },
                                            domProps: { value: item.quantity },
                                            on: {
                                              input: function($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.$set(
                                                  item,
                                                  "quantity",
                                                  $event.target.value
                                                )
                                              }
                                            }
                                          })
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "qty-action" },
                                        [
                                          _c(
                                            "a",
                                            {
                                              staticClass: "add",
                                              attrs: { href: "#" },
                                              on: {
                                                click: function($event) {
                                                  $event.preventDefault()
                                                  item.quantity++
                                                }
                                              }
                                            },
                                            [_vm._v("+")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "a",
                                            {
                                              staticClass: "minus",
                                              attrs: { href: "#" },
                                              on: {
                                                click: function($event) {
                                                  $event.preventDefault()
                                                  _vm.removeQuantity(item)
                                                }
                                              }
                                            },
                                            [_vm._v("-")]
                                          )
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              : _vm._e()
                          ]
                        })
                      ]
                    : [
                        _c("tr", { staticClass: "no-item" }, [
                          _c("td", { attrs: { colspan: "5" } }, [
                            _c("img", {
                              attrs: {
                                src:
                                  _vm.wepos.assets_url +
                                  "/images/empty-cart.png",
                                alt: "",
                                width: "120px"
                              }
                            }),
                            _vm._v(" "),
                            _c("p", [_vm._v("Empty Cart")])
                          ])
                        ])
                      ]
                ],
                2
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "cart-calculation" }, [
            _c("form", { attrs: { autocomplete: "off" } }, [
              _c("table", { staticClass: "cart-total-table" }, [
                _c(
                  "tbody",
                  [
                    _c("tr", [
                      _c("td", { staticClass: "label" }, [_vm._v("Subtotal")]),
                      _vm._v(" "),
                      _c("td", { staticClass: "price" }, [
                        _vm._v(_vm._s(_vm.formatPrice(_vm.getSubtotal)))
                      ]),
                      _vm._v(" "),
                      _c("td", { staticClass: "action" })
                    ]),
                    _vm._v(" "),
                    _vm.orderdata.fee_lines.length > 0
                      ? _vm._l(_vm.orderdata.fee_lines, function(fee, key) {
                          return _c(
                            "tr",
                            { staticClass: "cart-meta-data" },
                            [
                              fee.isEdit
                                ? [
                                    fee.type == "discount"
                                      ? [
                                          _c("td", { staticClass: "label" }, [
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value:
                                                    _vm.orderdata.fee_lines[key]
                                                      .name,
                                                  expression:
                                                    "orderdata.fee_lines[key].name"
                                                }
                                              ],
                                              attrs: {
                                                type: "text",
                                                placeholder: "Discount Name"
                                              },
                                              domProps: {
                                                value:
                                                  _vm.orderdata.fee_lines[key]
                                                    .name
                                              },
                                              on: {
                                                input: function($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    _vm.orderdata.fee_lines[
                                                      key
                                                    ],
                                                    "name",
                                                    $event.target.value
                                                  )
                                                }
                                              }
                                            })
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "price" }, [
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value:
                                                    _vm.orderdata.fee_lines[key]
                                                      .total,
                                                  expression:
                                                    "orderdata.fee_lines[key].total"
                                                }
                                              ],
                                              attrs: {
                                                type: "number",
                                                min: "0",
                                                step: "any",
                                                placeholder: "Discount Amount"
                                              },
                                              domProps: {
                                                value:
                                                  _vm.orderdata.fee_lines[key]
                                                    .total
                                              },
                                              on: {
                                                input: function($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    _vm.orderdata.fee_lines[
                                                      key
                                                    ],
                                                    "total",
                                                    $event.target.value
                                                  )
                                                }
                                              }
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "button",
                                              {
                                                attrs: {
                                                  disabled:
                                                    _vm.orderdata.fee_lines[key]
                                                      .name == ""
                                                },
                                                on: {
                                                  click: function($event) {
                                                    _vm.setFee(key, "discount")
                                                  }
                                                }
                                              },
                                              [_vm._v("Apply")]
                                            )
                                          ])
                                        ]
                                      : [
                                          _c(
                                            "td",
                                            {
                                              staticClass: "label",
                                              attrs: { colspan: "2" }
                                            },
                                            [
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value:
                                                      _vm.orderdata.fee_lines[
                                                        key
                                                      ].name,
                                                    expression:
                                                      "orderdata.fee_lines[key].name"
                                                  }
                                                ],
                                                staticClass: "fee-name",
                                                attrs: {
                                                  type: "text",
                                                  placeholder: "Fee Name"
                                                },
                                                domProps: {
                                                  value:
                                                    _vm.orderdata.fee_lines[key]
                                                      .name
                                                },
                                                on: {
                                                  input: function($event) {
                                                    if (
                                                      $event.target.composing
                                                    ) {
                                                      return
                                                    }
                                                    _vm.$set(
                                                      _vm.orderdata.fee_lines[
                                                        key
                                                      ],
                                                      "name",
                                                      $event.target.value
                                                    )
                                                  }
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value:
                                                      _vm.orderdata.fee_lines[
                                                        key
                                                      ].total,
                                                    expression:
                                                      "orderdata.fee_lines[key].total"
                                                  }
                                                ],
                                                staticClass: "fee-amount",
                                                attrs: {
                                                  type: "number",
                                                  min: "0",
                                                  step: "any",
                                                  placeholder: "Fee Amount"
                                                },
                                                domProps: {
                                                  value:
                                                    _vm.orderdata.fee_lines[key]
                                                      .total
                                                },
                                                on: {
                                                  input: function($event) {
                                                    if (
                                                      $event.target.composing
                                                    ) {
                                                      return
                                                    }
                                                    _vm.$set(
                                                      _vm.orderdata.fee_lines[
                                                        key
                                                      ],
                                                      "total",
                                                      $event.target.value
                                                    )
                                                  }
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "label",
                                                {
                                                  attrs: {
                                                    for: "fee-tax-status"
                                                  }
                                                },
                                                [
                                                  _c("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.orderdata
                                                            .fee_lines[key]
                                                            .tax_status,
                                                        expression:
                                                          "orderdata.fee_lines[key].tax_status"
                                                      }
                                                    ],
                                                    staticClass:
                                                      "fee-tax-status",
                                                    attrs: {
                                                      type: "checkbox",
                                                      id: "fee-tax-status",
                                                      "true-value": "taxable",
                                                      "false-value": "none"
                                                    },
                                                    domProps: {
                                                      checked: Array.isArray(
                                                        _vm.orderdata.fee_lines[
                                                          key
                                                        ].tax_status
                                                      )
                                                        ? _vm._i(
                                                            _vm.orderdata
                                                              .fee_lines[key]
                                                              .tax_status,
                                                            null
                                                          ) > -1
                                                        : _vm._q(
                                                            _vm.orderdata
                                                              .fee_lines[key]
                                                              .tax_status,
                                                            "taxable"
                                                          )
                                                    },
                                                    on: {
                                                      change: function($event) {
                                                        var $$a =
                                                            _vm.orderdata
                                                              .fee_lines[key]
                                                              .tax_status,
                                                          $$el = $event.target,
                                                          $$c = $$el.checked
                                                            ? "taxable"
                                                            : "none"
                                                        if (
                                                          Array.isArray($$a)
                                                        ) {
                                                          var $$v = null,
                                                            $$i = _vm._i(
                                                              $$a,
                                                              $$v
                                                            )
                                                          if ($$el.checked) {
                                                            $$i < 0 &&
                                                              (_vm.orderdata.fee_lines[
                                                                key
                                                              ].tax_status = $$a.concat(
                                                                [$$v]
                                                              ))
                                                          } else {
                                                            $$i > -1 &&
                                                              (_vm.orderdata.fee_lines[
                                                                key
                                                              ].tax_status = $$a
                                                                .slice(0, $$i)
                                                                .concat(
                                                                  $$a.slice(
                                                                    $$i + 1
                                                                  )
                                                                ))
                                                          }
                                                        } else {
                                                          _vm.$set(
                                                            _vm.orderdata
                                                              .fee_lines[key],
                                                            "tax_status",
                                                            $$c
                                                          )
                                                        }
                                                      }
                                                    }
                                                  }),
                                                  _vm._v(" Taxable")
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _vm.orderdata.fee_lines[key]
                                                .tax_status == "taxable"
                                                ? _c(
                                                    "select",
                                                    {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.orderdata
                                                              .fee_lines[key]
                                                              .tax_class,
                                                          expression:
                                                            "orderdata.fee_lines[key].tax_class"
                                                        }
                                                      ],
                                                      staticClass:
                                                        "fee-tax-class",
                                                      on: {
                                                        change: function(
                                                          $event
                                                        ) {
                                                          var $$selectedVal = Array.prototype.filter
                                                            .call(
                                                              $event.target
                                                                .options,
                                                              function(o) {
                                                                return o.selected
                                                              }
                                                            )
                                                            .map(function(o) {
                                                              var val =
                                                                "_value" in o
                                                                  ? o._value
                                                                  : o.value
                                                              return val
                                                            })
                                                          _vm.$set(
                                                            _vm.orderdata
                                                              .fee_lines[key],
                                                            "tax_class",
                                                            $event.target
                                                              .multiple
                                                              ? $$selectedVal
                                                              : $$selectedVal[0]
                                                          )
                                                        }
                                                      }
                                                    },
                                                    _vm._l(
                                                      _vm.availableTax,
                                                      function(feeTax) {
                                                        return _c(
                                                          "option",
                                                          {
                                                            domProps: {
                                                              value:
                                                                feeTax.class
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm.unSanitizeString(
                                                                  feeTax.class
                                                                )
                                                              ) +
                                                                " - " +
                                                                _vm._s(
                                                                  feeTax.percentage_rate
                                                                )
                                                            )
                                                          ]
                                                        )
                                                      }
                                                    )
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _c(
                                                "button",
                                                {
                                                  attrs: {
                                                    disabled:
                                                      _vm.orderdata.fee_lines[
                                                        key
                                                      ].name == ""
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      _vm.setFee(key, "fee")
                                                    }
                                                  }
                                                },
                                                [_vm._v("Apply")]
                                              )
                                            ]
                                          )
                                        ],
                                    _vm._v(" "),
                                    _c("td", { staticClass: "action" }, [
                                      _c("span", {
                                        staticClass: "flaticon-cancel-music",
                                        on: {
                                          click: function($event) {
                                            _vm.removeFee(key)
                                          }
                                        }
                                      })
                                    ])
                                  ]
                                : [
                                    fee.type == "fee"
                                      ? [
                                          _c("td", { staticClass: "label" }, [
                                            _vm._v("Fee "),
                                            _c(
                                              "span",
                                              { staticClass: "name" },
                                              [_vm._v(_vm._s(fee.name))]
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "price" }, [
                                            _vm._v(
                                              _vm._s(_vm.formatPrice(fee.total))
                                            )
                                          ])
                                        ]
                                      : [
                                          _c("td", { staticClass: "label" }, [
                                            _vm._v("Discount "),
                                            _c(
                                              "span",
                                              { staticClass: "name" },
                                              [_vm._v(_vm._s(fee.name))]
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "price" }, [
                                            _vm._v(
                                              "-" +
                                                _vm._s(
                                                  _vm.formatPrice(
                                                    Math.abs(fee.total)
                                                  )
                                                )
                                            )
                                          ])
                                        ],
                                    _vm._v(" "),
                                    _c("td", { staticClass: "action" }, [
                                      _c("span", {
                                        staticClass: "flaticon-cancel-music",
                                        on: {
                                          click: function($event) {
                                            _vm.removeFee(key)
                                          }
                                        }
                                      })
                                    ])
                                  ]
                            ],
                            2
                          )
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.getTotalTax
                      ? _c("tr", { staticClass: "tax" }, [
                          _c("td", { staticClass: "label" }, [_vm._v("Tax")]),
                          _vm._v(" "),
                          _c("td", { staticClass: "price" }, [
                            _vm._v(_vm._s(_vm.formatPrice(_vm.getTotalTax)))
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "action" })
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("tr", { staticClass: "cart-action" }, [
                      _c("td", { attrs: { colspan: "3" } }, [
                        _c(
                          "a",
                          {
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.addFee("discount")
                              }
                            }
                          },
                          [_vm._v("Add Discount")]
                        ),
                        _vm._v(" "),
                        _c(
                          "a",
                          {
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.addFee("fee")
                              }
                            }
                          },
                          [_vm._v("Add Fee")]
                        ),
                        _vm._v(" "),
                        _c(
                          "a",
                          {
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.showCustomerNote = !_vm.showCustomerNote
                              }
                            }
                          },
                          [
                            _vm.showCustomerNote
                              ? _c("span", [_vm._v("Remove Note")])
                              : _c("span", [_vm._v("Add Note")])
                          ]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _vm.showCustomerNote
                      ? _c("tr", { staticClass: "note" }, [
                          _c("td", { attrs: { colspan: "3" } }, [
                            _c("textarea", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.orderdata.customer_note,
                                  expression: "orderdata.customer_note"
                                }
                              ],
                              attrs: {
                                name: "customer-note",
                                placeholder: "Add some note",
                                id: "customer-note",
                                rows: "4"
                              },
                              domProps: { value: _vm.orderdata.customer_note },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.orderdata,
                                    "customer_note",
                                    $event.target.value
                                  )
                                }
                              }
                            })
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "tr",
                      {
                        staticClass: "pay-now",
                        on: {
                          click: function($event) {
                            _vm.initPayment()
                          }
                        }
                      },
                      [
                        _c("td", [_vm._v("Pay Now")]),
                        _vm._v(" "),
                        _c("td", { staticClass: "amount" }, [
                          _vm._v(_vm._s(_vm.formatPrice(_vm.getTotal)))
                        ]),
                        _vm._v(" "),
                        _vm._m(2)
                      ]
                    )
                  ],
                  2
                )
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.showPaymentReceipt
        ? _c(
            "modal",
            {
              attrs: { width: "600px", height: "400px" },
              on: {
                close: function($event) {
                  _vm.createNewSale()
                }
              }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { staticClass: "wepos-payment-receipt" }, [
                  _c("div", { staticClass: "sale-completed" }, [
                    _c("img", {
                      attrs: {
                        src:
                          _vm.wepos.assets_url + "/images/sale-completed.png",
                        alt: "",
                        width: "120px"
                      }
                    }),
                    _vm._v(" "),
                    _c("h2", [_vm._v("Sale Completed")])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "print-section" }, [
                    _c("button", { staticClass: "print-btn" }, [
                      _c("span", { staticClass: "icon flaticon-printer" }),
                      _vm._v(" "),
                      _c("span", { staticClass: "label" }, [
                        _vm._v("Print Receipt")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "new-sale-btn",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.createNewSale()
                          }
                        }
                      },
                      [
                        _c("span", { staticClass: "icon flaticon-add" }),
                        _vm._v(" "),
                        _c("span", { staticClass: "label" }, [
                          _vm._v("New Sale")
                        ])
                      ]
                    )
                  ])
                ])
              ])
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showModal
        ? _c(
            "modal",
            {
              attrs: { width: "98%", height: "95vh" },
              on: {
                close: function($event) {
                  _vm.backToSale()
                }
              }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { staticClass: "wepos-checkout-wrapper" }, [
                  _c("div", { staticClass: "left-content" }, [
                    _c("div", { staticClass: "header" }, [
                      _vm._v(
                        "\n                        Sale Summary\n                    "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "content",
                        style: { height: _vm.modalLeftContentHeight }
                      },
                      [
                        _c("table", { staticClass: "sale-summary-cart" }, [
                          _c(
                            "tbody",
                            _vm._l(_vm.orderdata.line_items, function(item) {
                              return _c("tr", [
                                _c("td", { staticClass: "name" }, [
                                  _vm._v(
                                    "\n                                        " +
                                      _vm._s(item.name) +
                                      "\n                                        "
                                  ),
                                  item.attribute.length > 0
                                    ? _c("div", { staticClass: "attribute" }, [
                                        _c(
                                          "ul",
                                          _vm._l(item.attribute, function(
                                            attribute_item
                                          ) {
                                            return _c("li", [
                                              _c(
                                                "span",
                                                { staticClass: "attr_name" },
                                                [
                                                  _vm._v(
                                                    _vm._s(attribute_item.name)
                                                  )
                                                ]
                                              ),
                                              _vm._v(": "),
                                              _c(
                                                "span",
                                                { staticClass: "attr_value" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      attribute_item.option
                                                    )
                                                  )
                                                ]
                                              )
                                            ])
                                          })
                                        )
                                      ])
                                    : _vm._e()
                                ]),
                                _vm._v(" "),
                                _c("td", { staticClass: "quantity" }, [
                                  _vm._v(_vm._s(item.quantity))
                                ]),
                                _vm._v(" "),
                                _c(
                                  "td",
                                  { staticClass: "price" },
                                  [
                                    item.on_sale
                                      ? [
                                          _c(
                                            "span",
                                            { staticClass: "sale-price" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formatPrice(
                                                    item.quantity *
                                                      item.sale_price
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            { staticClass: "regular-price" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formatPrice(
                                                    item.quantity *
                                                      item.regular_price
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        ]
                                      : [
                                          _c(
                                            "span",
                                            { staticClass: "sale-price" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formatPrice(
                                                    item.quantity *
                                                      item.regular_price
                                                  )
                                                )
                                              )
                                            ]
                                          )
                                        ]
                                  ],
                                  2
                                )
                              ])
                            })
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "footer" }, [
                      _c(
                        "ul",
                        [
                          _c("li", { staticClass: "wepos-clearfix" }, [
                            _c("span", { staticClass: "wepos-left" }, [
                              _vm._v("Subtotal")
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "wepos-right" }, [
                              _vm._v(_vm._s(_vm.formatPrice(_vm.getSubtotal)))
                            ])
                          ]),
                          _vm._v(" "),
                          _vm.orderdata.fee_lines.length > 0
                            ? _vm._l(_vm.orderdata.fee_lines, function(
                                fee,
                                key
                              ) {
                                return _c(
                                  "li",
                                  { staticClass: "wepos-clearfix" },
                                  [
                                    fee.type == "discount"
                                      ? [
                                          _c(
                                            "span",
                                            { staticClass: "wepos-left" },
                                            [
                                              _vm._v("Discount "),
                                              _c(
                                                "span",
                                                { staticClass: "metadata" },
                                                [_vm._v(_vm._s(fee.name))]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            { staticClass: "wepos-right" },
                                            [
                                              _vm._v(
                                                "-" +
                                                  _vm._s(
                                                    _vm.formatPrice(
                                                      Math.abs(fee.total)
                                                    )
                                                  )
                                              )
                                            ]
                                          )
                                        ]
                                      : [
                                          _c(
                                            "span",
                                            { staticClass: "wepos-left" },
                                            [
                                              _vm._v("Fee "),
                                              _c(
                                                "span",
                                                { staticClass: "metadata" },
                                                [_vm._v(_vm._s(fee.name))]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            { staticClass: "wepos-right" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formatPrice(fee.total)
                                                )
                                              )
                                            ]
                                          )
                                        ]
                                  ],
                                  2
                                )
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _c("li", { staticClass: "wepos-clearfix" }, [
                            _c("span", { staticClass: "wepos-left" }, [
                              _vm._v("Tax")
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "wepos-right" }, [
                              _vm._v(_vm._s(_vm.formatPrice(_vm.getTotalTax)))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("li", { staticClass: "wepos-clearfix" }, [
                            _c("span", { staticClass: "wepos-left" }, [
                              _vm._v("Order Total")
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "wepos-right" }, [
                              _vm._v(_vm._s(_vm.formatPrice(_vm.getTotal)))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("li", { staticClass: "wepos-clearfix" }, [
                            _c("span", { staticClass: "wepos-left" }, [
                              _vm._v("Pay")
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "wepos-right" }, [
                              _vm._v(_vm._s(_vm.formatPrice(_vm.getTotal)))
                            ])
                          ])
                        ],
                        2
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "right-content" }, [
                    _c("div", { staticClass: "header wepos-clearfix" }, [
                      _c("h2", { staticClass: "wepos-left" }, [_vm._v("Pay")]),
                      _vm._v(" "),
                      _c("span", { staticClass: "pay-amount wepos-right" }, [
                        _vm._v(_vm._s(_vm.formatPrice(_vm.getTotal)))
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "content" },
                      [
                        _c(
                          "div",
                          { staticClass: "payment-gateway" },
                          [
                            _vm.availableGateways.length > 0
                              ? [
                                  _vm._l(_vm.availableGateways, function(
                                    gateway
                                  ) {
                                    return _c("label", [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.orderdata.payment_method,
                                            expression:
                                              "orderdata.payment_method"
                                          }
                                        ],
                                        attrs: {
                                          type: "radio",
                                          name: "gateway",
                                          checked: ""
                                        },
                                        domProps: {
                                          value: gateway.id,
                                          checked: _vm._q(
                                            _vm.orderdata.payment_method,
                                            gateway.id
                                          )
                                        },
                                        on: {
                                          change: function($event) {
                                            _vm.$set(
                                              _vm.orderdata,
                                              "payment_method",
                                              gateway.id
                                            )
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c("span", { staticClass: "gateway" }, [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(gateway.title) +
                                            "\n                                    "
                                        )
                                      ])
                                    ])
                                  }),
                                  _vm._v(" "),
                                  _vm.emptyGatewayDiv > 0
                                    ? _vm._l(_vm.emptyGatewayDiv, function(n) {
                                        return _c("label", { key: n }, [
                                          _c("span", {
                                            staticClass: "grid-placeholder"
                                          })
                                        ])
                                      })
                                    : _vm._e()
                                ]
                              : [_c("p", [_vm._v("No gateway found")])]
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _vm.orderdata.payment_method == "wepos_cash"
                          ? [
                              _c("div", { staticClass: "payment-option" }, [
                                _c("div", { staticClass: "payment-amount" }, [
                                  _c("div", { staticClass: "input-part" }, [
                                    _c("div", { staticClass: "input-wrap" }, [
                                      _c("p", [_vm._v("Cash")]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "input-addon" },
                                        [
                                          _c(
                                            "span",
                                            { staticClass: "currency" },
                                            [_vm._v("$")]
                                          ),
                                          _vm._v(" "),
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.cashAmount,
                                                expression: "cashAmount"
                                              }
                                            ],
                                            attrs: { type: "text" },
                                            domProps: { value: _vm.cashAmount },
                                            on: {
                                              input: function($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.cashAmount =
                                                  $event.target.value
                                              }
                                            }
                                          })
                                        ]
                                      )
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "change-money" }, [
                                    _c("p", [
                                      _vm._v(
                                        "Change money: " +
                                          _vm._s(
                                            _vm.formatPrice(_vm.changeAmount)
                                          )
                                      )
                                    ])
                                  ])
                                ])
                              ])
                            ]
                          : _vm._e()
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "footer wepos-clearfix" }, [
                      _c(
                        "a",
                        {
                          staticClass: "back-btn wepos-left",
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.backToSale()
                            }
                          }
                        },
                        [_vm._v("Back to Sale")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "process-checkout-btn wepos-right",
                          attrs: { disabled: !_vm.ableToProcess() },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.processPayment($event)
                            }
                          }
                        },
                        [_vm._v("Process Payment")]
                      )
                    ])
                  ])
                ])
              ])
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c("overlay", { attrs: { show: _vm.showOverlay } })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "action" }, [
      _c("div", { staticClass: "more-options" }, [
        _c("span", { staticClass: "dropdown right-align" }, [
          _c("button", [
            _c("span", { staticClass: "more-icon flaticon-more" })
          ]),
          _vm._v(" "),
          _c("label", [
            _c("input", { attrs: { type: "checkbox" } }),
            _vm._v(" "),
            _c("ul", [
              _c("li", [_c("a", { attrs: { href: "#" } }, [_vm._v("Action")])]),
              _vm._v(" "),
              _c("li", [_vm._v("Another Action")]),
              _vm._v(" "),
              _c("li", [_vm._v("Something else here")]),
              _vm._v(" "),
              _c("li", { staticClass: "divider" }),
              _vm._v(" "),
              _c("li", [_vm._v("Separated link")])
            ])
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { attrs: { width: "65%" } }, [_vm._v("Product")]),
        _vm._v(" "),
        _c("th", { attrs: { width: "15%" } }, [_vm._v("Qty")]),
        _vm._v(" "),
        _c("th", { attrs: { width: "30%" } }, [_vm._v("Price")]),
        _vm._v(" "),
        _c("th"),
        _vm._v(" "),
        _c("th")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "icon" }, [
      _c("span", { staticClass: "flaticon-right-arrow" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-76253014", esExports)
  }
}

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Profile_vue__ = __webpack_require__(33);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35ef42f8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Profile_vue__ = __webpack_require__(96);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(95)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-35ef42f8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Profile_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35ef42f8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Profile_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/Profile.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35ef42f8", Component.options)
  } else {
    hotAPI.reload("data-v-35ef42f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 95 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "profile" }, [
    _vm._v("\n    The Profile Page\n")
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-35ef42f8", esExports)
  }
}

/***/ })
],[68]);