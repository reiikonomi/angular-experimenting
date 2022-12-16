import {
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';
import { InitService } from './init.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  ngAfterViewInit(): void {
    this.loggerService.log('AppComponent.ngOnInit()');
    // const componentRef = this.vcr.createComponent(RoomsComponent);
    // componentRef.instance.numberOfRooms = 10000
  }

  title = 'hotelinventoryapp';

  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(
    private loggerService: LoggerService,
    private initService: InitService,
    private router: Router
  ) {
    console.log(initService.config);
  }
  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((e) => {
        console.log('Navigation started: ', e);
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        console.log('Navigation completed: ', e);
      });
  }

  role = 'Admin';
}
