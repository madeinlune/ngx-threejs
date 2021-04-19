import {Injectable} from '@angular/core';
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader';
import {Font} from 'three';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsFontService {

  font$: ReplaySubject<Font> = new ReplaySubject<Font>(1);

  constructor() {

  }

  loadFont(fontPath: string): void {

    const loader: TTFLoader = new TTFLoader();
    loader.load(fontPath,
      json => {
        const font: Font = new Font(json);
        this.font$.next(font);
      },
      progress => {
        console.log('progress', progress);
      },
      error => {
        console.log('error', error);
      }
    );

  }

}
