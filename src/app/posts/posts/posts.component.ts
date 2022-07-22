import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public postsList!: Observable<any[]>;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    // this.postsList = this.postService.getAll();
    this.postService.entities$.subscribe((res: any) => {
      if (res.length) {
        this.postsList = this.postService.entities$;
      } else {
        this.postsList = this.postService.getAll();
      }
    });
  }

  /**
   * viewUserData()
   */
  public viewUserData(post: any) {
    if (post && post.userId) {
      const queryParams = {
        userId: post.userId,
      };
      this.router.navigate(['user-profile'], { queryParams });
    }
  }

  /**
   * editPost
   */
  public editPost(post: any) {
    if (post && post.id) {
      const queryParams = {
        postId: post.id,
      };
      this.router.navigate(['post'], { queryParams });
    }
  }

  /**
   * deletePost
   */
  public deletePost(post: any) {
    if (post && post.id && confirm('WANT TO DELETE')) {
      this.postService.delete(post.id);
    }
  }
}
