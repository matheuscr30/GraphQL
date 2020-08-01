<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filter Profile</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Error :errors="errors" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filter.id" />
                    <v-text-field label="Name"
                        v-model="filter.name" />

                    <h1 class="mt-4 headline">Update Profile</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Name"
                        v-model="profile.name" />
                    <v-text-field label="Tag"
                        v-model="profile.tag" />

                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="updateProfile">
                        Update Profile
                    </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Result</h1>
                    <v-divider />
                    <template v-if="data">
                        <v-text-field label="ID" readonly
                            v-model="data.id" />
                        <v-text-field label="Name" readonly
                            v-model="data.name" />
                        <v-text-field label="Tag" readonly
                            v-model="data.tag" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Error from '../util/Error'
import gql from 'graphql-tag';

export default {
    components: { Error },
    data() {
        return {
            filter: {},
            profile: {},
            data: null,
            errors: null
        }
    },
    methods: {
        updateProfile() {
            this.$api.mutate({
                mutation: gql`mutation (
                    $idFilter: Int
                    $nameFilter: String
                    $name: String
                    $tag: String
                ) {
                    updateProfile (
                        filter: {
                            id: $idFilter
                            name: $nameFilter
                        }
                        data: {
                            name: $name
                            tag: $tag
                        }
                    ) {
                        id name tag
                    }
                }`,
                variables: {
                    idFilter: this.filter.id,
                    nameFilter: this.filter.name,
                    name: this.profile.name,
                    tag: this.profile.tag,
                },
            }).then(res => {
                this.data = res.data.updateProfile
                this.filter = {}
                this.profile = {}
                this.errors = null
            }).catch(e => {
                this.errors = e
            })
        }
    }
}
</script>

<style>

</style>
