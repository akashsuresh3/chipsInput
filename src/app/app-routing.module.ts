import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddChipsComponent } from "./components/add-chips/add-chips.component";
import { ViewChipsComponent } from './components/view-chips/view-chips.component';

const routes: Routes = [
  {
    path: '',
    component: ViewChipsComponent
  },
  {
    path: 'addChips',
    component: AddChipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
