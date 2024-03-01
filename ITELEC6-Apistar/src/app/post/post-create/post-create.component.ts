import { Component, Output, EventEmitter } from "@angular/core"
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from "../post.service";


@Component({
    selector:'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css'],
})

export class PostCreateComponent{
    enteredTitle = '';
    formerContent = '';
    @Output() postCreated = new EventEmitter<Post>();

    constructor(public postService: PostsService){}
    onAddPost(form: NgForm) {
        if(form.invalid){
            return;
        }
        this.postService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
    
}