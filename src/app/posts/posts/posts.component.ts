import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/model/post.model';
import { get_Post } from 'src/app/store/posts.action';
import { get_posts } from 'src/app/store/posts.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public postsList!: Post[];

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select(get_posts).subscribe((resp: any) => {
      if (resp && resp.posts) {
        this.postsList = resp.posts;
      }
    });
    this.store.dispatch(get_Post());
  }
}
