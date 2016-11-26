<style scoped>
    .vert-parent {
        padding: 5% 0;
    }

    .login-parent {
        max-width: 320px;
    }

    .align-vertical {
        padding: 70% 0;
    }

    .footer {
        bottom: 0;
        width: 100%;
        /* Set the fixed height of the footer here */
        height: 40px;
        background-color: #f0f0f0;
    }

    .footer-text-right {
        margin-right: 20px;
    }

    .first {
        margin-top: 50px;
    }
</style>

<template>
    <div class="container vert-parent login-parent" v-if="notAuthenticated">
        <div class="align-vertical">
            <div class="panel panel-default">
                <div class="panel-heading" align="center">
                    <h2>Sign In</h2>
                    <h6 class="text-muted">Avon Old Farms School Event System Portal</h6>
                </div>
                <div class="panel-body">
                    <form v-on:submit.prevent="handleSubmit" v-bind:class="{ 'has-error': error }">
                        <input type="text" v-model="username" class="form-control"
                               placeholder="username" required>
                        <br>
                        <input type="password" v-model="password" class="form-control"
                               placeholder="password" required>
                        <br>
                        <button type="submit" class="btn btn-block btn-primary" :disabled="!isLoginAvailable">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                username: '',
                password: '',
                isLoginAvailable: true
            }
        },
        methods: {
            handleSubmit (event) {
                let self = this
                this.isLoginAvailable = false
                this.$store.dispatch('setError', {error: false})
                this.$store.dispatch('authenticate', {
                    username: this.username,
                    password: this.password,
                    callback (result) {
                        if (result) {
                            self.$router.replace('/')
                        } else {
                            self.isLoginAvailable = true
                        }
                    }
                })
//        this.username = ''
                this.password = ''
            }
        },
        computed: {
            notAuthenticated () {
                return !this.$store.state.authentication.authenticated
            },
            error () {
                return this.$store.state.authentication.error
            }
        }
    }
</script>
