import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryViewComponent } from './component/summary-view/summary-view.component';
import { DetailedViewComponent } from './component/detailed-view/detailed-view.component';
import { DetailedView1Component } from './component/detailed-view1/detailed-view1.component';

const routes: Routes = [
  { path: 'summary', component: SummaryViewComponent },
  { path: 'detailed', component: DetailedView1Component },
  { path: 'detailed2', component: DetailedViewComponent },

  { path: '', redirectTo: '/summary', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
