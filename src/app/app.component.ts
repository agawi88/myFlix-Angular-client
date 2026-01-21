/**
 *
 * Root application component.
 * Acts as the main layout shell and entry point
 * for rendering routed views.
 *
 */

import { Component } from '@angular/core';


/**
 * Root component of the application.
 *
 * Hosts the router outlet and global layout elements.
 */

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Application title.
   */
    
  title = 'myFlix-Angular-client';


}