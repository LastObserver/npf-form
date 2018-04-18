import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
import { MockBackendProvider } from './helpers/mockBackend';
import { FormStep2Component } from './components/form/form-step-2/form-step-2.component';
import { FormStep3Component } from './components/form/form-step-3/form-step-3.component';
import { FormStepCompleteComponent } from './components/form/form-step-complete/form-step-complete.component'
import { DataService } from './services/data.service';
import { DatepickerDirective } from './directives/datepicker/datepicker.directive';
import { ScrollbarDirective } from './directives/scrollbar/scrollbar.directive';

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
    FormStep2Component,
    FormStep3Component,
    FormStepCompleteComponent,
    DatepickerDirective,
    ScrollbarDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    DataService,
    MockBackendProvider,
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
  ]
})
export class AppModule { }
