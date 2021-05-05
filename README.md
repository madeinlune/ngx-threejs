# NgxThreejs

These projects were generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0.

They contains two POC applications : basic and routing and a lib (threejs) allowing to manage treeJS scene and elements.

Basic App displays two cubes on the screen with hover and click interactions

Routing App shows a way to route some 3D contents with the Angular Router way. A standard HTML navigation menu allows to navigate in the 3D scene. Each Menu Item is represented as Cube in the Scene. Each Cube is clickable and navigate to an url.
Demo : https://ngx-threejs-routing.netlify.app/

ThreeJS lib is the engine allowing these apps to work with 3D elements.

This project, right now, is more an inspiration than something ready to be used. As it is open source, motivated people can participate !

## Build threeJS Lib

First run ThreeJS lib Build `ng build threejs` or  `ng build threejs --watch` to automatically build the lib everytime lib code changes

## Development server Routing project

Run `npm run start-routing` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server Basic project

Run `npm run start-basic` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
