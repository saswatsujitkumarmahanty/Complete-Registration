import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, Footer, Header],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  title = 'RegistrationUI';

  constructor(private router: Router) {}

  // 3. This method fixes the "Property 'isAuthPage' does not exist" error
  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/signup';
  }
}
