import axios from 'axios'

export class Querybuilder {
    
    constructor(base_url=""){
        this.query_params = {}
        this.base_url = base_url
        this.token = null

        this.role = null
        this.user = null
    }

    resetData(){
        if (this.query_params.headers && this.query_params.headers.token) {
            this.token = this.query_params.headers.token
        }
    }

    resetData(){
        if (this.query_params.headers && this.query_params.headers.token) {
            this.token = this.query_params.headers.token
        }else{
            this.token = null
        }
    }

    setToken(token=null){
        if (token) {
            //console.log(token);
            this.token = token
        } else {
            throw new Error("Entre un token valide")
        }
    }


    setUsersRole(userRole=null){
        if (userRole) {
            //console.log(userRole);
            this.role = userRole
        } else {
            throw new Error("Pas de role")
        }
    }

    setUsers(user=null){
        if (user) {
            //console.log(userRole);
            this.user = user
        } else {
            throw new Error("Pas de role")
        }
    }

    setUrl(url=null){
        if (url) {
            this.query_params.url =  `${this.base_url}${url}`
        } else {
            throw new Error("Entre une url valide")
        }
    }

    setMethod(method="get"){
        if (method) {
            this.query_params.method = method
        } else {
            throw new Error("Entre une methode valide")
        }
    }

    setParams(params=null){
        if (params && typeof(params) === 'object') {
            this.query_params.params = params
        } else {
            throw new Error("Entre des paramètres valide")
        }
    }

    setData(data=null){
        if (data && typeof(data) === 'object') {
            this.query_params.data = data
        } else {
            throw new Error("Entre des données valide")
        }
    }

    setHeaders(headers){
        if (headers && typeof(headers) === "object" ) {
            this.query_params.headers = Object.assign(headers, this.query_params.headers ? this.query_params.headers : {})
        } else {
            throw new Error("Entre un headers objet  valide")
        }
    }


    async start(){
        try {
            if (this.token) {
                this.query_params.headers = {
                    Authorization: `Wefly ${this.token}`
                }    
            } 
            
            //console.log(this.query_params);
            
            let res = await axios(this.query_params)
            
            this.resetData()
            return res
        } catch (error) {
            throw new Error(error)
        }
    }  
}