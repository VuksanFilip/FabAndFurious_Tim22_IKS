import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/model/Admin';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin: Admin = {
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    email: '',
    address: '',
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe((res) => (this.admin = res));
  }

}
