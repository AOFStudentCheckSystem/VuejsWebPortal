<template>
    <div id="eventBrowseContainer">
        <nav class="navbar" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand">ZUI</a>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
    export default {
        computed: {
            currentSelection () {
                return this.$store.state.events.active
            }
        },
        created () {
            if (this.currentSelection === false) {
                this.$router.go(-1)
            }
        }
    }
</script>
<style scoped>
    a{
        cursor: pointer;
    }
</style>
