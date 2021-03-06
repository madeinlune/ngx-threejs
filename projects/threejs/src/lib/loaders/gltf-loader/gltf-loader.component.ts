import {Component, forwardRef, Input, NgModule, OnInit} from '@angular/core';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {ObjectTdComponent} from '../../object-td/object-td.component';
import {Group, Mesh} from 'three';
import {ReplaySubject} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {CommonModule} from '@angular/common';

export interface LoaderPassport {

  url: string;

}

@Component({
  selector: 'tjs-gltf-loader',
  templateUrl: './gltf-loader.component.html',
  styleUrls: ['./gltf-loader.component.css'],
  providers: [{provide: ObjectTdComponent, useExisting: forwardRef(() => GltfLoaderComponent)}]
})
export class GltfLoaderComponent extends ObjectTdComponent implements OnInit {

  passport$: ReplaySubject<LoaderPassport> = new ReplaySubject<LoaderPassport>(1);

  @Input()
  set passport(value: LoaderPassport) {
    this.passport$.next(value);
  }

  @Input()
  castShadow = false;

  @Input()
  receiveShadow = false;

  loader!: GLTFLoader;

  ngOnInit(): void {

    this.object3D = new Group();
    this.object3D.name = this.name;

    this.passport$
      .pipe(
        filter(passport => !!passport),
        take(1)
      )
      .subscribe(passport => {

        this.loader = new GLTFLoader();
        this.loader.load(passport.url, (gltf) => {
          this.object3D.add(gltf.scene);

          gltf.scene.traverse((object) => {

              if (object instanceof Mesh) {
                object.userData = {component: this};
                object.material.metalness = 0;
                if (this.castShadow) {
                  object.castShadow = this.castShadow;
                }
                if (this.receiveShadow) {
                  object.receiveShadow = this.receiveShadow;
                }
              }

            }
          );

        });

      });

  }

}

@NgModule({
  declarations: [
    GltfLoaderComponent
  ],
  exports: [GltfLoaderComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class GltfLoaderModule {

}
