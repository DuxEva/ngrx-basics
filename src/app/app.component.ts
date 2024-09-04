import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  concat,
  from,
  interval,
  Observable,
  of,
  Subscription,
  take,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  // Numbers Observable and Subscription
  numbers$: Observable<number> = of(1, 2, 3, 4, 5);
  numbersSubscription!: Subscription;

  // Favourite colors array , observable and subscription
  favouriteColors: string[] = ['black', 'Green', 'grey'];
  favouriteColors$: Observable<string> = from(this.favouriteColors);
  favouriteColorsSubscription!: Subscription;

  // Interval Observable and subscription
  interval$: Observable<number> = interval(1000).pipe(take(5));
  intervalSubscription!: Subscription;

  // Concatenated Observables and subscription
  concat$ = concat(this.numbers$, this.favouriteColors$);
  concatSubscription!: Subscription;

  // Observable that emits and error after emitting some values and subscription
  errorObservable$ = new Observable<number>((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.error(new Error('An error occurred!'));
  });
  errorSubscription!: Subscription;

  ngOnInit(): void {
    this.numbersSubscription = this.numbers$.subscribe({
      next: (value) => console.log('Number:', value),
      error: (err) => console.log('an error occured', err.message),
      complete: () => console.log('Observable completed'),
    });

    this.favouriteColorsSubscription = this.favouriteColors$.subscribe({
      next: (value) => console.log('Favourite Color:', value),
      error: (err) => console.log('an error occured', err.message),

      complete: () => console.log('Observable completed'),
    });

    this.intervalSubscription = this.interval$.subscribe({
      next: (value) =>
        console.log(
          `Value: ${value}, Timestamp: ${new Date().toLocaleTimeString()}`
        ),
      complete: () => console.log('Interval observable completed'),
    });

    this.concatSubscription = this.concat$.subscribe({
      next: (value) => console.log('Concatenated Value:', value),
      error: (err) => console.log('an error occured', err.message),

      complete: () => console.log('Concatenated observable completed'),
    });

    this.errorSubscription = this.errorObservable$.subscribe({
      next: (value) => console.log('Value:', value),
      error: (err) => console.log('Error:', err.message),
      complete: () =>
        console.log('This will not be logged because of the error'),
    });
  }

  ngOnDestroy(): void {
    this.numbersSubscription.unsubscribe();
    this.favouriteColorsSubscription.unsubscribe();
    this.intervalSubscription.unsubscribe();
    this.concatSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
