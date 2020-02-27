<template>
  <div class="q-pa-md row">
    <div class='col-5 items-center'>
      2020年2月28日
    </div>
    <div class='col-4'>
      <q-btn-toggle
        v-model="model"
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
</template>

<script>
export default {
  name: 'date-select-form',
  data() {
    return {
      model: null,
    };
  },
};
</script>
