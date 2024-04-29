<template>
    <div>
        <div class="page page__wrapper">
            <div class="flex align--center page__actions justify--sb">
                <div class="flex page__actions--left">
                    <h1 class="page__title">{{ __("Customers", "wepos") }}</h1>
                    <button
                        class="add-new-btn"
                        type="button"
                        @click="addNewCustomer"
                    >
                        Add new Customer
                    </button>
                </div>
                <div class="page__actions--right">
                    <div class="wepos-search">
                        <input
                            type="text"
                            name="search"
                            placeholder="Type for search and Enter..."
                        />
                        <span
                            class="search-icon flaticon-musica-searcher"
                        ></span>
                    </div>
                </div>
            </div>

            <ve-table
                :columns="columns"
                :table-data="tableData"
                :columnHiddenOption="columnHiddenOption"
            />
            <div class="table-pagination">
                <ve-pagination
                    :total="totalPages"
                    :page-index="pageIndex"
                    :page-size="pageSize"
                    @on-page-number-change="pageNumberChange"
                    @on-page-size-change="pageSizeChange"
                />
            </div>
            <div v-show="!orderLoading && showEmpty" class="empty-data">
                {{ __("Empty data", "wepos") }}
            </div>
        </div>
        <modal
            :title="
                isEditCustomer
                    ? __('Edit Customer', 'wepos')
                    : __('Add New Customer', 'wepos')
            "
            v-if="showNewCustomerModal"
            @close="closeNewCustomerModal"
            width="700px"
            :footer="true"
            :header="true"
        >
            <template slot="body">
                <div class="wepos-new-customer-form">
                    <form action="" class="wepos-form" autocomplete="off">
                        <div class="form-row col-2">
                            <input
                                type="text"
                                :placeholder="__('First Name', 'wepos')"
                                v-model="customer.first_name"
                            />
                            <input
                                type="text"
                                :placeholder="__('Last Name', 'wepos')"
                                v-model="customer.last_name"
                            />
                        </div>
                        <div class="form-row">
                            <input
                                type="email"
                                :placeholder="__('Email', 'wepos')"
                                v-model="customer.email"
                            />
                        </div>
                        <div class="form-row col-2">
                            <input
                                type="text"
                                :placeholder="__('Address 1', 'wepos')"
                                v-model="customer.address_1"
                            />
                            <input
                                type="text"
                                :placeholder="
                                    __('Address 2 (optional)', 'wepos')
                                "
                                v-model="customer.address_2"
                            />
                        </div>
                        <div class="form-row col-2">
                            <multiselect
                                class="wepos-multiselect customer-country"
                                v-model="selectedCountry"
                                :options="getCountryList"
                                selectLabel=""
                                deselectLabel=""
                                selectedLabel=""
                                :placeholder="__('Select a country', 'wepos')"
                                @select="handleCountrySelect"
                                @remove="removeCountrySelect"
                                track-by="code"
                                label="name"
                                style="width: 48.5%; margin-right: 20px"
                            >
                                <template slot="singleLabel" slot-scope="props">
                                    <span v-html="props.option.name"></span>
                                </template>
                                <template slot="option" slot-scope="props">
                                    <span v-html="props.option.name"></span>
                                </template>
                                <template slot="noResult">
                                    <div class="no-data-found">
                                        {{ __("No country found", "wepos") }}
                                    </div>
                                </template>
                            </multiselect>
                            <!-- <input type="text" :placeholder="__( 'Country (optional)', 'wepos' )" v-model="customer.country"> -->
                            <template v-if="stateList.length > 0">
                                <multiselect
                                    class="wepos-multiselect customer-state"
                                    v-model="selectedState"
                                    :options="stateList"
                                    selectLabel=""
                                    deselectLabel=""
                                    selectedLabel=""
                                    :placeholder="__('Select a state', 'wepos')"
                                    style="width: 48.5%"
                                    track-by="code"
                                    label="name"
                                    @remove="removeStateSelect"
                                >
                                    <template
                                        slot="singleLabel"
                                        slot-scope="props"
                                    >
                                        <span v-html="props.option.name"></span>
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <span v-html="props.option.name"></span>
                                    </template>
                                    <template slot="noResult">
                                        <div class="no-data-found">
                                            {{
                                                __("No country found", "wepos")
                                            }}
                                        </div>
                                    </template>
                                </multiselect>
                            </template>
                            <template v-else>
                                <input
                                    type="text"
                                    :placeholder="
                                        __('States (optional)', 'wepos')
                                    "
                                    v-model="customer.state"
                                />
                            </template>
                        </div>
                        <div class="form-row col-2">
                            <input
                                type="text"
                                :placeholder="__('City (optional)', 'wepos')"
                                v-model="customer.city"
                            />
                            <input
                                type="text"
                                :placeholder="
                                    __('Zip/Postal Code (optional)', 'wepos')
                                "
                                v-model="customer.postcode"
                            />
                        </div>
                        <div class="form-row">
                            <input
                                type="text"
                                :placeholder="__('Phone (optional)', 'wepos')"
                                v-model="customer.phone"
                            />
                        </div>
                    </form>
                </div>
            </template>

            <template slot="footer">
                <button
                    class="add-new-customer-btn add-variation-btn"
                    :disabled="isDisabled"
                    @click="createCustomer()"
                >
                    {{
                        isEditCustomer
                            ? __("Update Customer", "wepos")
                            : __("Add Customer", "wepos")
                    }}
                </button>
            </template>
        </modal>
    </div>
