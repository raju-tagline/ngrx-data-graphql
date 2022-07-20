import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../counter-service/counter.service';

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.scss']
})
export class CounterListComponent implements OnInit {
  public postsList!: Observable<any>;

  constructor(private counterService:CounterService) { }

  ngOnInit(): void {
    this.postsList = this.counterService.getAll()
  }

}
