import { Component, OnInit } from '@angular/core';
import {ProfileService} from "./profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss']
})
export class ProfileViewerComponent implements OnInit {
  public locationData: any;
  constructor(private profileService: ProfileService,private router: Router) { }

  ngOnInit(): void {
    this.profileService.getLocation().then(res =>{
      console.log(res)
      this.locationData = JSON.parse(JSON.stringify(res))
    });
  }


}
