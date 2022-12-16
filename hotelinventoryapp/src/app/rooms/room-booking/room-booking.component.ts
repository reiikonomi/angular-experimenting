import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss']
})
export class RoomBookingComponent implements OnInit {

  id : number = 0;

  id$ = this.router.paramMap.pipe(
    map(params => params.get('id'))
  );

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id'];
    // this.id$ = this.router.params.pipe(
    //   map(params => params['id'])
    // )
    // this.router.paramMap.subscribe(params => {
    //   console.log(params.get('id'))
    // })
  }

}
