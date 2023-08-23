import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    this.service.getStudentData().subscribe((data: any[]) => {
      this.studentData = data;
    });
  }

addNewStudent(){
  this.router.navigate(['addStudent'])
}

editStudent(id){
  const navigationExtras: NavigationExtras = {
    state: {
      id : id
    }
  };
  this.router.navigate(['editStudent'], navigationExtras )
}

deleteStudent(itemid){
  const student = {
    id: itemid
  }
  this.service.deleteStudent(student).subscribe((response)=>{
    this.getStudentData()
  })
}

search(value) {
  let foundItems = [];
  if (value.length <= 0) {
    this.getStudentData();
  } else {
    let b = this.studentData.filter((student) => {
      if (student[0].name.toLowerCase().indexOf(value) > -1) {
        foundItems.push(student)
      }
    });
    this.studentData = foundItems;
  }
}
}