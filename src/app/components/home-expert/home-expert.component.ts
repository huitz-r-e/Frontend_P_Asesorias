import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  import Swal from 'sweetalert2'

@Component({
  selector: 'app-home-expert',
  templateUrl: './home-expert.component.html',
  styleUrls: ['./home-expert.component.css']
})
export class HomeExpertComponent implements OnInit{

  constructor(private rou: Router,) { }

  ngOnInit(): void {}

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.rou.navigate(['/login']);
}

  confirmarAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
        Swal.fire(
          'Logged Out!',
          'You have been logged out successfully.',
          'success'
        );
      }
    });
  }
  userD:any;;
  getUser(){
    const userL=JSON.parse(localStorage.getItem('user')||'[]');
    this.userD=userL;
    console.log(this.userD);

    
  }

}
