import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service'; // Assuming this is your service for fetching data
// @ts-ignore
import { TeacherService } from 'path-to-teacher-service'; // Update with actual path

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any[];
  selected: string;
  searchText: string;

  // @ts-ignore
  constructor(private service: AppServiceService, private router: Router, private teacherService: TeacherService)
  // Add the teacherService dependency { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher'])
  }

  editTeacher(id: any) {
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
      // @ts-ignore
      this.teacherData = response; // Assuming response is an array of students
    }, (error) => {
      console.log('ERROR - ', error)
    })
  }

  search() {
    if (!this.searchText) {
      this.getTeacherData(); // Reset data if search text is empty
      return;
    }

    // Filter teacherData based on searchText
    const filteredTeachers = this.teacherData.filter(teacher =>
    teacher.name.toLowerCase().includes(this.searchText.toLowerCase())
    );

    //updated teacherData with filtered teachers
    this.teacherService.updateteacherData(filteredTeachers);
    }

  deleteTeacher(itemid: any) {
    const test = {
      id: itemid
    }
    this.service.deleteTeacher(test).subscribe((response) => {
      this.getTeacherData()
    });
  }
}

