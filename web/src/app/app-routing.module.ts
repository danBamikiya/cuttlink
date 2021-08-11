import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/layout/home/home.component'
import { HomePageMatcher } from './utils/home-page-matcher'

const routes: Routes = [
  {
    matcher: HomePageMatcher,
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
