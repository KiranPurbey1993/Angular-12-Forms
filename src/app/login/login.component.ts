import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';


export class User {
  public email: string = '';
  public password: string ='';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  model = new User(
  );
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:any) : void {
    if(form.value.email == 'purbey.kiran@gmail.com' && form.value.password == 'admin'){
     this.router.navigate(["dashboard"]);
    }else {
      alert("Invalid credentials");
      this.router.navigate(["/"]);
    }
    // console.log(form.value);
  }

  goToReactiveForm() : void {
    this.router.navigate(["reactive-form"]);
  }
  
}
