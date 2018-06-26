import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Response } from '@angular/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:any[];    
  constructor(private postservice: PostService) {
    
   }

   createPost(input: HTMLInputElement){
     let post = {title : input.value};
     input.value = '';
      this.postservice.create(post)
      .subscribe(
        newPost => {
          post['id'] = newPost.id;
          this.posts.unshift(post);
        },
        (error: AppError) => {
          this.posts.splice(0,1);
          if(error instanceof BadRequestError){
            alert('Post could not be created..Bad Request...');
          }else{
          // alert('An unexpected error occured');
          // console.log(error);
          throw error;
        }
        });
   }
   updatePost(post){
     this.postservice.update(post)
     .subscribe(
       updatedPost => {
        console.log(updatedPost);
      },
       error => {
        alert('An unexpected error occured');
        console.log(error);
     });
   }

   deletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);
    
    this.postservice.delete(post)
    .subscribe(
     null,
    (error:AppError)=> {
        this.posts.splice(index,0,post);
        if(error instanceof NotFoundError){
          alert('This post has already been deleted');
        }else{
          // alert('An unexpected error occured');
          //  console.log(error);
          throw error;
        }
      });
   }


  ngOnInit() {
    this.postservice.getAll()
    .subscribe(
      posts => {
        this.posts = posts;
      });
  }

}
