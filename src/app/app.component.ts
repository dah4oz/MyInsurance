import {Component} from '@angular/core';
import {currentUser} from './global';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-insurance';

  constructor(private router: Router) { }

  isLoggedIn() {
    return currentUser.isLoggedIn;
  }

  logout() {
    currentUser.isLoggedIn = false;
    currentUser.username = '';
    currentUser.password = '';
    this.router.navigate(['/login']);
  }
}
