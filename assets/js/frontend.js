pluginWebpack([0],Array(29).concat([
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Cart = __webpack_require__(30);

var _Cart2 = _interopRequireDefault(_Cart);

var _Order = __webpack_require__(32);

var _Order2 = _interopRequireDefault(_Order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = wepos_get_lib('Vue');
var Vuex = wepos_get_lib('Vuex');

Vue.use(Vuex);

exports.default = new Vuex.Store({
    modules: {
        Cart: _Cart2.default,
        Order: _Order2.default
    }
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helper = __webpack_require__(31);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    namespaced: true,
    state: {
        settings: {},
        availableTax: {},
        cartdata: {
            line_items: [],
            fee_lines: []
        }
    },
    getters: {
        getSubtotal: function getSubtotal(state) {
            var subtotal = 0;
            weLo_.forEach(state.cartdata.line_items, function (item, key) {
                if (item.on_sale) {
                    subtotal += item.quantity * item.sale_price;
                } else {
                    subtotal += item.quantity * item.regular_price;
                }
            });

            return subtotal;
        },
        getTotalFee: function getTotalFee(state) {
            var fee = 0;
            weLo_.forEach(state.cartdata.fee_lines, function (item, key) {
                if (item.type == 'fee') {
                    fee += Math.abs(item.total);
                }
            });
            return fee;
        },
        getTotalDiscount: function getTotalDiscount(state) {
            var discount = 0;
            weLo_.forEach(state.cartdata.fee_lines, function (item, key) {
                if (item.type == 'discount') {
                    discount += Number(Math.abs(item.total));
                }
            });

            return discount;
        },
        getTotalLineTax: function getTotalLineTax(state) {
            var self = this,
                taxLineTotal = 0;

            weLo_.forEach(state.cartdata.line_items, function (item, key) {
                taxLineTotal += Math.abs(item.tax_amount * item.quantity);
            });

            return taxLineTotal;
        },
        getTotalTax: function getTotalTax(state) {
            var self = this,
                taxLineTotal = 0,
                taxFeeTotal = 0;
            weLo_.forEach(state.cartdata.line_items, function (item, key) {
                taxLineTotal += Math.abs(item.tax_amount * item.quantity);
            });

            if (state.settings.woo_tax != undefined && state.settings.woo_tax.wc_tax_display_cart == 'incl') {
                taxLineTotal = 0;
            }

            weLo_.forEach(state.cartdata.fee_lines, function (item, key) {
                if (item.type == 'fee') {
                    if (item.tax_status == 'taxable') {
                        var itemTaxClass = item.tax_class === '' ? 'standard' : item.tax_class;
                        var taxClass = weLo_.find(state.availableTax, { 'class': itemTaxClass.toString() });
                        if (taxClass !== undefined) {
                            taxFeeTotal += Math.abs(item.total) * Math.abs(taxClass.rate) / 100;
                        }
                    }
                }
            });

            return taxLineTotal + taxFeeTotal;
        },
        getOrderTotal: function getOrderTotal(state, getters) {
            return getters.getSubtotal + getters.getTotalFee + getters.getTotalTax;
        },
        getTotal: function getTotal(state, getters) {
            return getters.getOrderTotal - getters.getTotalDiscount;
        },
        getSettings: function getSettings(state, getters) {
            return state.settings;
        }
    },
    mutations: {
        setSettings: function setSettings(state, settings) {
            state.settings = settings;
        },
        setAvailableTax: function setAvailableTax(state, availableTax) {
            state.availableTax = availableTax;
        },
        setCartData: function setCartData(state, cartdata) {
            if (weLo_.isEmpty(cartdata)) {
                state.cartdata = {
                    line_items: [],
                    fee_lines: []
                };
            } else {
                state.cartdata = Object.assign({}, cartdata);
            }
        },
        addToCartItem: function addToCartItem(state, product) {
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
            cartObject.type = product.type;
            cartObject.tax_amount = product.tax_amount;
            cartObject.manage_stock = product.manage_stock;
            cartObject.stock_status = product.stock_status;
            cartObject.backorders_allowed = product.backorders_allowed;
            cartObject.stock_quantity = product.stock_quantity;

            var index = weLo_.findIndex(state.cartdata.line_items, { product_id: cartObject.product_id, variation_id: cartObject.variation_id });

            if (index < 0) {
                if (_helper2.default.hasStock(product)) {
                    state.cartdata.line_items.push(cartObject);
                }
            } else {
                if (_helper2.default.hasStock(product, state.cartdata.line_items[index].quantity)) {
                    state.cartdata.line_items[index].quantity += 1;
                }
            }
        },
        removeCartItem: function removeCartItem(state, itemKey) {
            state.cartdata.line_items.splice(itemKey, 1);
        },
        addCartItemQuantity: function addCartItemQuantity(state, itemKey) {
            var item = state.cartdata.line_items[itemKey];
            if (_helper2.default.hasStock(item, item.quantity)) {
                state.cartdata.line_items[itemKey].quantity++;
            }
        },
        removeCartItemQuantity: function removeCartItemQuantity(state, itemKey) {
            var item = state.cartdata.line_items[itemKey];
            if (item.quantity <= 1) {
                state.cartdata.line_items[itemKey].quantity = 1;
            } else {
                state.cartdata.line_items[itemKey].quantity--;
            }
        },
        toggleEditQuantity: function toggleEditQuantity(state, itemKey) {
            state.cartdata.line_items[itemKey].editQuantity = !state.cartdata.line_items[itemKey].editQuantity;
        },
        addDiscount: function addDiscount(state, discountData) {
            state.cartdata.fee_lines.push({
                name: discountData.title,
                type: 'discount',
                value: discountData.value.toString(),
                isEdit: false,
                discount_type: discountData.type,
                tax_status: 'none',
                tax_class: '',
                total: 0
            });
        },
        addFee: function addFee(state, feeData) {
            state.cartdata.fee_lines.push({
                name: feeData.title,
                type: 'fee',
                value: feeData.value.toString(),
                isEdit: false,
                fee_type: feeData.type,
                tax_status: 'none',
                tax_class: '',
                total: 0
            });
        },
        saveFeeValue: function saveFeeValue(state, item) {
            state.cartdata.fee_lines.splice(item.key, 1, item.feeData);
            state.cartdata.fee_lines[item.key].isEdit = false;
        },
        editFeeValue: function editFeeValue(state, itemKey) {
            state.cartdata.fee_lines[itemKey].isEdit = true;
        },
        cancelSaveFeeValue: function cancelSaveFeeValue(state, itemKey) {
            state.cartdata.fee_lines[itemKey].isEdit = false;
        },
        removeFeeLineItems: function removeFeeLineItems(state, itemKey) {
            state.cartdata.fee_lines.splice(itemKey, 1);
        },
        emptyCart: function emptyCart(state) {
            state.cartdata = {
                line_items: [],
                fee_lines: []
            };
        },
        calculateDiscount: function calculateDiscount(state, payload) {
            if (state.cartdata.fee_lines.length > 0) {
                weLo_.forEach(state.cartdata.fee_lines, function (item, key) {
                    if (item.type == "discount") {
                        if (item.discount_type == 'percent') {
                            state.cartdata.fee_lines[key].total = '-' + payload.getSubtotal * Math.abs(item.value) / 100;
                        } else {
                            state.cartdata.fee_lines[key].total = '-' + Math.abs(item.value);
                        }
                    }
                });
            }
        },
        calculateFee: function calculateFee(state, payload) {
            if (state.cartdata.fee_lines.length > 0) {
                weLo_.forEach(state.cartdata.fee_lines, function (item, key) {
                    if (item.type == 'fee') {
                        if (item.fee_type == 'percent') {
                            state.cartdata.fee_lines[key].total = (payload.getSubtotal * Math.abs(item.value) / 100).toString();
                        } else {
                            state.cartdata.fee_lines[key].total = Math.abs(item.value).toString();
                        }
                    }
                });
            }
        }
    },
    actions: {
        setSettingsAction: function setSettingsAction(context, settings) {
            context.commit('setSettings', settings);
        },
        setAvailableTaxAction: function setAvailableTaxAction(context, availableTax) {
            context.commit('setAvailableTax', availableTax);
        },
        setCartDataAction: function setCartDataAction(context, cartdata) {
            context.commit('setCartData', cartdata);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        addToCartAction: function addToCartAction(context, product) {
            context.commit('addToCartItem', product);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        removeCartItemAction: function removeCartItemAction(context, itemKey) {
            context.commit('removeCartItem', itemKey);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        addItemQuantityAction: function addItemQuantityAction(context, itemKey) {
            context.commit('addCartItemQuantity', itemKey);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        removeItemQuantityAction: function removeItemQuantityAction(context, itemKey) {
            context.commit('removeCartItemQuantity', itemKey);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        toggleEditQuantityAction: function toggleEditQuantityAction(context, itemKey) {
            context.commit('toggleEditQuantity', itemKey);
        },
        addDiscountAction: function addDiscountAction(context, discountData) {
            context.commit('addDiscount', discountData);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        addFeeAction: function addFeeAction(context, feeData) {
            context.commit('addFee', feeData);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        removeFeeLineItemsAction: function removeFeeLineItemsAction(context, itemKey) {
            context.commit('removeFeeLineItems', itemKey);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        saveFeeValueAction: function saveFeeValueAction(context, feeData) {
            context.commit('saveFeeValue', feeData);
            context.commit('calculateDiscount', context.getters);
            context.commit('calculateFee', context.getters);
        },
        editFeeValueAction: function editFeeValueAction(context, itemKey) {
            context.commit('editFeeValue', itemKey);
        },
        cancelSaveFeeValueAction: function cancelSaveFeeValueAction(context, itemKey) {
            context.commit('cancelSaveFeeValue', itemKey);
        },
        emptyCartAction: function emptyCartAction(context) {
            context.commit('emptyCart');
        },
        calculateDiscount: function calculateDiscount(context) {
            context.commit('calculateDiscount', context.getters);
        },
        calculateFee: function calculateFee(context) {
            context.commit('calculateFee', context.getters);
        }
    }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    hasStock: function hasStock(product) {
        var productCartQty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!product.manage_stock) {
            return 'outofstock' == product.stock_status ? false : true;
        } else {
            if (product.backorders_allowed) {
                return true;
            } else {
                return product.stock_quantity > productCartQty;
            }
        }
    }
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    namespaced: true,
    state: {
        orderdata: {
            billing: {},
            shipping: {},
            customer_id: 0,
            customer_note: '',
            payment_method: '',
            payment_method_title: ''
        },
        canProcessPayment: false
    },
    getters: {
        getCanProcessPayment: function getCanProcessPayment(state) {
            return state.canProcessPayment;
        }
    },
    mutations: {
        setOrderData: function setOrderData(state, orderdata) {
            if (weLo_.isEmpty(orderdata)) {
                state.orderdata = {
                    billing: {},
                    shipping: {},
                    customer_id: 0,
                    customer_note: '',
                    payment_method: '',
                    payment_method_title: ''
                };
            } else {
                state.orderdata = orderdata;
            }
        },
        setCustomer: function setCustomer(state, customer) {
            if (Object.keys(customer).length > 0) {
                state.orderdata.billing = customer.billing;
                state.orderdata.shipping = customer.shipping;
                state.orderdata.customer_id = customer.id;
            } else {
                state.orderdata.billing = {};
                state.orderdata.shipping = {};
                state.orderdata.customer_id = 0;
            }
        },
        emptyOrderdata: function emptyOrderdata(state) {
            state.orderdata = {
                billing: {},
                shipping: {},
                customer_id: 0,
                customer_note: '',
                payment_method: '',
                payment_method_title: ''
            };
        },
        setCustomerNote: function setCustomerNote(state, note) {
            state.orderdata.customer_note = note.trim();
        },
        removeCustomerNote: function removeCustomerNote(state) {
            state.orderdata.customer_note = '';
        },
        setGateway: function setGateway(state, gateway) {
            state.orderdata.payment_method = gateway.id;
            state.orderdata.payment_method_title = gateway.title;
        },
        setCanProcessPayment: function setCanProcessPayment(state, canProcessPayment) {
            state.canProcessPayment = canProcessPayment;
        }
    },
    actions: {
        setOrderDataAction: function setOrderDataAction(context, orderdata) {
            context.commit('setOrderData', orderdata);
        },
        setCustomerAction: function setCustomerAction(context, customer) {
            context.commit('setCustomer', customer);
        },
        emptyOrderdataAction: function emptyOrderdataAction(context) {
            context.commit('emptyOrderdata');
        },
        setCustomerNoteAction: function setCustomerNoteAction(context, note) {
            context.commit('setCustomerNote', note);
        },
        removeCustomerNoteAction: function removeCustomerNoteAction(context) {
            context.commit('removeCustomerNote');
        },
        setGatewayAction: function setGatewayAction(context, gateway) {
            context.commit('setGateway', gateway);
        },
        setCanProcessPaymentAction: function setCanProcessPaymentAction(context, canProcessPayment) {
            context.commit('setCanProcessPayment', canProcessPayment);
        }
    }
};

/***/ }),
/* 33 */,
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
/* 65 */
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
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Overlay_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProductSearch_vue__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomerSearch_vue__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FeeKeypad_vue__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_mugen_scroll__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_mugen_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_mugen_scroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PrintReceipt_vue__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__PrintReceiptHtml_vue__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CustomerNote_vue__ = __webpack_require__(174);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











let Modal = wepos_get_lib('Modal');

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Home',

    components: {
        ProductSearch: __WEBPACK_IMPORTED_MODULE_1__ProductSearch_vue__["a" /* default */],
        CustomerSearch: __WEBPACK_IMPORTED_MODULE_2__CustomerSearch_vue__["a" /* default */],
        Overlay: __WEBPACK_IMPORTED_MODULE_0__Overlay_vue__["a" /* default */],
        Modal,
        MugenScroll: __WEBPACK_IMPORTED_MODULE_4_vue_mugen_scroll___default.a,
        FeeKeypad: __WEBPACK_IMPORTED_MODULE_3__FeeKeypad_vue__["a" /* default */],
        PrintReceipt: __WEBPACK_IMPORTED_MODULE_5__PrintReceipt_vue__["a" /* default */],
        PrintReceiptHtml: __WEBPACK_IMPORTED_MODULE_6__PrintReceiptHtml_vue__["a" /* default */],
        CustomerNote: __WEBPACK_IMPORTED_MODULE_7__CustomerNote_vue__["a" /* default */]
    },

    data() {
        return {
            showHelp: false,
            showQucikMenu: false,
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
            emptyGatewayDiv: 0,
            cashAmount: '',
            availableTax: [],
            settings: {},
            taxSettings: {},
            printdata: wepos.hooks.applyFilters('wepos_initial_print_data', {
                gateway: {
                    id: '',
                    title: ''
                }
            }),
            feeData: {},
            createprintreceipt: false,
            selectedCategory: '',
            selectedGateway: '',
            categories: [],
            showReceiptHtml: wepos.hooks.applyFilters('wepos_render_receipt_html', true),
            quickLinkList: wepos.hooks.applyFilters('wepos_quick_links', []),
            quickLinkListStart: wepos.hooks.applyFilters('wepos_quick_links_start', []),
            availableGatewayContent: wepos.hooks.applyFilters('wepos_avaialable_gateway_content', []),
            afterMainContents: wepos.hooks.applyFilters('wepos_after_main_content', []),
            beforCartPanels: wepos.hooks.applyFilters('wepos_before_cart_panel', [])
        };
    },
    computed: {
        cartdata() {
            return this.$store.state.Cart.cartdata;
        },
        orderdata() {
            return this.$store.state.Order.orderdata;
        },
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
            };
        },
        getFilteredProduct() {
            if (this.$route.query.category !== undefined) {
                return this.products.filter(product => {
                    var foundCat = weLo_.find(product.categories, { id: parseInt(this.$route.query.category) });
                    return foundCat != undefined && Object.keys(foundCat).length > 0;
                });
            } else {
                return this.products;
            }
        },
        changeAmount() {
            var returnMoney = this.unFormat(this.cashAmount) - this.$store.getters['Cart/getTotal'];
            return returnMoney > 0 ? returnMoney : 0;
        },
        getBreadCrums() {
            if (this.$route.query.category !== undefined) {
                var categories = jQuery.extend(true, [], this.categories),
                    selectedCat = weLo_.find(this.categories, { id: parseInt(this.$route.query.category) }),
                    selectedCatIndex = weLo_.findIndex(this.categories, selectedCat);

                var categoriesLoop = categories.splice(0, selectedCatIndex + 1);
                var choosenCat = [];
                if (categoriesLoop.length > 0) {
                    for (var i = categoriesLoop.length - 1; i >= 0; i--) {
                        if (choosenCat.length > 0) {
                            var foundCat = weLo_.find(categoriesLoop, { id: categoriesLoop[i + 1].parent_id });
                            if (foundCat != undefined) {
                                choosenCat.push(foundCat);
                                if (foundCat.parent_id == null) {
                                    break;
                                }
                            }
                        } else {
                            choosenCat.push(categoriesLoop[i]);
                        }
                    }

                    return choosenCat.slice().reverse();
                }
            }
            return [];
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
        },
        '$route.query.category'() {
            this.selectedCategory = {
                id: -1,
                level: 0,
                name: this.__('All categories', 'wepos'),
                parent_id: null
            };
            if (this.$route.query.category !== undefined) {
                this.selectedCategory = weLo_.find(this.categories, { id: parseInt(this.$route.query.category) });
            }
        },
        'selectedGateway'(newdata, olddata) {
            var gateway = weLo_.find(this.availableGateways, { 'id': newdata });
            this.$store.dispatch('Order/setGatewayAction', gateway);
        },

        cashAmount(newdata, olddata) {
            this.ableToProcess();
        }
    },

    methods: {
        openQucikMenu() {
            this.showQucikMenu = true;
        },
        openHelp(e) {
            e.preventDefault();
            this.showHelp = true;
            this.showQucikMenu = false;
        },
        closeHelp() {
            this.showHelp = false;
        },
        addCustomerNote(note) {
            this.$store.dispatch('Order/setCustomerNoteAction', note);
        },
        removeCustomerNote() {
            this.$store.dispatch('Order/removeCustomerNoteAction');
        },
        removeBreadcrums() {
            this.$router.push({ name: 'Home' });
        },
        logout() {
            wepos.hooks.doAction('wepos_before_logout');
            window.location.href = wepos.logout_url.toString();
        },
        emptyCart() {
            this.$store.dispatch('Cart/emptyCartAction');
            this.$store.dispatch('Order/emptyOrderdataAction');

            this.printdata = wepos.hooks.applyFilters('wepos_initial_print_data', {
                gateway: {
                    id: '',
                    title: ''
                }
            });

            this.showPaymentReceipt = false;
            this.cashAmount = '';
            this.eventBus.$emit('emptycart', this.orderdata);
            this.showQucikMenu = false;
        },
        toggleProductView(e) {
            e.preventDefault();
            this.productView = this.productView == 'grid' ? 'list' : 'grid';
        },
        createNewSale() {
            this.$router.push({
                name: 'Home'
            });
            this.emptyCart();
        },
        ableToProcess() {
            let canProcess = this.cartdata.line_items.length > 0 && this.isSelectGateway();

            if (this.selectedGateway === 'wepos_cash') {
                canProcess = this.unFormat(this.cashAmount) >= this.truncateNumber(this.$store.getters['Cart/getTotal']) && canProcess;
            }

            console.log(canProcess);

            this.$store.dispatch('Order/setCanProcessPaymentAction', canProcess);
        },
        processPayment(e) {
            if (!this.$store.getters['Order/getCanProcessPayment']) {
                return;
            }
            var self = this,
                gateway = weLo_.find(this.availableGateways, { 'id': this.orderdata.payment_method }),
                orderdata = wepos.hooks.applyFilters('wepos_order_form_data', {
                billing: this.orderdata.billing,
                shipping: this.orderdata.shipping,
                line_items: this.cartdata.line_items,
                fee_lines: this.cartdata.fee_lines,
                customer_id: this.orderdata.customer_id,
                customer_note: this.orderdata.customer_note,
                payment_method: this.orderdata.payment_method,
                payment_method_title: this.orderdata.payment_method_title,
                meta_data: [{
                    key: '_wepos_is_pos_order',
                    value: true
                }, {
                    key: '_wepos_cash_tendered_amount',
                    value: self.cashAmount.toString()
                }, {
                    key: '_wepos_cash_change_amount',
                    value: self.changeAmount.toString()
                }]
            }, this.orderdata, this.cartdata);

            var $contentWrap = jQuery('.wepos-checkout-wrapper');
            $contentWrap.block({ message: null, overlayCSS: { background: '#fff url(' + wepos.ajax_loader + ') no-repeat center', opacity: 0.4 } });

            wepos.api.post(wepos.rest.root + wepos.rest.wcversion + '/orders', orderdata).done(response => {
                wepos.api.post(wepos.rest.root + wepos.rest.posversion + '/payment/process', response).done(data => {
                    if (data.result == 'success') {
                        this.$router.push({
                            name: 'Home',
                            query: {
                                order_key: response.order_key,
                                payment: 'success'
                            }
                        });
                        this.printdata = wepos.hooks.applyFilters('wepos_after_payment_print_data', {
                            line_items: this.cartdata.line_items,
                            fee_lines: this.cartdata.fee_lines,
                            subtotal: this.$store.getters['Cart/getSubtotal'],
                            taxtotal: this.$store.getters['Cart/getTotalTax'],
                            ordertotal: this.$store.getters['Cart/getTotal'],
                            gateway: {
                                id: response.payment_method,
                                title: response.payment_method_title
                            },
                            order_id: response.id,
                            order_date: response.date_created,
                            cashamount: this.cashAmount.toString(),
                            changeamount: this.changeAmount.toString()
                        }, orderdata);
                        $contentWrap.unblock();
                    } else {
                        $contentWrap.unblock();
                    }
                }).fail(data => {
                    $contentWrap.unblock();
                    alert(data.responseJSON.message);
                });
            }).fail(response => {
                $contentWrap.unblock();
                alert(response.responseJSON.message);
            });
        },

        initPayment() {
            if (this.$store.state.Cart.cartdata.line_items.length <= 0) {
                return;
            }

            this.showModal = true;
            this.$store.dispatch('Order/setGatewayAction', this.availableGateways[0]);
            this.selectedGateway = this.availableGateways[0].id;
        },

        backToSale() {
            this.showModal = false;
            this.showHelp = false;
            // Remove gateway selections
        },
        isSelectGateway() {
            return !(this.orderdata.payment_method == undefined || this.orderdata.payment_method == '');
        },
        getProductImage(product) {
            return product.images.length > 0 ? product.images[0].woocommerce_thumbnail : wepos.placeholder_image;
        },
        getProductImageName(product) {
            return product.images.length > 0 ? product.images[0].name : product.name;
        },
        setDiscount(value, type) {
            this.$store.dispatch('Cart/addDiscountAction', { title: this.__('Discount', 'wepos'), value: value, type: type });
        },
        saveFee(key) {
            this.$store.dispatch('Cart/saveFeeValueAction', { key: key, feeData: this.feeData });
            this.feeData = {};
        },
        cancelEditFee(key) {
            this.$store.dispatch('Cart/cancelSaveFeeValueAction', key);
            this.feeData = {};
        },
        editFeeData(key) {
            this.$store.dispatch('Cart/editFeeValueAction', key);
            this.feeData = Object.assign({}, this.cartdata.fee_lines[key]);
            this.$nextTick(() => {
                jQuery(this.$refs.fee_name).focus();
            });
        },
        setFee(value, type) {
            this.$store.dispatch('Cart/addFeeAction', { title: this.__('Fee', 'wepos'), value: value, type: type });
        },
        removeFeeLine(key) {
            this.$store.dispatch('Cart/removeFeeLineItemsAction', key);
        },
        fetchProducts() {
            if (this.page == 1) {
                this.productLoading = true;
            }

            if (this.totalPages >= this.page) {
                wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/products?status=publish&per_page=30&page=' + this.page).done((response, status, xhr) => {
                    this.products = this.products.concat(response);
                    this.page += 1;
                    this.totalPages = parseInt(xhr.getResponseHeader('X-WP-TotalPages'));
                    this.productLoading = false;
                }).then((response, status, xhr) => {
                    this.fetchProducts();
                });
            } else {
                this.productLoading = false;
            }
        },

        maybeRemoveDeletedProduct(cartData) {
            return new Promise((resolve, reject) => {
                if (!cartData) {
                    return resolve(cartData);
                }

                if (!cartData.line_items || cartData.line_items.length < 1) {
                    return resolve(cartData);
                }

                let productIds = cartData.line_items.map(lineItem => {
                    return lineItem.product_id;
                });

                wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/products?include=' + productIds.toString()).then(response => {
                    let foundProducts = response.map(product => {
                        return product.id;
                    });

                    cartData.line_items.forEach((product, key) => {
                        if (!foundProducts.includes(product.product_id)) {
                            cartData.line_items.splice(key, 1);
                            localStorage.setItem('cartdata', JSON.stringify(cartData));
                        }
                    });

                    return resolve(cartData);
                }).fail(() => {
                    return reject(cartData);
                });
            });
        },

        selectCustomer(customer) {
            this.$store.dispatch('Order/setCustomerAction', customer);
        },
        selectVariationProduct(product) {
            this.viewVariationPopover = true;
            this.selectedVariationProduct = product;
        },
        addVariationProduct() {
            let chosenVariationProduct = this.findMatchingVariations(this.selectedVariationProduct.variations, this.selectedAttribute);
            let variationProduct = chosenVariationProduct[0];

            if (!this.hasStock(variationProduct)) {
                this.toast({
                    title: this.__('This product is out of stock.', 'wepos'),
                    type: 'error'
                });
            }

            variationProduct.parent_id = this.selectedVariationProduct.id;
            variationProduct.type = this.selectedVariationProduct.type;
            variationProduct.name = this.selectedVariationProduct.name;
            variationProduct.type = this.selectedVariationProduct.type;
            this.selectedAttribute = {};
            this.attributeDisabled = true;
            this.$store.dispatch('Cart/addToCartAction', variationProduct);
        },
        addToCart(product) {
            if (!this.hasStock(product)) {
                this.toast({
                    title: this.__('Product is out of stock!', 'wepos-pro'),
                    type: 'error'
                });
                return;
            }

            this.$store.dispatch('Cart/addToCartAction', product);
        },
        toggleEditQuantity(product, key) {
            this.$store.dispatch('Cart/toggleEditQuantityAction', key);
        },
        removeItem(key) {
            this.$store.dispatch('Cart/removeCartItemAction', key);
        },
        addQuantity(item, key) {
            this.$store.dispatch('Cart/addItemQuantityAction', key);
        },
        removeQuantity(item, key) {
            this.$store.dispatch('Cart/removeItemQuantityAction', key);
        },
        fetchGateway() {
            wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/payment/gateways').done(response => {
                this.availableGateways = response;
                this.emptyGatewayDiv = 4 - this.availableGateways.length % 4;
            });
        },
        truncateTitle(text, length) {
            return weLo_.truncate(text, { 'length': length });
        },
        unSanitizeString(str) {
            return str.split('-').map(function capitalize(part) {
                return part.charAt(0).toUpperCase() + part.slice(1);
            }).join(' ');
        },
        fetchSettings() {
            wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/settings').done(response => {
                this.settings = response;
                this.$store.dispatch('Cart/setSettingsAction', response);
            });
        },
        fetchTaxes() {
            wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/taxes').done(response => {
                this.availableTax = response;
                this.$store.dispatch('Cart/setAvailableTaxAction', response);
            });
        },
        handleCategorySelect(selectedOption, id) {
            if (selectedOption.id == '-1') {
                this.$router.push({ name: 'Home' });
            } else {
                this.$router.push({ name: 'Home', query: { 'category': selectedOption.id } });
            }
        },
        handleCategoryRemove(selectedOption, id) {
            this.$router.push({ name: 'Home' });
            this.selectedCategory = {
                id: -1,
                level: 0,
                name: this.__('All categories', 'wepos'),
                parent_id: null
            };
        },
        fetchCategories() {
            wepos.api.get(wepos.rest.root + wepos.rest.wcversion + '/products/categories?hide_empty=true&_fields=id,name,parent_id&per_page=100').then(response => {
                response.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                var tree = function (response, root) {
                    var r = [],
                        o = {};
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

                var selectedCat = {
                    id: -1,
                    level: 0,
                    name: this.__('All categories', 'wepos'),
                    parent_id: null
                };
                var sorted = tree.reduce(function traverse(level) {
                    return function (r, a) {
                        a.response.level = level;
                        return r.concat(a.response, (a.children || []).reduce(traverse(level + 1), []));
                    };
                }(0), []);
                this.categories = sorted;

                this.categories.unshift(selectedCat);
                this.selectedCategory = selectedCat;

                if (this.$route.query.category !== undefined) {
                    this.selectedCategory = weLo_.find(response, { id: parseInt(this.$route.query.category) });
                }
            });
        },
        filterProducts() {
            this.products = this.products.filter(product => {
                return weLo_.findIndex(product.categories, { id: this.$route.query.category }) > 0;
            });
        },

        fetchTaxSettings() {
            wepos.api.get(wepos.rest.root + wepos.rest.wcversion + '/settings/tax').done(response => {
                this.taxSettings = response;
            });
        },

        focusCashInput() {
            let inputCashAmount = document.querySelector('#input-cash-amount');
            inputCashAmount.focus();
        }
    },

    async created() {
        this.fetchSettings();
        this.fetchTaxes();
        this.fetchProducts();
        this.fetchGateway();
        this.fetchCategories();
        // this.fetchTaxSettings();

        if (typeof localStorage != 'undefined') {
            try {
                var cartdata = JSON.parse(localStorage.getItem('cartdata'));
                var orderdata = JSON.parse(localStorage.getItem('orderdata'));
                cartdata = await this.maybeRemoveDeletedProduct(cartdata);
                this.$store.dispatch('Cart/setCartDataAction', cartdata);
                this.$store.dispatch('Order/setOrderDataAction', orderdata);
            } catch (cartdata) {
                var orderdata = JSON.parse(localStorage.getItem('orderdata'));
                this.$store.dispatch('Cart/setCartDataAction', cartdata);
                this.$store.dispatch('Order/setOrderDataAction', orderdata);
            }
        }

        window.addEventListener('beforeunload', () => {
            if (typeof localStorage != 'undefined') {
                localStorage.setItem('cartdata', JSON.stringify(this.$store.state.Cart.cartdata));
                localStorage.setItem('orderdata', JSON.stringify(this.$store.state.Order.orderdata));
            }
        }, false);
    }
});

