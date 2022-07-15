import { Component, OnInit } from '@angular/core';
import { GraphqlQueryService } from 'src/app/services/graphql-query.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public postsList: any;

  constructor(private graphqlQueryService: GraphqlQueryService) {}

  ngOnInit(): void {
    this.graphqlQueryService.getPosts().subscribe((res: any) => {
      if (res?.data?.posts?.data) {
        this.postsList = res?.data?.posts?.data;
      }
    });
  }
}
