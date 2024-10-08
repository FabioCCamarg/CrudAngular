import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from './../services/courses.service';
import { Injectable } from '@angular/core';
import { Course } from '../../course/model/course';

@Injectable({
  providedIn: 'root',
})
export class courseResolver implements Resolve<Course> {
  constructor(private service: CoursesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ _id: '', name: '', categoria: '' });
  }
}
