import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { InputNameComponent } from './input-name/input-name.component';


const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full' },
  {path:'index', component: InputNameComponent},
  {path: 'calculator', component: CalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
