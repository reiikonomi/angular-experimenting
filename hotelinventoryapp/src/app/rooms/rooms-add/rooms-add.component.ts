import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent {
  constructor(private roomsService: RoomsService) {}

  successMessage: string = '';

  room: RoomList = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    checkingTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    proce: 0,
    rating: 0,
  };

  // ngOnInit(): void {
  //   // throw new Error('Method not implemented.');
  // }

  AddRoom(roomsForm: NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room added successfully.';
      roomsForm.resetForm({
        roomNumber: '',
        roomType: '',
        amenities: '',
        checkingTime: new Date(),
        checkoutTime: new Date(),
        photos: '',
        proce: 0,
        rating: 0,
      });
    });
  }
}
