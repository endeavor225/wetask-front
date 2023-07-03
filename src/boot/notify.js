import {Notify} from 'quasar'

export default async ({Vue}) => {


  Vue.prototype.$notify= (message, type) =>  {
    Notify.create({
      message,
      type,
      position: 'top-right'
    } )
  }
}
