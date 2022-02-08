import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketComponent } from './feature/basket/basket.component';
import { HomeComponent } from './feature/home/home.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';



@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    BasketComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
