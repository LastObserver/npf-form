import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccordionDirective } from './directives/accordion/accordion.directive';
import { StepSymbolComponent } from './components/step-symbol/step-symbol.component';
import { FormComponent } from './components/form/form.component';
import { FormStep1Component } from './components/form/form-step-1/form-step-1.component';
import { ApiService } from './services/api.service';
import { StepsService } from './services/steps.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccordionDirective,
    StepSymbolComponent,
    FormComponent,
    FormStep1Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [ApiService, StepsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
