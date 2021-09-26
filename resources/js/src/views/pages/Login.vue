<template>
    <div
        class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
        id="page-login"
    >
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter justify-center items-center">
                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img
                                src="@assets/images/pages/login.png"
                                alt="login"
                                class="mx-auto"
                            />
                        </div>

                        <div
                            class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg"
                        >
                            <div class="p-8 login-tabs-container">
                                <div class="vx-card__title mb-4">
                                    <h4 class="mb-4 text-center">
                                        Iniciar sesión
                                    </h4>
                                    <p class="text-center">
                                        Bienvenido a RTMSoftware
                                    </p>
                                </div>

                                <div>
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Empresa"
                                        rules="required"
                                    >
                                        <v-select
                                            :options="empresas"
                                            :reduce="text => text.value"
                                            name="empresa"
                                            label="text"
                                            placeholder="Seleccione su empresa"
                                            class="w-full mt-6"
                                            v-model="empresa"
                                        />
                                        <span
                                            class="text-danger text-sm"
                                            v-show="errors.length > 0"
                                            >Por favor, la empresa es
                                            requerida</span
                                        >
                                    </validation-provider>
                                    <vs-input
                                        v-validate="'required'"
                                        data-vv-validate-on="blur"
                                        name="username"
                                        icon-no-border
                                        icon="icon icon-user"
                                        icon-pack="feather"
                                        placeholder="Usuario"
                                        v-model="username"
                                        class="w-full mt-6"
                                    />
                                    <span class="text-danger text-sm">{{
                                        errors.first("username")
                                    }}</span>
                                    <vs-input
                                        data-vv-validate-on="blur"
                                        v-validate="'required'"
                                        type="password"
                                        name="password"
                                        icon-no-border
                                        icon="icon icon-lock"
                                        icon-pack="feather"
                                        placeholder="Contraseña"
                                        v-model="password"
                                        class="w-full mt-6"
                                    />
                                    <span class="text-danger text-sm">{{
                                        errors.first("password")
                                    }}</span>
                                    <div
                                        class="flex flex-wrap justify-between my-5"
                                    >
                                        <router-link to="/pages/forgot-password"
                                            >¿Olvidaste tu
                                            contraseña?</router-link
                                        >
                                    </div>
                                    <div
                                        class="flex flex-wrap justify-between mb-3"
                                    >
                                        <vs-button
                                            :disabled="!validateForm"
                                            @click="singIn"
                                            class="btn-block"
                                            >Acceder</vs-button
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import {
  Validator,
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import axios from 'axios'
import store from '../../store/store'
import jwt_decode from 'jwt-decode'

const dict = {
  custom: {
    empresa: {
      required: 'Por favor, la empresa es requerida'
    },
    username: {
      required: 'Por favor, el usuario es requerido'
    },
    password: {
      required: 'Por favor, la contraseña es requerida'
    }
  }
}
Validator.localize('en', dict)
export default {
  components: {
    'v-select': vSelect,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      empresa: null,
      empresas: [],
      checkbox_remember_me: false,
      baseUrl:document.querySelector('meta[name="baseUrl"]').content
    }
  },
  mounted () {
    this.getCompanies()
    console.log(store.state.isAuthenticated)
  },
  computed: {
    validateForm () {
      return (
        !this.errors.any() &&
                this.username !== '' &&
                this.password !== '' &&
                this.empresa != null
      )
    }
  },
  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    singIn () {
      try {

        const url = `${this.baseUrl  }/api/login`
        axios
          .post(
            url,
            {
              username: this.username,
              password: this.password
            },
            {
              headers: {
                company_id: this.empresa
              }
            }
          )
          .then(res => {
            const { user } = jwt_decode(res.data.data)
            const userDefaults = {
              uid: user[0].id, // From Auth
              displayName: user[0].nombre, // From Auth
              about:
                                'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
              photoURL: require('@assets/images/portrait/small/avatar-s-11.jpg'), // From Auth
              status: 'online',
              userRole: 'admin'
            }

            this.$store.dispatch('setUserInfo', userDefaults)
            this.$store.dispatch('setToken', res.data.data)
            localStorage.setItem('rtmCompany', this.empresa)
            this.$router.push({ path: '/' })
          })
          .catch(error => {
            this.$vs.notify({
              title: 'Error',
              text: error.response.data.error,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          })
      } catch (err) {
        console.log(err)
      }
    },
    getCompanies () {
      const url = `${this.baseUrl  }/api/empresa`

      try {
        axios.get(url).then(res => {
          this.empresas = res.data.data
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.btn-block {
    width: 100%;
}
</style>
