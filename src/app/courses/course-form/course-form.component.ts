import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder  } from '@angular/forms';
import { Location } from '@angular/common';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{

  form =  this.formBuilder.group({
    name: [''],
    categoria: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {}

  ngOnInit(): void {

  }
  onSubmit() {
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error=> this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso Salvo Com Sucesso!', '', {duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao Salvar Curso.', '', {duration: 5000 });
  }

}
