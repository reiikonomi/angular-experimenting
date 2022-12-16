import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsComponent } from './rooms.component';
import { RoomGuard } from './guards/room.guard';

const routes: Routes = [
  {
    path: 'add',
    component: RoomsAddComponent,
  },
  {
    path: '',
    component: RoomsComponent,
    canActivateChild: [RoomGuard],
    children: [
      {
        path: ':id',
        component: RoomBookingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
