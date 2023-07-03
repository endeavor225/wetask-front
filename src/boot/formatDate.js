import { date } from 'quasar'

export default async ({Vue}) => {

 const dateFormater = (params) => {
   return date.formatDate(params, 'dddd DD MMMM YYYY')
 }
 Vue.prototype.$dateFormater = dateFormater


  const dateNaiss = (params) => {
    return date.formatDate(params, 'DD MMMM YYYY')
}
Vue.prototype.$dateNaiss = dateNaiss

 const dateFormat = (params) => {
  return date.formatDate(params, 'ddd DD MMM')
}
Vue.prototype.$dateFormat = dateFormat
}
