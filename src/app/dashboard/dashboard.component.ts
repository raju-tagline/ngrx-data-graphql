import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public studentDetails: any = {};

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudentProfile();
  }

  /**
   * getStudentProfile
   */
  public getStudentProfile() {
    this.studentService.studentData().subscribe((res: any) => {
      if (res && res.statusCode === 200) {
        this.studentDetails = res.data;
      }
    });
  }

  /**
   * editStudent
   */
  public editStudent() {
    
  }
}
