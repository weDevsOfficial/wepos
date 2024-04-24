<template>
    <default-layout>
        <div class="page page__wrapper">
            <h1 class="page__title">{{ __("Customers", "wepos") }}</h1>
            <ve-table :columns="columns" :table-data="tableData" />
        </div>
    </default-layout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
export default {
    name: "Customers",
    components: { DefaultLayout },
    data() {
        return {
            columns: [
                { field: "name", key: "a", title: "Name", align: "center" },
                { field: "date", key: "b", title: "Date", align: "left" },
                {
                    field: "hobby",
                    key: "c",
                    title: "Hobby",
                    align: "right",
                },
                { field: "address", key: "d", title: "Address" },
            ],
            tableData: [
                {
                    name: "John",
                    date: "1900-05-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Shanghai",
                },
                {
                    name: "Dickerson",
                    date: "1910-06-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Beijing",
                },
                {
                    name: "Larsen",
                    date: "2000-07-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Chongqing",
                },
                {
                    name: "Geneva",
                    date: "2010-08-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Xiamen",
                },
                {
                    name: "Jami",
                    date: "2020-09-20",
                    hobby: "coding and coding repeat",
                    address: "No.1 Century Avenue, Shenzhen",
                },
            ],
        };
    },
};
</script>

<style lang="less" scoped></style>
