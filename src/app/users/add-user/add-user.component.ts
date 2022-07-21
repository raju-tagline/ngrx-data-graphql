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
          let userData = [];
          if (data.length) {
            userData = data.find((ele: any) => ele.id === res.userId);
          } else {
            this.counterService.getAll().subscribe((resp: any) => {
              userData = resp.find((ele: any) => ele.id === res.userId);
            });
          }
          this.addUserForm.patchValue({
            email: userData.email,
            address: userData.address,
            full_name: userData.full_name,
            gender: userData.gender,
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
    const data: any = {
      ...this.addUserForm.value,
      userId:
        this.addUserForm.value.email.toLowerCase() +
        this.addUserForm.value.full_name.toLowerCase(),
    };
    this.counterService.add(data);
    this.addUserForm.reset();
  }
}
