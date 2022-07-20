import { PostResolver } from './resolver/post.resolver';
import { CounterListComponent } from './counter-list/counter-list.component';
import { ViewPostComponent } from './posts/view-post/view-post.component';
import { PostsComponent } from './posts/posts/posts.component';
import { HomeComponent } from './posts/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'user-profile/:id',
    component: CounterListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
