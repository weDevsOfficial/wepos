<template>
    <div class="login login__container">
        <div class="login__content">
            <div class="flex justify--sb align--center">
                <div class="login__image">
                    <img
                        :src="wepos.assets_url + '/images/logo.svg'"
                        alt=""
                        width="200px"
                    />
                </div>
                <h1 class="login__title">POS</h1>
            </div>
            <alert v-if="error">Username and Password are incorrect</alert>
            <form @submit.prevent="login()" class="form form__container">
                <div class="form__item">
                    <input type="text" v-model="username" name="username" />
                </div>
                <div class="form__item">
                    <input v-model="password" type="password" name="password" />
                </div>
                <div class="form__item">
                    <button
                        :disabled="
                            submiting || username === '' || password === ''
                        "
                        class="login__submit"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Alert from "./Alert.vue";
export default {
    name: "Login",
    components: { Alert },
    data() {
        return {
            username: "",
            password: "",
            userInfo: {},
            error: false,
            submiting: false,
        };
    },
    methods: {
        login() {
            this.submiting = true;
            const loginParams = {
                username: this.username,
                password: this.password,
            };
            this.error = false;
            wepos.api
                .post(
                    wepos.rest.root + wepos.rest.posversion + "/users/login",
                    loginParams
                )
                .done((response) => {
                    if (response?.user) {
                        location.href = wepos.home_url;
                    }
                    this.submiting = false;
                })
                .fail((error) => {
                    this.error = true;
                    this.submiting = false;
                });
        },
    },
};
</script>

<style lang="less">
.login {
    &__container {
        background: url("~@/assets/images/bg.png") no-repeat;
        background-color: #fff;
        position: relative;
        height: 100vh;
    }
    &__content {
        padding: 50px;
        position: absolute;
        top: calc(50% - 120px);
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        width: 480px;
        margin: 0 auto;
    }
    &__title {
        text-align: center;
        font-size: 65px;
        font-weight: 700;
        color: var(--primary-color);
        flex-grow: 1;
        padding-left: 20px;
        text-align: left;
    }
    input[type="text"] {
        color: var(--primary-color);
    }
    &__submit {
        width: 100%;
        text-transform: uppercase;
        color: #fff;
        background-color: var(--primary-color);
    }
}
</style>
