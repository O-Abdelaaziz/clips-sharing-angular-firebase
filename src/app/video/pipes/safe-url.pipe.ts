import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) {
  }

  transform(value: string) {
    return this._domSanitizer.bypassSecurityTrustUrl(value);
  }

}