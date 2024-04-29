<template>
    <div class="product-contents">
        <header>
            <a
                href="#/orders"
                class="wepos-btn wepos-btn-primary wepos-btn-back mr-2"
                ><span class="flaticon-left-arrow-key"></span
            ></a>
            <div class="title">
                <h1>{{ __("Orders", "wepos") }}</h1>
            </div>
        </header>
        <div>
            <div class="row">
                <div class="col-2 mr-2">
                    <div class="row mb-2">
                        <div class="col-1">
                            <div class="card">
                                <div class="header">
                                    <h3>
                                        {{ __("Order", "wepos") }} #{{
                                            order.id
                                        }}
                                    </h3>
                                </div>
                                <div class="body">
                                    <table class="wepos-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    {{ __("Item", "wepos") }}
                                                </th>
                                                <th>
                                                    {{ __("Cost", "wepos") }}
                                                </th>
                                                <th>
                                                    {{ __("Qty", "wepos") }}
                                                </th>
                                                <th>
                                                    {{ __("Total", "wepos") }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="item in order.line_items"
                                            >
                                                <td>
                                                    <h4>
                                                        {{ item.name }}
                                                    </h4>
                                                </td>
                                                <td>
                                                    {{
                                                        formatPrice(item.price)
                                                    }}
                                                </td>
                                                <td>
                                                    {{ item.quantity }}
                                                </td>
                                                <td>
                                                    {{
                                                        formatPrice(item.total)
                                                    }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {{
                                                        __("Shipping", "wepos")
                                                    }}
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {{
                                                        formatPrice(
                                                            order.shipping_total
                                                        )
                                                    }}
                                                </td>
                                            </tr>
                                            <tr class="no-border">
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {{ __("Tax", "wepos") }}
                                                    [?]:
                                                </td>
                                                <td>
                                                    {{
                                                        formatPrice(
                                                            order.total_tax
                                                        )
                                                    }}
                                                </td>
                                            </tr>
                                            <tr class="no-border">
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {{
                                                        __("Discount", "wepos")
                                                    }}
                                                    [?]:
                                                </td>
                                                <td>
                                                    {{
                                                        formatPrice(
                                                            order.discount_total
                                                        )
                                                    }}
                                                </td>
                                            </tr>
                                            <tr class="no-border">
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {{ __("Fee", "wepos") }}
                                                    [?]:
                                                </td>
                                                <td>
                                                    {{ formatPrice(0) }}
                                                </td>
                                            </tr>
                                            <tr class="no-border">
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {{
                                                        __("Shipping", "wepos")
                                                    }}
                                                    [?]:
                                                </td>
                                                <td>
                                                    {{
                                                        formatPrice(
                                                            order.shipping_total
                                                        )
                                                    }}
                                                </td>
                                            </tr>
                                            <tr class="no-border">
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    {{
                                                        __(
                                                            "Order Total",
                                                            "wepos"
                                                        )
                                                    }}:
                                                </td>
                                                <td>
                                                    {{
                                                        formatPrice(order.total)
                                                    }}
                                                </td>
                                            </tr>
                                            <!---->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-1 mr-2">
                            <div class="card">
                                <div class="header">
                                    <h3>
                                        {{ __("Billing Address", "wepos") }}
                                    </h3>
                                </div>
                                <div class="body text-disabled">
                                    <p>
                                        {{
                                            order.billing?.address_1 ||
                                            order.billing?.address_2
                                        }}
                                    </p>
                                    <p>
                                        {{
                                            `${order.billing?.first_name} ${order.billing?.last_name}`
                                        }}
                                        {{ order.billing?.phone }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="card">
                                <div class="header">
                                    <h3>
                                        {{ __("Shipping Address", "wepos") }}
                                    </h3>
                                </div>
                                <div class="body text-disabled">
                                    <p>
                                        {{
                                            order.shipping?.address_1 ||
                                            order.shipping?.address_2
                                        }}
                                    </p>
                                    <p>
                                        {{
                                            `${order.shipping?.first_name} ${order.shipping?.last_name}`
                                        }}
                                        {{ order.shipping?.phone }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                    <div class="row mb-2">
                        <div class="col-1">
                            <div class="card">
                                <div class="header">
                                    <h3>
                                        {{ __("General Details", "wepos") }}
                                    </h3>
                                </div>
                                <div class="body">
                                    <div class="row">
                                        <div class="col-1">
                                            <p class="text-bold">
                                                {{
                                                    __("Order Status", "wepos")
                                                }}:
                                            </p>
                                        </div>
                                        <div class="col-1">
                                            <p class="text-disabled">
                                                {{ orderStatus }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-1">
                                            <p class="text-bold">
                                                {{ __("Order Date", "wepos") }}:
                                            </p>
                                        </div>
                                        <div class="col-1">
                                            <p class="text-disabled">
                                                {{
                                                    formatDate(
                                                        order.date_created
                                                    )
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-1">
                                            <p class="text-bold">
                                                {{
                                                    __(
                                                        "Earning From Order",
                                                        "wepos"
                                                    )
                                                }}:
                                            </p>
                                        </div>
                                        <div class="col-1">
                                            <p class="text-disabled">
                                                {{ formatPrice(order.total) }}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-1">
                                            <p class="text-bold">
                                                {{ __("Customer", "wepos") }}:
                                            </p>
                                        </div>
                                        <div class="col-1">
                                            <p class="text-disabled">
                                                {{ getCustomer.fullName }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-1">
                                            <p class="text-bold">
                                                {{ __("Email", "wepos") }}:
                                            </p>
                                        </div>
                                        <div class="col-1">
                                            <p class="text-disabled">
                                                {{ getCustomer.email }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-1">
                                            <p class="text-bold">
                                                {{ __("Phone", "wepos") }}:
                                            </p>
                                        </div>
                                        <div class="col-1">
                                            <p class="text-disabled">
                                                {{ getCustomer.phone }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-1">
                            <div class="card">
                                <div class="header">
                                    <h3>
                                        {{ __("Order Notes", "wepos") }}
                                    </h3>
                                </div>
                                <div class="body">
                                    <div class="mb-3" v-for="note in notes">
                                        <p>
                                            {{ note.note }}
                                        </p>
                                        <div class="row align-item-baseline">
                                            <div class="col-1">
                                                <span class="text-disabled"
                                                    >added
                                                    {{
                                                        formatDate(
                                                            note.date_created
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                            <div class="col-1">
                                                <button
                                                    @click="deleteNote(note.id)"
                                                    class="wepos-btn wepos-btn-danger"
                                                >
                                                    {{
                                                        __(
                                                            "Delete note",
                                                            "wepos"
                                                        )
                                                    }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row mb-2">
                                        <div class="col-1">
                                            <div class="new-order">
                                                <p class="text-bold">
                                                    {{
                                                        __("Add Note", "wepos")
                                                    }}
                                                </p>
                                                <textarea
                                                    rows="10"
                                                    class="mb-2"
                                                    v-model="noteData.note"
                                                ></textarea>
                                                <select
                                                    v-model="
                                                        noteData.customer_note
                                                    "
                                                >
                                                    <option value="true">
                                                        Customer Note
                                                    </option>
                                                    <option value="false">
                                                        Admin Note
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        class="wepos-btn wepos-btn-primary mb-2"
                                        @click.prevent="addNote"
                                        :disabled="!noteData.note"
                                    >
                                        {{ __("Add Note", "wepos") }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ORDER_STATUS } from "@/const";

export default {
    name: "OrderDetail",
    data() {
        return {
            orderLoading: false,
            currentOrderId: "",
            order: {},
            customer: {},
            notes: [],
            noteData: {
                note: "",
                customer_note: true,
            },
        };
    },
    computed: {
        orderStatus() {
            return ORDER_STATUS[this.order.status] || "";
        },
        getCustomer() {
            if (this.customer.id) {
                return {
                    fullName: `${this.customer.first_name} ${this.customer.last_name}`,
                    email: this.customer.email,
                    phone: this.customer.billing?.phone || "---",
                };
            }
            return {
                fullName: this.__("Guest", "wepos"),
                email: "",
                phone: "---",
            };
        },
    },
    methods: {
        deleteNoteConfirm(noteId) {
            this.showLoading();

            wepos.api
                .delete(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/orders/${this.currentOrderId}/notes/${noteId}`,
                    { force: true }
                )
                .done((response) => {
                    this.notes = this.notes.filter(
                        (note) => note.id !== noteId
                    );
                })
                .always(() => {
                    this.hideLoading();
                });
        },
        deleteNote(noteId) {
            this.confirmAlert({
                title: this.__("Are you sure", "wepos"),
                text: this.__("You want to delete this note?", "wepos"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteNoteConfirm(noteId);
                }
            });
        },
        addNote() {
            this.showLoading();

            wepos.api
                .post(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/orders/${this.currentOrderId}/notes`,
                    this.noteData
                )
                .done((response) => {
                    this.notes.unshift(response);
                    // Reset noteData
                    this.noteData = {
                        customer_note: false,
                    };
                })
                .always(() => {
                    this.hideLoading();
                });
        },
        fetchOrderDetail() {
            this.showLoading();
            this.orderLoading = true;
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/orders/${this.currentOrderId}`
                )
                .done((response) => {
                    this.order = response;
                    if (this.order.customer_id) {
                        this.fetchCustomer(this.order.customer_id);
                    }
                    this.fetchOrderNotes(this.currentOrderId);
                    this.hideLoading();
                })
                .always(() => {
                    this.orderLoading = false;
                    this.hideLoading();
                });
        },
        fetchCustomer(customerId) {
            this.showLoading();
            this.orderLoading = true;
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/customers/${customerId}`
                )
                .done((response) => {
                    this.customer = response;
                    this.hideLoading();
                })
                .always(() => {
                    this.orderLoading = false;
                    this.hideLoading();
                });
        },
        fetchOrderNotes(orderId) {
            this.showLoading();
            this.orderLoading = true;
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/orders/${orderId}/notes`
                )
                .done((response) => {
                    this.notes = response;
                    this.hideLoading();
                })
                .always(() => {
                    this.orderLoading = false;
                    this.hideLoading();
                });
        },
    },
    created() {
        this.currentOrderId = this.$route.params.orderId || "";
        this.fetchOrderDetail();
    },
};
</script>

<style lang="less">
.new-order textarea {
    border-color: #e0e5ea;
    width: 100%;
}

.new-order select {
    border-color: #e0e5ea;
    padding: 6px;
}
</style>
