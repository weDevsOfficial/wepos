<template>
    <div id="vue-frontend-app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App',

    created() {

        // wepos.hooks.addAction( 'test_action', 'testAction', function() {
        //     console.log( 'Loaded action' );
        // } );
    }
};

</script>

<style>

</style>
