import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/layout/home/home.component'
import { RedirectComponent } from './components/redirect/redirect.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':urlCode',
    component: RedirectComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
