import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

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
      .subscribe(response => {
        post['id'] = response.json().id;
        this.posts.unshift(post);
      },error => {
        alert('An unexpected error occured');
        console.log(error);
      })
   }
   updatePost(post){
     this.postservice.updatePost(post)
     .subscribe(response => {
       console.log(response);
     })
   }

   deletePost(post){
    this.postservice.deletePost(post)
    .subscribe(response => {
      console.log(response);
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
    })
   }


  ngOnInit() {
    this.postservice.getPosts()
    .subscribe(response => {
      this.posts = response.json();
    })
  }

}
