import { ActivatedRoute, Router } from '@angular/router';
import { CounterService } from './../../counter-service/counter.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public addUserForm!: FormGroup;
  public userData: any;

  constructor(
    private counterService: CounterService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.router.url.includes('userId')) {
      this.activatedRoute.queryParams.subscribe((res: any) => {
        this.counterService.entities$.subscribe((data: any) => {
          if (data.length) {
            this.userData = data.find((ele: any) => ele.id === res.userId);
          } else {
            this.counterService.getAll().subscribe((resp: any) => {
              this.userData = resp.find((ele: any) => ele.id === res.userId);
            });
          }
          this.addUserForm.patchValue({
            email:
              this.userData && this.userData.email ? this.userData.email : '',
            address:
              this.userData && this.userData.address
                ? this.userData.address
                : '',
            full_name:
              this.userData && this.userData.full_name
                ? this.userData.full_name
                : '',
            gender:
              this.userData && this.userData.gender ? this.userData.gender : '',
          });
        });
      });
    }
  }

  /**
   * createForm
   */
  public createForm() {
    this.addUserForm = new FormGroup({
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      full_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }
    if (!this.router.url.includes('userId')) {
      const data: any = {
        ...this.addUserForm.value,
        userId:
          this.addUserForm.value.email.toLowerCase() +
          this.addUserForm.value.full_name.toLowerCase(),
      };
      this.counterService.add(data);
      this.counterService.getAll();
      this.addUserForm.reset();
      this.router.navigate(['/users']);
    } else {
      this.updateUser();
    }
  }

  /**
   * updateUser
   */
  public updateUser() {
    const postData = {
      ...this.addUserForm.value,
      userId: this.userData.userId,
      id: this.userData.id,
    };
    this.counterService.update(postData);
    this.addUserForm.reset();
    this.router.navigate(['/users']);
  }
}
