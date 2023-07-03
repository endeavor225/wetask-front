import { Querybuilder } from '../core/client_to_back'

export default async ({Vue}) => {
  Vue.prototype.$query = new Querybuilder("https://dashboard.weflyagri.com/") //("http://localhost:4041/")
  //Vue.prototype.$query = new Querybuilder("http://localhost:3030/")

}



