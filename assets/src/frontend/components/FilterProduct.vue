<template>
    <div class="product">
        <ul class="product__filter flex">
            <li>
                <a
                    :class="{ active: selectedValue === '' }"
                    @click="onFilter('')"
                    >{{ __("All", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'on_sale=true' }"
                    @click="onFilter('on_sale=true')"
                    >{{ __("On sale", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'featured=true' }"
                    @click="onFilter('featured=true')"
                    >{{ __("Featured", "wepos") }}</a
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "FilterProduct",
    data() {
        return { selectedValue: "" };
    },
    methods: {
        onFilter(value) {
            this.$emit("onProductFilterSelected", value);
            this.selectedValue = value;
        },
    },
};
</script>

<style lang="less">
.product {
    &__filter {
        list-style-type: none;
        margin: 10px 0;
        padding: 0;
        gap: 5px;
        a {
            background: white;
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
            padding: 8px 20px;
            display: inline-block;
            min-width: 65px;
            text-align: center;
            border-radius: 4px;

            transition: all 0.25s ease-in;
            cursor: pointer;
            &:hover,
            &.active {
                background-color: var(--primary-color);
                color: white;
                border: 1px solid transparent;
            }
        }
    }
}
</style>
