import { Component, OnInit } from '@angular/core';
import {ThemeService} from './core/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.loadTheme();
  }
  title = 'TodoApp';

  // logout() { this.auth.logout();  // Assuming you have an AuthService injected
  //   sessionStorage.removeItem('token'); // Clear the token from session storage
  //   window.location.href = '/login'; // Redirect to the login page  }
  // }
}
