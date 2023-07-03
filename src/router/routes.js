
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Connexion.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/Principal.vue'),
    children: [
      { path: '/accueil', component: () => import('pages/Index.vue') },
      { path: '/taches', component: () => import('pages/Tache.vue') },
      { path: '/inscription', component: () => import('pages/Inscription.vue') },
      { path: '/utilisateur', component: () => import('pages/Utilisateur.vue') },
      { path: '/profil', component: () => import('pages/Profil.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
