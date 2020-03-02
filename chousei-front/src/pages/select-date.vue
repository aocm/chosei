<template>
  <q-page padding>
    <EvenlyArticle>
      <template v-slot:head>{{getQuery.name}}さん日程調整</template>
      <template v-slot:body>
        <date-select-form
          :datalist='candidateDates'
          @parentMethod="updateMessage"
        />
      </template>
    </EvenlyArticle>
    <div class="row justify-center q-pa-md">
      <q-btn color="primary" @click="toChousei" label="調整する"/>
    </div>
  </q-page>

</template>

<script>
import DateSelectForm from '../components/date-select-form';
import EvenlyArticle from '../layouts/evenly-article';
import { chouseiApi } from '../module/Api';

export default {
  name: 'PageSelectDate',
  components: {
    DateSelectForm,
    EvenlyArticle,
  },
  data() {
    return {
      candidateDates: Object,
      candidateMonth: new Date(),
      getQuery: { id: Number, name: String },
    };
  },
  mounted() {
    this.getQuery = this.$route.query;
    this.initForm();
    console.log('候補日取得API');
  },
  methods: {
    async initForm() {
      const setQuery = { month: this.getQuaryDate(), user: this.getQuery.id };
      this.candidateDates = await chouseiApi.getCandidateDate(setQuery);
    },
    /**
     * クエリパラメータ用日付成型メソッド
     */
    getQuaryDate() {
      const yaer = this.candidateMonth.getFullYear();
      const month = this.candidateMonth.getMonth() + 1;
      const formatMonth = month < 10 ? `0${month}` : `${month}`;
      return yaer + formatMonth;
    },
    updateMessage(choise) {
      this.choise = choise;
    },
    toChousei() {
      console.log('項目入力API');
      this.$router.push('/');
    },
  },
};
</script>
