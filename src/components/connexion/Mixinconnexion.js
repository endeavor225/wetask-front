
//import { Querybuilder } from '../../core/client_to_back'
export default {
    methods: {
        async create() {
            try {
                
                this.$query.setUrl('auth.v2/connexion')
                this.$query.setMethod("post")
                this.$query.setParams(this.form)
                let res = await this.$query.start()

                //this.$router.push("/")
               if (res.data){
                  
                    this.$query.setToken(res.data.token.token.token)
                    this.$query.setUsersRole(res.data.user.role.titre)
                    this.$query.setUsers(res.data.user)
                    this.$router.push("/accueil")
                    this.$notify('Connexion reussi', 'positive')

                    console.log(res.data.user);
                } else {
                    this.$notify('Connexion echouée','negative')
                }
                //console.log(res.data);
            } catch (error) {
                console.log(error)
                this.$notify('Connexion echouée','negative')
            }
        },

        
    }
}