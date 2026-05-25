import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Header } from '../header/header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Navbar, Header, ],

  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {}
