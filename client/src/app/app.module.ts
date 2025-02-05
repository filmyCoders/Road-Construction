import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryViewComponent } from './component/summary-view/summary-view.component';
import { DetailedViewComponent } from './component/detailed-view/detailed-view.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailedView1Component } from './component/detailed-view1/detailed-view1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SummaryViewComponent,
    DetailedView1Component,
    DetailedViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
      HttpClientModule , // Ensure HttpClientModule is imported
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
