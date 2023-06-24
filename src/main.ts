import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import {importProvidersFrom, inject} from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {CanActivateFn, provideRouter, ResolveFn, Router, Routes, withComponentInputBinding} from "@angular/router";
import {AddTalkService} from "./app/add-talk.service";
import {ConnexionComponent} from "./app/connexion/connexion.component";
import {InscriptionComponent} from "./app/inscription/inscription.component";
import {MyTalkComponent} from "./app/my-talk/my-talk.component";
import {AddTalkComponent} from "./app/add-talk/add-talk.component";
import {AuthenticationService} from "./app/authentication.service";


export const TalkResolve: ResolveFn<any> = (route, state):any =>{
  const id = route.paramMap.get('id');
  const service = inject(AddTalkService);
  console.log(id);
  return service.getOneTalkPerRef(id!)
}

export const protectedActivated: CanActivateFn = async (route, state) => {
  const service = inject(AuthenticationService);
  const router = inject(Router);
  if (await service.getUUID() != undefined) {
    return true;
  } else console.log('uuid is undefined');
  await router.navigate(['login']);
  return false;
}

const routes: Routes = [
  {
    path:'', component: MyTalkComponent,
    canActivate: [protectedActivated]
  },
  {
    path:'sign-up',
    component: InscriptionComponent
  },
  {
    path:'login',
    component: ConnexionComponent,
  },
  {
    path:'add-talk',
    component: AddTalkComponent,
    canActivate: [protectedActivated]
  },
  {
    path:'update-talk/:id',
    component: AddTalkComponent,
    resolve: {talk:TalkResolve},
    canActivate: [protectedActivated]
  }
];

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule), provideRouter(routes, withComponentInputBinding())]
})
  .catch(err => console.error(err));
