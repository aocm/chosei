<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <div>
      <table>
      <tr>
        <th>ID</th>
        <th>name</th>
      </tr>
      <tr v-for="(result, index) in userlist" :key="index">
        <td>{{result.id}}</td>
        <td>{{result.name}}</td>
      </tr>
    </table>
    <router-link to="user">test</router-link>
  </div>
  </q-page>

</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      userlist: Array,
    };
  },

  async mounted() {
    this.userlist = await this.initForm();
  },

  methods: {
    async initForm() {
      console.log(process.env);
      const response = await window.fetch(process.env.VUE_APP_BASE_URL, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'csrf', // csrf header
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
  },
};
</script>
