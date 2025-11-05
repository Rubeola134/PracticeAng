import { Routes } from '@angular/router';
import { Home } from '../home/home';
import { About } from '../about/about';
import { NotFound } from '../error/not-found/not-found';
import { Contact } from '../contact/contact';
import { Login } from '../auth/login/login';
import { Users } from '../home/users/users';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'}, 
    {path: 'home',  component: Home},
    {path: 'home/:userId',  component: Users},
    {path: 'about',  component: About},
    {path: 'contact',  component: Contact},
    {path: 'login',  component: Login},
    {path: '**', component: NotFound}
];