import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public postsList!: Observable<Post[]>;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.postsList = this.postService.getAll();
    this.postsList = this.postService.entities$;
  }

  /**
   * viewUserData()
   */
  public viewUserData(userId: any) {
    if (userId) {
      const queryParams = {
        userId: userId,
      };
      this.router.navigate(['user-profile'], { queryParams });
    }
  }

  
}
