import { Component, OnInit } from '@angular/core';
import {CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gridColumns = 4;

  Users: any = [];
  constructor(public crudService : CrudService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }


  fetchUsers() {
    return this.crudService.getUsers().subscribe((res: {}) => {
      this.Users = res;
      // console.log(this.Users, 'this.Usersthis.Users');
    })
  } 

  delete(id:any) {
    if (window.confirm('Really?')){
      this.crudService.deleteUser(id).subscribe(res => {
        this.fetchUsers()
      })
    }
  }

}
