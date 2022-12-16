import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  bookRoom(booking: any) {
    return this.http.post(
      `https://jsonplaceholder.typicode.com/posts`,
      booking
    );
  }
}
