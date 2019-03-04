<template>
    <div class="customer-search-box" v-click-outside="onblur" v-hotkey="hotkeys">
        <form action="" autocomplete="off">
            <svg class="customer-icon" width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <linearGradient x1="14.5524094%" y1="14.6909544%" x2="82.7722259%" y2="85.2519444%" id="linearGradient-1">
                        <stop stop-color="#C444FB" offset="0%"></stop>
                        <stop stop-color="#5B56D7" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="POS-Design---Dokan-P2" transform="translate(-759.000000, -27.000000)">
                        <g id="Group" transform="translate(759.000000, 27.000000)">
                            <circle id="Oval" fill="url(#linearGradient-1)" fill-rule="nonzero" cx="9.5" cy="9.5" r="9.5"></circle>
                            <g id="flaticon1543304699-svg-2" transform="translate(9.500000, 9.500000) scale(-1, 1) translate(-9.500000, -9.500000) translate(6.000000, 5.000000)">
                                <g id="flaticon1543304699-svg">
                                    <path d="M3.31578947,4.40159143 C4.27870463,4.40159143 5.0593751,3.41627143 5.0593751,2.20080857 C5.0593751,0.98532 4.80306952,0 3.31578947,0 C1.82850943,0 1.57215436,0.98532 1.57215436,2.20080857 C1.57215436,3.41627143 2.35282482,4.40159143 3.31578947,4.40159143 Z" id="Path" fill="#FFFFFF"></path>
                                    <path d="M0.0616980658,7.82884897 C0.0604730658,7.62453402 0.0592480658,7.77128348 0.0616980658,7.82884897 Z" id="Path" fill="#000000"></path>
                                    <path d="M6.64682715,7.85749962 C6.65070632,7.82585407 6.64815424,7.63794608 6.64682715,7.85749962 Z" id="Path" fill="#000000"></path>
                                    <path d="M6.60522584,7.67306571 C6.57293401,5.5557 6.30682954,4.95236571 4.27051414,4.57045714 C4.27051414,4.57045714 3.98387156,4.95002571 3.31576473,4.95002571 C2.64765789,4.95002571 2.36096583,4.57045714 2.36096583,4.57045714 C0.34687117,4.9482 0.0645836606,5.54258571 0.0274666143,7.60428 C0.0244230165,7.77263143 0.0230125687,7.78147714 0.0224681854,7.76193429 C0.0225919089,7.79855143 0.0227403771,7.86628286 0.0227403771,7.98438857 C0.0227403771,7.98438857 0.507538492,9 3.31576473,9 C6.12394148,9 6.60878908,7.98438857 6.60878908,7.98438857 C6.60878908,7.90850571 6.60883857,7.85574 6.6089128,7.81984286 C6.60836842,7.83192857 6.60727965,7.80850286 6.60522584,7.67306571 Z" id="Path" fill="#FFFFFF"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <input type="text" ref="customerSearch" name="customer_search" id="customer-search" :placeholder="__( 'Search customer', 'wepos' )" v-model="serachInput" @focus.prevent="triggerFocus" @keyup="searchCustomer">
            <span class="add-new-customer flaticon-add" @click.prevent="addNewCustomer()"></span>
            <div class="search-result" v-show="showCustomerResults">
                <div v-if="customers.length">
                    <keyboard-control :listLength="customers.length" @selected="selectedHandler" @key-down="onKeyDown" @key-up="onKeyUp">
                        <template slot-scope="{selectedIndex}">
                            <li v-for="(customer, index) in customers" class="customer-search-item" :class="{'selected': index === selectedIndex}" :key="index">
                                <a href="#" class="wepos-clearfix" @click="selectCustomer( customer )">
                                    <span class="avatar wepos-left"><img :src="customer.avatar_url" :alt="customer.first_name + ' ' + customer.last_name"></span>
                                    <span class="name wepos-left">{{ customer.first_name + ' ' + customer.last_name }}<span class="metadata">{{ customer.email }}</span></span>
                                    <span class="action flaticon-enter-arrow wepos-right"></span>
                                </a>
                            </li>
                        </template>
                    </keyboard-control>
                </div>
                <div v-else class="no-data-found">
                    {{ __( 'No customer found', 'wepos' ) }}
                </div>
                <div class="suggession">
                    <span class="term">
                        <span class="flaticon-swap"></span> {{ __( 'to navigate', 'wepos' ) }}
                    </span>
                    <span class="term">
                        <span class="flaticon-enter-arrow"></span> {{ __( 'to select', 'wepos' ) }}
                    </span>
                    <span class="term">
                        <strong>esc</strong> {{ __( 'to dismiss', 'wepos' ) }}
                    </span>
                </div>
            </div>
        </form>
        <modal
            :title="__( 'Add New Customer', 'wepos' )"
            v-if="showNewCustomerModal"
            @close="showNewCustomerModal = false"
            width="700px"
            height="400px"
            :footer="true"
            :header="true"
        >
            <template slot="body">
                <div class="wepos-new-customer-form">
                    <form action="" class="wepos-form">
                        <div class="form-row col-2">
                            <input type="text" :placeholder="__( 'First Name', 'wepos' )" v-model="customer.first_name">
                            <input type="text" :placeholder="__( 'Last Name', 'wepos' )" v-model="customer.last_name">
                        </div>
                        <div class="form-row">
                            <input type="email" :placeholder="__( 'Email', 'wepos' )" v-model="customer.email">
                        </div>
                        <div class="form-row col-2">
                            <input type="text" :placeholder="__( 'Address 1', 'wepos' )" v-model="customer.address_1">
                            <input type="text" :placeholder="__( 'Address 2 (optional)', 'wepos' )" v-model="customer.address_2">
                        </div>
                        <div class="form-row col-2">
                            <input type="text" :placeholder="__( 'City (optional)', 'wepos' )" v-model="customer.city">
                            <input type="text" :placeholder="__( 'Phone (optional)', 'wepos' )" v-model="customer.phone">
                        </div>
                    </form>
                </div>
            </template>

            <template slot="footer">
                <button class="add-variation-btn" :disabled="customer.email == undefined || customer.email == ''" @click="createCustomer()">{{ __( 'Add Customer', 'wepos' ) }}</button>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from './Modal.vue';
