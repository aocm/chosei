<template>
  <q-page>
    <EvenlyArticle>
      <template v-slot:head>日程調整</template>
      <template v-slot:body>
        <div class='col-6'>
          <q-select filled label="name" v-model="model" :options="userlist" @input="toChousei"/>
        </div>
      </template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:head>候補日</template>
      <template v-slot:body>
        <span v-for="(data, index) in candidateDate" :key="index">
          {{data}}
        </span>
      </template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:head>回答者</template>
      <template v-slot:body>
        <span v-for="(data, index) in respondent" :key="index">
          {{data}}
        </span>
      </template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:head>集計結果</template>
      <template v-slot:body>
        <div>
          <q-btn color="primary" @click="toResult" label="確認する"/>
        </div>
      </template>
    </EvenlyArticle>
  </q-page>

</template>

<script>
import _ from 'lodash';
import EvenlyArticle from '../layouts/evenly-article';
import { chouseiApi } from '../module/Api';

export default {
  name: 'PageIndex',
  components: {
    EvenlyArticle,
  },
  data() {
    return {
      userlist: Array,
      candidateDate: Array,
      respondent: Array,
      model: null,
    };
  },

  mounted() {
    this.initForm();
  },

  methods: {
    async initForm() {
      const userlist = await chouseiApi.getUser();
      const candidateData = {
        candidate_date: [1, 2, 3],
        respondent: ['a', 'b', 'c'],
      };
      this.userlist = _.map(userlist, 'name');
      this.candidateDate = candidateData.candidate_date;
      this.respondent = candidateData.respondent;
    },
    toChousei() {
      this.$router.push(`user?name=${this.model}`);
    },
    toResult() {
      console.log('集計結果画面');
    },
  },
};
</script>
