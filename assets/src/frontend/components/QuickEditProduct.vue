<template>
    <div class="quick-edit-product-wrap" product="">
        <header>
            <h2>{{ __("Quick Edit", "wepos") }}</h2>
        </header>
        <section class="product-edit-content">
            <form class="product-edit-form">
                <div class="basic-data">
                    <div class="left-side wepos-left">
                        <div class="form-row">
                            <label for="title">{{
                                __("Title", "wepos")
                            }}</label>
                            <input
                                id="title"
                                type="text"
                                v-model="product.name"
                                placeholder="Title"
                            />
                        </div>
                        <div class="form-row">
                            <label>{{ __("Categories", "wepos") }}</label>
                            <div
                                tabindex="-1"
                                class="multiselect wepos-multiselect"
                            >
                                <multiselect
                                    class="wepos-multiselect"
                                    v-model="selectedCategories"
                                    :options="categoriesList"
                                    :multiple="true"
                                    selectLabel=""
                                    deselectLabel=""
                                    selectedLabel=""
                                    :placeholder="
                                        __('Select categories', 'wepos')
                                    "
                                    track-by="name"
                                    label="name"
                                    style="margin-right: 20px"
                                >
                                    <template
                                        slot="singleLabel"
                                        slot-scope="props"
                                    >
                                        {{ props.option.name }}
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <span>
                                            <template
                                                v-for="pad in props.option
                                                    .level"
                                            >
                                                &nbsp;
                                            </template>
                                            {{ props.option.name }}
                                        </span>
                                    </template>

                                    <template slot="noResult">
                                        <div class="no-data-found">
                                            {{ __("Not found", "wepos") }}
                                        </div>
                                    </template>
                                </multiselect>
                            </div>
                        </div>
                        <div class="form-row">
                            <label>Tags</label>
                            <div
                                tabindex="-1"
                                class="multiselect wepos-multiselect"
                            >
                                <multiselect
                                    class="wepos-multiselect"
                                    v-model="selectedTags"
                                    :options="tagsList"
                                    selectLabel=""
                                    deselectLabel=""
                                    selectedLabel=""
                                    :placeholder="__('Select tags', 'wepos')"
                                    track-by="name"
                                    label="name"
                                    style="margin-right: 20px"
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
                                            {{ __("No tag found", "wepos") }}
                                        </div>
                                    </template>
                                </multiselect>
                            </div>
                        </div>
                    </div>
                    <div class="right-side wepos-right">
                        <div class="featured-image">
                            <img
                                alt=""
                                :src="getProductImage(selectedProduct || {})"
                                tyle="width: 100%"
                            />
                        </div>
                    </div>
                    <div class="wepos-clearfix"></div>
                </div>
                <div class="extra-data">
                    <h3>{{ __("Product Data", "wepos") }}</h3>
                    <div class="form-row">
                        <label for="sku">{{ __("SKU", "wepos") }}</label>
                        <input
                            id="sku"
                            type="text"
                            v-model="product.sku"
                            placeholder="SKU"
                        />
                    </div>
                    <div class="form-row">
                        <label for="price">{{ __("Price", "wepos") }}</label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            step="any"
                            v-model="product.price"
                            placeholder="Price"
                        />
                    </div>
                    <div class="form-row">
                        <label for="sale_price">{{
                            __("Sale Price", "wepos")
                        }}</label>
                        <input
                            id="sale_price"
                            type="number"
                            v-model="product.sale_price"
                            min="0"
                            step="any"
                            placeholder="Sale price"
                        />
                    </div>
                    <div class="form-row">
                        <label for="weight">{{ __("Weight", "wepos") }}</label>
                        <input
                            id="weight"
                            type="number"
                            min="0"
                            step="any"
                            placeholder="Weight"
                            v-model="product.weight"
                        />
                    </div>
                    <div class="form-row">
                        <label>{{ __("Visibility", "wepos") }}</label>
                        <select v-model="product.catalog_visibility">
                            <option value="visible">
                                {{ __("Visible", "wepos") }}
                            </option>
                            <option value="catalog">
                                {{ __("Catalog", "wepos") }}
                            </option>
                            <option value="search">
                                {{ __("Search", "wepos") }}
                            </option>
                            <option value="hidden">
                                {{ __("Hidden", "wepos") }}
                            </option>
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="manage_stock" class="checkbox"
                            ><input
                                v-model="product.manage_stock"
                                id="manage_stock"
                                type="checkbox"
                            />
                            <span class="text">{{
                                __("Manage Stocks", "wepos")
                            }}</span></label
                        >
                    </div>
                    <div
                        class="form-row split-row"
                        v-show="product.manage_stock"
                    >
                        <div class="col-1">
                            <label for="stock_qty">{{
                                __("Stock Quantity", "wepos")
                            }}</label>
                            <input
                                id="stock_qty"
                                type="number"
                                v-model="product.stock_quantity"
                                min="0"
                                step="any"
                                placeholder="0"
                            />
                        </div>
                        <div class="col-2">
                            <label>{{
                                __("Allow backorders?", "wepos")
                            }}</label>
                            <select v-model="product.backorders">
                                <option value="no">
                                    {{ __("Do not allow", "wepos") }}
                                </option>
                                <option value="notify">
                                    {{
                                        __(
                                            "Allow, but notify customer",
                                            "wepos"
                                        )
                                    }}
                                </option>
                                <option value="yes">
                                    {{ __("Allow", "wepos") }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </section>
        <footer>
            <button class="wepos-btn wepos-left" @click="cancelEdit">
                {{ __("Cancel", "wepos") }}
            </button>
            <button
                class="wepos-btn wepos-btn-primary wepos-right"
                @click="updateProduct"
            >
                {{ __("Update", "wepos") }}
            </button>
            <div class="wepos-clearfix"></div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "QuickEditProduct",
    props: ["selectedProduct"],
    data() {
        return {
            product: {
                name: "",
                sku: "",
                price: 0,
                sale_price: 0,
                image: "",
                manage_stock: false,
                stock_quantity: 0,
                catalog_visibility: "visible",
                backordered: false,
                backorders_allowed: false,
                backorders: "notify",
                weight: "",
            },
            manage_stock: false,
            categoriesList: [],
            selectedCategories: [],
            tagsList: [],
            selectedTags: {},
        };
    },
    methods: {
        handleTagSelect() {},
        removeTagSelect() {},
        cancelEdit() {
            this.$emit("onCancel");
        },
        updateProduct() {
            const updateProductData = {
                ...this.selectedProduct,
                ...this.product,
                categories: this.selectedCategories,
                tags: this.selectedTags,
                stock_quantity: this.product.stock_quantity || 0,
                low_stock_amount: this.product.low_stock_amount || 0,
            };

            var $contentWrap = jQuery(".quick-edit-product-wrap");
            $contentWrap.block({
                message: null,
                overlayCSS: {
                    background:
                        "#fff url(" + wepos.ajax_loader + ") no-repeat center",
                    opacity: 0.4,
                },
            });

            wepos.api
                .post(
                    wepos.rest.root +
                        wepos.rest.posversion +
                        `/products/${this.selectedProduct.id}`,
                    updateProductData
                )
                .done((response) => {
                    this.onUpdateProduct(true);
                    $contentWrap.unblock();
                    this.closeNewCustomerModal();
                })
                .fail((response) => {
                    this.onUpdateProduct(false);
                    $contentWrap.unblock();
                });
        },
        onUpdateProduct(result) {
            this.$emit("onUpdate", result);
        },
        fetchCategories() {
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.wcversion +
                        "/products/categories?hide_empty=true&_fields=id,name,parent_id&per_page=100"
                )
                .then((response) => {
                    response.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    var tree = (function (response, root) {
                        var r = [],
                            o = {};
                        response.forEach(function (a) {
                            o[a.id] = {
                                response: a,
                                children: o[a.id] && o[a.id].children,
                            };
                            if (a.parent_id === root) {
                                r.push(o[a.id]);
                            } else {
                                o[a.parent_id] = o[a.parent_id] || {};
                                o[a.parent_id].children =
                                    o[a.parent_id].children || [];
                                o[a.parent_id].children.push(o[a.id]);
                            }
                        });
                        return r;
                    })(response, null);

                    var selectedCat = {
                        id: -1,
                        level: 0,
                        name: this.__("All categories", "wepos"),
                        parent_id: null,
                    };
                    var sorted = tree.reduce(
                        (function traverse(level) {
                            return function (r, a) {
                                a.response.level = level;
                                return r.concat(
                                    a.response,
                                    (a.children || []).reduce(
                                        traverse(level + 1),
                                        []
                                    )
                                );
                            };
                        })(0),
                        []
                    );
                    this.categoriesList = sorted;
                    this.categoriesList.unshift(selectedCat);
                });
        },
        fetchTags() {
            wepos.api
                .get(
                    wepos.rest.root +
                        wepos.rest.wcversion +
                        "/products/tags?hide_empty=false&_fields=id,name&per_page=100"
                )
                .then((response) => {
                    response.sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    this.tagsList = response;
                });
        },
        prepareProductData() {
            const {
                name,
                sku,
                price,
                sale_price,
                image,
                manage_stock,
                stock_quantity,
                backordered,
                backorders_allowed,
                backorders,
                catalog_visibility,
                weight,
                categories,
                tags,
                ...restProps
            } = this.selectedProduct;
            this.product = {
                name,
                sku,
                price,
                sale_price,
                image,
                manage_stock,
                stock_quantity,
                catalog_visibility,
                backordered,
                backorders_allowed,
                backorders,
                catalog_visibility,
                weight,
            };
            this.selectedCategories = categories;
            this.selectedTags = tags;
        },
    },

    created() {
        this.fetchCategories();
        this.fetchTags();
        this.prepareProductData();
    },
};
</script>

<style lang="less" scoped></style>
