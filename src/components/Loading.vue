<style>
    .vert-parent {
        padding: 5% 0;
    }

    .align-vertical {
        padding: 5% 0;
    }

    .cssload-loader {
        width: 375px;
        height: 75px;
        line-height: 75px;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        font-family: helvetica, arial, sans-serif;
        text-transform: uppercase;
        font-weight: 900;
        font-size: 27px;
        color: rgba(120, 22, 52, 0.66);
        letter-spacing: 0.2em;
    }

    .cssload-loader::before, .cssload-loader::after {
        content: "";
        display: block;
        width: 23px;
        height: 23px;
        background: rgb(120, 22, 52);
        position: absolute;
        animation: cssload-load 1.75s infinite alternate ease-in-out;
        -o-animation: cssload-load 1.75s infinite alternate ease-in-out;
        -ms-animation: cssload-load 1.75s infinite alternate ease-in-out;
        -webkit-animation: cssload-load 1.75s infinite alternate ease-in-out;
        -moz-animation: cssload-load 1.75s infinite alternate ease-in-out;
    }

    .cssload-loader::before {
        top: 0;
    }

    .cssload-loader::after {
        bottom: 0;
    }

    @keyframes cssload-load {
        0% {
            left: 0;
            height: 45px;
            width: 23px;
        }
        50% {
            height: 12px;
            width: 60px;
        }
        100% {
            left: 353px;
            height: 45px;
            width: 23px;
        }
    }

    @-o-keyframes cssload-load {
        0% {
            left: 0;
            height: 45px;
            width: 23px;
        }
        50% {
            height: 12px;
            width: 60px;
        }
        100% {
            left: 353px;
            height: 45px;
            width: 23px;
        }
    }

    @-ms-keyframes cssload-load {
        0% {
            left: 0;
            height: 45px;
            width: 23px;
        }
        50% {
            height: 12px;
            width: 60px;
        }
        100% {
            left: 353px;
            height: 45px;
            width: 23px;
        }
    }

    @-webkit-keyframes cssload-load {
        0% {
            left: 0;
            height: 45px;
            width: 23px;
        }
        50% {
            height: 12px;
            width: 60px;
        }
        100% {
            left: 353px;
            height: 45px;
            width: 23px;
        }
    }

    @-moz-keyframes cssload-load {
        0% {
            left: 0;
            height: 45px;
            width: 23px;
        }
        50% {
            height: 12px;
            width: 60px;
        }
        100% {
            left: 353px;
            height: 45px;
            width: 23px;
        }
    }
</style>
<template>
    <div class="vert-parent text-center">
        <div class="align-vertical">
            <img src="../assets/Avon_Old_Farms_Seal.png" width="320px">
            <div class="cssload-loader" style="margin-top: 10px;">Loading...</div>
        </div>
    </div>
</template>
<script>
    import * as types from '../vuex/mutation-types'
    export default {
        methods: {
            toDashboard () {
                let self = this
                window.setTimeout(() => {
                    self.$router.replace('/dashboard')
                }, 1500 * Math.random())
            }
        },
        created () {
            let self = this
            if (this.$store.state.authentication.authenticated) {
                this.toDashboard()
            } else {
                this.$store.subscribe((mutation, state) => {
                    console.log(mutation.type)
                    switch (mutation.type) {
                        case types.AUTHENTICATION_VERIFICATION:
                            self.toDashboard()
                            break
                    }
                })
            }
        }
    }
</script>
