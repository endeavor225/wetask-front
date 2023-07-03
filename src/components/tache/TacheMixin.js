//import { Querybuilder } from '../../core/client_to_back'
export default {
    methods: {

        //Création de tache
        async create() {
            try {
                console.log(this.form);
                let priorite_tache = {}
                priorite_tache.priorite = this.form.priorite.id
                this.$delete(this.form, 'priorite')

                let categorie_tache = {}
                categorie_tache.categorie = this.form.categorie.id
                this.$delete(this.form, 'categorie')


                this.$query.setUrl('taches/create')
                this.$query.setMethod("post")
                this.$query.setData(this.form)
                this.$query.setParams({})
                let tache = await this.$query.start()

                if (tache && tache.data) {
                    priorite_tache.tache = tache.data.id

                    //user_tache.tache = tache.data.id

                    this.$query.setUrl('priorite.tache/create')
                    this.$query.setMethod("post")
                    this.$query.setData(priorite_tache)
                    this.$query.setParams({})
                    let tache_priorite = await this.$query.start()

                    categorie_tache.tache = tache.data.id

                    this.$query.setUrl('categorie.tache/create')
                    this.$query.setMethod("post")
                    this.$query.setData(categorie_tache)
                    this.$query.setParams({})
                    let tache_categorie = await this.$query.start()
                }

                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query: {
                        id: tache && tache.data && tache.data.id ? tache.data.id : null
                    },
                    populate: ["statut", "priorite", "user", "soustache", "categorie"]
                })
                let tache_complet = await this.$query.start()

                console.log(tache_complet.data);
                if (tache_complet.data.length > 0) {
                    this.$root.$emit('add-taches-item-created', tache_complet.data[0])
                    this.$root.$emit("close-modal-addTache")
                    this.$notify('Tache créer', 'positive')
                } else {
                    throw Error("valeur non créé")
                }

                //this.$root.$emit("refresh-tache")
                //this.$root.$emit("close-modal-addTache")
                //this.$notify('Tache créée', 'positive')
            } catch (error) {
                console.log(error)
                this.$notify('Création echouée', 'negative')
            }
        },
        

        //Affectation de tache aux developpeurs
        async affectation() {
            try {
                
                let user_tache = {}
                user_tache.user = this.developpeur.id
                user_tache.tache = this.idTache.id
                //console.log(user_tache);

                this.$query.setUrl('user.tache/create')
                this.$query.setMethod("post")
                this.$query.setData(user_tache)
                this.$query.setParams({})
                let tache_user = await this.$query.start()
                
                console.log(tache_user);

                // Actualiser apres affection 
                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query:{
                        id: tache_user && tache_user.data && tache_user.data.tache ? tache_user.data.tache : null
                    },
                    populate: ["statut", "priorite", "user", "soustache", "categorie"]
                })
                let new_user = await this.$query.start()

                this.$root.$emit('add-taches-item', new_user.data[0])

                //this.$root.$emit("refresh-tache")
                this.$root.$emit("close-modal-affectation")
                this.$notify('Tache Attribuée', 'positive')
                
            } catch (error) {
                console.log(error);
            }
        },

        async modifAffectation(){
            try {
                //console.log("modif affect");
                //Modifier user
                let user_tache = {}
                this.$query.setUrl('user.tache/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query: {
                        tache: this.idTache.id
                    }
                })

                let old_user_tache = await this.$query.start()
                user_tache.id = old_user_tache && old_user_tache.data ? old_user_tache.data[0].id : null
                user_tache.user = this.developpeur.id
                user_tache.tache = this.idTache.id
                //console.log(user_tache);

                this.$query.setUrl('user.tache/update')
                this.$query.setMethod("put")
                this.$query.setData(user_tache)
                this.$query.setParams({})
                let tache_user = await this.$query.start()

                //console.log(tache_user);

                // Actualiser apres affection 
                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query:{
                        id: tache_user && tache_user.data && tache_user.data.tache ? tache_user.data.tache : null
                    },
                    populate: ["statut", "priorite", "user", "soustache", "categorie"]
                })

                let modif_user = await this.$query.start()

                if (modif_user.data.length > 0) {
                    this.$root.$emit('add-taches-item', modif_user.data[0])
                    this.$root.$emit("close-modal-affectation-modif")
                    this.$notify('Tache Attribuée', 'positive')
                } else {
                    throw Error("valeur non créé")
                }
            
                
                
                
            } catch (error) {
                console.log(error);
            }
        },


        //Recuperation de tache
        async findTask(replace) {
            try {
                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")

                this.$query.setParams({
                    limit: this.limit,
                    offset: this.offset,
                    populate: ["statut", "priorite", "user", "soustache", "categorie"]
                })
                let res = await this.$query.start()

                if (replace) {

                    this.tasks = res.data.tache
                    //console.log(res.data);

                } else {
                    for (const fetched_item of res.data) {
                        if (this.tasks.length > 0) {

                            let in_table = false
                            for (const task_item of this.tasks) {
                                if (task_item._id === fetched_item._id) {
                                    in_table = true
                                }
                            }

                            if (!in_table) {
                                this.tasks.push(fetched_item)
                            }

                        } else {
                            this.tasks.push(fetched_item)
                        }
                    }

                    console.log("tasks : ", this.tasks);

                }

                return res.data

            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des tâches',
                    'negative'
                )
            }
        },


        //Suppression de tache
        async Supprimer() {

            //console.log(this.supprimerTache);
            try {
                this.$query.setUrl('taches/remove')
                this.$query.setMethod("delete")
                this.$query.setData({
                    id: this.supprimerTache._id
                })

                let res = await this.$query.start()

                this.$root.$emit('taches-item-did-removed', this.supprimerTache)

                //this.$root.$emit('taches-removed', this.supprimerTache)
                this.$root.$emit('close-modal-suppression')
                this.$notify('Tache supprimée', 'positive')
            } catch (error) {
                console.log(error)
                this.$notify('Suppression echouée', 'negative')
            }

        },


        //Modification de tache
        async Update() {
            try {
                let priorite_tache = {}
                priorite_tache.priorite = this.form.priorite.id
                this.$delete(this.form, 'priorite')
                //console.log(priorite_tache);

                let categorie_tache = {}
                categorie_tache.categorie = this.form.categorie.id
                this.$delete(this.form, 'categorie')
                //console.log(categorie_tache);

                this.$query.setUrl('taches/update')
                this.$query.setMethod("put")
                this.$query.setParams({})
                this.$query.setData(this.form)

                //console.log(this.form);

                let tache = await this.$query.start()

                if (tache && tache.data) {

                    //Modifier priorite
                    this.$query.setUrl('priorite.tache/find')
                    this.$query.setMethod("get")
                    this.$query.setParams({
                        query: {
                            tache: tache.data.id
                        }
                    })

                    let old_priorite_tache = await this.$query.start()

                    priorite_tache.tache = tache.data.id
                    priorite_tache.id = old_priorite_tache && old_priorite_tache.data ? old_priorite_tache.data[0].id : null

                    this.$query.setUrl('priorite.tache/update')
                    this.$query.setMethod("put")
                    this.$query.setData(priorite_tache)
                    this.$query.setParams({})
                    let tache_priorite = await this.$query.start()

                    //Modifier categorie
                    this.$query.setUrl('categorie.tache/find')
                    this.$query.setMethod("get")
                    this.$query.setParams({
                        query: {
                            tache: tache.data.id
                        }
                    })

                    let old_categorie_tache = await this.$query.start()

                    categorie_tache.tache = tache.data.id
                    categorie_tache.id = old_categorie_tache && old_categorie_tache.data ? old_categorie_tache.data[0].id : null

                    this.$query.setUrl('categorie.tache/update')
                    this.$query.setMethod("put")
                    this.$query.setData(categorie_tache)
                    this.$query.setParams({})
                    let tache_categorie = await this.$query.start()
                }

                //
                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query: {
                        id: tache && tache.data && tache.data.id ? tache.data.id : null
                    },
                    populate: ["statut", "priorite", "user", "soustache", "categorie"]
                })
                let tache_complet = await this.$query.start()

                if (tache_complet.data.length > 0) {
                    this.$root.$emit('add-taches-item-updated', tache_complet.data[0])
                    this.$root.$emit("close-modal-edit")
                    this.$notify('Modification effectuée', 'positive')
                } else {
                    throw Error("valeur non créé")
                }

                //this.$root.$emit("refresh-tache")
                //this.$root.$emit('close-modal-edit')
                //this.$notify('Modification effectuée', 'positive')
            } catch (error) {
                console.log(error)
                this.$notify('Modification echouée', 'negative')
            }
        },


        //Recherche de tache
        async Search() {
            try {
                this.$query.setUrl('taches/recherche')
                this.$query.setMethod("get")
                this.$query.setParams({

                    titre: this.search,

                })

                let res = await this.$query.start()

                this.tache = res.data

                //console.log(res.data);

            } catch (error) {
                console.log(error)

            }
        },


        //Recherche avancée de tache
        async RechercheAvance() {
            try {
                if (this.form.titre !== "") {
                    this.recherche.titre = this.form.titre
                }

                if (this.form.description !== "") {
                    this.recherche.description = this.form.description
                }

                this.$query.setUrl('taches/recherche')
                this.$query.setMethod("get")
                this.$query.setParams(

                    this.recherche,
                )

                let res = await this.$query.start()

                this.$root.$emit("search-advance", res.data)
                this.$root.$emit("close-modal-recherche")

            } catch (error) {
                console.log(error)

            }
        },


        //Recuperation de statut
        async findPriorite() {
            try {
                this.$query.setUrl('priorites/find')
                this.$query.setMethod("get")
                this.$query.setParams({})
                let res = await this.$query.start()

                this.priorites = res.data

            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des priorité',
                    'negative'
                )
            }
        },


        //Recuperation des users
        async findUsers() {
            try {
                this.$query.setUrl('users/find')
                this.$query.setMethod("get")

                this.$query.setParams({
                    populate: ["role", "user"]
                })

                let res = await this.$query.start()

                //Supprimer les utilisateurs anonymes
                for (const item of res.data) {

                    if (item.role.titre !== 'anonymous') {
                        this.users.push(item)
                    }
                }
                //this.users = res.data
                this.users_role = res.data

                //console.log(this.users)

            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des utilusateur',
                    'negative'
                )
            }
        },


        //Recuperation des categories
        async findCategorie() {
            try {
                this.$query.setUrl('categories/find')
                this.$query.setMethod("get")

                this.$query.setParams({})

                let res = await this.$query.start()
                console.log(res.data);

                this.stringOptions = res.data

            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des utilusateur',
                    'negative'
                )
            }
        },
        async createValue (val, done) {
            try {
                let verif = false
                if (val.length > 0) {
                    for (const item of this.stringOptions) {
                        if (item.titre === val) {
                            console.log("ici");
                            verif = true
                        }
                    }
                    if (!verif) {
                        this.$query.setUrl('categories/create')
                        this.$query.setMethod("post")
                        this.$query.setData({
                            titre: val
                        })
                        this.$query.setParams({})
                        let res = await this.$query.start()
                       

                      this.stringOptions.push(res.data)
                      done(res.data, 'toggle')
                    }
                    else {
                        this.$notify(
                            'La catégorie existe déja',
                            'negative'
                        )
                    }
                  }
            } catch (error) {
                console.log(error);
            }
          },
    }
}