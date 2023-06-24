import {inject, NgModule} from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {InscriptionComponent} from "./inscription/inscription.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {MyTalkComponent} from "./my-talk/my-talk.component";
import {AddTalkComponent} from "./add-talk/add-talk.component";
import {AddTalkService} from "./add-talk.service";
import {of} from "rxjs";

export const TalkResolve: ResolveFn<any> = (route, state) =>{
  const id = route.paramMap.get('id');
  const service = inject(AddTalkService);
  console.log(id);
  const talk = service.getOneTalkPerRef(id!).then(data =>{
    console.log(data)
    return of(data)
  });
}

const routes: Routes = [
  {
  path:'', component: ConnexionComponent
  },
  {
    path:'sign-up',
    component: InscriptionComponent
  },
  {
    path:'talk',
    component: MyTalkComponent
  },
  {
    path:'add-talk',
    component: AddTalkComponent
  },
  {
    path:'update-talk/:id',
    component: AddTalkComponent,
    resolve: {talk:TalkResolve}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
