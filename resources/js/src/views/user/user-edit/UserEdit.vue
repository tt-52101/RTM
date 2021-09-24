<template>
    <div id="user-edit">
        <vx-card v-if="user_data" class="mb-base">
            <div slot="no-body" class="tabs-container px-6 pt-6">
                <!-- Content Row -->
                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                            <feather-icon
                                svgClasses="w-6 h-6"
                                icon="UserIcon"
                                class="mr-2"
                            />
                            <span class="font-medium text-lg leading-none"
                                >Información</span
                            >
                        </div>
                        <vs-divider />
                    </div>
                    <div class="vx-col md:w-1/2 w-full">
                        <vs-input
                            class="w-full mt-4"
                            label="Username"
                            v-model="user_data.username"
                            v-validate="'required|alpha_num'"
                            name="username"
                        />
                        <span
                            class="text-danger text-sm"
                            v-show="errors.has('username')"
                            >{{ errors.first("username") }}</span
                        >

                        <vs-input
                            class="w-full mt-4"
                            label="Name"
                            v-model="user_data.name"
                            v-validate="'required|alpha_spaces'"
                            name="name"
                        />
                        <span
                            class="text-danger text-sm"
                            v-show="errors.has('name')"
                            >{{ errors.first("name") }}</span
                        >
                    </div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full">
                    <div class="flex items-end px-3">
                        <feather-icon
                            svgClasses="w-6 h-6"
                            icon="LockIcon"
                            class="mr-2"
                        />
                        <span class="font-medium text-lg leading-none"
                            >Accesos</span
                        >
                    </div>
                    <vs-divider />
                </div>
            </div>

            <treeselect
                :multiple="true"
                :options="accessList"
                v-show="accessSelected.length > 0"
                flat="true"
                sort-value-by="INDEX"
                placeholder="Select your favourite(s)..."
                v-model="accessSelected"
            />
            <vs-alert active="true" v-show="accessSelected.length == 0">
                El usuario: <strong>{{ user_data.username }}</strong> aún no
                tiene accesos asociados.
            </vs-alert>
            <!-- Save & Reset Button -->
            <div class="vx-row">
                <div class="vx-col w-full">
                    <div class="mt-8 flex flex-wrap items-center justify-end">
                        <vs-button
                            class="ml-auto mt-2"
                            @click="save_changes"
                            :disabled="!validateForm"
                            >Actualizar</vs-button
                        >
                        <vs-button
                            class="ml-4 mt-2"
                            type="border"
                            color="warning"
                            @click="reset_data"
                            >Reiniciar</vs-button
                        >
                    </div>
                </div>
            </div>
        </vx-card>
    </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
    components: { Treeselect },
    data() {
        return {
            user_data: null,
            user_not_found: false,
            accessSelected: [],
            accessList: []
        };
    },
    computed: {
        validateForm() {
            return !this.errors.any();
        }
    },
    watch: {
        activeTab() {
            this.fetch_user_data(this.$route.params.userId);
        }
    },
    methods: {
        fetch_user_data(userId) {
            this.$vs.loading();
            this.$store
                .dispatch("userManagement/fetchUser", userId)
                .then(res => {
                    this.$vs.loading.close();
                    this.user_data = res.data.userDetail[0];
                    this.accessSelected = res.data.accessByUser;
                    this.accessList = res.data.access;
                })
                .catch(err => {
                    /* if (err.response.status === 404) {
            this.user_not_found = true
            return
          }*/
                    console.error(err);
                });
        },
        save_changes() {
            /* eslint-disable */
            if (!this.validateForm) return;

            // Here will go your API call for updating data
            // You can get data in "this.data_local"

            /* eslint-enable */
        },
        reset_data() {
            this.data_local = JSON.parse(JSON.stringify(this.data));
        },
        update_avatar() {
            // You can update avatar Here
            // For reference you can check dataList example
            // We haven't integrated it here, because data isn't saved in DB
        }
    },
    created() {
        // Register Module UserManagement Module
        this.fetch_user_data(this.$route.params.userId);
    }
};
</script>
