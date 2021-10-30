import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { InputNameComponent } from './input-name/input-name.component';


const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full' },
  {path:'index', component: InputNameComponent},
  {path: 'calculadora', component: CalculadoraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
