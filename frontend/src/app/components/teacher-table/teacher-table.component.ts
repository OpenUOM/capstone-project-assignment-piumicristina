import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';
@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})

// ... (existing imports)

export class TeacherTableComponent implements OnInit {

  // ... (existing properties and methods)

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any;
  selected: any;

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher'])
  }

  editTeacher(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras)
  }

  getTeacherData() {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe((response) => {
      this.teacherData = Object.keys(response).map((key) => [response[key]]);
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  getStudentData() {
    this.selected = 'Students';
    this.service.getStudentData().subscribe((response) => {
      this.teacherData = response;
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  deleteTeacher(itemid) {
    const test = {
      id: itemid
    }
    this.service.deleteTeacher(test).subscribe((response) => {
      this.getTeacherData()
    })
  }
}

  search(value: string) {
    if (!value.trim()) {
      this.getTeacherData(); // If search query is empty, reset to all teachers
      return;
    }

    value = value.toLowerCase(); // Convert search query to lowercase for case-insensitive search

    this.service.getTeacherData().subscribe((response) => {
      this.teacherData = Object.keys(response)
          .map((key) => response[key])
          .filter((teacher) => teacher.name.toLowerCase().includes(value)); // Filter teachers by name
    }, (error) => {
      console.log('ERROR - ', error)
    });
  }
}

