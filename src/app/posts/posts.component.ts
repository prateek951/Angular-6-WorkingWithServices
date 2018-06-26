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
      this.postservice.createPost(post)
      .subscribe(
        (response: Response) => {
          post['id'] = response.json().id;
          this.posts.unshift(post);
        },
        (error: AppError) => {
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
     this.postservice.updatePost(post)
     .subscribe(
       response => {
        console.log(response);
      },
       error => {
        alert('An unexpected error occured');
        console.log(error);
     });
   }

   deletePost(post){
    this.postservice.deletePost(post)
    .subscribe(
      response => {
        console.log(response);
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      },
    (error:AppError)=> {
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
    this.postservice.getPosts()
    .subscribe(
      response => {
        this.posts = response.json();
      });
  }

}
