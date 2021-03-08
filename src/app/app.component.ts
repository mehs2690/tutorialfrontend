import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Posts';
  public posts: [{ _id: string; title: string, content: string }];
  public error: string;
  public message: string;
  public postForm;

  constructor(
    private service: AppService,
    private formBuilder: FormBuilder
  ) {
    console.log('acabo de entrar');
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  public callGetAll() {
    this.service.getPosts().subscribe(
      response => {
        this.posts = response;
      },
      error => {
        this.error = 'no hay datos en el server';
        this.posts = [{ _id: '', title: '', content: '' }];
      }
    );
  }

  public createPost() {
    console.log(`formulario: ${JSON.stringify(this.postForm.value)}`);
    this.service.createPost(this.postForm.value).subscribe(
      response => {
        if (response) {
          this.message = "Se ha creado un post exitosamente";
          this.callGetAll();
        }
      },
      error => {
        this.error = 'no se pudo crear un post';
      }
    );
  }

  public get Title() {
    return this.postForm.get('title');
  }

  public get Content() {
    return this.postForm.get('content');
  }
}
