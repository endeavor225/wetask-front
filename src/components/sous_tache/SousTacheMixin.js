//import { Querybuilder } from '../../core/client_to_back'
export default {
    methods: {

        //Création de tache sous tache
        async create() {
            try {

                //console.log(this.form);
                this.$query.setUrl('sous.taches/create')
                this.$query.setMethod("post")
                this.$query.setParams({})
                this.$query.setHeaders({
                    Authorization: `Wefly ${this.$query.setToken}`
                })
                this.$query.setData(this.form)

                let res = await this.$query.start()


                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query:{
                        id: res.data.tache
                    },
                    populate: ["statut", "priorite", "user", "soustache", "categorie"]
                })
                let new_valeurTache = await this.$query.start()

                this.$root.$emit('add-taches-item-refresh', new_valeurTache.data[0])
          
                this.$root.$emit("close-modal-addSousTache")
                this.$notify('Sous tache créée', 'positive')
            } catch (error) {
                console.log(error)
                this.$notify('Création de sous tache echouée', 'negative')
            }
        },


        //Recuperation de sous tache
        async findSousTask() {
            try {
                this.$query.setUrl('sous.taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query:{
                        tache: this.detailTache.id
                    },
                    populate:["statut"]
                })
                let res = await this.$query.start()
              
                this.sousTache = res.data
              
            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des sous tâches',
                    'negative'
                )
            }
        },



        //Modification de sous tache
        async Update() {
            try {
                this.donneeModification.tache = this.form.tache
                this.donneeModification.titre = this.form.titre
                this.donneeModification.description = this.form.description
                this.donneeModification.debut = this.form.debut
                this.donneeModification.fin = this.form.fin
                this.donneeModification.id = this.form.id
                this.donneeModification._id = this.form._id
                this.donneeModification.createdAt = this.form.createdAt
                this.donneeModification.current = this.form.current
                this.donneeModification.removed = this.form.removed
                //console.log(this.form);

                this.$query.setUrl('sous.taches/update')
                this.$query.setMethod("put")
                this.$query.setParams({})
                this.$query.setData(this.donneeModification)

                let res = await this.$query.start()

                this.$root.$emit('close-modal-edit')
                this.$notify('Modification effectuée', 'positive')
            } catch (error) {
                console.log(error)
                this.$notify('Modification echouée', 'negative')
            }
        },


        //Suppression de sous tache
        async Supprimer() {
            try {
                this.$query.setUrl('sous.taches/remove')
                this.$query.setMethod("delete")
                this.$query.setData({
                    id: this.supprimerSousTache._id
                })

                let res = await this.$query.start()

                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query:{
                        id: res.data.tache
                    },
                    populate: ["statut", "priorite", "user", "soustache"]
                })
                let new_valeurTache = await this.$query.start()

                this.$root.$emit('add-taches-item-refresh', new_valeurTache.data[0])
        
                this.$root.$emit('close-modal-suppression')
                this.$notify('Sous tâche supprimée', 'positive')
            } catch (error) {
                console.log(error)
                this.$notify('Suppression echouée', 'negative')
            }
        },


        //Change statut sous de tache
        async ChangeStatut() {
            try {
      
                this.$query.setUrl('statut.sous.tache/update')
                this.$query.setMethod("put")
                this.$query.setData({
                    statut: this.statut,
                    id: this.statutSousTache.statut_sous_tache.id
                })

                let res = await this.$query.start()

                this.$query.setUrl('sous.taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query:{
                        id: res.data.soustache
                    },
                })
                let tache = await this.$query.start()

                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")
                this.$query.setParams({
                    query:{
                        id: tache.data[0].tache
                    },
                    populate: ["statut", "priorite", "user", "soustache", "categorie"]
                })
                let new_valeurTache = await this.$query.start()

                this.$root.$emit('add-taches-item-refresh', new_valeurTache.data[0])
                this.$root.$emit('close-modal-statut')
                this.$notify('Le statut été changé', 'positive')
            } catch (error) {
                console.log(error)
                this.$notify('Echec', 'negative')
            }
        },




        //Recuperation de statut
        async findStatut() {
            try {
                this.$query.setUrl('statuts/find')
                this.$query.setMethod("get")
                this.$query.setParams({})
                let res = await this.$query.start()
              
                this.statutFind = res.data

                //console.log(this.statutFind);
              
            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des sous tâches',
                    'negative'
                )
            }
        },

    }
}