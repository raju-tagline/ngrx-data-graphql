import { StudentDataService } from './../student-data/student-data.service';
import { StudentService } from './../service/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public studentDetails: any = {};

  constructor(
    private studentService: StudentService,
    private studentDataService: StudentDataService
  ) {}

  ngOnInit(): void {
    this.getStudentProfile();
  }

  /**
   * getStudentProfile
   */
  public getStudentProfile() {
    this.studentDataService.entities$.subscribe((res: any) => {
      if (res && res.length) {
        this.studentDetails = res[0];
      } else {
        this.studentDataService.getAll();
      }
    });
  }

  /**
   * editStudent
   */
  public editStudent() {}
}
