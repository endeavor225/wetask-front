<template>
  <div>
    <q-card class="my-card">
      <!-- Boutton pour fermer le modal -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6" style="color: #0e8f33;">Recherche avancée</div>
        <q-space />
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: 70vh" class="scroll">
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
            label="Titre"
          />

          <q-input
            filled
            v-model="form.description"
            type="textarea"
            label="Description"
          />

          <q-input
          placeholder="Date de debut"
          readonly
           filled
           hint="Date de debut"
          :label="$dateFormater(new Date(form.debut))">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.debut">
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

          <q-input
          placeholder="Date de fin"
          readonly
          filled
          hint="Date de fin"
          :label="$dateFormater(new Date(form.fin))">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.fin">
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

          <q-input
          readonly
          filled
          hint="Date de création"
          placeholder="Date de création"
          :label="$dateFormater(new Date(form.createAt))">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.createAt">
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

          <q-input
          readonly
          filled
          hint="Date de mise à jour"
          placeholder="Date de modification"
          :label="$dateFormater(new Date(form.updateAt))">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.updateAt">
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


           <q-input
          readonly
          filled
          hint="Date de suppresion"
          placeholder="Date de supression"
          :label="$dateFormater(new Date(form.removeAt))">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="form.removeAt">
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

           <q-separator />

          <div class="q-mb-sm q-mt-lg" style="text-align: center">
            <q-btn label="Recherche" type="submit" outline color="primary" />
            <q-btn label="annuler" type="reset" outline color="negative" class="q-ml-sm" />
          </div>
         
        </q-form>
      </q-card-section>

    </q-card>
  </div>
</template>

<script>

import RechercheAvanceMixin from 'components/tache/TacheMixin'

export default {
  // name: 'ComponentName',
  mixins: [RechercheAvanceMixin],

  watch:{
    'form.fin'(newVal, oldVal) {
      try {
         this.recherche.fin = new Date(this.form.fin)

         console.log(this.recherche.fin )
      } catch (error) {
        console.log(error);
      }
    },
    'form.debut'(newVal, oldVal) {
      try {
         this.recherche.debut = new Date(this.form.debut)
         console.log(this.recherche.debut )
      } catch (error) {
        console.log(error);
      }
    },
    'form.createAt'(newVal, oldVal) {
      try {
         this.recherche.createAt = new Date(this.form.createAt)
      } catch (error) {
        console.log(error);
      }
    },
    'form.updateAt'(newVal, oldVal) {
      try {
        this.recherche.updateAt = new Date(this.form.updateAt)
      } catch (error) {
        console.log(error);
      }
    },
    'form.removeAt'(newVal, oldVal) {
      try {
        this.recherche.removeAt = new Date(this.form.removeAt)
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      form: {
        titre: "",
        description: "",
        debut: new Date("2020-01-01"),
        fin: new Date("2020-01-01"),
        createAt: new Date("2020-01-01"),
        updateAt: new Date("2020-01-01"),
        removeAt: new Date("2020-01-01"),
      },

      recherche: {}
    };
  },

  methods: {
    async onSubmit() {
      try {
       
        await this.RechercheAvance();
      } catch (error) {
        console.log(`erreur dans watch de filter page ${error}`);
      }
    },

    onReset() {
      this.form.titre = "";
      this.form.description = "";
      this.form.debut = "";
      this.form.fin = "";
      this.form.createAt = "";
      this.form.updateAt = "";
      this.form.removeAt = "";
    },
  },
};
</script>
