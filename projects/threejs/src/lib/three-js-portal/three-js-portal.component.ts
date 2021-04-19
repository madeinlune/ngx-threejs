import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {
  BackSide,
  BoxBufferGeometry,
  Camera,
  Group,
  LinearFilter,
  Mesh,
  MeshPhongMaterial,
  PlaneBufferGeometry,
  RGBFormat,
  Scene,
  WebGLRenderer,
  WebGLRenderTarget,
  WebGLRenderTargetOptions
} from 'three';
import {TexturePass} from 'three/examples/jsm/postprocessing/TexturePass';
import {MaskPass} from 'three/examples/jsm/postprocessing/MaskPass';
import {ThreeJsService} from '../three-js.service';
import {Renderable} from '../models/renderable';
import {ObjectTdComponent} from '../object-td/object-td.component';

@Component({
  selector: 'tjs-three-js-portal',
  templateUrl: './three-js-portal.component.html',
  styleUrls: ['./three-js-portal.component.css']
})
export class ThreeJsPortalComponent extends ObjectTdComponent implements OnInit, AfterViewInit, Renderable {

  @Input()
  camera!: Camera;

  @Input()
  renderer!: WebGLRenderer;

  sceneMask!: Scene;
  scene!: Scene;
  sceneTexture!: TexturePass;
  maskPass!: MaskPass;

  bufferOfScene!: WebGLRenderTarget;

  planeMask!: Mesh;
  plane!: Mesh;

  cube!: Mesh;

  group!: Group;

  constructor(
    private threeJsService: ThreeJsService
  ) {
    super();
  }

  ngOnInit(): void {

    this.sceneMask = new Scene();
    this.scene = new Scene();

    this.group = new Group();

    const sideSize = 3.95;
    this.planeMask = new Mesh(new PlaneBufferGeometry(sideSize, sideSize, 1, 1));
    this.sceneMask.add(this.planeMask);

    /*this.plane = new Mesh(
      new PlaneBufferGeometry(sideSize / 2, sideSize, 1, 1),
      new MeshBasicMaterial({color: 0xFFFF00, opacity: 0.25, transparent: true})
    );

    if (this.plane) {
      // this.scene.add(this.plane);
    }*/

    this.cube = new Mesh(
      new BoxBufferGeometry(sideSize, sideSize, sideSize * 3),
      new MeshPhongMaterial({color: 0xF80010, opacity: 1, transparent: true, side: BackSide, depthTest: true})
    );
    this.cube.receiveShadow = true;
    this.cube.castShadow = true;

    if (this.cube) {
      // this.cube.translateZ(1);
      // this.scene.add(this.cube);
    }

    const parameters: WebGLRenderTargetOptions = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBFormat,
      stencilBuffer: true
    };

    this.maskPass = new MaskPass(this.sceneMask, this.camera);

    this.bufferOfScene = new WebGLRenderTarget(
      window.innerWidth * this.renderer.getPixelRatio(),
      window.innerHeight * this.renderer.getPixelRatio(),
      parameters
    );

    this.sceneTexture = new TexturePass(this.bufferOfScene.texture);

    console.log('this.camera', this.camera);

    // const maskPass: MaskPass = new MaskPass(sceneMaskPlane, this.camera);

    this.threeJsService.addRenderer(this);

    this.update();

  }

  ngAfterViewInit(): void {
  }

  render(): void {

    if (this.camera && this.planeMask) {

      /*const vector: Vector3 = new Vector3(.0, .0, 1.);
      vector.applyMatrix4(this.planeMask.matrixWorld);
      const camDir: Vector3 = new Vector3();
      this.camera.getWorldDirection(camDir);
      console.log('vector.angleTo(camDir)', vector.angleTo(camDir));
      if (radToDeg(vector.angleTo(camDir)) > 100.) {
        this.renderer.setRenderTarget(this.bufferOfScene);
        this.renderer.render(this.scene, this.camera);
      }*/

      if (this.renderer && this.bufferOfScene && this.scene && this.camera) {

        this.renderer.setRenderTarget(this.bufferOfScene);
        this.renderer.render(this.scene, this.camera);
      }

    }

  }

  protected updatePosition(): void {
    if (this.scene && this.sceneMask && this.position) {
      this.scene.position.set(this.position.x, this.position.y, this.position.z);
      this.sceneMask.position.set(this.position.x, this.position.y, this.position.z);
    }
  }

  protected updateRotation(): void {
    if (this.scene && this.sceneMask && this.rotation) {
      this.scene.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
      this.sceneMask.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }
  }

  protected updateScale(): void {
    if (this.scene && this.sceneMask && this.scale) {
      this.scene.scale.set(this.scale.x, this.scale.y, this.scale.z);
      this.sceneMask.scale.set(this.scale.x, this.scale.y, this.scale.z);
    }
  }

}
