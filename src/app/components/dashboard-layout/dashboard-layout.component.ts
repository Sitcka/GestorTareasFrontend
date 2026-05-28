import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar.component';
import { Header } from '../header/header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Navbar, Header, ],

  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayout {}
