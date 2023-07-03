<template>
  <div>

    <q-card>
      <div v-show="loading"  class="flex flex-center  full-width"  style="height: 50vh">
      <div>
        <div class="text-center q-mb-lg" >
          <q-spinner-hourglass size="xl" color="primary" />
        </div>
        <p>
          Création en cours ...
        </p>
      </div>
    </div>
    </q-card>
    
    <q-card class="my-card" v-show="!loading">
      <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="color: #0e8f33;">Ajout sous tâche</div>
          <q-space />
          <q-btn icon="close" color="negative" flat round v-close-popup />
        </q-card-section>

        <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6">
            {{ recupIdTache.titre }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ recupIdTache.description }}
        </div>
        <div class="text-caption text-grey">
          {{ $dateFormat(new Date(recupIdTache.debut)) }} -
          {{ $dateFormat(new Date(recupIdTache.debut)) }} 
        </div>
        <div class="text-subtitle1">
          <!-- <q-badge v-if="detail.priorite"  outline :color="detail.priorite.color">{{detail.priorite.titre}}</q-badge> -->
        </div>
      </q-card-section>
      <q-card-section style="max-height: 60vh" class="scroll">
        <q-form
          ref="newTache"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >

          <q-input
            filled
            v-model="form.titre"
            type="text"
            label="Sous tâche"
            :rules="rules.titre"
          />

          <q-input
            filled
            v-model="form.description"
            type="textarea"
            label="Description"
            :rules="rules.description"
          />

          <q-input readonly filled :label="$dateFormater(new Date(form.debut))" placeholder="Date de debut" hint="Date de debut">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.debut" :options="Debut">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Confirmer" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input readonly filled :label="$dateFormater(new Date(form.fin))" placeholder="Date de fin" hint="Date de fin">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.fin" :options="Fin">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Confirmer"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div class="q-mt-lg q-mb-sm" style="text-align: center">
            <q-btn label="Ajouter" type="submit" outline color="primary" />
            <q-btn label="annuler" type="reset" outline color="negative" class="q-ml-sm"
            />
          </div>

          

        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import AddSousTacheMixin from "components/sous_tache/SousTacheMixin"
export default {

  mixins: [AddSousTacheMixin],

  props: {
    recupIdTache: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      form: {
        tache: this.recupIdTache.id,
        titre: "",
        description: "",
        debut: new Date(),
        fin: new Date(),
      },
      loading: false,

      rules: {
        titre: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) => val.length > 3 || "ce champ doit dois contenir au moins 4 caractères",
        ],
        description: [
          (val) => !!val || "Ce champ est obligatoire",
          (val) => val.length > 4 || "ce champ doit dois contenir au moins 5 caractères",
        ],
      },
    };
  },

  methods: {
    async onSubmit() {
      if (this.$refs.newTache.validate()){
        this.loading = true
         await this.create()
         this.loading = false
      }
     
    },
    onReset() {
      this.form.titre = "";
      this.form.description = "";
      this.form.debut = "";
      this.form.fin = "";
    },

     Debut(date) {
      let datenow = new Date();
      //console.log(datenow.getDate());

      // si date < 10 on verifie si je mois est inferieur a 10 ou pas
      if (datenow.getDate() < 10) {
        if ( datenow.getMonth()+ 1 < 10) {
          let dateF = datenow.getFullYear() + "/0" + (datenow.getMonth() + 1) + "/0" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        } else {
          let dateF = datenow.getFullYear() + "/" + (datenow.getMonth() + 1) + "/0" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        }
        // si date > 10 on verifie si je mois est inferieur a 10 ou pas
      } else {
        if ( datenow.getMonth()+ 1 < 10) {
          let dateF = datenow.getFullYear() + "/0" + (datenow.getMonth() + 1) + "/" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        } else {
          let dateF = datenow.getFullYear() + "/" + (datenow.getMonth() + 1) + "/" + datenow.getDate();
          //console.log(dateF);
          return date >= dateF;
        }
      }
    },

    Fin(date) {
      return date >= this.form.debut;
    },
  },
};
</script>
