import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        loadChildren: () => import('@flight-workspace/passenger/feature-search')
          .then(esm => esm.PassengerFeatureSearchModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('@flight-workspace/passenger/feature-edit')
          .then(esm => esm.PassengerFeatureEditModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerManagerRoutingModule { }
