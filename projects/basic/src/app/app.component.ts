import {Component} from '@angular/core';
import {HELPERS_COLOR} from 'threejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: HELPERS_COLOR,
      useValue: 0xFF0000
    }
  ]
})
export class AppComponent {
  title = 'basic';
}
