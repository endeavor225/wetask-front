
export default {
    methods: {
        async create() {
            try {
                
                this.$query.setUrl('auth.v2/create')
                this.$query.setMethod("post")
                this.$query.setParams(this.form)
                let res = await this.$query.start()

                //this.$router.push("/")
               if (res.data){
                    this.$query.setToken(res.data.token.token.token)
                    this.$router.push("/")
                    this.$notify('Inscription reussi', 'positive')
                   // console.log(res.data);
                } else {
                    this.$notify('Inscription echouée','negative')
                }
                //console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        },

        
    }
}