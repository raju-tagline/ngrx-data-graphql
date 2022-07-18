import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { get_Post } from 'src/app/store/posts.action';
import { get_posts } from 'src/app/store/posts.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public postsList!: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postsList = this.postService.getAll();
  }
}
