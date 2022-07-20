import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../counter-service/counter.service';
import { ActivatedRoute } from '@angular/router';

const get_UserData = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      username
      email
      address {
        geo {
          lat
          lng
        }
      }
    }
  }
`;

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.scss'],
})
export class CounterListComponent implements OnInit {
  public postsList: any;

  constructor(
    private counterService: CounterService,
    private apollo: Apollo,
    private activeRoute: ActivatedRoute
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
    this.apollo
      .watchQuery({
        query: get_UserData,
        variables: {
          id: key,
        },
      })
      .valueChanges.subscribe((res: any) => {
        if (res) {
          this.postsList = res.data.user;
        }
      });
  }
}
