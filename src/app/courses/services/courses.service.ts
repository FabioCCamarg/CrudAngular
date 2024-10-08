import { Injectable } from '@angular/core';
import { Course } from './../../course/model/course';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Course[]>(this.API).pipe(
      first(),

      tap((courses) => console.log(courses))
    );
  }

  loadById(id: string) {
    return this.http.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>) {
   return this.create(record);
  }
  private create(record: Partial<Course>) {
    return this.http.post<Course>(this.API, record).pipe(first());
  }
  public update(record: Partial<Course>) {
    return this.http.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }
  public remove(id: string): Observable<Course> {
    return this.http.delete<Course>(`${this.API}/${id}`).pipe(first());
  }
}
