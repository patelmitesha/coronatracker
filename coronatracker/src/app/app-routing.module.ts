import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    //  path: 'index', loadChildren: './index/index.module#IndexModule'
    path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
