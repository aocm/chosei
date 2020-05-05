<template>
  <div class="content">
    <div class="q-pa-md">
      <div class="row justify-start text-h6">
        <div class='self-center'>
          <slot name="head"></slot>
        </div>
      </div>
    </div>
    <div>
      <div class="row justify-evenly text-subtitle1">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'evenly-article',
  data() {
    return {};
  },
};
</script>
