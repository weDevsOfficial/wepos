<template>
    <div>
        <div class="page page__wrapper product__wrapper">
            <div class="flex align--center page__actions justify--sb">
                <div class="flex page__actions--left">
                    <h1 class="page__title">{{ __("Products", "wepos") }}</h1>
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
                max-height="max(calc(100vh - 150px), 400px)"
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
            <div v-show="!productLoading && showEmpty" class="empty-data">
                {{ __("Empty data", "wepos") }}
            </div>
        </div>
        <!-- quick edit -->
        <quick-edit
            v-if="showQuickEdit"
            @onCancel="cancelQuickEdit"
            @onUpdate="updateQuickEdit"
            :selected-product="selectedProduct"
        ></quick-edit>
    </div>
</template>

<script>
import { DEFAULT_PAGE_SIZE, STOCK_MAPPERS } from "@/const";

import ActionsButton from "./ActionsButton.vue";
import QuickEdit from "./QuickEditProduct.vue";

let Modal = wepos_get_lib("Modal");

export default {
    name: "Customers",
    components: { Modal, QuickEdit },
    data() {
        return {
            selectedProduct: {},
            showQuickEdit: false,
            isDisabled: false,
            showNewCustomerModal: false,
            productByKey: {},
            productPrice: {},
            selectedProductId: 0,
            columnHiddenOption: {
                // default hidden column keys
                defaultHiddenColumnKeys: ["id"],
            },
            product: {},
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
                    field: "image",
                    key: "image",
                    title: "Image",
                    renderBodyCell: ({ row }, h) => {
                        return h("img", {
                            attrs: { src: row["image"], width: 65 },
                        });
                    },
                },
                {
                    field: "title",
                    key: "title",
                    title: "Title",
                    align: "left",
                },
                {
                    field: "stock",
                    key: "stock",
                    title: "Stock",
                    align: "left",
                    renderBodyCell: ({ row }, h) => {
                        return h(
                            "span",
                            {
                                attrs: { class: row["stock"] },
                            },
                            [this.__(STOCK_MAPPERS[row["stock"]], "wepos")]
                        );
                    },
                },
                { field: "sku", key: "sku", title: "SKU", align: "left" },
                {
                    field: "price",
                    key: "price",
                    title: "Price",
                    align: "left",
                    renderBodyCell: ({ row }, h) => {
                        const productId = row["id"];
                        const prices = this.productPrice[productId];
                        const priceFrom = prices[0];
                        let priceTo = "";
                        if (prices.length > 1 && prices[prices.length - 1]) {
                            priceTo = prices[prices.length - 1];
                        }
                        return `${this.formatPrice(priceFrom)} ${
                            priceTo ? `- ${this.formatPrice(priceTo)}` : ""
                        }`;
                    },
                },
                {
                    field: "createdAt",
                    key: "createdAt",
                    title: "Created At",
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
                                onEditAction: this.editProduct,
                                onDeleteAction: this.deleteProduct,
                            },
                        });
                    },
                },
            ],
            tableData: [],
            page: 1,
            productLoading: false,
            showEmpty: false,
            pageIndex: 1,
            pageSize: DEFAULT_PAGE_SIZE,
            totalPages: 0,
            isEditProduct: false,
        };
    },

    methods: {
        cancelQuickEdit() {
            this.showQuickEdit = false;
        },
        updateQuickEdit(result) {
            if (result) {
                this.showQuickEdit = false;
                this.success({
                    title: this.__("Updated product successfully", "wepos"),
                });
                this.startFetchProducts(1);
            } else {
                this.error({
                    title: this.__("Update product failed", "wepos"),
                });
            }
        },
        confirmDeleteProduct() {
            this.showLoading();
            wepos.api
                .delete(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/products/${this.selectedProductId}`,
                    { force: true }
                )
                .done((response) => {
                    this.startFetchProducts(1);
                })
                .always((data) => {
                    this.hideLoading();
                });
        },

        editProduct(productId) {
            this.showQuickEdit = true;
            this.selectedProductId = productId;
            this.isEditProduct = true;
            if (this.productByKey[productId]) {
                this.selectedProduct = this.productByKey[productId];
            }
        },
        deleteProduct(productId) {
            this.selectedProductId = productId;
            this.confirmAlert({
                title: this.__("Are you sure", "wepos"),
                text: this.__("You want to delete this product?", "wepos"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.confirmDeleteProduct();
                }
            });
        },
        startFetchProducts(page) {
            this.page = page;
            this.tableData = [];
            this.fetchProducts();
        },
        // page number change
        pageNumberChange(pageIndex) {
            this.startFetchProducts(pageIndex);
        },

        // page size change
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.startFetchProducts(1);
        },
        appendProducts(products) {
            products.forEach((product) => {
                const productData = {
                    id: product.id,
                    title: product.name,
                    sku: product.sku,
                    stock: product.stock_status,
                    createdAt: this.formatDate(product.date_created),
                    image: this.getProductImage(product),
                    action: "",
                };
                const priceSet = new Set([product.price]);
                if (product.variations?.length) {
                    product.variations.forEach((variationProduct) => {
                        priceSet.add(variationProduct.price);
                    });
                }
                this.productByKey[product.id] = product;
                this.productPrice[product.id] = [...priceSet]
                    .map((v) => parseInt(v))
                    .sort((a, b) => (b - a > 0 ? -1 : 1));
                this.tableData = this.tableData.concat(productData);
            });

            if (this.tableData.length === 0) {
                this.showEmpty = true;
            } else {
                this.showEmpty = false;
            }
        },
        fetchProducts() {
            this.showLoading();
            this.productLoading = true;
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/products?per_page=${this.pageSize}&page=${this.page}`
                )
                .done((response, status, xhr) => {
                    this.appendProducts(response);
                    this.page += 1;
                    this.totalPages = parseInt(
                        xhr.getResponseHeader("X-WP-TotalPages")
                    );
                    this.hideLoading();
                    this.productLoading = false;
                });
        },
    },
    created() {
        this.fetchProducts();
    },
};
</script>

<style lang="less" scoped>
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
.product__wrapper {
    &::v-deep table tbody tr td span {
        &.instock {
            color: #50d327;
        }
        &.outofstock {
            color: #d35427;
        }
    }
}
</style>
