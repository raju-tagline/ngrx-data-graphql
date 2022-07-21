import { Router } from '@angular/router';
import { CounterService } from './../../counter-service/counter.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  public userList!: Observable<any>;
  constructor(private counterService: CounterService, public router: Router) {}

  ngOnInit(): void {
    this.counterService.entities$.subscribe((resp: any) => {
      if (!resp.length) {
        this.userList = this.counterService.getAll();
      } else {
        this.userList = this.counterService.entities$;
      }
    });
  }

  /**
   * editPost
   */
  public editUser(post: any) {
    if (post && post.id) {
      const queryParams = {
        userId: post.id,
      };
      this.router.navigate(['/add-user'], { queryParams });
    }
  }

  /**
   * deletePost
   */
  public deleteUser(post: any) {
    if (post && post.id && confirm('WANT TO DELETE')) {
      this.counterService.delete(post.id);
    }
  }
}
