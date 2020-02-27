<template>
  <div>
    <div v-for="(data, index) in datalist" :key='index' class="q-pa-md items-center row">
      <div class='col-5 text-h5'>
        {{data.date}}
      </div>
      <div class='col-4'>
        <q-btn-toggle
          v-model="data.choise"
          toggle-color="primary"
          :options="[
            {slot: 'circle', value: 'circle'},
            {slot: 'triangle', value: 'triangle'},
            {slot: 'cross', value: 'cross'}
          ]"
        >
          <template v-slot:circle>
            <div class="row items-center no-wrap">
              <q-icon name="panorama_fish_eye" />
            </div>
          </template>

          <template v-slot:triangle>
            <div class="row items-center no-wrap" style='transform:rotate(180deg);'>
              <q-icon name="details" />
            </div>
          </template>

          <template v-slot:cross>
            <div class="row items-center no-wrap">
              <q-icon name="close" />
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'date-select-form',
  props: {
    datalist: Array,
  },

  watch: {
    choise() {
      this.$emit('parentMethod', this.choise);
    },
  },
};
</script>
