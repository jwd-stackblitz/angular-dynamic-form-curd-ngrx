import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="/home">Home</a> |
      <a routerLink="/dynamic-crud">Dynamic CRUD</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav { margin-bottom: 1rem; }
    a { margin-right: 1rem; }
  `]
})
export class AppComponent {
  title = 'Angular Dynamic Form';
}