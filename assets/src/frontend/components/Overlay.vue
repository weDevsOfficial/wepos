<template>
    <div class="overlay" v-if="show"></div>
</template>

<script>
    export default {
        name: 'Overlay',

        props: {
            show: {
                type: Boolean
            }
        }
    };
</script>
<style>
    .overlay {
        position: fixed;
        background: #000;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        opacity: 0.25;
        filter: alpha(opacity=20);
        background-color: #000;
        z-index: 99;

    }
</style>