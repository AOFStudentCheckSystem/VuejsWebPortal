<template>
    <div class="container">
        <div class="col-sm-4 col-md-3 col-lg-2 hidden-xs side-nav-container">
            <nav class="menu" data-toggle="menu">
                <ul class="nav nav-primary">
                    <li class="show nav-parent">
                        <a href="javascript:"><i class="fa fa-lock"></i>Admin Portal</a>
                        <ul class="nav">
                            <li><a href="javascript:">Today</a></li>
                        </ul>
                    </li>
                    <li class="nav-parent">
                        <a href="javascript:"><i class="fa fa-university"
                                                 style="margin-left: -2px; margin-right: 0.5em;"></i>Advisor Portal</a>
                        <ul class="nav">
                            <li><a href="javascript:">Today</a></li>
                        </ul>
                    </li>
                    <li class="nav-parent">
                        <a href="javascript:"><i class="fa fa-user"></i>Student Portal</a>
                        <ul class="nav">
                            <li><a href="javascript:">Today</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<style scoped>
    .side-nav-container {
        background-color: #f6f6f6;
        border-radius: 10px;
        min-height: 85vh;
        padding: 10px;
    }

    i {
        margin-right: 1em;
    }
</style>
