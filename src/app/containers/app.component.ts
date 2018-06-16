import { Component } from '@angular/core';
import { PhoenixSocket } from '../lib/phoenix-rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    const phoenixSocket = new PhoenixSocket('ws://localhost:4000/socket');

    phoenixSocket.channel('rooms:positive').join()
      .subscribe((_) => console.log('connected to positive room'));

    phoenixSocket.channel('rooms:negative').join()
      .subscribe((_) => console.log('connected to negative room'));

    phoenixSocket.channel('rooms:positive')
      .messages('update')
      .subscribe((message) => {
        console.log('positive', message);
      });

    phoenixSocket.channel('rooms:negative')
      .messages('update')
      .subscribe((message) => {
        console.log('negative', message);
      });
  }
}
