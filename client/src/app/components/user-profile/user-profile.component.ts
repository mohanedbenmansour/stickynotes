import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/shared/post';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userInfo;
  public posts: Post[];
  constructor(
    private router: Router,
    private userService: UserService,
    private postService: PostService
  ) {}
  postModel: Post = {
    content: '',
    date: '',
    userId: '',
  };
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userInfo = res['user'];
        this.readposts(this.userInfo._id);
      },
      (err) => {
        console.log('error');
      }
    );
  }

  onSubmit() {
    this.postModel.date = new Date().getDate().toString();
    this.postModel.userId = this.userInfo._id;
    this.postService.createPost(this.postModel).subscribe(
      (data) => {
        console.log(data);
        this.readposts(this.postModel.userId);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  doDelete(post) {
    this.postService.deletePost(post._id).subscribe(
      (data) => {
        console.log(data);
        this.posts.splice(this.posts.indexOf(post), 1);
      },
      (error) => {}
    );
  }
  readposts(id: string) {
    console.log(id, 'BIG TEST');
    this.postService.getPosts(id).subscribe(
      (data) => {
        console.log(data);
        this.posts = data['msg'];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  logout() {
    this.userService.deleteToken();
    this.router.navigate(['signup']);
  }
}