/***/ }),
/* 67 */
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
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__KeyboardControl_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_v_hotkey__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_v_hotkey___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_v_hotkey__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import Modal from './Modal.vue';



let Modal = wepos_get_lib('Modal');

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'ProductInlineSearch',

    props: {
        products: {
            type: Array,
            default() {
                return [];
            }
        },
        settings: {
            type: Object,
            default() {
                return {};
            }
        }
    },

    components: {
        Modal,
        KeyboardControl: __WEBPACK_IMPORTED_MODULE_0__KeyboardControl_vue__["a" /* default */]
    },
    data() {
        return {
            showResults: false,
            showVariationModal: false,
            mode: 'scan',
            serachInput: '',
            searchableProduct: [],
            selectedVariationProduct: {},
            attributeDisabled: true,
            chosenAttribute: {}
        };
    },

    computed: {
        placeholder() {
            return this.mode == 'scan' ? this.__('Scan your product', 'wepos') : this.__('Search product by typing', 'wepos');
        },

        hotkeys() {
            return {
                'f1': this.changeProductSearch,
                'f2': this.changeScan,
                'esc': this.searchClose
            };
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
        changeScan(e) {
            e.preventDefault();
            this.changeMode('scan');
        },

        changeProductSearch(e) {
            e.preventDefault();
            this.changeMode('product');
        },

        searchClose() {
            this.showResults = false;
            this.showVariationModal = false;
            this.changeMode('scan');
            this.$refs.productSearch.blur();
        },

        onKeyDown() {
            jQuery('.product-search-item.selected').next().children('a').focus();
        },

        onKeyUp() {
            jQuery('.product-search-item.selected').prev().children('a').focus();
        },

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
            if (this.mode == 'scan') {
                this.searchableProduct = [];
                this.showResults = false;
            }
            this.$refs.productSearch.focus();
        },

        handleProductScan() {
            if (this.mode == 'product') {
                return;
            }
            var generalSettings = this.settings.wepos_general,
                field = generalSettings.barcode_scanner_field == 'custom' ? 'barcode' : generalSettings.barcode_scanner_field,
                selectedProduct = {},
                filterProduct = this.products.filter(product => {
                if (product.type == 'simple') {
                    if (product[field].toString() == this.serachInput) {
                        return true;
                    }
                }
                if (product.type == 'variable') {
                    var ifFound = false;
                    if (product.variations.length > 0) {
                        weLo_.forEach(product.variations, (item, key) => {
                            if (item[field].toString() == this.serachInput) {
                                ifFound = true;
                            }
                        });
                    }

                    if (ifFound) {
                        return true;
                    }
                }
                return false;
            });

            if (filterProduct.length > 0) {
                filterProduct = filterProduct[0];

                if (filterProduct.type == 'variable') {
                    var variations = filterProduct.variations;
                    var selectedVariationProduct = variations.filter(item => {
                        if (item[field].toString() == this.serachInput) {
                            return true;
                        }
                        return false;
                    });
                    selectedProduct = selectedVariationProduct[0];
                    selectedProduct.parent_id = filterProduct.id;
                    selectedProduct.type = filterProduct.type;
                    selectedProduct.name = filterProduct.name;

                    this.$emit('onProductAdded', selectedProduct);
                } else {
                    this.$emit('onProductAdded', filterProduct);
                }
            }

            this.serachInput = '';
        },

        searchProduct(e) {
            if (this.serachInput) {
                if (this.mode == 'product') {
                    this.searchableProduct = this.products.filter(product => {
                        if (product.id.toString().indexOf(this.serachInput) != -1) {
                            return true;
                        } else if (product.name.toString().toLowerCase().indexOf(this.serachInput.toLowerCase()) != -1) {
                            return true;
                        } else if (product.sku.indexOf(this.serachInput) != -1) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
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

    },

    mounted() {
        this.$refs.productSearch.focus();
    }
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_KeyboardControl_vue__ = __webpack_require__(70);
/* unused harmony namespace reexport */
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_KeyboardControl_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/KeyboardControl.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28df4a5e", Component.options)
  } else {
    hotAPI.reload("data-v-28df4a5e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    listLength: Number
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  render(h) {
    return h("ul", this.$scopedSlots.default({ selectedIndex: this.selectedIndex }));
  },
  methods: {
    keyHandler(e) {
      /**
        38 - up
        40 - down
        9 - tab
        13 - enter
       */
      const key = e.which || e.keyCode;

      if (key === 38 || e.shiftKey && key === 9) {
        this.handleKeyUp(e);
        this.$emit('key-up');
      } else if (key === 40 || key === 9) {
        this.handleKeyDown(e);
        this.$emit('key-down');
      }
    },
    handleKeyUp(e) {
      e.preventDefault();
      if (this.selectedIndex <= 0) {
        // If index is less than or equal to zero then set it to the last item index
        this.selectedIndex = this.listLength - 1;
      } else if (this.selectedIndex > 0 && this.selectedIndex <= this.listLength - 1) {
        // If index is larger than zero and smaller or equal to last index then decrement
        this.selectedIndex--;
      }
    },

    handleKeyDown(e) {
      e.preventDefault();
      // Check if index is below 0
      // This means that we did not start yet
      if (this.selectedIndex < 0 || this.selectedIndex === this.listLength - 1) {
        // Set the index to the first item
        this.selectedIndex = 0;
      } else if (this.selectedIndex >= 0 && this.selectedIndex < this.listLength - 1) {
        this.selectedIndex++;
      }
    },
    addKeyHandler(e) {
      window.addEventListener("keydown", this.keyHandler);
    },

    removeKeyHandler() {
      window.removeEventListener("keydown", this.keyHandler);
    }
  },
  created() {
    this.addKeyHandler();
  },
  destroyed() {
    this.removeKeyHandler();
  }
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__KeyboardControl_vue__ = __webpack_require__(69);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import Modal from './Modal.vue';

let Modal = wepos_get_lib('Modal');

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'CustomerSearch',

    components: {
        Modal,
        KeyboardControl: __WEBPACK_IMPORTED_MODULE_0__KeyboardControl_vue__["a" /* default */]
    },

    data() {
        return {
            submitDisable: false,
            customers: [],
            customer: {
                email: '',
                first_name: '',
                last_name: '',
                address_1: '',
                address_2: '',
                country: '',
                state: '',
                postcode: '',
                city: '',
                phone: ''
            },
            showCustomerResults: false,
            serachInput: '',
            showNewCustomerModal: false,
            stateList: [],
            selectedState: null,
            selectedCountry: null,
            isDisabled: true
        };
    },
    computed: {
        hotkeys() {
            return {
                'f7': this.focusCustomerSearch,
                'shift+f7': this.addNewCustomer,
                'esc': this.searchClose
            };
        },
        getCountryList() {
            return Object.keys(wepos.countries).map(val => {
                return {
                    code: val,
                    name: wepos.countries[val]
                };
            });
        },
        orderdata() {
            return this.$store.state.Order.orderdata;
        }
    },

    watch: {
        customer: {
            handler(val) {
                this.isDisabled = true;
                if (val.first_name !== undefined && val.first_name.trim() != '' && val.last_name !== undefined && val.last_name.trim() != '' && val.email !== undefined && val.email.trim() != '') {
                    this.isDisabled = false;
                }
            },
            deep: true
        },

        'orderdata.customer_id'(newVal) {
            this.serachInput = newVal ? this.orderdata.billing.first_name + ' ' + this.orderdata.billing.last_name : '';
        }

    },

    methods: {
        focusCustomerSearch(e) {
            e.preventDefault();
            this.$refs.customerSearch.focus();
        },
        searchClose() {
            this.showCustomerResults = false;
            this.serachInput = '';
            this.showNewCustomerModal = false;
            this.$refs.customerSearch.blur();
        },
        addNewCustomer() {
            this.showNewCustomerModal = true;
        },
        onKeyDown() {
            jQuery('.customer-search-item.selected').next().children('a').focus();
        },

        onKeyUp() {
            jQuery('.customer-search-item.selected').prev().children('a').focus();
        },
        triggerFocus() {
            this.showCustomerResults = true;
            this.$emit('onfocus');
        },
        onblur() {
            this.showCustomerResults = false;
            this.$emit('onblur');
        },
        closeNewCustomerModal() {
            this.customer = {
                email: '',
                first_name: '',
                last_name: '',
                address_1: '',
                address_2: '',
                country: '',
                state: '',
                postcode: '',
                city: '',
                phone: ''
            };
            this.selectedState = null;
            this.selectedCountry = null;
            this.showNewCustomerModal = false;
        },
        searchCustomer() {
            if (this.serachInput) {
                wepos.api.get(wepos.rest.root + wepos.rest.posversion + '/customers?search=' + this.serachInput).done(response => {
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
                    username: this.customer.email,
                    password: this.generatePassword(20),
                    billing: {
                        first_name: this.customer.first_name,
                        last_name: this.customer.last_name,
                        address_1: this.customer.address_1,
                        address_2: this.customer.address_2,
                        country: this.selectedCountry !== null ? this.selectedCountry.code : '',
                        state: this.selectedState !== null ? this.selectedState.code : this.customer.state,
                        postcode: this.customer.postcode,
                        city: this.customer.city,
                        phone: this.customer.phone,
                        email: this.customer.email
                    }
                };
                var $contentWrap = jQuery('.wepos-new-customer-form');
                $contentWrap.block({ message: null, overlayCSS: { background: '#fff url(' + wepos.ajax_loader + ') no-repeat center', opacity: 0.4 } });

                wepos.api.post(wepos.rest.root + wepos.rest.posversion + '/customers', customerData).done(response => {
                    this.serachInput = response.first_name + ' ' + response.last_name;
                    this.$emit('onCustomerSelected', response);
                    $contentWrap.unblock();
                    this.closeNewCustomerModal();
                }).fail(response => {
                    $contentWrap.unblock();
                    alert(response.responseJSON.message);
                });
            } else {
                alert(this.__('Please enter an email address for customer', 'wepos'));
            }
        },
        removeCountrySelect(selectedOption, id) {
            this.selectedState = null;
            this.selectedCountry = null;
            this.stateList = [];
            this.customer.country = '';
            this.customer.state = '';
        },

        removeStateSelect(selectedOption, id) {
            this.selectedState = null;
            this.customer.state = '';
        },
        handleCountrySelect(selectedOption, id) {
            var state = wepos.states[selectedOption.code] !== undefined ? wepos.states[selectedOption.code] : [];
            var stateKeys = Object.keys(state);

            if (stateKeys.length > 0) {
                this.stateList = stateKeys.map(val => {
                    return {
                        code: val,
                        name: state[val]
                    };
                });
            } else {
                this.stateList = state;
                this.selectedState = null;
            }
        },
        generatePassword(length) {
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        }
    },
    created() {
        this.eventBus.$on('emptycart', orderdata => {
            this.serachInput = '';
        });

        var orderdata = JSON.parse(localStorage.getItem('orderdata'));

        if (orderdata.customer_id != 'undefined' && orderdata.customer_id != 0) {
            this.serachInput = orderdata.billing.first_name + ' ' + orderdata.billing.last_name;
        }
    }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Keyboard_vue__ = __webpack_require__(163);
//
//
//
//
//
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

    name: 'FeeKeypad',

    components: {
        keyboard: __WEBPACK_IMPORTED_MODULE_0__Keyboard_vue__["a" /* default */]
    },
    computed: {
        hotkeys() {
            var keymap = {
                discount: {
                    'f4': this.showFeeKeypad,
                    'esc': this.hideFeeKepad
                },
                fee: {
                    'f5': this.showFeeKeypad,
                    'esc': this.hideFeeKepad
                }
            };
            return keymap[this.shortKey];
        }
    },
    props: {
        name: {
            type: String,
            default: 'Fee'
        },
        className: {
            type: String,
            default: ''
        },
        shortKey: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            input: '',
            displayValue: '',
            viewFeeKeypad: false
        };
    },
    methods: {
        hideFeeKepad(e) {
            this.viewFeeKeypad = false;
        },
        layout() {
            return '123|456|789|{<span class="keypord-icon flaticon-backspace"></span>:backspace}0' + wepos.currency_format_decimal_sep + '|{% ' + this.name + ':percent}{' + wepos.currency_format_symbol + ' ' + this.name + ':flat}';
        },
        percentFee(keyboard) {
            this.$emit('inputfee', keyboard.value.toString(), 'percent');
            this.viewFeeKeypad = false;
            this.input = '';
            this.displayValue = '';
        },
        flatFee(keyboard) {
            this.$emit('inputfee', keyboard.value.toString(), 'flat');
            this.viewFeeKeypad = false;
            this.input = '';
            this.displayValue = '';
        },
        change(value) {
            if (!isNaN(value)) {
                this.displayValue = value;
                this.input = this.displayValue;
            } else {
                this.input = this.displayValue;
                if (this.displayValue == '') {
                    this.input = '';
                }
            }

            jQuery(this.$refs.feeinput).focus();

            if (this.input == '') {
                jQuery(this.$refs.feeinput).focus();
            }
        },
        inputChange() {
            if (!isNaN(this.displayValue)) {
                this.input = this.displayValue;
            } else {
                this.displayValue = this.input;
            }

            if (this.input == '') {
                jQuery(this.$refs.feeinput).focus();
            }
        },
        showFeeKeypad(e) {
            e.preventDefault();
            this.viewFeeKeypad = true;
            setTimeout(() => {
                jQuery(this.$refs.feeinput).focus();
            }, 500);
        }
    }
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const Tokens = {
	// Sequences that no-one will ever put in their keyboards.
	PIPE: '7440011c983cf39ae730b1f831e2922ac5a76910',
	OPEN_BRACE: 'f630c4abcae620278f82e142a526ef325c2a773a',
	CLOSE_BRACE: 'ad982c66898e02a5dab419ea7568421b03f68ee2'
};

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'keyboard',

	props: {
		value: {
			type: String,
			default: ''
		},
		layouts: {
			type: [String, Array],
			required: true
		},
		maxlength: {
			type: Number,
			default: 0,
			validator: value => value >= 0
		},
		pattern: {
			type: String,
			default: null
		}
	},

	data() {
		return {
			layout: 0
		};
	},

	computed: {
		/**
   * Whether or not the keyboard input has hit its maximum length.
   * @returns {Boolean}
   */
		full() {
			return this.maxlength > 0 && this.value.length >= this.maxlength;
		},

		/**
   * Whether or not the keyboard input is empty.
   * @return {Boolean}
   */
		empty() {
			return this.value.length === 0;
		},

		/**
   * Returns the lines that make up a layout.
   * @return {Array}
   */
		lines() {
			let layout = (Array.isArray(this.layouts) ? this.layouts : [this.layouts])[this.layout];

			return layout.replace('||', Tokens.PIPE).replace('{{', Tokens.OPEN_BRACE).replace('}}', Tokens.CLOSE_BRACE).split('|');
		},

		/**
   * Returns an array of buttons to render in the component.
   * @returns {Array[]}
   */
		buttons() {
			return this.lines.map(line => {
				// TODO: Could potentially rely on Object.values() here instead of being explicit.
				let stream = line.match(new RegExp(`(${Tokens.OPEN_BRACE}|${Tokens.CLOSE_BRACE}|${Tokens.PIPE}|.)`, 'g'));

				let buttons = [];
				let token = null;

				stream.forEach(char => {
					if (char === '{') {
						token = '';
					} else if (char === '}') {
						let command = token.split(':');
						let text = command.length > 1 ? command[0] : '';
						let action = command.length > 1 ? command[1] : command[0];
						let args = command.length > 2 ? command[2] : null;
						let method = null;

						if (['append', 'backspace', 'space', 'clear', 'goto'].indexOf(action) >= 0) method = this[action].bind(this, args);else method = this.$emit.bind(this, action, this);

						buttons.push({
							type: 'action',
							action: { name: action.replace(/\s+/g, '-').toLowerCase(), callable: method },
							value: text,
							args
						});

						token = null;
					} else {
						if (token !== null) {
							token += char;
						} else {
							if (char === Tokens.PIPE) char = '|';
							if (char === Tokens.OPEN_BRACE) char = '{';
							if (char === Tokens.CLOSE_BRACE) char = '}';

							buttons.push({
								type: 'char',
								action: { name: null, callable: this.append.bind(this, char) },
								value: char,
								args: null
							});
						}
					}
				});

				return buttons;
			});
		},

		/**
   * Whether or not the current value matches the regex provided to pattern. Always
   * returns true if no pattern was provided.
   * @returns {Boolean}
   */
		valid() {
			return !this.pattern || this.value.match(new RegExp(this.pattern));
		}
	},

	methods: {
		/**
   * Mutates the keyboard value to a new value.
   * @param {String} value The new value.
   */
		mutate(value) {
			if (this.maxlength > 0) {
				value = value.slice(0, this.maxlength);
			}

			this.$emit('input', value);
		},

		/**
   * Appends a new value to the end of the current keyboard value.
   * @param {String} char The character(s) to append.
   */
		append(char) {
			this.mutate(this.value + char);
		},

		/**
   * Remove the last character from the current keyboard value.
   */
		backspace() {
			this.mutate(this.value.slice(0, this.value.length - 1));
		},

		/**
   * Add one whitespace character to the current keyboard value.
   */
		space() {
			this.append(' ');
		},

		/**
   * Go to a new layout.
   * @param {Number} The layout index.
   */
		goto(layout) {
			if (Array.isArray(this.layouts)) {
				if (layout >= 0 && layout < this.layouts.length) {
					this.layout = layout;
				} else {
					throw new Error('The requested layout does not exist.');
				}
			} else {
				throw new Error('A single non-array layout was provided.');
			}
		},

		/**
   * Clear the entire keyboard value.
   */
		clear() {
			this.mutate('');
		}
	}
});

/***/ }),
/* 74 */,
/* 75 */
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


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'ReceiptPrint',

    methods: {
        printReceipt() {
            setTimeout(() => {
                window.print();
            }, 500);
        },
        handlePrintingPopup(evt) {
            let self = this;

            if ("Enter" === evt.code && self.$store.getters['Order/getCanProcessPayment']) {
                self.printReceipt();
            }
        },
        handlePrintReceiptSubmit() {
            document.addEventListener("keypress", this.handlePrintingPopup);
        }
    },

    mounted() {
        this.handlePrintReceiptSubmit();
    },

    destroyed() {
        document.removeEventListener("keypress", this.handlePrintingPopup);
    }
});

