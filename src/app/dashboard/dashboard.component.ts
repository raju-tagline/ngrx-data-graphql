import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.getStudentProfile()
  }

  /**
   * getStudentProfile
   */
  public getStudentProfile() {
      this.studentService.studentData().subscribe((res:any) => {
        console.log('res :>> ', res);
      })
  }
}
