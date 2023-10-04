<template>
    <div class="app flex-row align-items-center">
      <div class="container mt-3">
        <b-row class="row justify-content-center">
          <b-col md="6" sm="0" class="left mt-5 display-mobile">
            <img
              style="height: 75%"
              src="../assets/batman.png"
              alt="admin@bootstrapmaster.com"
            />
          </b-col>
          <b-col md="6" class="right">
            <b-card-group>
              <b-card-body>
                <b-form @submit.prevent="actionLogin">
                  <h1 class="h2 text-center">Login Admin Employee</h1>
                  <b-form-group label="Email Address" class="mt-5 mb-5">
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="email"
                      autocomplete="email"
                      v-model="Form.email"
                      required
                    />
                  </b-form-group>
                  <b-form-group label="Password" class="mt-5 mb-0">
                    <b-form-input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="Form.password"
                      required
                    />
                  </b-form-group>
                  <b-row>
                    <b-col>
                      <!-- <router-link :to="{ path: '/forgotPassword' }">
                        <b-button variant="link" class="px-0 mb-5"
                          >Forgot password?
                        </b-button>
                      </router-link> -->
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-button
                        :disabled="isDisable"
                        lg="4"
                        type="submit"
                        variant="primary"
                        class="px-4 w-100"
                      >
                        Login
                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                        <b-spinner
                          v-if="!isDisable"
                          small
                          type="grow"
                          label="Spinning"
                        ></b-spinner>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card-group>
          </b-col>
        </b-row>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'LoginPage',
    data() {
      return {
        Form: {},
        isActive: false,
      };
    },
    computed: {
      ...mapState({
        success: (state) => state.login.isSuccess,
        message: (state) => state.login.successMessage,
        //isLoading: (state) => state.login.isLoading,
        token: (state) => state.login.token,
        isError: (state) => state.login.isError,
      }),
      isDisable() {
        return !(
          this.Form.email &&
          this.Form.email.length > 4 &&
          this.Form.password &&
          this.Form.password.length > 4
        );
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler(to) {
          document.title =
            to.meta.title ||
            'Login';
        },
      },
    },
    methods: {
      ...mapActions('login', ['loginAction']),
      // ...mapActions('auth', ['setLogin', 'setAuth']),
  
     async actionLogin() {
        let email =  this.Form.email.trim();
        let payload = {
          email,
          password: this.Form.password,
        };
        const login = await this.loginAction(payload)
        const success = login.data.status;
        const message =  login.data.message;
        const alert = {
          success,
          message
        }
        this.showAlert(alert) 
        if (success) {
          this.$router.push({
            path: `/dashboard`,
          });
        }
      },
      showAlert(data) {
        this.$swal({
          toast: 'true',
          position: 'top-end',
          icon: data.success ? 'success' : 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
    },
    mounted() {},
  };
  </script>
  
  <style lang="css" scoped>
  .center {
    width: 500px;
    height: 400px;
    top: 20%;
    position: absolute;
    top: 20%;
    margin-left: auto;
    margin-right: auto;
  }
  .form-control {
    border: 0;
    border-bottom: 1px solid #000;
    outline: none;
  }
  input.form-control:focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
  }
  @media (max-width: 768px) {
    .background-mobile {
      background-color: #fff;
    }
    .display-mobile {
      display: none;
    }
  }
  </style>
  