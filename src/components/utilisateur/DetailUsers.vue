<template>
  <div id="detail">
    <q-card>
      <q-toolbar>
        <q-avatar>
          <q-icon name="info"></q-icon>
        </q-avatar>

        <q-toolbar-title>
          Info de L'utilisateur</q-toolbar-title>
        <q-btn flat round dense icon="close"  v-close-popup />
      </q-toolbar>

      <q-card-section>
        <p>
          ROLE : 
          <span class="text-weight-light text-capitalize" > {{ info.role.titre }}</span>
        </p>
        <div class="" style="width: 90%; margin: auto">
          <div class="col text-subtitle1">
            Nom: <span class="text-weight-light"> {{ info.nom }}</span>
            <span class="text-weight-light"> {{ info.prenom }}</span>
          </div>
          <div class="col text-subtitle1 ">
            Nom Utilisateur:
            <span class="text-weight-light"> {{ info.username }}</span>
          </div>
          <div class="col text-subtitle1">
            Date de naissance:
            <span class="text-weight-light">
              {{ $dateNaiss(new Date(info.date_naissance)) }}</span
            >
          </div>
        </div>

        <div class="text-caption text-grey"></div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="stylus" scoped></style>
