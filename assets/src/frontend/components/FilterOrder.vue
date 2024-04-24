<template>
    <div class="order">
        <ul class="order__filter flex">
            <li>
                <a
                    :class="{ active: selectedValue === 'any' }"
                    @click="onFilter('any')"
                    >{{ __("All", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'pending' }"
                    @click="onFilter('pending')"
                    >{{ __("Pending", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'processing' }"
                    @click="onFilter('processing')"
                    >{{ __("Processing", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'on-hold' }"
                    @click="onFilter('on-hold')"
                    >{{ __("On hold", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'completed' }"
                    @click="onFilter('completed')"
                    >{{ __("Completed", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'cancelled' }"
                    @click="onFilter('cancelled')"
                    >{{ __("Cancelled", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'refunded' }"
                    @click="onFilter('refunded')"
                    >{{ __("Refunded", "wepos") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: selectedValue === 'failed' }"
                    @click="onFilter('failed')"
                    >{{ __("Failed", "wepos") }}</a
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "FilterOrder",
    data() {
        return { selectedValue: "any" };
    },
    methods: {
        onFilter(value) {
            this.$emit("onOrderFilterSelected", value);
            this.selectedValue = value;
        },
    },
};
</script>

<style lang="less">
.order {
    &__filter {
        list-style-type: none;
        margin: 10px 0 20px;
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
