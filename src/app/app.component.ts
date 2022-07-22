import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngrx-data';
  constructor(private http:HttpClient) {
    this.http.get<any>(`${environment.url}posts.json`)
  }
}
