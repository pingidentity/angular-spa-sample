// Copyright 2018 Ping Identity
//
// Licensed under the MIT License (the "License"); you may not use this file
// except in compliance with the License.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnInit } from '@angular/core';
import { IntroDisplayService } from '../intro-display.service';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    constructor(public introDisplay: IntroDisplayService) {}

    dismiss() {
        this.introDisplay.dismissed = true;
    }
    ngOnInit() {
    }

}
