import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccordionDirective } from './directives/accordion/accordion.directive';
import { StepSymbolComponent } from './components/step-symbol/step-symbol.component';
import { FormComponent } from './components/form/form.component';
import { FormStep1Component } from './components/form/form-step-1/form-step-1.component';
import { ApiService } from './services/api.service';
import { FormStepComponent } from './components/form/form-step/form-step.component';
import { RequiredIfDirective } from './directives/required-if/required-if.directive';
import { InputDirective } from './directives/input/input.directive';
import { CaptchaDirective } from './directives/captcha/captcha.directive';


// mock backend
import { mockBackendProvider } from './helpers/mockBackend'
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccordionDirective,
    StepSymbolComponent,
    FormComponent,
    FormStep1Component,
    FormStepComponent,
    RequiredIfDirective,
    InputDirective,
    CaptchaDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    mockBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
