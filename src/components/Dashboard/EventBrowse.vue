<template>
    <div id="eventBrowseContainer">
        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a v-on:click="backToList()" class="navbar-brand"><i class="fa fa-chevron-left"></i> Back</a>
                </div>

            </div>
        </nav>
        <div class="row">
            <div class='row' style='margin-top: 0.5em; max-height: 60vh; overflow-y: scroll;'>
                <div class='list-group'>
                    <a class='list-group-item' v-for='student in students' :class="{active : isSelected(student)}"
                       v-on:click="selectStudent(student)">
                        <h4 class='list-group-item-heading'>{{student.fullName}}</h4>
                        <div class='pull-right'><p>{{formatEventStatus(event.eventStatus)}}</p></div>
                        <p class='list-group-item-text text-muted'>{{formatDate(event.eventTime)}}</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'EventBrowse',
        computed: {
            currentSelection () {
                return this.$store.state.events.active
            }
        },
        created () {
            if (this.currentSelection === false) {
                console.log(this.currentSelection)
                this.backToList()
            }
        },
        methods: {
            backToList () {
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
