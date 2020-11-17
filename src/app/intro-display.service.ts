import { Injectable } from '@angular/core';

@Injectable()
export class IntroDisplayService {


    public get dismissed(): boolean {
        return localStorage.getItem('intro.component.dismissed') === 'true';
    }

    public set dismissed(value: boolean) {
        if (value) {
            localStorage.setItem('intro.component.dismissed', 'true');
        } else {
            localStorage.removeItem('intro.component.dismissed');
        }
    }

    constructor() { }


}
