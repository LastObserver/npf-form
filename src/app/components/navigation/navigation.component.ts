import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.styl']
})
export class NavigationComponent implements OnInit {
  private paths: {
    name: string,
    url: string,
  }[];

  constructor() {
    this.paths = [
      {
        name: 'Форма НПО',
        url: '/',
      },
      {
        name: 'Форма 01 ЛК',
        url: '/lk-form-01',
      }
    ];
  }

  ngOnInit() {
  }

}
