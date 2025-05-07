import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeftPanelComponent} from './components/left-panel/left-panel.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LeftPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
