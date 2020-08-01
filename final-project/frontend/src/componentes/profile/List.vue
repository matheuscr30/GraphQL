<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="getProfiles">
                    Get Profiles
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="errors" class="mb-4">
                    <Error :errors="errors" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="profiles"
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.tag }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Error from '../util/Error'
import gql from "graphql-tag";

export default {
    components: { Error },
    data() {
        return {
            errors: null,
            profiles: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Tag', value: 'tag' },
            ],
        }
    },
    methods: {
        getProfiles() {
            this.$api.query({
                query: gql`{
                    profiles { id name tag }
                }`,
                fetchPolicy: 'network-only'
            }).then(res => {
                this.profiles = res.data.profiles;
                this.errors = null;
            }).catch(e => {
                this.profiles = [];
                this.errors = e;
            });
        }
    }
}
</script>

<style>

</style>
