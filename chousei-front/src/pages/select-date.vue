<template>
  <q-page padding>
    <date-select-form
      :datalist='datalist2'
      @parentMethod="updateMessage"
     />
  </q-page>

</template>

<script>
import DateSelectForm from '../components/date-select-form';

export default {
  name: 'PageSelectDate',
  components: {
    DateSelectForm,
  },
  data() {
    return {
      datalist2: [
        { date: '2020年2月28日', choise: 'circle' },
        { date: '2020年2月28日', choise: 'triangle' },
        { date: '2020年2月28日', choise: 'circle' },
        { date: '2020年2月28日', choise: 'cross' },
      ],
    };
  },
  methods: {
    updateMessage(choise) {
      this.choise = choise;
    },
  },
};
</script>
