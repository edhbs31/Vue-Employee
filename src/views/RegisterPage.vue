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
                <b-form @submit.prevent="actionRegister">
                  <h1 class="h2 text-center">Register Admin Employee</h1>
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
                  <b-form-group label="Name " class="mt-5 mb-5">
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="name"
                      autocomplete="name"
                      v-model="Form.name"
                      required
                    />
                  </b-form-group>
                  <b-form-group label="Age" class="mt-5 mb-5">
                    <b-form-input
                      type="number"
                      class="form-control"
                      placeholder="age"
                      autocomplete="age"
                      v-model="Form.age"
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
                      <b-button
                        :disabled="isDisable"
                        lg="4"
                        type="submit"
                        variant="primary"
                        class="px-4 w-100"
                      >
                        Register
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
    name: 'RegisterPage',
    data() {
      return {
        Form: {},
        isActive: false,
      };
    },
    computed: {
      ...mapState({
        success: (state) => state.Register.isSuccess,
        message: (state) => state.Register.successMessage,
        //isLoading: (state) => state.Register.isLoading,
        token: (state) => state.Register.token,
        isError: (state) => state.Register.isError,
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
            'Register';
        },
      },
    },
    methods: {
      ...mapActions('Register', ['RegisterAction']),
      async actionRegister() {
        let email =  this.Form.email.trim();
        let payload = {
          email,
          password: this.Form.password,
          age: this.Form.age,
          username: this.Form.name,
        };
        const register = await this.RegisterAction(payload)
        const success = register.data.status;
        const message = register.data.message;
        const alert = {
          success, 
          message,
        }
        this.showAlert(alert);
        if (success) {
          this.$router.push({
              path: `/login`,
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
  