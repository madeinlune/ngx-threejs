import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  NgModule,
  OnInit,
  Optional,
  QueryList,
  SkipSelf
} from '@angular/core';
import {ObjectTdComponent} from '../../object-td/object-td.component';
import {ThreeJsService} from '../../three-js.service';
import {Font, FrontSide, Group, Mesh, MeshPhongMaterial, Shape, ShapeBufferGeometry, Vector3} from 'three';
import {ThreeJsFontService} from '../../services/three-js-font.service';
import {filter, take} from 'rxjs/operators';
import {CircleLayoutPipe} from '../../pipes/circle-layout.pipe';
import {ThreeJsParent} from '../../models/three-js-parent';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'tjs-text-shape',
  templateUrl: './text-shape.component.html',
  styleUrls: ['./text-shape.component.css'],
  providers: [
    {provide: ObjectTdComponent, useExisting: forwardRef(() => TextShapeComponent)},
    CircleLayoutPipe
  ]
})
export class TextShapeComponent extends ObjectTdComponent implements OnInit, AfterViewInit {

  @ContentChildren('paragraph') paragraphs!: QueryList<any>;

  @Input()
  circleLayout!: boolean;

  @Input()
  size = 1;

  @Input()
  radius = 7;

  constructor(
    @Optional() @SkipSelf() protected parent: ThreeJsParent,
    protected threeJsService: ThreeJsService,
    private hostElement: ElementRef,
    private threeJsFontService: ThreeJsFontService,
    private circleLayoutPipe: CircleLayoutPipe
  ) {
    super(parent, threeJsService);
  }

  ngOnInit(): void {

    this.object3D = new Group();
    this.object3D.name = this.name;

  }

  createText(): void {

    this.threeJsFontService.font$.pipe(
      filter(font => !!font),
      take(1)
    ).subscribe((font: Font) => {

      const matLite = new MeshPhongMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 1,
        side: FrontSide
      });

      const paragraph: ElementRef = this.paragraphs.first;

      let message = (paragraph.nativeElement as HTMLParagraphElement).innerText;

      const regex = /<br\s*[\/]?>/gi;
      message = message.replace(regex, '\n');

      const chars = Array.from ? Array.from(message) : String(message).split('');

      console.log('chars', chars);

      const shapes: Shape[] = font.generateShapes(message, this.size);

      const geometry: ShapeBufferGeometry = new ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();

      if (geometry.boundingBox) {
        const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
      }

      if (!this.circleLayout) {
        const textShapeMesh: Mesh = new Mesh(geometry, matLite);
        this.object3D.add(textShapeMesh);
      } else {
        let x = 0;
        let width;
        const shapeMeshes: Mesh[] = [];

        chars.forEach(char => {
          if (char !== ' ') {
            const shape: Shape[] = font.generateShapes(char, this.size);
            const shapeGeometry: ShapeBufferGeometry = new ShapeBufferGeometry(shape);
            shapeGeometry.computeBoundingBox();
            const shapeMesh: Mesh = new Mesh(shapeGeometry, matLite);
            shapeMesh.position.set(x, 0, 0);
            shapeMeshes.push(shapeMesh);
            if (shapeGeometry.boundingBox) {
              const shapeWidth: number = shapeGeometry.boundingBox.max.x;
              x += shapeWidth;
            }
            this.object3D.add(shapeMesh);
          } else {
            x += 1 / 2;
          }
        });

        width = x;

        shapeMeshes.forEach(shapeMesh => {
          const posX: number = shapeMesh.position.x;
          const radius = this.radius;
          const virtualWidth: number = (2 * Math.PI) * radius;
          const xRatio: number = posX / (virtualWidth / 2);
          const degrees: number = 200 * xRatio;
          const angleRadian: number = (degrees * Math.PI) / 180;
          const position: Vector3 = this.circleLayoutPipe.transform({x: 0, y: 0, z: 0}, radius, angleRadian);
          shapeMesh.position.set(position.x, position.y, position.z);
          shapeMesh.lookAt(this.position);
        });

        console.log('width', width);
        // this.object3D.add(textShapeMesh);
        // this.parent.scene.add(this.mesh);
      }

    });

  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    console.log('this.paragraphs', this.paragraphs);
    if (this.paragraphs) {
      if (this.paragraphs.length > 0) {
        this.createText();
      }
    }
  }

  render(): void {
    // this.object3D.rotation.x += 0.01;
    // this.object3D.rotation.y += 0.02;
  }

}

@NgModule({
  declarations: [
    TextShapeComponent
  ],
  exports: [TextShapeComponent],
  imports: [
    CommonModule
  ],
  providers: []
})
export class TextShapeModule {

}
