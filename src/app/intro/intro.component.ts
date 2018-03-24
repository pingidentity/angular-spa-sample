import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  get dismissed(): boolean {
    return localStorage.getItem('introComponent.dismissed') === 'true';
  }

  set dismissed(value: boolean) {
    if (value) {
      localStorage.setItem('introComponent.dismissed', 'true');
    } else {
      localStorage.removeItem('introComponent.dismissed');
    }
  }

  dismiss() {
    this.dismissed = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
