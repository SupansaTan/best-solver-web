import { Component, OnInit } from '@angular/core';
import { RootFindingService } from './service/root-finding.service';
declare const WebAssembly: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'best-solver-web';
  value: number = 0.0

  constructor(private rootFindingService: RootFindingService ) {
    // this.rootFindingService.bisection(1).subscribe((val) => {
    //   this.value = val
    // })
  }

  ngOnInit() {
    const importObject = { imports: { imported_func: (arg: any) => console.log(arg) } };

    WebAssembly.instantiateStreaming(fetch('http://localhost:3000/bisection.wasm'), importObject)
    .then((obj: any) => {
      console.log('sol: ', obj.instance.exports.bisection(1.0, 1e-15, 16));
    })
    .catch((err: any) => console.log('fetch error: ', err));
  }
}
