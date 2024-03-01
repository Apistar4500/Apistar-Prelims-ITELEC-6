import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";

@Injectable({
    providedIn:'root',
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts(){
        return [...this.posts]
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    fetchPosts(){
        this.http.get<{message: string, posts: Post[]}>('http://localhost:5000/api/posts').subscribe(data => {
            this.posts = data.posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    addPost(title: string, content: string){
        const post: Post = {title: title, content: content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}