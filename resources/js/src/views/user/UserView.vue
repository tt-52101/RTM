<template>
    <div id="page-user-view">
        <div id="user-data" v-if="user_data">
            <vx-card class="mb-base">
                <div class="vx-row mb-6" >
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
                    <!-- Information - Col 1 -->
                    <div class="vx-col flex-1" id="account-info-col-1">
                        <table>
                            <tr>
                                <td class="font-semibold">Username</td>
                                <td>{{ user_data.username }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Name</td>
                                <td>{{ user_data.name }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1" id="account-info-col-2">
                        <table>
                            <tr>
                                <td class="font-semibold">Status</td>
                                <td>{{ user_data.status }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">Role</td>
                                <td>{{ user_data.role }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 2 -->
                    <div class="vx-col w-full flex" id="account-manage-buttons">
                        <vs-button
                            icon-pack="feather"
                            icon="icon-edit"
                            class="mr-4"
                            :to="{
                                name: 'user-edit',
                                params: { userId: $route.params.userId }
                            }"
                            >Edit</vs-button
                        >
                        <vs-button
                            type="border"
                            color="danger"
                            icon-pack="feather"
                            icon="icon-trash"
                            @click="confirmDeleteRecord"
                            >Delete</vs-button
                        >
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
                    disabled="true"
                    flat="true"
                    sort-value-by="INDEX"
                    placeholder="Select your favourite(s)..."
                    v-model="accessSelected"
                />
                <vs-alert active="true" v-show="accessSelected.length == 0">
                    El usuario: <strong>{{ user_data.username }}</strong> aún no
                    tiene accesos asociados.
                </vs-alert>
            </vx-card>
        </div>
    </div>
</template>

<script>
import moduleUserManagement from '../../store/user-management/moduleUserManagement.js'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Treeselect },
  data () {
    return {
      accessSelected: [],
      accessList: [],
      user_data: null,
      user_not_found: false
    }
  },
  computed: {
    userAddress () {
      let str = ''
      for (const field in this.user_data.location) {
        str += `${field} `
      }
      return str
    }
  },
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.user_data.username}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$router.push({ name: 'app-user-list' })
      this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.user_data.id)
      //   .then(()   => { this.$router.push({name:'app-user-list'}); this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  },
  created () {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule('userManagement', moduleUserManagement)
      moduleUserManagement.isRegistered = true
    }

    const userId = this.$route.params.userId
    this.$vs.loading()
    this.$store
      .dispatch('userManagement/fetchUser', userId)
      .then(res => {
        this.$vs.loading.close()
        this.user_data = res.data.userDetail[0]
        this.accessSelected = res.data.accessByUser
        this.accessList = res.data.access
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style lang="scss">
#avatar-col {
    width: 10rem;
}

#page-user-view {
    table {
        td {
            vertical-align: top;
            min-width: 140px;
            padding-bottom: 0.8rem;
            word-break: break-all;
        }

        &:not(.permissions-table) {
            td {
                @media screen and (max-width: 370px) {
                    display: block;
                }
            }
        }
    }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
    only screen and (min-width: 636px) and (max-width: 991px) {
    #account-info-col-1 {
        width: calc(100% - 12rem) !important;
    }

    // #account-manage-buttons {
    //   width: 12rem !important;
    //   flex-direction: column;

    //   > button {
    //     margin-right: 0 !important;
    //     margin-bottom: 1rem;
    //   }
    // }
}
</style>
