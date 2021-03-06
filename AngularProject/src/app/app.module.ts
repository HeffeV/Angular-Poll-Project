import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RxFormModule } from './RxForms/rxform.module';
import { MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './services/security.interceptor';
import { SecurityModule } from './services/security.module';
import { HomeComponent } from './home/home.component';
import { DashboardModule } from './userdashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RxFormModule,
    FormsModule,
    MatListModule,
    HttpClientModule,SecurityModule,DashboardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
    }],
  bootstrap: [AppComponent],exports:[AppComponent]
})
export class AppModule { }
