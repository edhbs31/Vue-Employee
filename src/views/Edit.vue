<template>
  <b-row class='mt-4'>
   
      <b-col v-if='items'>
        <b-form @submit='onSubmit'>
          <router-link class="btn btn-sm btn-dark  "  size="sm"  :to="{ path: '/dashboard'}">
            <em class="fa fa-backward btn-sm btn-dark "></em> Back
          </router-link>
          <div class='card'>
            <div class='bg-primary p-3'>
              <h5 class='card-title mb-0 font-weight-bold'>Edit User ({{form.username}})</h5>
            </div>
            <div class='card-body'>
              <b-row>
								<b-col lg="6" class="mt-4">
									<b-card class="bg-info text-dark">(*) Kolom berlabel bintang wajib diisi.</b-card>
								</b-col>
							</b-row>
              <b-row>
                <b-col lg='4'>
                    <b-form-group label='Name *'>
                      <b-form-input id='name' v-model='form.username'  step='any'
                        required>
                      </b-form-input>
                    </b-form-group>
                    
                    <b-form-group label='Email *'>
                      <b-form-input id='email' v-model='form.email'  step='any'
                        required>
                      </b-form-input>
                    </b-form-group>

                    <b-form-group label='Age *'>
                      <b-form-input type ="number" id='username' v-model='form.age'  step='any'
                        required>
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              <b-row>
              
            </b-row>
            
            <b-row>
              <label></label>
              <div class="col-md-4">
                  <b-button variant='primary' type='submit'>Update</b-button>
              </div>
            </b-row>

            </div>
          </div>
        </b-form>
      </b-col>
    </b-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'EditUserPage',
  data() {
    return {
      debounce: null,
      id: null,
      form: {
        username:null,
        email:null,
        age:null,
      },
    };
  },
  computed: {
    ...mapState({
      items :(state) => state.user.items,
      success: (state) => state.user.success,
      successMessage: (state) => state.user.successMessage,
    }),
  },
  watch: {
    success: function () {
      const alert = {
        success:this.success,
        message : this.successMessage
      }
      this.showAlert(alert)
      return this.$router.push({
            path: `/dashboard`,
          });
    },
    items: function () {
      this.setEditUser();    
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.actionGetUser();
  },
  mounted() {
    this.id = this.$route.params.id;
    this.actionGetUser();
  },
  methods: {
  ...mapActions("user", ["getUserByID","updateUser"]),
    actionGetUser() {
      let id=this.id;
      let payload = {
        id,
      };
      this.getUserByID(payload);
    },
  onSubmit(event) {
		event.preventDefault();
		const data = this.form;
    this.updateUser(data);

  },showAlert(data) {
        this.$swal({
          toast: 'true',
          position: 'top-end',
          icon: data.success ? 'success' : 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
  ,nameWithISO({ name, iso }) {
      return `${iso} - ${name}`
  },setEditUser() {
      const data = this.items;
      this.form  = data
    }
  }
  
};

</script>
