<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script>
export default {
  name: "full-component",
  components: {

  },
  data() {
    return {
      nav: [],
      Component:null,
    };
  },
  mounted() {
  },
  computed: {
    
  
  },
  methods: {
  
  }
};
</script>
