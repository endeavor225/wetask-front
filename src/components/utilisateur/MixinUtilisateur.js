export default {
    methods: {
   /** ------------------------Mixin pour creer un utilisateur----------------------------*/
        async createUser() {
            try {
    
                this.$query.setUrl('auth.v2/create-user')
                this.$query.setMethod("post")
                this.$query.setData(this.form)
                this.$query.setParams({})
        
                let user = await this.$query.start()

                console.log(user.data.id);

                this.$query.setUrl('users/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                query: {
                        id: user && user.data && user.data.id ? user.data.id : null
                    },
                    //populate:['role']
                })
                let user_complet = await this.$query.start()

                console.log(user_complet);
                console.log(user_complet.data);


                //this.$root.$emit('add-users-item-created', user_complet.data[0])
                this.$root.$emit("refresh-users")
                this.$root.$emit("close-modal-add")
                this.$notify('Enregistrement reussi', 'positive')
            
            } catch (error) {
                console.log(error)
                //this.$root.$emit("close-modal-add")
                this.$notify('Création echouée', 'negative')
            }
        },

        /** ------------------------Mixin pour recupérer tous les roles ----------------------------*/
        async Role(){
            try {
                this.$query.setUrl('roles/find')
                this.$query.setMethod("get")
                let res = await this.$query.start()
                
                if (res.data) {
                     this.listeRole=res.data
                }
             
            } catch (error) {
                console.log(error)
            }

        },
        /** ------------------------Mixin pour creer recuperer tous les utilisateurs----------------------------*/
        async FindUsers(){
            try {
                this.$query.setUrl('users/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    populate:['role']
                })
                let res = await this.$query.start()
                
                if (res.data) {
                    for (const item of res.data) {
        
                        if (item.role.titre !== 'anonymous') {
                            this.utilisateur.push(item)
                        }
                    }
                    this.utilisateur = res.data
                }
                //this.$root.$emit("refresh-users")
            } catch (error) {
                console.log(error)
            }

        },
        /** ------------------------Mixin pour supprimer un utilisateur--------------------------*/
        async DeleteUser(){
            try {
                this.$query.setUrl('users/remove')
                this.$query.setMethod("delete")
            
                this.$query.setData({
                    id:this.suppUser._id
                })
                let res = await this.$query.start()
                 
                //console.log(res.data)

                //Supprimer dans la liste
                this.$root.$emit('users-item-did-removed', this.suppUser)

                this.$root.$emit("close-modal-suppression");
                this.$notify("L'utilisateur a bien été supprimé", 'positive')
               
            } catch (error) {
                console.log(error)
                this.$root.$emit("close-modal-suppression");
                this.$notify('suppression échouée', 'negative')
                
            }
        },

          /** ------------------------Mixin pour modifier un utilisateur--------------------------*/

          async EditUser(){
              try {
                this.form.role=this.form.role.id
            
                this.$query.setUrl('users/update')
                this.$query.setMethod("put")          
                this.$query.setData(this.form)
                let res = await this.$query.start()
                console.log(res.data)
                this.$root.$emit("close-modal-edit");
                this.$notify('lutilisateur a bien été modifier', 'positive')
                  
              } 
              catch (error) {
                console.log(error)
                this.$root.$emit("close-modal-edit");
                this.$notify('modification échouée', 'negative')
                  
              }


          },

            /** ------------------------Mixin pour la recherche  par nom des utilisateurs--------------------------*/

            async SearchUser(){
                    try {
                     this.$query.setUrl('users/recherche')  
                     this.$query.setMethod("get")  
                     this.$query.setParams({
                         nom: this.search
                     })
                    let res = await this.$query.start()
                    this.listUser= res.data  
                     
                    console.log(res.data)
                    
                    } catch (error) {
                        console.log(error)
                    }
                },

         /** ------------------------Mixin pour la recherche avancée des utilisateur-s-------------------------*/


         async SearchUserAvance(){
             try {
                 
             } catch (error) {
                 
             }
            
        },


        
    }
}