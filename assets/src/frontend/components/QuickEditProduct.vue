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
                            <input id="title" type="text" placeholder="Title" />
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
                                    selectLabel=""
                                    deselectLabel=""
                                    selectedLabel=""
                                    :placeholder="
                                        __('Select categories', 'wepos')
                                    "
                                    @select="handleCategorySelect"
                                    @remove="removeCategorySelect"
                                    track-by="code"
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
                                            {{
                                                __("No category found", "wepos")
                                            }}
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
                                    @select="handleTagSelect"
                                    @remove="removeTagSelect"
                                    track-by="code"
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
                            <img alt="" style="width: 100%" />
                        </div>
                    </div>
                    <div class="wepos-clearfix"></div>
                </div>
                <div class="extra-data">
                    <h3>{{ __("Product Data", "wepos") }}</h3>
                    <div class="form-row">
                        <label for="sku">{{ __("SKU", "wepos") }}</label>
                        <input id="sku" type="text" placeholder="SKU" />
                    </div>
                    <div class="form-row">
                        <label for="price">{{ __("Price", "wepos") }}</label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            step="any"
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
                        />
                    </div>
                    <div class="form-row">
                        <label>{{ __("Visibility", "wepos") }}</label>
                        <select>
                            <option value="visible">Visible</option>
                            <option value="catalog">Catalog</option>
                            <option value="search">Search</option>
                            <option value="hidden">Hidden</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="manage_stock" class="checkbox"
                            ><input
                                id="manage_stock"
                                v-model="manage_stock"
                                type="checkbox"
                            />
                            <span class="text">{{
                                __("Manage Stocks", "wepos")
                            }}</span></label
                        >
                    </div>
                    <div class="form-row split-row" v-show="manage_stock">
                        <div class="col-1">
                            <label for="stock_qty">{{
                                __("Stock Quantity", "wepos")
                            }}</label>
                            <input
                                id="stock_qty"
                                type="number"
                                min="0"
                                step="any"
                                placeholder="0"
                            />
                        </div>
                        <div class="col-2">
                            <label>{{
                                __("Allow backorders?", "wepos")
                            }}</label>
                            <select>
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
            <button class="wepos-btn wepos-primary-button wepos-right">
                {{ __("Update", "wepos") }}
            </button>
            <div class="wepos-clearfix"></div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "QuickEditProduct",
    data() {
        return {
            manage_stock: false,
            categoriesList: [],
            selectedCategories: {},
            tagsList: [],
            selectedTags: {},
        };
    },
    methods: {
        handleCategorySelect() {},
        removeCategorySelect() {},
        handleTagSelect() {},
        removeTagSelect() {},
        cancelEdit() {
            this.$emit("onCancel");
        },
        onUpdateProduct() {
            this.$emit("onUpdate");
        },
    },
};
</script>

<style lang="less" scoped></style>
