<template>
    <div class="wepos-open-till-wrap" v-hotkey="hotkeys">
        <a href="#" @click.prevent="openTill">{{ __('Open Till', 'wepos') }}</a>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        hotkeys() {
            return {}
        }
    },
    methods: {
        openTill(e) {
            e.preventDefault();
        },
    }
};
</script>

<style lang="less">
.wepos-open-till-wrap {
    float: left;
    display: inline-block
}
</style>