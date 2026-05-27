import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar'; // Import Navbar
import { Footer } from './components/footer/footer'; // Import Footer

@Component({
  selector: 'app-root',
  standalone: true, // This is a standalone component
  imports: [RouterOutlet, Navbar, Footer], // Add Navbar and Footer here!
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio-gianne');
}