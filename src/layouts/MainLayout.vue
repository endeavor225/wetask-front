<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          WeTasks
        </q-toolbar-title>

      </q-toolbar>
    </q-header>-->

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          MENU
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'


const linksData = [
  {
    title: 'UTILISATEURS',
    caption: 'Gestion des utilisateurs',
    icon: 'account_circle',
    link: '/#/utilisateur'
  },
  /*
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
 */
];

export default {
  name: 'MainLayout',

  components: { 
    EssentialLink,
    },


  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    }
  }
}
</script>