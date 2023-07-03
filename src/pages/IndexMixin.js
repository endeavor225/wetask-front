export default {
    methods: {

        //Recuperation de tache
        async findTask() {
            try {
                this.$query.setUrl('taches/find')
                this.$query.setMethod("get")

                this.$query.setParams({
                    populate: ["statut"],
                })
                let res = await this.$query.start()
                this.tasks = res.data 

                let a_faire = []
                for (const iterator of res.data ) {
                    if (iterator.statut && iterator.statut.titre === "À faire") {
                        a_faire.push(iterator)
                    }
                } 
                
                this.tacheAfaire = a_faire.length

                let en_cours = []
                for (const iterator of res.data ) {
                    if (iterator.statut && iterator.statut.titre === "En cours") {
                        en_cours.push(iterator)
                    }
                } 
                
                this.tacheEnCours = en_cours.length

                //console.log(this.tacheEnCours );

                //console.log(res.data);

                return a_faire.length, en_cours.length

            } catch (error) {
                this.$notify(
                    'Une erreur est suvenue lors de la récupération des tâches',
                    'negative'
                )
            }
        },

        async statistique(){
            try {
                this.$query.setUrl('config.system.v2.statistique')
                this.$query.setMethod("get")
                this.$query.setParams({})
                let res = await this.$query.start()

                this.tabchart = res.data
                //console.log(this.tabchart);

                for (const item of this.tabchart) {
                    for (const subitem of item.donnee) {
                        for (const setitem of item.setting) {
                            //console.log(subitem);
                            //console.log(item.type);
                            //console.log(setitem);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}