import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService) { }

  ngOnInit() {
  }

}
