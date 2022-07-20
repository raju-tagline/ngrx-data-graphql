import { PostDataService } from './services/post-data.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts/posts.component';
import { ViewPostComponent } from './posts/view-post/view-post.component';
import { HomeComponent } from './posts/home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CounterDataService } from './counter-service/counter-data.service';
import { CounterListComponent } from './counter-list/counter-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ViewPostComponent,
    HomeComponent,
    CounterListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EntityDataModule.forRoot(entityConfig),
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    postDataService: PostDataService,
    counterDataService: CounterDataService
  ) {
    // entityDataService.registerService('Post', postDataService);
    entityDataService.registerServices({
      Post: postDataService,
      Counter: counterDataService,
    });
  }
}
