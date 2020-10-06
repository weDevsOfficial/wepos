<template>
    <div class="wepos-custom-note-wrap" v-hotkey="hotkeys">
        <v-popover offset="5" popover-base-class="customer-note tooltip popover" placement="top" :open="viewNotePopover">
            <a href="#" @click.prevent="openNote">{{ __( 'Add Note', 'wepos' ) }}</a>
            <template slot="popover">
                <form @submit.prevent="addCustomerNote">
                    <textarea id="" cols="30" rows="5" ref="customernote" v-model="customerNote"></textarea>
                    <button type="submit" class="add-note-btn" :disabled="customerNote == ''">{{ __( 'Add Note', 'wepos' ) }}</button>
                </form>
            </template>
        </v-popover>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                viewNotePopover: false,
                customerNote: ''
            }
        },

        computed: {
            hotkeys() {
                return {
                    'f6': this.openNote,
                    'esc': this.closeNote
                }
            }
        },


        methods: {
            openNote(e) {
                e.preventDefault();
                this.viewNotePopover = true;
                setTimeout( () => {
                    jQuery( this.$refs.customernote ).focus();
                }, 500 );
            },
            closeNote() {
                this.viewNotePopover = false;
            },
            addCustomerNote() {
                this.$emit('addnote', this.customerNote );
                this.viewNotePopover = false;
                this.customerNote = '';
            }
        }
    };
</script>

<style lang="less">
    .wepos-custom-note-wrap {
        float:left;
        display:inline-block
    }

    .customer-note {
        .tooltip-inner {
            width: 500px;
            padding: 10px;
            box-sizing: border-box;
            form {
                text-align: right;
                textarea {
                    width: 100%;
                    font-size: 13px;
                    padding: 10px;
                    border: 1px solid #E9EDF0;
                    line-height: 10px;
                    border-radius: 3px;
                    box-shadow: 0 3px 15px 0 rgba(0,0,0,.02);
                    box-sizing: border-box;
                    height: 100px;
                    margin-bottom: 10px;

                    &:focus {
                        outline: none;
                    }
                }
                button.add-note-btn {
                    padding: 6px 25px;
                    font-size: 14px;
                    border-radius: 3px;
                    border: 1px solid #3b80f4;
                    color: #fff;
                    background: #3b80f4;
                    cursor: pointer;

                    &:disabled {
                        cursor: no-drop;
                        background: #76A2ED;
                        border-color: #76A2ED;
                    }
                }
            }
        }
    }
</style>