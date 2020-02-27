<template>
  <q-page class="flex flex-center row text-h5">
    <!-- <div class='text-h3'>
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
    </div> -->
    <div class='col-3'>
      日程調整
    </div>
    <div class='col-3'>
      <q-select filled label="name" v-model="model" :options="userlist"/>
    </div>
    <div class='col-4 q-pa-md q-gutter-sm'>
      <q-btn color="secondary" @click="toChousei" label="調整する" :disable='!model'/>
    </div>
  </q-page>

</template>

<script>
import _ from 'lodash';

export default {
  name: 'PageIndex',
  data() {
    return {
      userlist: Array,
      model: null,
    };
  },

  async mounted() {
    const response = await this.initForm();
    this.userlist = _.map(response, 'name');
  },

  methods: {
    async initForm() {
      const response = await window.fetch(process.env.VUE_APP_BASE_URL, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'csrf', // csrf header
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
    toChousei() {
      this.$router.push(`user?name=${this.model}`);
    },
  },
};
</script>
