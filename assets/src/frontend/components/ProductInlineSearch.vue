<template>
    <div class="search-box" v-click-outside="outside">
        <form action="" autocomplete="off">
            <input type="text" name="search" id="product-search" v-model="serachInput" :placeholder="placeholder" @focus.prevent="triggerFocus" @keyup="searchProduct">
            <span class="search-icon flaticon-musica-searcher" v-if="mode == 'product'"></span>
            <span class="search-icon flaticon-supermarket-scanner" v-if="mode == 'scan'"></span>

            <div class="search-type">
                <a href="#" :class="{ active: mode == 'product'}" @click.prevent="changeMode('product')">Product</a>
                <a href="#" :class="{ active: mode == 'scan'}" @click.prevent="changeMode('scan')">Scan</a>
            </div>
            <div class="search-result" v-show="showResults">
                <ul v-if="products.length">
                    <li v-for="product in products">
                        <template v-if="product.type == 'simple'">
                            <a href="#" class="wepos-clearfix" @click="addToCartAction( product )">{{ product.name }}
                                <span class="price">{{ formatPrice( product.price ) }}</span>
                                <span class="sku" v-if="product.sku">{{ product.sku }}</span>
                                <span class="action flaticon-enter-arrow wepos-right"></span>
                            </a>
                        </template>
                        <template v-if="product.type == 'variable'">
                            <a href="#" class="" @click.prevent="selectVariation( product )">{{ product.name }}
                                <span class="price">{{ formatPrice( product.price ) }}</span>
                                <span class="sku" v-if="product.sku">{{ product.sku }}</span>
                                <span class="action flaticon-enter-arrow wepos-right"></span>
                            </a>
                        </template>
                    </li>
                </ul>
                <div v-else class="no-data-found">
                    No product found
                </div>
                <div class="suggession">
                    <span class="term">
                        <span class="flaticon-swap"></span> to navigate
                    </span>
                    <span class="term">
                        <span class="flaticon-enter-arrow"></span> to select
                    </span>
                    <span class="term">
                        <strong>esc</strong> to dismiss
                    </span>
                </div>
            </div>
        </form>
        <modal
            title="Select Variations"
            v-if="showVariationModal"
            @close="showVariationModal = false"
            width="500px"
            height="auto"
            :footer="true"
            :header="true"
        >
            <template slot="body">
                <div class="variation-attribute-wrapper" v-for="attribute in selectedVariationProduct.attributes">
                    <div class="attribute">
                        <p>{{ attribute.name }}</p>
                        <div class="options">
                            <template v-for="option in attribute.options">
                                <label>
                                    <input type="radio" v-model="chosenAttribute[attribute.name]" :value="option">
                                    <div class="box">
                                        {{ option }}
                                    </div>
                                </label>
                            </template>
                        </div>
                    </div>
                </div>

            </template>

            <template slot="footer">
                <button class="add-variation-btn" :disabled="attributeDisabled" @click="addVariationProduct()">{{ __( 'Add Product', 'wepos' ) }}</button>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
    name: 'ProductInlineSearch',

    components : {
        Modal
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
        }
    },

    computed: {
        placeholder() {
            return ( this.mode == 'scan' ) ? 'Scan your product' : 'Search product by typing';
        }
    },

    watch: {
        chosenAttribute( newdata, olddata ) {
            if( Object.keys(newdata).length == this.selectedVariationProduct.attributes.length ) {
                this.attributeDisabled = false;
            }
        }
    },

    methods: {
        triggerFocus() {
            this.showResults = true;
            this.$emit( 'onfocus' );
        },
        outside() {
            this.showResults = false;
            this.$emit( 'onblur' );
        },
        changeMode( mode ) {
            this.mode = mode;
        },
        searchProduct() {
            if ( this.serachInput ) {
                wepos.api.get( wepos.rest.root + wepos.rest.wcversion + '/products?search=' + this.serachInput )
                .done(response => {
                    this.products = response;
                });
            }
        },

        selectVariation( product ) {
            this.selectedVariationProduct = product;
            this.showVariationModal = true;
        },

        addVariationProduct() {
            var chosenVariationProduct = this.findMatchingVariations( this.selectedVariationProduct.variations, this.chosenAttribute );
            var variationProduct       = chosenVariationProduct[0];
            variationProduct.parent_id = this.selectedVariationProduct.id;
            variationProduct.type      = this.selectedVariationProduct.type;
            variationProduct.name      = this.selectedVariationProduct.name;

            this.$emit( 'onProductAdded', variationProduct );
            this.showVariationModal = false;
            this.chosenAttribute = {};
        },

        addToCartAction( product ) {
            this.$emit( 'onProductAdded', product );
        }


    }
};


</script>

<style lang="less">

.variation-attribute-wrapper {
    padding: 10px 20px 0px;

    .attribute {
        margin-bottom: 15px;
        p {
            padding: 0;
            margin: 0;
            text-align: left;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .options {
            text-align: left;
            label {
                display: inline-block;
                input[type=radio] {
                    -webkit-appearance: none;
                    display: none;

                    &:checked {
                        + .box {
                            background: #1ABC9C;
                            color: #fff;
                            border: 1px solid #1ABC9C;
                        }
                    }
                }
                .box {
                    padding: 6px 10px;
                    border: 1px solid #E0E5EA;
                    margin-right: 5px;
                    margin-bottom: 5px;
                    cursor: pointer;
                    font-size: 13px;
                    border-radius: 3px;
                }
            }
        }
    }
}

.add-variation-btn {
    border: none;
    padding: 10px 10px;
    background: #3B80F4;
    color: #fff;
    border-radius: 3px;
    width: 150px;
    font-size: 14px;
    cursor: pointer;

    &:focus, &:active {
        outline: none;
    }

    &:disabled {
        background: #76A2ED;
    }
}

</style>