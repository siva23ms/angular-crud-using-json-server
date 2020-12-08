import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tutorial';
  allUsers: object;
  userObject = {
    name: '',
    email: '',
    phone: '',
    status: ''
  }
  isEdit: boolean;

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getUser();
  }
  addUser(formObj){
    this.apiService.createUser(formObj).subscribe((response) => {
      if(response){
        this.getUser();
        this.userObject = {
          name: '',
          email: '',
          phone: '',
          status: ''
        }
      }
    });
  }

  getUser(){
    this.apiService.getUser().subscribe((data) => {
      this.allUsers = data;
    });
  }

  editUser(user){
    this.isEdit = true;
    this.userObject = user;
  }

  updateUser(){
    this.isEdit = !this.isEdit;
    this.apiService.updateUser(this.userObject).subscribe((response) => {
      if(response){
        this.getUser();
        this.userObject = {
          name: '',
          email: '',
          phone: '',
          status: ''
        }
      }
    });
  }

  deleteUser(user){
    this.apiService.deleteUser(user).subscribe((response) => {
      if(response){
        this.getUser();
      }
    });
  }
}
