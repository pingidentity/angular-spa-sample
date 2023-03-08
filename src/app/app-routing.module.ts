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
import { NgModule           } from '@angular/core';
import { RouterModule       } from '@angular/router';
import { MetadataComponent  } from './metadata/metadata.component';
import { CallbackComponent  } from './callback/callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'metadata', component: MetadataComponent },
            { path: 'callback', component: CallbackComponent },
            { path: 'dashboard', component: DashboardComponent }
        ], {})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
