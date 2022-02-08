import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, timer, EMPTY, Subscription, take, tap, share } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number> = this.getInitialStream();
  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.rxjsDemo();
  }

  rxjsDemo(): void {
    this.subscription.add(
      this.timer$.pipe(
        // take(5)
      ).subscribe(console.log)
    );
  }

  getInitialStream(): Observable<number> {
    return timer(0, 1000).pipe(
      tap(num => console.log('value from timer$ init', num)),
      // share()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
