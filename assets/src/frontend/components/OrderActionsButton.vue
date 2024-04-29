<template>
    <div class="actions">
        <v-popover
            offset="5"
            popover-base-class="wepos-dropdown-menu tooltip popover "
            placement="left-start"
            :open="show"
        >
            <button class="wepos-button">
                <span
                    class="more-icon flaticon-more"
                    @click="togglePopover"
                ></span>
            </button>
            <template slot="popover">
                <div>
                    <ul>
                        <li>
                            <router-link :to="`/orders/${actionId}`"
                                ><span
                                    class="flaticon-empty-cart quick-menu-icon"
                                ></span
                                >{{ __("View Details", "wepos") }}</router-link
                            >
                        </li>
                        <li>
                            <a href="#" @click="refundAction"
                                ><span
                                    class="flaticon-information quick-menu-icon"
                                ></span
                                >{{ __("Refund", "wepos") }}</a
                            >
                        </li>
                    </ul>
                </div>
            </template>
        </v-popover>
    </div>
</template>

<script>
export default {
    name: "OrderActionsButton",
    props: ["actionId"],
    data() {
        return { show: false };
    },
    methods: {
        editAction() {
            this.show = false;

            this.$emit("onEditAction", this.actionId);
        },
        refundAction() {
            this.show = false;
            this.$emit("onRefundAction", this.actionId);
        },
        togglePopover() {
            this.show = !this.show;
        },
    },
};
</script>

<style lang="less" scoped>
.actions {
    span {
        &.more-icon {
            &::before {
                font-size: 14px;
                color: #bdc0c9;
            }
        }
    }
}
</style>
