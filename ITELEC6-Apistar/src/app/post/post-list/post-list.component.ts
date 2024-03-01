import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import {Post} from '../post.model'
import { PostsService } from "../post.service";

@Component({
    selector: 'app-post-list',
    templateUrl: "./post-list.component.html",
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent{

   posts: Post[] = [];
   private postsSub!: Subscription;

   constructor (public postsService: PostsService) {}
   ngOnInit(){
       this.postsService.fetchPosts();
       this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[])=> {
           this.posts = posts;
       });
   }
}