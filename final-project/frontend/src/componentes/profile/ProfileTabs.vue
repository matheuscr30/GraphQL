<template>
    <v-container fluid>
        <v-tabs color="grey lighten-3"
                slider-color="blue">
            <v-tab ripple>
                List
            </v-tab>

            <v-tab ripple>
                Consult
            </v-tab>

            <v-tab ripple>
                New
            </v-tab>

            <v-tab ripple>
                Update
            </v-tab>

            <v-tab ripple>
                Delete
            </v-tab>

            <v-tab-item>
                <List />
            </v-tab-item>

            <v-tab-item>
                <Consult />
            </v-tab-item>

            <v-tab-item>
                <New />
            </v-tab-item>

            <v-tab-item>
                <Update />
            </v-tab-item>

            <v-tab-item>
                <Delete />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import List from './List'
import Consult from './Consult'
import New from './New'
import Update from './Update'
import Delete from './Delete'

export default {
    components: { List, Consult, New, Update, Delete }
}
</script>

<style>

</style>
