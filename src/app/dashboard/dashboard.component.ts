import { Component, OnInit } from '@angular/core';
import {CrudService } from '../shared/crud.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

import { MyModalComponent } from '../my-modal/my-modal.component';


export interface StateGroup {
  letter: string;
  names: string[];


}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gridColumns = 4;

  Users: any = [];
 
  name!: string;
  id!: string;
  
  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  }, {
    letter: 'C',
    names: ['California', 'Colorado', 'Connecticut']
  }, {
    letter: 'D',
    names: ['Delaware']
  }, {
    letter: 'F',
    names: ['Florida']
  }, {
    letter: 'G',
    names: ['Georgia']
  }, {
    letter: 'H',
    names: ['Hawaii']
  }, {
    letter: 'I',
    names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
  }, {
    letter: 'K',
    names: ['Kansas', 'Kentucky']
  }, {
    letter: 'L',
    names: ['Louisiana']
  }, {
    letter: 'M',
    names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
      'Minnesota', 'Mississippi', 'Missouri', 'Montana']
  }, {
    letter: 'N',
    names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota']
  }, {
    letter: 'O',
    names: ['Ohio', 'Oklahoma', 'Oregon']
  }, {
    letter: 'P',
    names: ['Pennsylvania']
  }, {
    letter: 'R',
    names: ['Rhode Island']
  }, {
    letter: 'S',
    names: ['South Carolina', 'South Dakota']
  }, {
    letter: 'T',
    names: ['Tennessee', 'Texas']
  }, {
    letter: 'U',
    names: ['Utah']
  }, {
    letter: 'V',
    names: ['Vermont', 'Virginia']
  }, {
    letter: 'W',
    names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  }];

  stateGroupOptions!: Observable<StateGroup[]>;

  constructor(public crudService : CrudService, private _formBuilder: FormBuilder,
     public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUsers();

    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
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

  openDialog(user:any) {
    const dialogRef = this.dialog.open(MyModalComponent, { width: '250px',
    data: { name: user.name, id: user.id, title:'Are you sure you want to delete this detail?' }
  });
      
    

    dialogRef.afterClosed().subscribe(res => {
      this.name = res;
      this.fetchUsers()
      // this.crudService.deleteUser(user.id).subscribe(res => {
      //   
      // })
    });
  }
}
