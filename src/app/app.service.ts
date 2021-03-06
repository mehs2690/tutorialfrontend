import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  public getPosts(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/posts');
  }

  public createPost(
    request: { title: string, content: string }
  ): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/posts', request);
  }
}
