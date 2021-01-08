import { FleetComponent } from './components/fleet/fleet.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'fleet', component: FleetComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
    exports: [RouterModule]
})


export class AppRoutingModule {}