/***/ }),
/* 76 */
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        formatDate(date) {
            var date = new Date(date);
            return date.toLocaleString();
        }
    }
});

/***/ }),
/* 77 */
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

/* harmony default export */ __webpack_exports__["a"] = ({

    data() {
        return {
            viewNotePopover: false,
            customerNote: ''
        };
    },

    computed: {
        hotkeys() {
            return {
                'f6': this.openNote,
                'esc': this.closeNote
            };
        }
    },

    methods: {
        openNote(e) {
            e.preventDefault();
            this.viewNotePopover = true;
            setTimeout(() => {
                jQuery(this.$refs.customernote).focus();
            }, 500);
        },
        closeNote() {
            this.viewNotePopover = false;
        },
        addCustomerNote() {
            this.$emit('addnote', this.customerNote);
            this.viewNotePopover = false;
            this.customerNote = '';
        }
    }
});

/***/ }),
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(146);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(149);

var _router2 = _interopRequireDefault(_router);

var _store = __webpack_require__(29);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = wepos_get_lib('Vue'); // import Vue from 'vue'


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#vue-frontend-app',
    router: _router2.default,
    store: _store2.default,
    render: function render(h) {
        return h(_App2.default);
    },
    created: function created() {
        this.setLocaleData(wepos.i18n['wepos']);
    }
});

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(65);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_152fd186_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(148);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(147)
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
/* 147 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 148 */
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
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Home = __webpack_require__(150);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue = wepos_get_lib('Vue');
var Router = wepos_get_lib('Router');

