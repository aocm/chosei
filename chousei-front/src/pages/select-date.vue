<template>
  <q-page padding>
    <EvenlyArticle>
      <template v-slot:head>{{user}}さん日程調整</template>
      <template v-slot:body>
        <date-select-form
          :datalist='datalist'
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

export default {
  name: 'PageSelectDate',
  components: {
    DateSelectForm,
    EvenlyArticle,
  },
  data() {
    return {
      datalist: Array,
      user: String,
    };
  },
  mounted() {
    this.user = this.$route.query.name;
    console.log('候補日取得API');
    this.datalist = {
      candidate_date: [
        { date: '2月28日', choise: 0 },
        { date: '2月28日', choise: 2 },
        { date: '2月28日', choise: 1 },
        { date: '2月28日', choise: 2 },
      ],
    }.candidate_date;
  },
  methods: {
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
