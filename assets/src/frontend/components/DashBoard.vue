<template>
    <div class="default-layout flex">
        <div class="default-layout__left">
            <div class="logo">
                <img
                    src="https://secure.gravatar.com/avatar/4bb5db562c96dd5fb4043a9f217a6f8c?s=96&d=mm&r=g"
                />
            </div>
            <ul>
                <router-link tag="li" to="/" exact>
                    <a>
                        <span class="nav-icon flaticon-counter-1"></span>
                        <span class="menu-text">Home</span>
                    </a>
                </router-link>
                <router-link tag="li" to="/products">
                    <a>
                        <span
                            class="nav-icon flaticon-delivery-package-opened"
                        ></span>
                        <span class="menu-text">Products</span>
                    </a>
                </router-link>
                <router-link tag="li" to="/orders">
                    <a>
                        <span class="nav-icon flaticon-giftbox"></span>
                        <span class="menu-text">Orders</span>
                    </a>
                </router-link>

                <router-link tag="li" to="/customers">
                    <a>
                        <span class="nav-icon flaticon-user-1"></span>
                        <span class="menu-text">Customers</span>
                    </a>
                </router-link>
                <router-link tag="li" to="/reports">
                    <a>
                        <span class="nav-icon flaticon-report"></span>
                        <span class="menu-text">Reports</span>
                    </a>
                </router-link>
            </ul>
        </div>
        <div class="default-layout__right">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
};
</script>

<style lang="less" scoped>
.default-layout {
    &__left {
        z-index: 10;
        flex-shrink: 0;
        flex-grow: 0;
        padding: 8px;

        .logo {
            padding: 10px;
            img {
                width: 45px;
                border-radius: 50%;
            }

            text-align: center;
            margin-bottom: 30px;
        }
        height: 100vh;
        width: 80px;
        background-color: var(--primary-color);
        ul {
            margin: 0 -8px;
            padding: 0;
            list-style-type: none;
            li {
                text-align: center;
                padding: 10px;
                &:hover,
                &.router-link-active {
                    background-color: #2c70e3;
                }
                span {
                    &.nav-icon {
                        &::before {
                            font-size: 22px;
                        }
                        margin-right: 5px;
                    }
                    &.menu-text {
                        display: none;
                    }
                }
                a {
                    display: block;
                    height: 40px;
                    color: white;
                    text-decoration: none;
                    font-size: 16px;
                }
            }
        }
        &:hover {
            z-index: 12;
            width: 150px;
            .menu-text {
                display: inline-block;
            }
            ul li {
                text-align: left;
                a {
                    display: flex;
                    align-items: center;
                    span.nav-icon {
                        margin-right: 8px;
                    }
                    span.flaticon-report {
                        &::before {
                            display: block;
                        }
                    }
                }
            }
        }
    }
    &__right {
        position: fixed;
        margin-left: 80px;
        padding: 10px;
        z-index: 10;
        flex-grow: 1;
        height: calc(100vh);
        overflow-y: scroll;
        @media (max-width: 780px) {
            height: 100vh;
            overflow-y: scroll;
        }

        width: calc(100% - 80px);
    }
}
</style>
