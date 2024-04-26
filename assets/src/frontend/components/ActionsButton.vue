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
                            <a href="#" @click="editAction"
                                ><span
                                    class="flaticon-empty-cart quick-menu-icon"
                                ></span
                                >Edit</a
                            >
                        </li>
                        <li>
                            <a href="#" @click="deleteAction"
                                ><span
                                    class="flaticon-information quick-menu-icon"
                                ></span
                                >Delete</a
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
    name: "ActionsButton",
    props: ["actionId"],
    data() {
        return { show: false };
    },
    methods: {
        editAction() {
            this.togglePopover();
            this.$emit("onEditAction", this.actionId);
        },
        deleteAction() {
            this.togglePopover();
            this.$emit("onDeleteAction", this.actionId);
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
