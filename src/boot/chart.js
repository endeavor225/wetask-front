// import something here
import VCharts from 'v-charts'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({Vue} /* { app, router, Vue ... } */) => {
  // something to do
  Vue.use(VCharts)
}