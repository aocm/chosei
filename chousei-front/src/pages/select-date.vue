<template>
  <q-page padding>
    <!-- content -->
    <date-select-form />
  </q-page>

</template>

<script>
import DateSelectForm from '../components/date-select-form';

export default {
  // name: 'PageName',
  components: {
    DateSelectForm,
  },
  data() {
    return {
      model: null,
    };
  },
};
</script>
