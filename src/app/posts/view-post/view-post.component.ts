import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  public postsList!: any;

  constructor(
    public router: Router,
    private postService: PostService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((res: any) => {
      this.activeRoute.queryParams.subscribe((data: any) => {
        let posts: any = [];
        res.forEach((resp: any) => {
          if (resp.userId === data.userId) {
            posts.push(resp);
          }
        });
        this.postsList = posts;
      });
    });
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
