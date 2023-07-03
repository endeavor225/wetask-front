// import something here
import Vue from "vue";


class Token {
  constructor(){
    this.auth= {}
  }

  setCurrentToken (token) {
    this.auth = token
    Vue.set(this.auth, "auth", token)
  }

}
export default async ( {Vue} ) => {
  // something to do
  Vue.prototype.$token = new Token()
}
