import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, OnDestroy, AfterViewChecked
{
  hotelName = `Testing name`;

  hideRooms = true;

  numberOfRooms = 10;

  selectedRoom!: RoomList;

  rooms: Room = {
    total: 30,
    availableRooms: 10,
    bookedRooms: 20,
  };

  roomList: RoomList[] = [];

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  constructor(
    private roomsService: RoomsService,
    private configService: ConfigService
  ) {}

  ngAfterViewChecked(): void {}

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  ngDoCheck(): void {
    console.log('On changes is called');
  }

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      //console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  totalBytes = 0;

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been sent');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          console.log(this.totalBytes);
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete'),
      error: () => console.log('Error'),
    });

    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms
    // })
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Welcome to Hotel Whatever';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleClick() {
    this.hideRooms = !this.hideRooms;
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room = {
      roomNumber: '1',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wifi, TV, Bathroom, Kitchen',
      proce: 500,
      checkingTime: new Date(),
      checkoutTime: new Date(),
      photos: 'skssksk',
      rating: 4.5,
    };

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
}
