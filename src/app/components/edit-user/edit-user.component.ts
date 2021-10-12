import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  userObj: any = {};
  editForm: any;
  submitted:boolean = false;

  constructor(
    public crudService: CrudService,
    public actRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.crudService.getSingleUser(this.id).subscribe((res: {}) => {
      this.userObj = res;
      console.log(this.userObj = res);
    })
  }
 
  updateUser(id:any, data:any) {
    this.submitted = true;
    if(window.confirm('Yes, please...')){
      if((data.email != (null || undefined)) || (data.name != (" " || undefined))){
        this.crudService.updateUser(this.id, data).subscribe(res => {
          this.router.navigate(['/dashboard'])
        })
      }else {
        alert("Invalid credentials");
        this.router.navigate(["/"]);
      }
     
    }

   } 
}
