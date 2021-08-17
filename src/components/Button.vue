<template>

  <button class="button"
          :style="`${buttonStyle}`"
  >
    <slot/>
  </button>

</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() buttonStyle?: string;

}
</script>

<style lang='scss' scoped>

.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wraaper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }

}
</style>