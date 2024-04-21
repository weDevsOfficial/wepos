<template>
    <div class="alert alert--error"><slot></slot></div>
</template>

<script setup lang="ts"></script>

<style type="less" scoped>
.alert {
    padding: 4px 10px;
    font-size: 14px;

    &--error {
        color: var(--red-color);
    }
}
</style>
