import {Pipe, PipeTransform} from '@angular/core';
import {BackSide, DoubleSide, FrontSide, Side} from 'three';

export type SideType = 'front' | 'back' | 'both';

@Pipe({
  name: 'side'
})
export class SidePipe implements PipeTransform {

  transform(side: SideType): Side {
    if (side === 'front') {
      return FrontSide;
    } else if (side === 'back') {
      return BackSide;
    } else if (side === 'both') {
      return DoubleSide;
    }
    return FrontSide;
  }

}