Vue.use(Router);

exports.default = new Router({
    routes: wepos.hooks.applyFilters('wepos_frontend_routes', [{
        path: '/',
        name: 'Home',
        component: _Home2.default
    }])
});

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(66);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76253014_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(177);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(151)
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
/* 151 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Overlay_vue__ = __webpack_require__(67);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b9b24aa_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Overlay_vue__ = __webpack_require__(154);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(153)
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
/* 153 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 154 */
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
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductSearch_vue__ = __webpack_require__(68);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64fc4f12_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProductSearch_vue__ = __webpack_require__(157);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(156)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProductSearch_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64fc4f12_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProductSearch_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/ProductSearch.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64fc4f12", Component.options)
  } else {
    hotAPI.reload("data-v-64fc4f12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 156 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 157 */
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
      _c(
        "form",
        {
          attrs: { action: "", autocomplete: "off" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.handleProductScan($event)
            }
          }
        },
        [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.serachInput,
                expression: "serachInput"
              }
            ],
            ref: "productSearch",
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
              keyup: function($event) {
                $event.preventDefault()
                _vm.searchProduct($event)
              },
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
            ? _c("span", {
                staticClass: "search-icon flaticon-musica-searcher"
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.mode == "scan"
            ? _c("span", {
                staticClass: "search-icon flaticon-supermarket-scanner"
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "hotkey",
                  rawName: "v-hotkey",
                  value: _vm.hotkeys,
                  expression: "hotkeys"
                }
              ],
              staticClass: "search-type"
            },
            [
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
                [_vm._v(_vm._s(_vm.__("Product", "wepos")))]
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
                [_vm._v(_vm._s(_vm.__("Scan", "wepos")))]
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showResults && _vm.mode == "product",
                  expression: "showResults && mode=='product'"
                }
              ],
              staticClass: "search-result"
            },
            [
              _vm.searchableProduct.length
                ? _c(
                    "div",
                    [
                      _c("keyboard-control", {
                        attrs: { listLength: _vm.searchableProduct.length },
                        on: {
                          "key-down": _vm.onKeyDown,
                          "key-up": _vm.onKeyUp
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(ref) {
                              var selectedIndex = ref.selectedIndex
                              return _vm._l(_vm.searchableProduct, function(
                                product,
                                index
                              ) {
                                return _c(
                                  "li",
                                  {
                                    key: index,
                                    staticClass: "product-search-item",
                                    class: { selected: index === selectedIndex }
                                  },
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
                                                  "\n                                    "
                                              ),
                                              _c(
                                                "span",
                                                { staticClass: "price" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.formatPrice(
                                                        product.price
                                                      )
                                                    )
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              product.sku
                                                ? _c(
                                                    "span",
                                                    { staticClass: "sku" },
                                                    [
                                                      _vm._v(
                                                        _vm._s(product.sku)
                                                      )
                                                    ]
                                                  )
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
                                                  "\n                                    "
                                              ),
                                              _c(
                                                "span",
                                                { staticClass: "price" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.formatPrice(
                                                        product.price
                                                      )
                                                    )
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              product.sku
                                                ? _c(
                                                    "span",
                                                    { staticClass: "sku" },
                                                    [
                                                      _vm._v(
                                                        _vm._s(product.sku)
                                                      )
                                                    ]
                                                  )
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
                            }
                          }
                        ])
                      })
                    ],
                    1
                  )
                : _c("div", { staticClass: "no-data-found" }, [
                    _vm._v(
                      "\n                " +
                        _vm._s(_vm.__("No product found", "wepos")) +
                        "\n            "
                    )
                  ]),
              _vm._v(" "),
              _c("div", { staticClass: "suggession" }, [
                _c("span", { staticClass: "term" }, [
                  _c("span", { staticClass: "flaticon-swap" }),
                  _vm._v(
                    " " +
                      _vm._s(_vm.__("to navigate", "wepos")) +
                      "\n                "
                  )
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "term" }, [
                  _c("span", { staticClass: "flaticon-enter-arrow" }),
                  _vm._v(
                    " " +
                      _vm._s(_vm.__("to select", "wepos")) +
                      "\n                "
                  )
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "term" }, [
                  _c("strong", [_vm._v("esc")]),
                  _vm._v(
                    " " +
                      _vm._s(_vm.__("to dismiss", "wepos")) +
                      "\n                "
                  )
                ])
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _vm.showVariationModal
        ? _c(
            "modal",
            {
              attrs: {
                title: _vm.__("Select Variations", "wepos"),
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-64fc4f12", esExports)
  }
}

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CustomerSearch_vue__ = __webpack_require__(71);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_414ef29b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CustomerSearch_vue__ = __webpack_require__(160);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(159)
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
/* 159 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 160 */
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
        },
        {
          name: "hotkey",
          rawName: "v-hotkey",
          value: _vm.hotkeys,
          expression: "hotkeys"
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
          ref: "customerSearch",
          attrs: {
            type: "text",
            name: "customer_search",
            id: "customer-search",
            placeholder: _vm.__("Search customer", "wepos")
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
              _vm.addNewCustomer()
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
                  "div",
                  [
                    _c("keyboard-control", {
                      attrs: { listLength: _vm.customers.length },
                      on: { "key-down": _vm.onKeyDown, "key-up": _vm.onKeyUp },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function(ref) {
                            var selectedIndex = ref.selectedIndex
                            return _vm._l(_vm.customers, function(
                              customer,
                              index
                            ) {
                              return _c(
                                "li",
                                {
                                  key: index,
                                  staticClass: "customer-search-item",
                                  class: { selected: index === selectedIndex }
                                },
                                [
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
                                      _c(
                                        "span",
                                        { staticClass: "avatar wepos-left" },
                                        [
                                          _c("img", {
                                            attrs: {
                                              src: customer.avatar_url,
                                              alt:
                                                customer.first_name +
                                                " " +
                                                customer.last_name
                                            }
                                          })
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "name wepos-left" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              customer.first_name +
                                                " " +
                                                customer.last_name
                                            )
                                          ),
                                          _c(
                                            "span",
                                            { staticClass: "metadata" },
                                            [_vm._v(_vm._s(customer.email))]
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("span", {
                                        staticClass:
                                          "action flaticon-enter-arrow wepos-right"
                                      })
                                    ]
                                  )
                                ]
                              )
                            })
                          }
                        }
                      ])
                    })
                  ],
                  1
                )
              : _c("div", { staticClass: "no-data-found" }, [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.__("No customer found", "wepos")) +
                      "\n            "
                  )
                ]),
            _vm._v(" "),
            _c("div", { staticClass: "suggession" }, [
              _c("span", { staticClass: "term" }, [
                _c("span", { staticClass: "flaticon-swap" }),
                _vm._v(
                  " " +
                    _vm._s(_vm.__("to navigate", "wepos")) +
                    "\n                "
                )
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "term" }, [
                _c("span", { staticClass: "flaticon-enter-arrow" }),
                _vm._v(
                  " " +
                    _vm._s(_vm.__("to select", "wepos")) +
                    "\n                "
                )
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "term" }, [
                _c("strong", [_vm._v("esc")]),
                _vm._v(
                  " " +
                    _vm._s(_vm.__("to dismiss", "wepos")) +
                    "\n                "
                )
              ])
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _vm.showNewCustomerModal
        ? _c(
            "modal",
            {
              attrs: {
                title: _vm.__("Add New Customer", "wepos"),
                width: "700px",
                footer: true,
                header: true
              },
              on: { close: _vm.closeNewCustomerModal }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { staticClass: "wepos-new-customer-form" }, [
                  _c(
                    "form",
                    {
                      staticClass: "wepos-form",
                      attrs: { action: "", autocomplete: "off" }
                    },
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
                          attrs: {
                            type: "text",
                            placeholder: _vm.__("First Name", "wepos")
                          },
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
                          attrs: {
                            type: "text",
                            placeholder: _vm.__("Last Name", "wepos")
                          },
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
                          attrs: {
                            type: "email",
                            placeholder: _vm.__("Email", "wepos")
                          },
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
                          attrs: {
                            type: "text",
                            placeholder: _vm.__("Address 1", "wepos")
                          },
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
                            placeholder: _vm.__("Address 2 (optional)", "wepos")
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
                      _c(
                        "div",
                        { staticClass: "form-row col-2" },
                        [
                          _c(
                            "multiselect",
                            {
                              staticClass: "wepos-multiselect customer-country",
                              staticStyle: {
                                width: "48.5%",
                                "margin-right": "20px"
                              },
                              attrs: {
                                options: _vm.getCountryList,
                                selectLabel: "",
                                deselectLabel: "",
                                selectedLabel: "",
                                placeholder: _vm.__(
                                  "Select a country",
                                  "wepos"
                                ),
                                "track-by": "code",
                                label: "name"
                              },
                              on: {
                                select: _vm.handleCountrySelect,
                                remove: _vm.removeCountrySelect
                              },
                              scopedSlots: _vm._u([
                                {
                                  key: "singleLabel",
                                  fn: function(props) {
                                    return [
                                      _c("span", {
                                        domProps: {
                                          innerHTML: _vm._s(props.option.name)
                                        }
                                      })
                                    ]
                                  }
                                },
                                {
                                  key: "option",
                                  fn: function(props) {
                                    return [
                                      _c("span", {
                                        domProps: {
                                          innerHTML: _vm._s(props.option.name)
                                        }
                                      })
                                    ]
                                  }
                                }
                              ]),
                              model: {
                                value: _vm.selectedCountry,
                                callback: function($$v) {
                                  _vm.selectedCountry = $$v
                                },
                                expression: "selectedCountry"
                              }
                            },
                            [
                              _c("template", { slot: "noResult" }, [
                                _c("div", { staticClass: "no-data-found" }, [
                                  _vm._v(
                                    _vm._s(_vm.__("No country found", "wepos"))
                                  )
                                ])
                              ])
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _vm.stateList.length > 0
                            ? [
                                _c(
                                  "multiselect",
                                  {
                                    staticClass:
                                      "wepos-multiselect customer-state",
                                    staticStyle: { width: "48.5%" },
                                    attrs: {
                                      options: _vm.stateList,
                                      selectLabel: "",
                                      deselectLabel: "",
                                      selectedLabel: "",
                                      placeholder: _vm.__(
                                        "Select a state",
                                        "wepos"
                                      ),
                                      "track-by": "code",
                                      label: "name"
                                    },
                                    on: { remove: _vm.removeStateSelect },
                                    scopedSlots: _vm._u([
                                      {
                                        key: "singleLabel",
                                        fn: function(props) {
                                          return [
                                            _c("span", {
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  props.option.name
                                                )
                                              }
                                            })
                                          ]
                                        }
                                      },
                                      {
                                        key: "option",
                                        fn: function(props) {
                                          return [
                                            _c("span", {
                                              domProps: {
                                                innerHTML: _vm._s(
                                                  props.option.name
                                                )
                                              }
                                            })
                                          ]
                                        }
                                      }
                                    ]),
                                    model: {
                                      value: _vm.selectedState,
                                      callback: function($$v) {
                                        _vm.selectedState = $$v
                                      },
                                      expression: "selectedState"
                                    }
                                  },
                                  [
                                    _c("template", { slot: "noResult" }, [
                                      _c(
                                        "div",
                                        { staticClass: "no-data-found" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.__(
                                                "No country found",
                                                "wepos"
                                              )
                                            )
                                          )
                                        ]
                                      )
                                    ])
                                  ],
                                  2
                                )
                              ]
                            : [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.customer.state,
                                      expression: "customer.state"
                                    }
                                  ],
                                  attrs: {
                                    type: "text",
                                    placeholder: _vm.__(
                                      "States (optional)",
                                      "wepos"
                                    )
                                  },
                                  domProps: { value: _vm.customer.state },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.customer,
                                        "state",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]
                        ],
                        2
                      ),
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
                            placeholder: _vm.__("City (optional)", "wepos")
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
                              value: _vm.customer.postcode,
                              expression: "customer.postcode"
                            }
                          ],
                          attrs: {
                            type: "text",
                            placeholder: _vm.__(
                              "Zip/Postal Code (optional)",
                              "wepos"
                            )
                          },
                          domProps: { value: _vm.customer.postcode },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.customer,
                                "postcode",
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
                              value: _vm.customer.phone,
                              expression: "customer.phone"
                            }
                          ],
                          attrs: {
                            type: "text",
                            placeholder: _vm.__("Phone (optional)", "wepos")
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
                    staticClass: "add-new-customer-btn add-variation-btn",
                    attrs: { disabled: _vm.isDisabled },
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
var staticRenderFns = []
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
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FeeKeypad_vue__ = __webpack_require__(72);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0bc4dc95_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FeeKeypad_vue__ = __webpack_require__(166);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FeeKeypad_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0bc4dc95_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_FeeKeypad_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/FeeKeypad.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bc4dc95", Component.options)
  } else {
    hotAPI.reload("data-v-0bc4dc95", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 162 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Keyboard_vue__ = __webpack_require__(73);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fbb6d6c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Keyboard_vue__ = __webpack_require__(165);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(164)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Keyboard_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fbb6d6c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Keyboard_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/Keyboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fbb6d6c8", Component.options)
  } else {
    hotAPI.reload("data-v-fbb6d6c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 164 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "aside",
    {
      staticClass: "vue-keyboard",
      class: {
        full: _vm.full,
        empty: _vm.empty,
        valid: _vm.valid,
        invalid: !_vm.valid
      },
      attrs: {
        role: "application",
        "data-value": _vm.value,
        "data-layout": _vm.layout
      }
    },
    _vm._l(_vm.buttons, function(row) {
      return _c(
        "div",
        {
          staticClass: "vue-keyboard-row",
          attrs: { role: "row", "data-keys": row.length }
        },
        _vm._l(row, function(btn) {
          return _c("button", {
            staticClass: "vue-keyboard-key",
            class: btn.type,
            attrs: {
              role: "button",
              "data-args": btn.args,
              "data-text": btn.value,
              "data-action": btn.action.name
            },
            domProps: { innerHTML: _vm._s(btn.value) },
            on: {
              click: function($event) {
                $event.preventDefault()
                btn.action.callable($event)
              }
            }
          })
        })
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fbb6d6c8", esExports)
  }
}

/***/ }),
/* 166 */
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
          name: "hotkey",
          rawName: "v-hotkey",
          value: _vm.hotkeys,
          expression: "hotkeys"
        }
      ],
      staticClass: "wepos-fee-keypad-wrap",
      class: _vm.className
    },
    [
      _c(
        "v-popover",
        {
          attrs: {
            offset: "5",
            "popover-base-class": "fee-keypad tooltip popover",
            placement: "top",
            open: _vm.viewFeeKeypad
          }
        },
        [
          _c("a", { attrs: { href: "#" }, on: { click: _vm.showFeeKeypad } }, [
            _vm._v(_vm._s(_vm.__("Add", "wepos")) + " " + _vm._s(_vm.name))
          ]),
          _vm._v(" "),
          _c(
            "template",
            { slot: "popover" },
            [
              _c("form", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.displayValue,
                      expression: "displayValue"
                    }
                  ],
                  ref: "feeinput",
                  attrs: { type: "text" },
                  domProps: { value: _vm.displayValue },
                  on: {
                    keyup: _vm.inputChange,
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.displayValue = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("keyboard", {
                attrs: { layouts: _vm.layout() },
                on: {
                  percent: _vm.percentFee,
                  flat: _vm.flatFee,
                  input: _vm.change
                },
                model: {
                  value: _vm.input,
                  callback: function($$v) {
                    _vm.input = $$v
                  },
                  expression: "input"
                }
              })
            ],
            1
          )
        ],
        2
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
    require("vue-hot-reload-api")      .rerender("data-v-0bc4dc95", esExports)
  }
}