import KeyboardControl from './KeyboardControl.vue';

export default {
    name: 'CustomerSearch',

    components : {
        Modal,
        KeyboardControl
    },

    data() {
        return {
            submitDisable: false,
            customers: [],
            customer: {},
            showCustomerResults: false,
            serachInput: '',
            showNewCustomerModal: false
        }
    },
    computed: {
        hotkeys() {
            return {
                'f7': this.focusCustomerSearch,
                'shift+f7': this.addNewCustomer,
                'esc': this.searchClose,
            }
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
            this.showNewCustomerModal= false;
            this.$refs.customerSearch.blur();
        },
        addNewCustomer() {
            this.showNewCustomerModal = true;
        },
        selectedHandler(selectedIndex) {
            var selectedCustomer = this.customers[selectedIndex];
            this.selectCustomer( selectedCustomer );
        },
        onKeyDown() {
            jQuery('.customer-search-item.selected').next().children('a').focus();
        },

        onKeyUp() {
            jQuery('.customer-search-item.selected').prev().children('a').focus();
        },
        triggerFocus() {
            this.showCustomerResults = true;
            this.$emit( 'onfocus' );
        },
        onblur() {
            this.showCustomerResults = false;
            this.$emit( 'onblur' );
        },
        searchCustomer() {
            if ( this.serachInput ) {
                wepos.api.get( wepos.rest.root + wepos.rest.wcversion + '/customers?search=' + this.serachInput )
                .done(response => {
                    this.customers = response;
                });
            } else {
                this.$emit( 'onCustomerSelected', {} );
            }
        },
        selectCustomer( customer ) {
            this.$emit( 'onCustomerSelected', customer );
            this.serachInput = customer.first_name + ' ' + customer.last_name;
            this.showCustomerResults = false;
        },
        createCustomer() {
            if ( this.customer.email ) {
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
                        email: this.customer.email,
                    }
                }
                wepos.api.post( wepos.rest.root + wepos.rest.wcversion + '/customers', customerData )
                .done(response => {
                    this.serachInput = response.first_name + ' ' + response.last_name;
                    this.$emit( 'onCustomerSelected', response );
                    this.showNewCustomerModal = false;
                    this.customer = {};
                }).fail( response => {
                    alert( response.responseJSON.message );
                } );
            } else {
                alert( this.__( 'Please enter an email address for customer', 'wepos' ) );
            }
        }
    },
    mounted() {
        this.eventBus.$on( 'emptycart', ( orderdata ) => {
            this.serachInput = '';
        } );
    }
};

</script>

<style lang="less">
.wepos-new-customer-form {
    padding: 20px;
}

</style>