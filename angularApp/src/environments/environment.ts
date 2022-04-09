// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const urls={
  login:"http://localhost:3000/utilisateurs/login",
  mail_login:"http://localhost:3000/utilisateurs/mail-login",
  user_session:"http://localhost:3000/utilisateurs/session-user",
  liste_restaurants:"http://localhost:3000/restaurants/liste",
  carte_restaurant:"http://localhost:3000/plats/carte",
  nouvelle_commande:'http://localhost:3000/commandes/nouveau',
  inscription:'http://localhost:3000/utilisateurs/inscription',
  en_cours:'http://localhost:3000/commandes/en-cours',
  pret_pour_livraison:"http://localhost:3000/commandes/prete-pour-livraison",
  a_livrer:"http://localhost:3000/commandes/a-livrer",
  livraison:'http://localhost:3000/commandes/livraison'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
