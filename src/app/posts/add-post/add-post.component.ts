import { Router, ActivatedRoute } from '@angular/router';
import { CounterService } from './../../counter-service/counter.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  public addPostForm!: FormGroup;
  public postData: any;

  constructor(
    private postService: PostService,
    private counterService: CounterService,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * createForm
   */
  public createForm() {
    this.addPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (this.addPostForm.invalid) {
      return;
    }
    if (!this.router.url.includes('postId')) {
      let data: any = {
        ...this.addPostForm.value,
      };
      this.counterService.getAll().subscribe((res: any) => {
        if (res) {
          let index: any =
            res.length - Math.floor(Math.random() * (res.length / 2));
          index >= res.length ? index - 1 : index;
          data.userId = res[index].id;
        }
        this.postService.add(data);
      });
      this.addPostForm.reset();
      this.router.navigate(['/posts']);
    } else{
      this.activeRoute.queryParams.subscribe((res: any) => {
        this.postService.getAll().subscribe((data: any) => {
          this.postData = data.find((ele: any) => ele.id === res.postId);
          this.addPostForm.patchValue({
            title: this.postData.title,
            body: this.postData.body,
          });
        });
      });
      this.updatePost();
    }
  }

  /**
   * updatePost
   */
  public updatePost() {
    const postData = {
      ...this.addPostForm.value,
      userId: this.postData.userId,
      id: this.postData.id,
    };
    this.postService.update(postData);
    this.addPostForm.reset();
    this.postService.getAll()
    this.router.navigate(['/posts']);
  }
}
