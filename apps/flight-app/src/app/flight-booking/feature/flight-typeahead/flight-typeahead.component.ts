import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable, timer, EMPTY, Subscription, take, tap, share, filter, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number> = this.getInitialStream();
  subscription = new Subscription();

  control = new FormControl();
  flights$: Observable<Flight[]> = this.getFlightResult();
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.rxjsDemo();
  }

  getFlightResult(): Observable<Flight[]> {
    /**
     * Stream 1: Form Control current value
     * - Trigger
     * - Data Provider
     */
    return this.control.valueChanges.pipe(
      // START Filter
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // END Filter
      // Side-Effect: set loading property
      tap(() => this.loading = true),
      /**
       * Stream 2: Load filtered data from backend API
       * - Data Provider
       */
      switchMap(city => this.load(city).pipe(
        catchError(() => of([]))
      )),
      // Side-Effect: set loading property
      tap(() => this.loading = false)
    );
  }

  load(from: string): Observable<Flight[]> {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
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
