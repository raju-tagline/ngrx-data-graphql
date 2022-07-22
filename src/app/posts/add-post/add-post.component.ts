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
    if (this.router.url.includes('postId')) {
      this.activeRoute.queryParams.subscribe((res: any) => {
        this.postService.entities$.subscribe((data: any) => {
          if (data.length) {
            this.postData = data.find((ele: any) => ele.id === res.postId);
          } else {
            this.postService.getAll().subscribe((resp: any) => {
              this.postData = resp.find((ele: any) => ele.id === res.postId);
            });
          }
          this.addPostForm.patchValue({
            title: this.postData.title,
            body: this.postData.body,
          });
        });
      });
    }
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
          let index: any = Math.floor(this.randomNumber(0, res.length - 1));
          data.userId = res[index].id;
        }
        this.postService.add(data);
        this.postService.getAll();
      });
      this.addPostForm.reset();
      this.router.navigate(['/posts']);
    } else {
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
    this.router.navigate(['/posts']);
  }

  public randomNumber(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }
}
