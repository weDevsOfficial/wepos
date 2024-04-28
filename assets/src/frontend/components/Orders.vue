<template>
    <default-layout>
        <div class="page page__wrapper">
            <h1 class="page__title">{{ __("Orders", "wepos") }}</h1>
            <filter-order @onOrderFilterSelected="selectProductFilter" />
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
                Data Empty.
            </div>
        </div>
    </default-layout>
</template>

<script>
import { DEFAULT_PAGE_SIZE, ORDER_STATUS } from "@/const";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import FilterOrder from "./FilterOrder.vue";
import ActionsButton from "./OrderActionsButton.vue";

export default {
    name: "Orders",
    components: { DefaultLayout, FilterOrder, ActionsButton },
    data() {
        return {
            selectedOrderId: 0,
            orderStatus: "any",
            columnHiddenOption: {
                // default hidden column keys
                defaultHiddenColumnKeys: ["id"],
            },
            columns: [
                {
                    field: "id",
                    key: "id",
                    title: "",
                },
                {
                    field: "",
                    key: "index",
                    title: "#",
                    renderBodyCell: ({ row, column, rowIndex }, h) => {
                        return h(
                            "router-link",
                            {
                                props: { actionId: row["id"] },
                                attrs: {
                                    to: `/orders/${row["id"]}`,
                                },
                            },
                            [++rowIndex]
                        );
                        return `${++rowIndex}`;
                    },
                },
                {
                    field: "order",
                    key: "a",
                    title: "Order",
                    width: 200,
                },
                {
                    field: "total",
                    key: "b",
                    title: "Total",
                    align: "left",
                },
                {
                    field: "status",
                    key: "c",
                    title: "Status",
                    align: "left",
                    renderBodyCell: ({ row }) => {
                        return `${ORDER_STATUS[row["status"]]}`;
                    },
                },
                {
                    field: "customer",
                    key: "d",
                    title: "Customer",
                    align: "left",
                },
                { field: "gateway", key: "e", title: "Gateway", align: "left" },
                { field: "date", key: "f", title: "Date", align: "left" },
                {
                    field: "",
                    key: "actions",
                    title: "",
                    width: 80,
                    renderBodyCell: ({ row, column, rowIndex }, h) => {
                        return h(ActionsButton, {
                            props: { actionId: row["id"] },
                            on: {
                                onEditAction: this.editOrder,
                                onRefundAction: this.refundOrder,
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
        };
    },
    methods: {
        confirmRefundOrder() {},
        async editOrder(orderId) {
            this.$router.push(`/orders/${orderId}`);
        },
        refundOrder(orderId) {
            this.selectedOrderId = orderId;
            this.confirmAlert({
                title: this.__("Are you sure", "wepos"),
                text: this.__("You want to refund this order?", "wepos"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.confirmRefundOrder();
                }
            });
        },

        startFetchOrders() {
            this.tableData = [];
            this.fetchOrders();
        },
        // page number change
        pageNumberChange(pageIndex) {
            this.page = pageIndex;
            this.startFetchOrders();
        },

        // page size change
        pageSizeChange(pageSize) {
            this.page = 1;
            this.pageSize = pageSize;
            this.startFetchOrders();
        },

        selectProductFilter(orderStatus) {
            this.orderStatus = orderStatus;
            this.page = 1;
            this.tableData = [];
            this.fetchOrders();
        },
        appendOrders(orders) {
            orders.forEach((order) => {
                const orderData = {
                    id: order.id,
                    order: `Order #${order.id}`,
                    total: this.formatPrice(order.total),
                    status: order.status,
                    date: this.formatDate(order.date_created),
                    gateway: order.payment_method_title,
                    customer: order.customer_id
                        ? `${order.billing.first_name} ${order.billing.last_name}`
                        : this.__("Guest user", "wepos"),
                };
                this.tableData = this.tableData.concat(orderData);
            });
            if (this.tableData.length === 0) {
                this.showEmpty = true;
            } else {
                this.showEmpty = false;
            }
        },
        fetchOrders() {
            this.showLoading();
            this.orderLoading = true;
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/orders?per_page=${this.pageSize}&page=${this.page}&status=${this.orderStatus}`
                )
                .done((response, status, xhr) => {
                    this.appendOrders(response);
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
        this.fetchOrders();
    },
};
</script>

<style lang="less" scoped>
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
