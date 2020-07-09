import { Injectable } from '@angular/core';
import { Post } from '../shared/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public posts: Post[];

  constructor(private http: HttpClient) {}
  createPost(post: Post) {
    return this.http.post(environment.baseUri + '/addpost', post);
  }
  getPosts(userId: string) {
    return this.http.get(environment.baseUri + '/getposts/' + userId);
  }
  deletePost(id: string) {
    return this.http.delete(environment.baseUri + '/deletepost/' + id);
  }
  getter() {
    return this.posts;
  }
  setter(posts: Post[]) {
    this.posts = posts;
  }
}
