<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">New Profile</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Error :errors="errors" />
                        </div>
                        <v-text-field label="Name"
                            v-model="profile.name" />
                        <v-text-field label="Tag"
                            v-model="profile.tag" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="newProfile">
                            New Profile
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
            profile: {},
            data: null,
            errors: null
        }
    },
    methods: {
        newProfile() {
            this.$api.mutate({
                mutation: gql`mutation (
                    $name: String
                    $tag: String
                ) {
                    newProfile (
                        data: {
                            name: $name
                            tag: $tag
                        }
                    ) {
                        id name tag
                    }
                }`,
                variables: {
                    name: this.profile.name,
                    tag: this.profile.tag,
                },
            }).then(res => {
                this.data = res.data.newProfile;
                this.profile = {};
                this.errors = null;
            }).catch(e => {
                this.errors = e
            })
        }
    }
}
</script>

<style>

</style>
