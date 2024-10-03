import { Injectable } from '@angular/core';
import { Course } from './../../course/model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Course[]>(this.API)
    .pipe(
      first(),

      tap(courses => console.log(courses))
    );
  }
  save(record: Partial<Course>) {
   return this.http.post<Course>(this.API, record).pipe(first());
  }
}