/***/ }),
/* 167 */,
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PrintReceipt_vue__ = __webpack_require__(75);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11ba6300_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PrintReceipt_vue__ = __webpack_require__(170);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PrintReceipt_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11ba6300_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PrintReceipt_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/PrintReceipt.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11ba6300", Component.options)
  } else {
    hotAPI.reload("data-v-11ba6300", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 169 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "wepos-print-receipt" } }, [
    _c(
      "button",
      {
        staticClass: "print-btn",
        on: {
          click: function($event) {
            $event.preventDefault()
            _vm.printReceipt()
          }
        }
      },
      [
        _c("span", { staticClass: "icon flaticon-printer" }),
        _vm._v(" "),
        _c("span", { staticClass: "label" }, [
          _vm._v(_vm._s(_vm.__("Print Receipt", "wepos")))
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11ba6300", esExports)
  }
}

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PrintReceiptHtml_vue__ = __webpack_require__(76);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2db58d4b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PrintReceiptHtml_vue__ = __webpack_require__(173);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(172)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PrintReceiptHtml_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2db58d4b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_PrintReceiptHtml_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/PrintReceiptHtml.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2db58d4b", Component.options)
  } else {
    hotAPI.reload("data-v-2db58d4b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 172 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.settings.wepos_receipts
    ? _c("div", { staticClass: "wepos-checkout-print-wrapper" }, [
        _c("div", {
          staticClass: "header",
          domProps: {
            innerHTML: _vm._s(_vm.settings.wepos_receipts.receipt_header)
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "order-info" }, [
          _c("span", { staticClass: "wepos-left" }, [
            _c("strong", [
              _vm._v(
                _vm._s(_vm.__("Order ID", "wepos")) +
                  ": #" +
                  _vm._s(_vm.printdata.order_id)
              )
            ])
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "wepos-right" }, [
            _c("strong", [
              _vm._v(
                _vm._s(_vm.__("Order Date", "wepos")) +
                  ": " +
                  _vm._s(_vm.formatDate(_vm.printdata.order_date))
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "wepos-clearfix" })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "content" }, [
          _c("table", { staticClass: "sale-summary" }, [
            _c(
              "tbody",
              [
                _vm._l(_vm.printdata.line_items, function(item) {
                  return _c("tr", [
                    _c("td", { staticClass: "name" }, [
                      _vm._v(
                        "\n                        " +
                          _vm._s(item.name) +
                          "\n                        "
                      ),
                      item.attribute.length > 0
                        ? _c("div", { staticClass: "attribute" }, [
                            _c(
                              "ul",
                              _vm._l(item.attribute, function(attribute_item) {
                                return _c("li", [
                                  _c("span", { staticClass: "attr_name" }, [
                                    _vm._v(_vm._s(attribute_item.name))
                                  ]),
                                  _vm._v(": "),
                                  _c("span", { staticClass: "attr_value" }, [
                                    _vm._v(_vm._s(attribute_item.option))
                                  ])
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
                              _c("span", { staticClass: "regular-price" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.formatPrice(
                                      item.quantity * item.regular_price
                                    )
                                  )
                                )
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "sale-price" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.formatPrice(
                                      item.quantity * item.sale_price
                                    )
                                  )
                                )
                              ])
                            ]
                          : [
                              _c("span", { staticClass: "sale-price" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.formatPrice(
                                      item.quantity * item.regular_price
                                    )
                                  )
                                )
                              ])
                            ]
                      ],
                      2
                    )
                  ])
                }),
                _vm._v(" "),
                _c("tr", { staticClass: "cart-meta-data" }, [
                  _c("td", { staticClass: "name", attrs: { colspan: "2" } }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.__("Subtotal", "wepos")) +
                        "\n                        "
                    ),
                    _vm.settings.woo_tax.wc_tax_display_cart == "incl"
                      ? _c("span", { staticClass: "metadata" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(_vm.__("Includes Tax", "wepos")) +
                              " " +
                              _vm._s(
                                _vm.formatPrice(
                                  _vm.$store.getters["Cart/getTotalLineTax"]
                                )
                              ) +
                              "\n                        "
                          )
                        ])
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "price" }, [
                    _vm._v(_vm._s(_vm.formatPrice(_vm.printdata.subtotal)))
                  ])
                ]),
                _vm._v(" "),
                _vm._l(_vm.printdata.fee_lines, function(fee, key) {
                  return _c(
                    "tr",
                    { staticClass: "cart-meta-data" },
                    [
                      fee.type == "discount"
                        ? [
                            _c(
                              "td",
                              { staticClass: "name", attrs: { colspan: "2" } },
                              [
                                _vm._v(
                                  _vm._s(_vm.__("Discount", "wepos")) + " "
                                ),
                                _c("span", { staticClass: "metadata" }, [
                                  _vm._v(
                                    _vm._s(
                                      fee.discount_type == "percent"
                                        ? fee.value + "%"
                                        : _vm.formatPrice(fee.value)
                                    )
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c("td", { staticClass: "price" }, [
                              _vm._v(
                                "-" +
                                  _vm._s(_vm.formatPrice(Math.abs(fee.total)))
                              )
                            ])
                          ]
                        : [
                            _c(
                              "td",
                              { staticClass: "name", attrs: { colspan: "2" } },
                              [
                                _vm._v(_vm._s(_vm.__("Fee", "wepos")) + " "),
                                _c("span", { staticClass: "metadata" }, [
                                  _vm._v(
                                    _vm._s(fee.name) +
                                      " " +
                                      _vm._s(
                                        fee.fee_type == "percent"
                                          ? fee.value + "%"
                                          : _vm.formatPrice(fee.value)
                                      )
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c("td", { staticClass: "price" }, [
                              _vm._v(
                                "-" +
                                  _vm._s(_vm.formatPrice(Math.abs(fee.total)))
                              )
                            ])
                          ]
                    ],
                    2
                  )
                }),
                _vm._v(" "),
                _vm.printdata.taxtotal
                  ? _c("tr", [
                      _c(
                        "td",
                        { staticClass: "name", attrs: { colspan: "2" } },
                        [_vm._v(_vm._s(_vm.__("Tax", "wepos")))]
                      ),
                      _vm._v(" "),
                      _c("td", { staticClass: "price" }, [
                        _vm._v(_vm._s(_vm.formatPrice(_vm.printdata.taxtotal)))
                      ])
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("tr", [
                  _c("td", { staticClass: "name", attrs: { colspan: "2" } }, [
                    _vm._v(_vm._s(_vm.__("Order Total", "wepos")))
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "price" }, [
                    _vm._v(_vm._s(_vm.formatPrice(_vm.printdata.ordertotal)))
                  ])
                ]),
                _vm._v(" "),
                _vm._m(0),
                _vm._v(" "),
                _c("tr", [
                  _c("td", { attrs: { colspan: "2" } }, [
                    _vm._v(_vm._s(_vm.__("Payment method", "wepos")))
                  ]),
                  _vm._v(" "),
                  _c("td", { staticClass: "price" }, [
                    _vm._v(_vm._s(_vm.printdata.gateway.title || ""))
                  ])
                ]),
                _vm._v(" "),
                (_vm.printdata.gateway.id = "wepos_cash")
                  ? [
                      _c("tr", [
                        _c("td", { attrs: { colspan: "2" } }, [
                          _vm._v(_vm._s(_vm.__("Cash Given", "wepos")))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "price" }, [
                          _vm._v(
                            _vm._s(_vm.formatPrice(_vm.printdata.cashamount))
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", { attrs: { colspan: "2" } }, [
                          _vm._v(_vm._s(_vm.__("Change Money", "wepos")))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "price" }, [
                          _vm._v(
                            _vm._s(_vm.formatPrice(_vm.printdata.changeamount))
                          )
                        ])
                      ])
                    ]
                  : _vm._e()
              ],
              2
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", {
          staticClass: "footer",
          domProps: {
            innerHTML: _vm._s(_vm.settings.wepos_receipts.receipt_footer)
          }
        })
      ])
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", { staticClass: "divider" }, [
      _c("td", { attrs: { colspan: "3" } })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2db58d4b", esExports)
  }
}

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CustomerNote_vue__ = __webpack_require__(77);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4073e2a5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CustomerNote_vue__ = __webpack_require__(176);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(175)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CustomerNote_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4073e2a5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CustomerNote_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/frontend/components/CustomerNote.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4073e2a5", Component.options)
  } else {
    hotAPI.reload("data-v-4073e2a5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 175 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 176 */
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
          name: "hotkey",
          rawName: "v-hotkey",
          value: _vm.hotkeys,
          expression: "hotkeys"
        }
      ],
      staticClass: "wepos-custom-note-wrap"
    },
    [
      _c(
        "v-popover",
        {
          attrs: {
            offset: "5",
            "popover-base-class": "customer-note tooltip popover",
            placement: "top",
            open: _vm.viewNotePopover
          }
        },
        [
          _c(
            "a",
            {
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.openNote($event)
                }
              }
            },
            [_vm._v(_vm._s(_vm.__("Add Note", "wepos")))]
          ),
          _vm._v(" "),
          _c("template", { slot: "popover" }, [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    _vm.addCustomerNote($event)
                  }
                }
              },
              [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.customerNote,
                      expression: "customerNote"
                    }
                  ],
                  ref: "customernote",
                  attrs: { id: "", cols: "30", rows: "5" },
                  domProps: { value: _vm.customerNote },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.customerNote = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "add-note-btn",
                    attrs: { type: "submit", disabled: _vm.customerNote == "" }
                  },
                  [_vm._v(_vm._s(_vm.__("Add Note", "wepos")))]
                )
              ]
            )
          ])
        ],
        2
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
    require("vue-hot-reload-api")      .rerender("data-v-4073e2a5", esExports)
  }
}

/***/ }),
/* 177 */
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
          name: "hotkey",
          rawName: "v-hotkey",
          value: _vm.hotkeys,
          expression: "hotkeys"
        }
      ],
      attrs: { id: "wepos-main" }
    },
    [
      _c("div", { staticClass: "content-product" }, [
        _c("div", { staticClass: "top-panel wepos-clearfix" }, [
          _c(
            "div",
            { staticClass: "search-bar" },
            [
              _c("product-search", {
                attrs: { products: _vm.products, settings: _vm.settings },
                on: { onProductAdded: _vm.addToCart }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "category" },
            [
              _c(
                "multiselect",
                {
                  staticClass: "wepos-multiselect",
                  attrs: {
                    options: _vm.categories,
                    selectLabel: "",
                    deselectLabel: "",
                    selectedLabel: "",
                    placeholder: _vm.__("Select a category", "wepos")
                  },
                  on: {
                    select: _vm.handleCategorySelect,
                    remove: _vm.handleCategoryRemove
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "singleLabel",
                      fn: function(props) {
                        return [
                          _vm._v(
                            "\n                        " +
                              _vm._s(props.option.name) +
                              "\n                    "
                          )
                        ]
                      }
                    },
                    {
                      key: "option",
                      fn: function(props) {
                        return [
                          _c(
                            "span",
                            [
                              _vm._l(props.option.level, function(pad) {
                                return [
                                  _vm._v(
                                    "\n                                 \n                            "
                                  )
                                ]
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(props.option.name) +
                                  "\n                        "
                              )
                            ],
                            2
                          )
                        ]
                      }
                    }
                  ]),
                  model: {
                    value: _vm.selectedCategory,
                    callback: function($$v) {
                      _vm.selectedCategory = $$v
                    },
                    expression: "selectedCategory"
                  }
                },
                [
                  _c("template", { slot: "noResult" }, [
                    _c("div", { staticClass: "no-data-found" }, [
                      _vm._v(_vm._s(_vm.__("Not found", "wepos")))
                    ])
                  ])
                ],
                2
              )
            ],
            1
          ),
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
        _vm.getBreadCrums.length > 0
          ? _c("div", { staticClass: "breadcrumb" }, [
              _c(
                "ul",
                [
                  _vm._l(_vm.getBreadCrums, function(breadcrumb) {
                    return [
                      _c(
                        "router-link",
                        {
                          attrs: {
                            tag: "li",
                            to: {
                              name: "Home",
                              query: { category: breadcrumb.id }
                            }
                          }
                        },
                        [_c("a", [_vm._v(_vm._s(breadcrumb.name))])]
                      )
                    ]
                  })
                ],
                2
              ),
              _vm._v(" "),
              _c("span", {
                staticClass: "close-breadcrumb flaticon-cancel-music",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    _vm.removeBreadcrums($event)
                  }
                }
              })
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          {
            ref: "items-wrapper",
            staticClass: "items-wrapper",
            class: _vm.productView
          },
          [
            !_vm.productLoading
              ? [
                  _vm._l(_vm.getFilteredProduct, function(product) {
                    return _vm.getFilteredProduct.length > 0
                      ? _c(
                          "div",
                          { staticClass: "item" },
                          [
                            product.type === "simple"
                              ? [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "item-wrap",
                                      class: {
                                        disabled: !_vm.hasStock(product)
                                      },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          _vm.addToCart(product)
                                        }
                                      }
                                    },
                                    [
                                      _c("div", { staticClass: "img" }, [
                                        _c("img", {
                                          attrs: {
                                            src: _vm.getProductImage(product),
                                            alt: _vm.getProductImageName(
                                              product
                                            )
                                          }
                                        })
                                      ]),
                                      _vm._v(" "),
                                      _vm.productView === "grid"
                                        ? _c("div", { staticClass: "title" }, [
                                            _vm._v(
                                              "\n                                " +
                                                _vm._s(
                                                  _vm.truncateTitle(
                                                    product.name,
                                                    20
                                                  )
                                                ) +
                                                "\n                            "
                                            )
                                          ])
                                        : _c("div", { staticClass: "title" }, [
                                            _c(
                                              "div",
                                              { staticClass: "product-name" },
                                              [_vm._v(_vm._s(product.name))]
                                            ),
                                            _vm._v(" "),
                                            _c("ul", { staticClass: "meta" }, [
                                              product.sku
                                                ? _c("li", [
                                                    _c(
                                                      "span",
                                                      { staticClass: "label" },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.__(
                                                              "Sku :",
                                                              "wepos"
                                                            )
                                                          )
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "span",
                                                      { staticClass: "value" },
                                                      [
                                                        _vm._v(
                                                          _vm._s(product.sku)
                                                        )
                                                      ]
                                                    )
                                                  ])
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _c("li", [
                                                _c(
                                                  "span",
                                                  { staticClass: "label" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__(
                                                          "Price :",
                                                          "wepos"
                                                        )
                                                      )
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("span", {
                                                  staticClass: "value",
                                                  domProps: {
                                                    innerHTML: _vm._s(
                                                      product.price_html
                                                    )
                                                  }
                                                })
                                              ])
                                            ])
                                          ]),
                                      _vm._v(" "),
                                      _c("span", {
                                        staticClass:
                                          "add-product-icon flaticon-add",
                                        class: _vm.productView
                                      })
                                    ]
                                  )
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            product.type === "variable"
                              ? [
                                  _c(
                                    "v-popover",
                                    {
                                      attrs: {
                                        offset: "10",
                                        "popover-base-class":
                                          "product-variation tooltip popover",
                                        placement: "left-end"
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "item-wrap",
                                          on: {
                                            click: function($event) {
                                              _vm.selectVariationProduct(
                                                product
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _c("div", { staticClass: "img" }, [
                                            _c("img", {
                                              attrs: {
                                                src: _vm.getProductImage(
                                                  product
                                                ),
                                                alt: _vm.getProductImageName(
                                                  product
                                                )
                                              }
                                            })
                                          ]),
                                          _vm._v(" "),
                                          _vm.productView === "grid"
                                            ? _c(
                                                "div",
                                                { staticClass: "title" },
                                                [
                                                  _vm._v(
                                                    "\n                                    " +
                                                      _vm._s(
                                                        _vm.truncateTitle(
                                                          product.name,
                                                          20
                                                        )
                                                      ) +
                                                      "\n                                "
                                                  )
                                                ]
                                              )
                                            : _c(
                                                "div",
                                                { staticClass: "title" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "product-name"
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(product.name)
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "ul",
                                                    { staticClass: "meta" },
                                                    [
                                                      _c("li", [
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass: "label"
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm.__(
                                                                  "Price :",
                                                                  "wepos"
                                                                )
                                                              )
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c("span", {
                                                          staticClass: "value",
                                                          domProps: {
                                                            innerHTML: _vm._s(
                                                              product.price_html
                                                            )
                                                          }
                                                        })
                                                      ])
                                                    ]
                                                  )
                                                ]
                                              ),
                                          _vm._v(" "),
                                          _c("span", {
                                            staticClass:
                                              "add-product-icon flaticon-add",
                                            class: _vm.productView
                                          })
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("template", { slot: "popover" }, [
                                        _c(
                                          "div",
                                          { staticClass: "variation-header" },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(
                                                  _vm.__(
                                                    "Select Variations",
                                                    "wepos"
                                                  )
                                                ) +
                                                "\n                                "
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
                                                      _vm._v(
                                                        _vm._s(attribute.name)
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass: "options"
                                                      },
                                                      [
                                                        _vm._l(
                                                          attribute.options,
                                                          function(option) {
                                                            return [
                                                              _c("label", [
                                                                _c("input", {
                                                                  directives: [
                                                                    {
                                                                      name:
                                                                        "model",
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
                                                                    type:
                                                                      "radio"
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
                                                                      "\n                                                            " +
                                                                        _vm._s(
                                                                          option
                                                                        ) +
                                                                        "\n                                                        "
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
                                                  disabled:
                                                    _vm.attributeDisabled
                                                },
                                                on: {
                                                  click: function($event) {
                                                    $event.preventDefault()
                                                    _vm.addVariationProduct(
                                                      $event
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.__(
                                                      "Add Product",
                                                      "wepos"
                                                    )
                                                  )
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      ])
                                    ],
                                    2
                                  )
                                ]
                              : _vm._e()
                          ],
                          2
                        )
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _vm.getFilteredProduct.length <= 0
                    ? _c("div", { staticClass: "no-product-found" }, [
                        _c("img", {
                          attrs: {
                            src:
                              _vm.wepos.assets_url + "/images/no-product.png",
                            alt: "",
                            width: "120px"
                          }
                        }),
                        _vm._v(" "),
                        _c("p", [
                          _vm._v(_vm._s(_vm.__("No Product Found", "wepos")))
                        ])
                      ])
                    : _vm._e()
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm.productLoading
              ? _c("div", { staticClass: "product-loading" }, [
                  _c("div", { staticClass: "spinner spinner-loading" })
                ])
              : _vm._e()
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content-cart" },
        [
          _c(
            "div",
            { staticClass: "top-panel" },
            [
              _c("customer-search", {
                on: { onCustomerSelected: _vm.selectCustomer }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "action" }, [
                _c(
                  "div",
                  { staticClass: "more-options" },
                  [
                    _c(
                      "v-popover",
                      {
                        attrs: {
                          offset: "5",
                          "popover-base-class":
                            "wepos-dropdown-menu tooltip popover",
                          placement: "bottom-end",
                          open: _vm.showQucikMenu
                        }
                      },
                      [
                        _c(
                          "button",
                          {
                            staticClass: "wepos-button",
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                _vm.openQucikMenu()
                              }
                            }
                          },
                          [
                            _c("span", {
                              staticClass: "more-icon flaticon-more"
                            })
                          ]
                        ),
                        _vm._v(" "),
                        _c("template", { slot: "popover" }, [
                          _c(
                            "ul",
                            [
                              _vm._l(_vm.quickLinkListStart, function(
                                quickLinkListStartComponent,
                                key
                              ) {
                                return _c(quickLinkListStartComponent, {
                                  key: key - "1",
                                  tag: "component"
                                })
                              }),
                              _vm._v(" "),
                              _c("li", [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "#" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        _vm.emptyCart($event)
                                      }
                                    }
                                  },
                                  [
                                    _c("span", {
                                      staticClass:
                                        "flaticon-empty-cart quick-menu-icon"
                                    }),
                                    _vm._v(
                                      _vm._s(_vm.__("Empty Cart", "wepos"))
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "#" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        _vm.openHelp($event)
                                      }
                                    }
                                  },
                                  [
                                    _c("span", {
                                      staticClass:
                                        "flaticon-information quick-menu-icon"
                                    }),
                                    _vm._v(_vm._s(_vm.__("Help", "wepos")))
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("li", { staticClass: "divider" }),
                              _vm._v(" "),
                              _vm._l(_vm.quickLinkList, function(
                                component,
                                index
                              ) {
                                return _c(component, {
                                  key: index,
                                  tag: "component"
                                })
                              }),
                              _vm._v(" "),
                              _c("li", [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "#" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        _vm.logout($event)
                                      }
                                    }
                                  },
                                  [
                                    _c("span", {
                                      staticClass:
                                        "flaticon-logout quick-menu-icon"
                                    }),
                                    _vm._v(_vm._s(_vm.__("Logout", "wepos")))
                                  ]
                                )
                              ])
                            ],
                            2
                          )
                        ])
                      ],
                      2
                    )
                  ],
                  1
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _vm._l(_vm.beforCartPanels, function(beforCartPanel, key) {
            return _c(beforCartPanel, { key: key, tag: "component" })
          }),
          _vm._v(" "),
          _vm.settings.wepos_general
            ? _c("div", { staticClass: "cart-panel" }, [
                _c("div", { staticClass: "cart-content" }, [
                  _c("table", { staticClass: "cart-table" }, [
                    _c("thead", [
                      _c("tr", [
                        _c("th", { attrs: { width: "65%" } }, [
                          _vm._v(_vm._s(_vm.__("Product", "wepos")))
                        ]),
                        _vm._v(" "),
                        _c("th", { attrs: { width: "15%" } }, [
                          _vm._v(_vm._s(_vm.__("Qty", "wepos")))
                        ]),
                        _vm._v(" "),
                        _c("th", { attrs: { width: "30%" } }, [
                          _vm._v(_vm._s(_vm.__("Price", "wepos")))
                        ]),
                        _vm._v(" "),
                        _c("th"),
                        _vm._v(" "),
                        _c("th")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "tbody",
                      [
                        _vm.cartdata.line_items.length > 0
                          ? [
                              _vm._l(_vm.cartdata.line_items, function(
                                item,
                                key
                              ) {
                                return [
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass: "name",
                                        on: {
                                          click: function($event) {
                                            _vm.toggleEditQuantity(item, key)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                        " +
                                            _vm._s(item.name) +
                                            "\n                                        "
                                        ),
                                        item.attribute.length > 0 &&
                                        item.type === "variable"
                                          ? _c(
                                              "div",
                                              { staticClass: "attribute" },
                                              [
                                                _c(
                                                  "ul",
                                                  _vm._l(
                                                    item.attribute,
                                                    function(attribute_item) {
                                                      return _c("li", [
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "attr_name"
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                attribute_item.name
                                                              )
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(": "),
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "attr_value"
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                attribute_item.option
                                                              )
                                                            )
                                                          ]
                                                        )
                                                      ])
                                                    }
                                                  )
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      {
                                        staticClass: "qty",
                                        on: {
                                          click: function($event) {
                                            _vm.toggleEditQuantity(item, key)
                                          }
                                        }
                                      },
                                      [_vm._v(_vm._s(item.quantity))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "td",
                                      {
                                        staticClass: "price",
                                        on: {
                                          click: function($event) {
                                            _vm.toggleEditQuantity(item, key)
                                          }
                                        }
                                      },
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
                                                {
                                                  staticClass: "regular-price"
                                                },
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
                                          _c(
                                            "td",
                                            { attrs: { colspan: "5" } },
                                            [
                                              _c(
                                                "span",
                                                { staticClass: "qty" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.__(
                                                        "Quantity",
                                                        "wepos"
                                                      )
                                                    )
                                                  )
                                                ]
                                              ),
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
                                                        expression:
                                                          "item.quantity"
                                                      }
                                                    ],
                                                    attrs: {
                                                      type: "number",
                                                      min: "1",
                                                      step: "1"
                                                    },
                                                    domProps: {
                                                      value: item.quantity
                                                    },
                                                    on: {
                                                      input: function($event) {
                                                        if (
                                                          $event.target
                                                            .composing
                                                        ) {
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
                                                        click: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          _vm.addQuantity(
                                                            item,
                                                            key
                                                          )
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
                                                        click: function(
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          _vm.removeQuantity(
                                                            item,
                                                            key
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [_vm._v("-")]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
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
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(_vm.__("Empty Cart", "wepos"))
                                    )
                                  ])
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
                          _c("tr", { staticClass: "cart-meta-data" }, [
                            _c("td", { staticClass: "label" }, [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.__("Subtotal", "wepos")) +
                                  "\n                                    "
                              ),
                              _vm.settings.woo_tax.wc_tax_display_cart ==
                                "incl" &&
                              _vm.$store.getters["Cart/getTotalLineTax"] > 0
                                ? _c("span", { staticClass: "name" }, [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(
                                          _vm.__("Includes Tax", "wepos")
                                        ) +
                                        " " +
                                        _vm._s(
                                          _vm.formatPrice(
                                            _vm.$store.getters[
                                              "Cart/getTotalLineTax"
                                            ]
                                          )
                                        ) +
                                        "\n                                    "
                                    )
                                  ])
                                : _vm._e()
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "price" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.formatPrice(
                                    _vm.$store.getters["Cart/getSubtotal"]
                                  )
                                )
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "action" })
                          ]),
                          _vm._v(" "),
                          _vm.cartdata.fee_lines.length > 0
                            ? _vm._l(_vm.cartdata.fee_lines, function(
                                fee,
                                key
                              ) {
                                return _c(
                                  "tr",
                                  { staticClass: "cart-meta-data" },
                                  [
                                    fee.type == "discount"
                                      ? [
                                          _c("td", { staticClass: "label" }, [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__("Discount", "wepos")
                                              ) + " "
                                            ),
                                            _c(
                                              "span",
                                              { staticClass: "name" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    fee.discount_type ==
                                                    "percent"
                                                      ? fee.value + "%"
                                                      : _vm.formatPrice(
                                                          fee.value
                                                        )
                                                  )
                                                )
                                              ]
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "price" }, [
                                            _vm._v(
                                              "−" +
                                                _vm._s(
                                                  _vm.formatPrice(
                                                    Math.abs(fee.total)
                                                  )
                                                )
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "action" }, [
                                            _c("span", {
                                              staticClass:
                                                "flaticon-cancel-music",
                                              on: {
                                                click: function($event) {
                                                  _vm.removeFeeLine(key)
                                                }
                                              }
                                            })
                                          ])
                                        ]
                                      : [
                                          _vm.cartdata.fee_lines[key].isEdit
                                            ? [
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
                                                            _vm.feeData.name,
                                                          expression:
                                                            "feeData.name"
                                                        }
                                                      ],
                                                      ref: "fee_name",
                                                      refInFor: true,
                                                      staticClass: "fee-name",
                                                      attrs: {
                                                        type: "text",
                                                        placeholder: _vm.__(
                                                          "Fee Name",
                                                          "wepos"
                                                        )
                                                      },
                                                      domProps: {
                                                        value: _vm.feeData.name
                                                      },
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.feeData,
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
                                                            _vm.feeData.value,
                                                          expression:
                                                            "feeData.value"
                                                        }
                                                      ],
                                                      ref: "fee_total",
                                                      refInFor: true,
                                                      staticClass: "fee-amount",
                                                      attrs: {
                                                        type: "number",
                                                        min: "0",
                                                        step: "any",
                                                        placeholder: _vm.__(
                                                          "Total",
                                                          "wepos"
                                                        )
                                                      },
                                                      domProps: {
                                                        value: _vm.feeData.value
                                                      },
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.feeData,
                                                            "value",
                                                            $event.target.value
                                                          )
                                                        }
                                                      }
                                                    }),
                                                    _vm._v(" "),
                                                    _vm.settings.wepos_general
                                                      .enable_fee_tax == "yes"
                                                      ? [
                                                          _c(
                                                            "label",
                                                            {
                                                              attrs: {
                                                                for:
                                                                  "fee-tax-status"
                                                              }
                                                            },
                                                            [
                                                              _c("input", {
                                                                directives: [
                                                                  {
                                                                    name:
                                                                      "model",
                                                                    rawName:
                                                                      "v-model",
                                                                    value:
                                                                      _vm
                                                                        .feeData
                                                                        .tax_status,
                                                                    expression:
                                                                      "feeData.tax_status"
                                                                  }
                                                                ],
                                                                staticClass:
                                                                  "fee-tax-status",
                                                                attrs: {
                                                                  type:
                                                                    "checkbox",
                                                                  id:
                                                                    "fee-tax-status",
                                                                  "true-value":
                                                                    "taxable",
                                                                  "false-value":
                                                                    "none"
                                                                },
                                                                domProps: {
                                                                  checked: Array.isArray(
                                                                    _vm.feeData
                                                                      .tax_status
                                                                  )
                                                                    ? _vm._i(
                                                                        _vm
                                                                          .feeData
                                                                          .tax_status,
                                                                        null
                                                                      ) > -1
                                                                    : _vm._q(
                                                                        _vm
                                                                          .feeData
                                                                          .tax_status,
                                                                        "taxable"
                                                                      )
                                                                },
                                                                on: {
                                                                  change: function(
                                                                    $event
                                                                  ) {
                                                                    var $$a =
                                                                        _vm
                                                                          .feeData
                                                                          .tax_status,
                                                                      $$el =
                                                                        $event.target,
                                                                      $$c = $$el.checked
                                                                        ? "taxable"
                                                                        : "none"
                                                                    if (
                                                                      Array.isArray(
                                                                        $$a
                                                                      )
                                                                    ) {
                                                                      var $$v = null,
                                                                        $$i = _vm._i(
                                                                          $$a,
                                                                          $$v
                                                                        )
                                                                      if (
                                                                        $$el.checked
                                                                      ) {
                                                                        $$i <
                                                                          0 &&
                                                                          (_vm.feeData.tax_status = $$a.concat(
                                                                            [
                                                                              $$v
                                                                            ]
                                                                          ))
                                                                      } else {
                                                                        $$i >
                                                                          -1 &&
                                                                          (_vm.feeData.tax_status = $$a
                                                                            .slice(
                                                                              0,
                                                                              $$i
                                                                            )
                                                                            .concat(
                                                                              $$a.slice(
                                                                                $$i +
                                                                                  1
                                                                              )
                                                                            ))
                                                                      }
                                                                    } else {
                                                                      _vm.$set(
                                                                        _vm.feeData,
                                                                        "tax_status",
                                                                        $$c
                                                                      )
                                                                    }
                                                                  }
                                                                }
                                                              }),
                                                              _vm._v(
                                                                " " +
                                                                  _vm._s(
                                                                    _vm.__(
                                                                      "Taxable",
                                                                      "wepos"
                                                                    )
                                                                  )
                                                              )
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _vm.feeData
                                                            .tax_status ==
                                                          "taxable"
                                                            ? _c(
                                                                "select",
                                                                {
                                                                  directives: [
                                                                    {
                                                                      name:
                                                                        "model",
                                                                      rawName:
                                                                        "v-model",
                                                                      value:
                                                                        _vm
                                                                          .feeData
                                                                          .tax_class,
                                                                      expression:
                                                                        "feeData.tax_class"
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
                                                                          $event
                                                                            .target
                                                                            .options,
                                                                          function(
                                                                            o
                                                                          ) {
                                                                            return o.selected
                                                                          }
                                                                        )
                                                                        .map(
                                                                          function(
                                                                            o
                                                                          ) {
                                                                            var val =
                                                                              "_value" in
                                                                              o
                                                                                ? o._value
                                                                                : o.value
                                                                            return val
                                                                          }
                                                                        )
                                                                      _vm.$set(
                                                                        _vm.feeData,
                                                                        "tax_class",
                                                                        $event
                                                                          .target
                                                                          .multiple
                                                                          ? $$selectedVal
                                                                          : $$selectedVal[0]
                                                                      )
                                                                    }
                                                                  }
                                                                },
                                                                _vm._l(
                                                                  _vm.availableTax,
                                                                  function(
                                                                    feeTax
                                                                  ) {
                                                                    return _c(
                                                                      "option",
                                                                      {
                                                                        domProps: {
                                                                          value:
                                                                            feeTax.class ==
                                                                            "standard"
                                                                              ? ""
                                                                              : feeTax.class
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
                                                            : _vm._e()
                                                        ]
                                                      : _vm._e(),
                                                    _vm._v(" "),
                                                    _c(
                                                      "button",
                                                      {
                                                        attrs: {
                                                          disabled:
                                                            _vm.feeData.name ==
                                                            ""
                                                        },
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            $event.preventDefault()
                                                            _vm.saveFee(key)
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.__(
                                                              "Apply",
                                                              "wepos"
                                                            )
                                                          )
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "button",
                                                      {
                                                        staticClass: "cancel",
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            $event.preventDefault()
                                                            _vm.cancelEditFee(
                                                              key
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.__(
                                                              "Cancel",
                                                              "wepos"
                                                            )
                                                          )
                                                        )
                                                      ]
                                                    )
                                                  ],
                                                  2
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "td",
                                                  { staticClass: "action" },
                                                  [
                                                    _c("span", {
                                                      staticClass:
                                                        "flaticon-cancel-music",
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          _vm.removeFeeLine(key)
                                                        }
                                                      }
                                                    })
                                                  ]
                                                )
                                              ]
                                            : [
                                                _c(
                                                  "td",
                                                  {
                                                    staticClass: "label",
                                                    on: {
                                                      dblclick: function(
                                                        $event
                                                      ) {
                                                        $event.preventDefault()
                                                        _vm.editFeeData(key)
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.__("Fee", "wepos")
                                                      ) + " "
                                                    ),
                                                    _c(
                                                      "span",
                                                      { staticClass: "name" },
                                                      [
                                                        _vm._v(
                                                          _vm._s(fee.name) +
                                                            " " +
                                                            _vm._s(
                                                              fee.fee_type ==
                                                              "percent"
                                                                ? fee.value +
                                                                  "%"
                                                                : _vm.formatPrice(
                                                                    fee.value
                                                                  )
                                                            )
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "td",
                                                  { staticClass: "price" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.formatPrice(
                                                          Math.abs(fee.total)
                                                        )
                                                      )
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "td",
                                                  { staticClass: "action" },
                                                  [
                                                    _c("span", {
                                                      staticClass:
                                                        "flaticon-cancel-music",
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          _vm.removeFeeLine(key)
                                                        }
                                                      }
                                                    })
                                                  ]
                                                )
                                              ]
                                        ]
                                  ],
                                  2
                                )
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.$store.getters["Cart/getTotalTax"]
                            ? _c("tr", { staticClass: "tax" }, [
                                _c("td", { staticClass: "label" }, [
                                  _vm._v(_vm._s(_vm.__("Tax", "wepos")))
                                ]),
                                _vm._v(" "),
                                _c("td", { staticClass: "price" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.formatPrice(
                                        _vm.$store.getters["Cart/getTotalTax"]
                                      )
                                    )
                                  )
                                ]),
                                _vm._v(" "),
                                _c("td", { staticClass: "action" })
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("tr", { staticClass: "cart-action" }, [
                            _c(
                              "td",
                              { attrs: { colspan: "3" } },
                              [
                                _c("fee-keypad", {
                                  attrs: {
                                    name: _vm.__("Discount", "wepos"),
                                    "short-key": "discount"
                                  },
                                  on: { inputfee: _vm.setDiscount }
                                }),
                                _vm._v(" "),
                                _c("fee-keypad", {
                                  attrs: {
                                    name: _vm.__("Fee", "wepos"),
                                    "short-key": "fee"
                                  },
                                  on: { inputfee: _vm.setFee }
                                }),
                                _vm._v(" "),
                                _vm.orderdata.customer_note == ""
                                  ? _c("customer-note", {
                                      on: { addnote: _vm.addCustomerNote }
                                    })
                                  : _vm._e()
                              ],
                              1
                            )
                          ]),
                          _vm._v(" "),
                          _vm.orderdata.customer_note
                            ? _c("tr", { staticClass: "note" }, [
                                _c(
                                  "td",
                                  {
                                    staticClass: "note-text",
                                    attrs: { colspan: "2" }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(_vm.orderdata.customer_note) +
                                        "\n                                "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c("td", { staticClass: "action" }, [
                                  _c("span", {
                                    staticClass: "flaticon-cancel-music",
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        _vm.removeCustomerNote($event)
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
                              _c("td", [
                                _vm._v(_vm._s(_vm.__("Pay Now", "wepos")))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "amount" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.formatPrice(
                                      _vm.$store.getters["Cart/getTotal"]
                                    )
                                  )
                                )
                              ]),
                              _vm._v(" "),
                              _vm._m(0)
                            ]
                          )
                        ],
                        2
                      )
                    ])
                  ])
                ])
              ])
            : _vm._e()
        ],
        2
      ),
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
                    _c("h2", [
                      _vm._v(_vm._s(_vm.__("Sale Completed", "wepos")))
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "print-section" },
                    [
                      _c("print-receipt"),
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
                            _vm._v(_vm._s(_vm.__("New Sale", "wepos")))
                          ])
                        ]
                      )
                    ],
                    1
                  )
                ])
              ])
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showHelp
        ? _c(
            "modal",
            {
              attrs: { width: "700px", height: "500px" },
              on: {
                close: function($event) {
                  _vm.closeHelp()
                }
              }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { staticClass: "wepos-help-wrapper" }, [
                  _c("h2", [_vm._v(_vm._s(_vm.__("Shortcut Keys", "wepos")))]),
                  _vm._v(" "),
                  _c("ul", [
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f1")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Search Product", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f2")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Scan Product", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f3")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Toggle Product View", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f4")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Add Fee in cart", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f5")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Add Discount in cart", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f6")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Add Customer note", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f7")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Customer Search", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("shift+f7")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Add new Customer", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f8")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Create New Sale", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("shift+f8")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Empty your cart", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f9")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Go to payment receipt", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("f10")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Process Payment", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("ctrl/cmd+p")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Print Receipt", "wepos")))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("ctrl/cmd+?")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(
                          _vm._s(_vm.__("Show/Close(Toggle) Help", "wepos"))
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("span", { staticClass: "code" }, [
                        _c("code", [_vm._v("esc")])
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "title" }, [
                        _vm._v(_vm._s(_vm.__("Close anything", "wepos")))
                      ])
                    ])
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
                open: function($event) {
                  _vm.focusCashInput()
                },
                close: function($event) {
                  _vm.backToSale()
                },
                enterpressed: function($event) {
                  _vm.processPayment()
                }
              }
            },
            [
              _c("template", { slot: "body" }, [
                _c("div", { staticClass: "wepos-checkout-wrapper" }, [
                  _c("div", { staticClass: "left-content" }, [
                    _c("div", { staticClass: "header" }, [
                      _vm._v(
                        "\n                        " +
                          _vm._s(_vm.__("Sale Summary", "wepos")) +
                          "\n                    "
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "content" }, [
                      _c("table", { staticClass: "sale-summary-cart" }, [
                        _c(
                          "tbody",
                          _vm._l(_vm.cartdata.line_items, function(item) {
                            return _c("tr", [
                              _c("td", { staticClass: "name" }, [
                                _vm._v(
                                  "\n                                        " +
                                    _vm._s(item.name) +
                                    "\n                                        "
                                ),
                                item.attribute.length > 0 &&
                                item.type === "variable"
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
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "footer" }, [
                      _c(
                        "ul",
                        [
                          _c("li", { staticClass: "wepos-clearfix" }, [
                            _c("span", { staticClass: "wepos-left" }, [
                              _vm._v(
                                "\n                                    " +
                                  _vm._s(_vm.__("Subtotal", "wepos")) +
                                  "\n                                    "
                              ),
                              _vm.settings.woo_tax.wc_tax_display_cart == "incl"
                                ? _c("span", { staticClass: "metadata" }, [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(
                                          _vm.__("Includes Tax", "wepos")
                                        ) +
                                        " " +
                                        _vm._s(
                                          _vm.formatPrice(
                                            _vm.$store.getters[
                                              "Cart/getTotalLineTax"
                                            ]
                                          )
                                        ) +
                                        "\n                                    "
                                    )
                                  ])
                                : _vm._e()
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "wepos-right" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.formatPrice(
                                    _vm.$store.getters["Cart/getSubtotal"]
                                  )
                                )
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _vm.cartdata.fee_lines.length > 0
                            ? _vm._l(_vm.cartdata.fee_lines, function(
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
                                              _vm._v(
                                                _vm._s(
                                                  _vm.__("Discount", "wepos")
                                                ) + " "
                                              ),
                                              _c(
                                                "span",
                                                { staticClass: "metadata" },
                                                [
                                                  _vm._v(
                                                    _vm._s(fee.name) +
                                                      " " +
                                                      _vm._s(
                                                        fee.discount_type ==
                                                        "percent"
                                                          ? fee.value + "%"
                                                          : _vm.formatPrice(
                                                              fee.value
                                                            )
                                                      )
                                                  )
                                                ]
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
                                              _vm._v(
                                                _vm._s(_vm.__("Fee", "wepos")) +
                                                  " "
                                              ),
                                              _c(
                                                "span",
                                                { staticClass: "metadata" },
                                                [
                                                  _vm._v(
                                                    _vm._s(fee.name) +
                                                      " " +
                                                      _vm._s(
                                                        fee.fee_type ==
                                                        "percent"
                                                          ? fee.value + "%"
                                                          : _vm.formatPrice(
                                                              fee.value
                                                            )
                                                      )
                                                  )
                                                ]
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
                          _vm.$store.getters["Cart/getTotalTax"]
                            ? _c("li", { staticClass: "wepos-clearfix" }, [
                                _c("span", { staticClass: "wepos-left" }, [
                                  _vm._v(_vm._s(_vm.__("Tax", "wepos")))
                                ]),
                                _vm._v(" "),
                                _c("span", { staticClass: "wepos-right" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.formatPrice(
                                        _vm.$store.getters["Cart/getTotalTax"]
                                      )
                                    )
                                  )
                                ])
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("li", { staticClass: "wepos-clearfix" }, [
                            _c("span", { staticClass: "wepos-left" }, [
                              _vm._v(_vm._s(_vm.__("Order Total", "wepos")))
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "wepos-right" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.formatPrice(
                                    _vm.$store.getters["Cart/getTotal"]
                                  )
                                )
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("li", { staticClass: "wepos-clearfix" }, [
                            _c("span", { staticClass: "wepos-left" }, [
                              _vm._v(_vm._s(_vm.__("Pay", "wepos")))
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "wepos-right" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.formatPrice(
                                    _vm.$store.getters["Cart/getTotal"]
                                  )
                                )
                              )
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
                      _c("h2", { staticClass: "wepos-left" }, [
                        _vm._v(_vm._s(_vm.__("Pay", "wepos")))
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "pay-amount wepos-right" }, [
                        _vm._v(
                          _vm._s(
                            _vm.formatPrice(_vm.$store.getters["Cart/getTotal"])
                          )
                        )
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
                                            value: _vm.selectedGateway,
                                            expression: "selectedGateway"
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
                                            _vm.selectedGateway,
                                            gateway.id
                                          )
                                        },
                                        on: {
                                          change: function($event) {
                                            _vm.selectedGateway = gateway.id
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass: "gateway",
                                          class: "gateway-" + gateway.id
                                        },
                                        [
                                          _vm._v(
                                            "\n                                        " +
                                              _vm._s(gateway.title) +
                                              "\n                                    "
                                          )
                                        ]
                                      )
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
                              : [
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("No gateway found", "wepos")
                                      )
                                    )
                                  ])
                                ]
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
                                      _c("p", [
                                        _vm._v(_vm._s(_vm.__("Cash", "wepos")))
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "input-addon" },
                                        [
                                          _c(
                                            "span",
                                            { staticClass: "currency" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.wepos
                                                    .currency_format_symbol
                                                )
                                              )
                                            ]
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
                                            ref: "cashamount",
                                            attrs: {
                                              id: "input-cash-amount",
                                              type: "text"
                                            },
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
                                        _vm._s(
                                          _vm.__("Change money", "wepos")
                                        ) +
                                          ": " +
                                          _vm._s(
                                            _vm.formatPrice(_vm.changeAmount)
                                          )
                                      )
                                    ])
                                  ])
                                ])
                              ])
                            ]
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.availableGatewayContent, function(
                          availableGatewayComponent,
                          key
                        ) {
                          return _c(availableGatewayComponent, {
                            key: key,
                            tag: "component",
                            attrs: { availablegateways: _vm.availableGateways }
                          })
                        })
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
                        [_vm._v(_vm._s(_vm.__("Back to Sale", "wepos")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "process-checkout-btn wepos-right",
                          attrs: {
                            disabled: !_vm.$store.getters[
                              "Order/getCanProcessPayment"
                            ]
                          },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.processPayment($event)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.__("Process Payment", "wepos")))]
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
      _c("overlay", { attrs: { show: _vm.showOverlay } }),
      _vm._v(" "),
      _vm.showReceiptHtml
        ? _c("print-receipt-html", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.createprintreceipt,
                expression: "createprintreceipt"
              }
            ],
            attrs: { printdata: _vm.printdata, settings: _vm.settings }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.afterMainContents, function(afterMainContent, key) {
        return _c(afterMainContent, {
          key: key,
          tag: "component",
          attrs: { orderdata: _vm.orderdata, printdata: _vm.printdata }
        })
      })
    ],
    2
  )
}
var staticRenderFns = [
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

/***/ })
]),[145]);