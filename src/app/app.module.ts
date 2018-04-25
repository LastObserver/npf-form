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
import { ApiService } from './services/api.service';
import { FormStepComponent } from './components/form/form-step/form-step.component';
import { RequiredIfDirective } from './directives/required-if/required-if.directive';
import { InputDirective } from './directives/input/input.directive';
import { CaptchaDirective } from './directives/captcha/captcha.directive';


// mock backend
import { MockBackendProvider } from './helpers/mockBackend';

import { AppRoutes } from './app.routes';

import { DataService } from './services/data.service';
import { DatepickerDirective } from './directives/datepicker/datepicker.directive';
import { ScrollbarDirective } from './directives/scrollbar/scrollbar.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { NpoFormComponent } from './views/npo-form/npo-form.component';
import { RouterModule } from '@angular/router';
import { LkForm01Component } from './views/lk-form-01/lk-form-01.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CheckboxDirective } from './directives/checkbox/checkbox.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccordionDirective,
    StepSymbolComponent,
    FormComponent,
    FormStepComponent,
    RequiredIfDirective,
    InputDirective,
    CaptchaDirective,
    DatepickerDirective,
    ScrollbarDirective,
    TooltipDirective,
    NpoFormComponent,
    LkForm01Component,
    NavigationComponent,
    CheckboxDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
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
