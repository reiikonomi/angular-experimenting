import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {}

  private guestGroup(): any {
    return this.fb.group({
      guestName: [''],
      age: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      roomId: new FormControl(
        { value: 2, disabled: true },
        { validators: [Validators.required] }
      ),
      guestEmail: [
        '',
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email],
        },
      ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          CustomValidator.ValidateName,
          CustomValidator.ValidateSpecialChar('*'),
        ],
      ],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([
        this.fb.group({
          guestName: [''],
          age: new FormControl(''),
        }),
      ]),
    });
    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {
    //     console.log(data);
    //   });
    // });

    this.bookingForm.valueChanges
      .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => {
        console.log(data);
      });
  }

  Submit() {
    console.log(this.bookingForm.value);
    this.bookingService
      .bookRoom(this.bookingForm.getRawValue())
      .subscribe((data) => {});
    //this.bookingForm.reset();
  }

  getBookingData() {
    this.bookingForm.patchValue({
      roomId: '2',
      guestEmail: 'testing@gmail.com',
      checkinDate: 'testing',
      checkoutDate: 'testing',
      bookingStatus: 'testing',
      bookingAmount: 'testing',
      bookingDate: 'testing',
      mobileNumber: 'testing',
      guestName: 'testing',
      address: {
        addressLine1: 'testing',
        addressLine2: 'testing',
        city: 'testing',
        state: 'testing',
        country: 'testing',
        zipCode: 'testing',
      },
      guests: [],
    });
  }

  addGuest() {
    this.guests.push(this.guestGroup());
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
}
