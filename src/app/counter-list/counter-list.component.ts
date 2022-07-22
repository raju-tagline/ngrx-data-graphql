import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter-service/counter.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.scss'],
})
export class CounterListComponent implements OnInit {
  public postsList: any;

  constructor(
    private counterService: CounterService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.postsList = this.counterService.getAll();
    this.activeRoute.queryParams.subscribe((res: any) => {
      if (res) {
        this.getUserData(res.userId);
      }
    });
  }

  /**
   * getUserData
   */
  public getUserData(key: any) {
    this.counterService.entities$.subscribe((data: any) => {
      let userData: any = [];
      if (data.length) {
        userData = data.find((ele: any) => ele.id === key);
      } else {
        this.counterService.getAll().subscribe((resp: any) => {
          userData = resp.find((ele: any) => ele.id === key);
        });
      }
      this.postsList = userData;
    });
  }

  /**
   * changePath()
   */
  public changePath(userId: any) {
    const queryParams = {
      userId: userId,
    };
    this.router.navigate(['/user-posts'], { queryParams });
  }
}
