import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NetworkService } from '../services/network.service';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private networkService: NetworkService) { }

  transform(name: string) {
    return new Observable<string | ArrayBuffer>((observer) => {
      // This is a tiny blank image
      observer.next('assets/images/cmdev_logo.png');

      this.networkService.getProductImage(name).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          observer.next(reader.result);
        };
      });
      return { unsubscribe() { } };
    });
  }
}