</template>

<script>
import { DEFAULT_PAGE_SIZE } from "@/const";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ActionsButton from "./ActionsButton.vue";

let Modal = wepos_get_lib("Modal");

export default {
    name: "Customers",
    components: { DefaultLayout, Modal },
    data() {
        return {
            isDisabled: false,
            stateList: [],
            selectedState: null,
            selectedCountry: null,
            showNewCustomerModal: false,
            customerByKey: {},
            selectedCustomerId: 0,
            columnHiddenOption: {
                // default hidden column keys
                defaultHiddenColumnKeys: ["id"],
            },
            customer: {
                email: "",
                first_name: "",
                last_name: "",
                address_1: "",
                address_2: "",
                country: "",
                state: "",
                postcode: "",
                city: "",
                phone: "",
            },
            columns: [
                {
                    field: "",
                    key: "index",
                    title: "#",
                    renderBodyCell: ({ rowIndex }, h) => {
                        return `${++rowIndex}`;
                    },
                },
                {
                    field: "id",
                    key: "id",
                    title: "",
                },
                {
                    field: "name",
                    key: "a",
                    title: "Name",
                    align: "left",
                },
                {
                    field: "email",
                    key: "b",
                    title: "Email",
                    align: "left",
                },
                { field: "phone", key: "c", title: "Phone", align: "left" },
                {
                    field: "registeredDate",
                    key: "d",
                    title: "Registered date",
                    align: "left",
                },
                {
                    field: "",
                    title: "Action",
                    key: "e",
                    align: "left",
                    width: 80,
                    renderBodyCell: ({ row }, h) => {
                        return h(ActionsButton, {
                            props: { actionId: row["id"] },
                            on: {
                                onEditAction: this.editCustomer,
                                onDeleteAction: this.deleteCustomer,
                            },
                        });
                    },
                },
            ],
            tableData: [],
            page: 1,
            orderLoading: false,
            showEmpty: false,
            pageIndex: 1,
            pageSize: DEFAULT_PAGE_SIZE,
            totalPages: 0,
            isEditCustomer: false,
        };
    },
    computed: {
        getCountryList() {
            return Object.keys(wepos.countries).map((val) => {
                return {
                    code: val,
                    name: wepos.countries[val],
                };
            });
        },
        countryByKey() {
            wepos.countries.reduce((result, country) => {
                return { ...result, [country.code]: country };
            }, {});
        },
    },
    watch: {
        customer: {
            handler(val) {
                this.isDisabled = true;
                if (
                    val.first_name !== undefined &&
                    val.first_name.trim() != "" &&
                    val.last_name !== undefined &&
                    val.last_name.trim() != "" &&
                    val.email !== undefined &&
                    val.email.trim() != ""
                ) {
                    this.isDisabled = false;
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        createCustomer() {
            if (this.customer.email) {
                let customerData = {
                    email: this.customer.email,
                    first_name: this.customer.first_name,
                    last_name: this.customer.last_name,
                    username: this.customer.email,
                    billing: {
                        first_name: this.customer.first_name,
                        last_name: this.customer.last_name,
                        address_1: this.customer.address_1,
                        address_2: this.customer.address_2,
                        country:
                            this.selectedCountry !== null
                                ? this.selectedCountry.code
                                : "",
                        state:
                            this.selectedState !== null
                                ? this.selectedState.code
                                : this.customer.state,
                        postcode: this.customer.postcode,
                        city: this.customer.city,
                        phone: this.customer.phone,
                        email: this.customer.email,
                    },
                };
                if (!this.isEditCustomer) {
                    customerData = {
                        ...customerData,
                        password: this.generatePassword(20),
                    };
                }
                var $contentWrap = jQuery(".wepos-new-customer-form");
                $contentWrap.block({
                    message: null,
                    overlayCSS: {
                        background:
                            "#fff url(" +
                            wepos.ajax_loader +
                            ") no-repeat center",
                        opacity: 0.4,
                    },
                });

                wepos.api
                    .post(
                        wepos.rest.root +
                            wepos.rest.posversion +
                            `/customers${
                                this.isEditCustomer
                                    ? `/${this.selectedCustomerId}`
                                    : ""
                            }`,
                        customerData
                    )
                    .done((response) => {
                        this.serachInput =
                            response.first_name + " " + response.last_name;
                        this.$emit("onCustomerSelected", response);
                        $contentWrap.unblock();
                        this.closeNewCustomerModal();
                        this.startFetchCustomers(1);
                    })
                    .fail((response) => {
                        $contentWrap.unblock();
                    });
            } else {
                alert(
                    this.__(
                        "Please enter an email address for customer",
                        "wepos"
                    )
                );
            }
        },
        confirmDeleteCustomer() {
            this.showLoading();
            wepos.api
                .delete(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/customers/${this.selectedCustomerId}`,
                    { force: true }
                )
                .done((response) => {
                    this.startFetchCustomers(1);
                })
                .always((data) => {
                    this.hideLoading();
                });
        },
        generatePassword(length) {
            var charset =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        },
        removeCountrySelect(selectedOption, id) {
            this.selectedState = null;
            this.selectedCountry = null;
            this.stateList = [];
            this.customer.country = "";
            this.customer.state = "";
        },

        removeStateSelect(selectedOption, id) {
            this.selectedState = null;
            this.customer.state = "";
        },
        handleCountrySelect(selectedOption, id) {
            var state =
                wepos.states[selectedOption.code] !== undefined
                    ? wepos.states[selectedOption.code]
                    : [];
            var stateKeys = Object.keys(state);

            if (stateKeys.length > 0) {
                this.stateList = stateKeys.map((val) => {
                    return {
                        code: val,
                        name: state[val],
                    };
                });
            } else {
                this.stateList = state;
                this.selectedState = null;
            }
        },
        closeNewCustomerModal() {
            this.customer = {
                email: "",
                first_name: "",
                last_name: "",
                address_1: "",
                address_2: "",
                country: "",
                state: "",
                postcode: "",
                city: "",
                phone: "",
            };
            this.stateList = [];
            this.selectedState = null;
            this.selectedCountry = null;
            this.showNewCustomerModal = false;
        },
        addNewCustomer() {
            this.selectedCustomerId = 0;
            this.isEditCustomer = false;
            this.showNewCustomerModal = true;
        },
        editCustomer(customerId) {
            this.selectedCustomerId = customerId;
            this.isEditCustomer = true;
            if (this.customerByKey[customerId]) {
                this.customer = this.customerByKey[customerId];
                if (wepos.countries[this.customer.country]) {
                    this.selectedCountry = {
                        code: this.customer.country,
                        name: wepos.countries[this.customer.country],
                    };
                }
            }
            if (wepos.countries) {
            }
            this.showNewCustomerModal = true;
        },
        deleteCustomer(customerId) {
            this.selectedCustomerId = customerId;
            this.confirmAlert({
                title: this.__("Are you sure", "wepos"),
                text: this.__("You want to delete this customer?", "wepos"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.confirmDeleteCustomer();
                }
            });
        },
        startFetchCustomers(page) {
            this.page = page;
            this.tableData = [];
            this.fetchMembers();
        },
        // page number change
        pageNumberChange(pageIndex) {
            this.startFetchCustomers(pageIndex);
        },

        // page size change
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.startFetchCustomers(1);
        },
        appendCustomers(customers) {
            customers.forEach((customer) => {
                const customerData = {
                    id: customer.id,
                    name: `${customer.first_name} ${customer.last_name}`,
                    email: customer.email,
                    phone: customer.billing.phone,
                    registeredDate: this.formatDate(customer.date_created),
                    action: "",
                };
                this.customerByKey[customer.id] = customer.billing || {};
                this.tableData = this.tableData.concat(customerData);
            });

            if (this.tableData.length === 0) {
                this.showEmpty = true;
            } else {
                this.showEmpty = false;
            }
        },
        fetchMembers() {
            this.showLoading();
            this.orderLoading = true;
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/customers?per_page=${this.pageSize}&page=${this.page}`
                )
                .done((response, status, xhr) => {
                    this.appendCustomers(response);
                    this.page += 1;
                    this.totalPages = parseInt(
                        xhr.getResponseHeader("X-WP-TotalPages")
                    );
                    this.hideLoading();
                    this.orderLoading = false;
                });
        },
    },
    created() {
        this.fetchMembers();
    },
};
</script>

<style lang="less" scoped>
button.add-new-btn {
    padding: 12px;
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid #3b80f4;
    color: #fff;
    background: #3b80f4;
    cursor: pointer;

    &:disabled {
        cursor: no-drop;
        background: #76a2ed;
        border-color: #76a2ed;
    }
}
.page {
    &__actions {
        &--left {
            gap: 10px;
        }

        h1 {
            margin: 0;
        }
        margin-bottom: 16px;
    }
}
.table-pagination {
    margin-top: 20px;
    text-align: right;
}
.empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    color: #666;
    font-size: 16px;
    border: 1px solid #eee;
    border-top: 0;
}
</style>
