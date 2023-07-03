export default {
    methods: {

        async findUer() {
            try {
                //console.log(this.$query.user);
                this.$query.setUrl('users/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    populate:["role",],
                    query: {
                        id: this.$query.user.id
                    },
                })
                let res = await this.$query.start()

                this.user = res.data[0]

            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des sous tâches',
                    'negative'
                )
            }
        },


        async ChangePassword() {
            try {
                this.$query.setUrl('users/changepwd')
                this.$query.setMethod("post")
                this.$query.setParams({})
                this.$query.setData(Object.assign(this.form,{
                    id: this.$query.user.id,
                }))

                let res = await this.$query.start()

                if (!res.data) {
                    this.$notify('Modification du mot de passe echouée', 'negative')
                } else {
                    this.$root.$emit('close-modal-edit')
                this.$notify('Modification du mot de passe effectuée', 'positive')
                }
                
            } catch (error) {
                console.log(error)
                this.$notify('Modification echouée', 'negative')
            }
        },

    }
}