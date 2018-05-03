import { RouterModule, Routes } from '@angular/router';
import { NpoFormComponent } from './views/npo-form/npo-form.component';
import { LkForm01Component } from './views/lk-form-01/lk-form-01.component';

export const AppRoutes: Routes = [
  { path: '', component: NpoFormComponent },
  { path: 'lk-form-01', component: LkForm01Component },
];
