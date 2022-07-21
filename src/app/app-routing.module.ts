import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostResolver } from './resolver/post.resolver';
import { CounterListComponent } from './counter-list/counter-list.component';
import { ViewPostComponent } from './posts/view-post/view-post.component';
import { PostsComponent } from './posts/posts/posts.component';
import { HomeComponent } from './posts/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { CounterResolver } from './resolver/counter.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
    resolve: {
      posts: PostResolver,
    },
  },
  {
    path: 'post/:id',
    component: ViewPostComponent,
  },
  {
    path: 'user-profile',
    component: CounterListComponent,
    resolve: {
      'user-profile': CounterResolver,
    },
  },
  {
    path: 'user-profile/:id',
    component: CounterListComponent,
  },
  {
    path: 'post',
    component: AddPostComponent,
  },
  {
    path: 'post/:id',
    component: AddPostComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'user-posts',
    component: ViewPostComponent,
  },
  {
    path: 'user-posts/:id',
    component: ViewPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
