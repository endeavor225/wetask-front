<template>
  <div>
    <div v-if="typed==='pie'">
      <ve-line :data="donnee" :settings="setting"></ve-line>
    </div>
    <div v-if="typed==='histogram'">
      <ve-histogram :data="donnee" :settings="setting"></ve-histogram>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['typed','donnee','setting'],
  data () {
    return {}
  }
}
</script>
