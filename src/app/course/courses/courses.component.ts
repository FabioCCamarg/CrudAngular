import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../../courses/services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  displayColumns = ['name', 'categoria', 'actions'];

  // coursesService: CoursesService

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {

    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
    );
  }

  onError(errorMsg : string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg

    })
  }
  ngOnInit(): void {

  }
  onAdd() {
    this.router.navigate(['courses/new']);
    console.log('onAdd');
  }
}
