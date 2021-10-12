import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { FormGroup, FormBuilder, Validators, AbstractControl  } from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  Users: any = [];
  addForm!: FormGroup;
  submitted:boolean =  false;
  
  constructor(public crudService : CrudService, public fb: FormBuilder,  private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  /* Reactive form */
  reactiveForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      des: ['']
    })
  }
  submitForm() {
    console.log(this.addForm.value);
    this.submitted = true;
    if(this.addForm.value.email != (null || undefined) ){
      this.crudService.addUser(this.addForm.value).subscribe((data: {}) => {
        this.router.navigate(['/dashboard'])
      })
     }else {
       alert("Invalid credentials");
       this.router.navigate(["/"]);
     }
  }

}
