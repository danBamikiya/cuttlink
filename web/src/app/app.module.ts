import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/layout/header/header.component'
import { HomeComponent } from './components/layout/home/home.component'
import { ShortenerComponent } from './components/shortener/shortener.component'
import { RedirectComponent } from './components/redirect/redirect.component'

import { ClipboardModule } from 'ngx-clipboard'
import { AppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ShortenerComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    ClipboardModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
