import { Component, OnInit, ViewChild  } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, AbstractControl  } from "@angular/forms";
import {Router} from '@angular/router';


export interface Subject {
  name: string;
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  myForm!: FormGroup;
  submitted = false;
  @ViewChild('chipList', { static: true }) chipList: any;
  GradeArray: any = ['8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  selected = this.GradeArray[2];
  SubjectsArray: Subject[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  /* Reactive form */
  reactiveForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male'],
      dob: ['', [Validators.required]],
      grade: [''],
      subjects: [this.SubjectsArray]
    })
  }

  /* Date */
    date(e:any) {
      // console.log(this.myForm,'999');
      var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
      this.myForm.value('dob').setValue(convertDate, {
        onlyself: true
      })
    }

      /* Add dynamic Subject */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.SubjectsArray.length < 5) {
      this.SubjectsArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.SubjectsArray.indexOf(subject);
    if (index >= 0) {
      this.SubjectsArray.splice(index, 1);
    }
  }  

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.myForm.value);
    this.submitted = true;

    
  }

  goToLoginForm(){
    this.router.navigate(["login"]);
  }
}
