<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form ref="form"
                        class="mb-3"
                        v-model="valid"
                        lazy-validation>
                    <v-text-field
                            label="Ad title"
                            name="title"
                            type="text"
                            required
                            :rules="[v => !!v || 'Title is required']"
                            v-model="title"
                    ></v-text-field>
                    <v-textarea
                            v-model="description"
                            name="description"
                            :rules="[v => !!v || 'Description is required']"
                    >
                        <template v-slot:label>
                            <div>
                                Label ad description
                            </div>
                        </template>
                    </v-textarea>
                </v-form>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn
                                class="warning"
                        >
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        <v-layout row>
                            <v-flex xs12>
                                <img src="" height="100">
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-switch
                                        color="primary:"
                                        v-model="promo"
                                        label="Ad to promo"
                                ></v-switch>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-spacer></v-spacer>
                               <v-btn
                                       class="success"
                                       @click="createAd"
                                       :disabled="!valid"
                               >Create Ad</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <pre>{{result}}</pre>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
                promo: false,
                valid: false,
                result: null,
            }
        },
        methods: {
            createAd() {
                if (this.$refs.form.validate()) {
                    //
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                    }
                    this.result = ad;
                }
            }
        }
    }
</script>

<style scoped>

</style>
