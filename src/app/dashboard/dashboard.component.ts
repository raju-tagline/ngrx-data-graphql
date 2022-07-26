import { Router } from '@angular/router';
import { StudentDataService } from './../student-data/student-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public studentName!: string;
  public studentDetails: any = {};

  constructor(
    private studentDataService: StudentDataService,
    public router: Router
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
      this.studentName =
        this.studentDetails && this.studentDetails.name
          ? this.studentDetails.name
          : '';
    });
  }

  /**
   * editStudent
   */
  public editStudent() {
    const queryParams = {
      id:
        this.studentDetails && this.studentDetails._id
          ? this.studentDetails._id
          : '',
    };
    this.router.navigate([], { queryParams });
  }

  /**
   * cancelEdit
   */
  public cancelEdit() {
    this.router.navigate([], {});
  }

  /**
   * updateStudent
   */
  public updateStudent() {
    if (
      this.studentName.length >= this.studentDetails.name.length &&
      this.studentDetails.name !== this.studentName
    ) {
      const updateData = {
        name: this.studentName,
        _id: this.studentDetails._id,
      };
      this.studentDataService.update(updateData);
      this.router.navigate(['dashboard']);
    } else {
      if (confirm("Are you sure don't want to change anything?")) {
        this.router.navigate(['dashboard']);
      } else {
        return;
      }
    }
  }
}
