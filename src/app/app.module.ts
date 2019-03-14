import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HeaderModule } from './modules/header/header.module';
import { FormsModule } from '@angular/forms';
import { FooterModule } from './modules/footer/footer.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LegalModule } from './modules/legal/legal.module';
import { LoaderModule } from './modules/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    HeaderModule,
    FormsModule,
    FooterModule,
    LoadingBarHttpClientModule,
    LegalModule,
    LoaderModule
  ],
  providers: [MessageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
