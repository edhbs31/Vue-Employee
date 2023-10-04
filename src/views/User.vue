<template>
  <div class="row UserQuotes">
    <b-col lg="12">
    <div class="col-md-12 mt-2">
      <div class="card">
        <h2 class="title text-center pt-1 mt-1">DASHBOARD DATA ADMIN</h2>
      
        
      
        <div class="card-body">
            
          <label for="" class="col-sm-2"> Search User <br /> </label>
          <b-col md="6">
            <b-form-input placeholder="Type Here to Search" type="search" v-model="query_search" @input="onSearch"
              v-on:keyup.enter="onSearch(query_search)"></b-form-input>
            <small v-if="typing"> <em> typing ... </em> </small>
          </b-col>
          <div class="row justify-content-end">
            <div class="col-sm-auto mt-7 mb-1">
        <label class="col-sm-auto">Count </label>
          <strong class="col-sm-auto">{{ formatNumber(this.totalRows) }}</strong>
          <router-link class="btn btn-sm btn-dark " :to="{ path: '/diagram'}">
            <em style="width: 30px; height: 75%" class="fa fa-plus">Diagram</em>
          </router-link>
          <button
          class="btn btn-sm btn-primary "
          type="button"
          @click="this.actionGetData()"
          >
          Refresh
          </button>
        </div>
      </div>
      <br/>

      <div class="table-responsesive">
      <b-table 
        sticky-header="600px"
        :items="items"
        :fields="fields"
        :busy="isLoading"
        :isLoading="isLoading"
        show-empty
        responsive="xl"
        hover
        sort-icon-left
      >
        <template #cell(No)="row">
          {{ (currentPage - 1) * perPage + (row.index + 1)}}
        </template>
        <template #cell(action_delete)="row">
          <button
          class="btn btn-sm btn-danger "
          type="button"
          @click="deleteAction(row.item.id, row.item.username)"
          >
          Delete
        </button>
        </template>
        <template #cell(action_edit)="row">
          <button
          class="btn btn-sm btn-warning "
          type="button"
          @click="updateAction(row.item.id)"
          >
          Update
        </button>
        </template>
        </b-table>
      </div>
    </div>
    <b-row class="justify-content-start ml-1">
      <b-col lg="3">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          aria-controls="my-table"
        />
      </b-col>
    </b-row>
    </div>
  </div>
</b-col>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "UserDisplay",
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      query_search: null,
      filter: {},
      isLoadingSearch: false,
      items_search: [],
      debounce: null,
      BaseUserSearchOptions: [], 
      isCounterUserSearch: false,
      fields: [
        { key:'No', label: 'No'},
        { key:'username', label: 'Username'},
        { key:'email', label: 'Email'},
        { key:'age', label: 'Age'},
        { key:'action_delete', label: 'Delete'},
        { key:'action_edit', label: 'Edit'},
      ]
    };
  },
  created() {
    this.actionGetData();
  },
  watch: {
    currentPage: function() {
      this.actionGetData();
    },
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'User / Employee';
      }
    },
    errorMessage: function() {
      if (!this.errorMessage) return;
        return this.baseAlert({
          icon:'error',
          title: 'Error',
          text: this.errorMessage,
        });
      }
    },
  computed: {
    ...mapState({
      isLoading: (state) => state.user.isLoading,
      isError: (state) => state.user.isError,
      totalRows: (state) => state.user.totalRows,
      items: (state) => state.user.items,
      errorMessage: (state) => state.user.errorMessage,
    }),
  },
  mounted() {
    this.actionGetData();
  },
  methods: {
    ...mapActions('user', ['fetchUser','deleteUser']),
    actionGetData() {
      this.items_search = [];
      let payload = {
        page: this.currentPage??1,
        limit: this.perPage??10,
      };
      this.fetchUser(payload);
    }, onSearch(q) {
      this.query_search = q;
      const payload = {
        query: q
      }
      clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
          this.fetchUser(payload).then((response) => {
          this.items_search = response.data.data.rows;
          this.isLoadingSearch = false;
          this.typing = false;
        }).catch(() => {
          this.isLoadingSearch = false;
        });
      }, 600);

    },
    async updateAction (id) {
      this.$router.push({
              path: `/edit_user/${id}`,
            });
    },
    async deleteAction(id,username) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: `Delete Category ${username}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let payload={
              id,
            }
            const response = await this.deleteUser(payload);
            const {result, message } = response;
            console.log("this iresuklt",result)
            if(result==true) {
              this.$swal.fire(
              'Deleted!',
              message,
              'success'
              )
            } else {
              this.$swal.fire(
              'Failed!',
              message,
              'error'
              )
            }
            this.actionGetData();
          }
        });
    },
    messageAlert(icon, title, timer=3000) {
      this.$swal({
        toast: "true",
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
      })
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
    }, baseAlert(data) {
      this.$swal({
        icon: data.icon,
        title: data.title,
        text: data.text,
      })
    },
    formatNumber(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      return '0';
    },
  },
}
</script>
<style scoped>

</style>
