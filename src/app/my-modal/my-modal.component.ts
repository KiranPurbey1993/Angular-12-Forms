import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrudService } from '../shared/crud.service';


interface ModalData {
  name: string;
  id:string;
  title:string;
}
@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {
  Users: any = [];

  constructor(public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData, public crudService : CrudService) {
      console.log(this.data);
     }

    onNoClick(): void {
      console.log(this.dialogRef.componentInstance.data.id, 'data');
      this.crudService.deleteUser(this.data.id).subscribe(res => {
          this.dialogRef.close();
        })
    }
    closeModal() {
      this.dialogRef.close();
    }
    ngOnInit() {
    }

    fetchUsers() {
      return this.crudService.getUsers().subscribe((res: {}) => {
        this.Users = res;
        // console.log(this.Users, 'this.Usersthis.Users');
      })
    } 
}
