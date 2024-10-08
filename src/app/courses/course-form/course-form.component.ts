import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators  } from '@angular/forms';
import { Location } from '@angular/common';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../course/model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{

  form =  this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    categoria: ['', [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute ) {

    }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id:course._id,
      name: course.name,
      categoria: course.categoria
    });
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

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')) {
      const requiredLength: number = field.errors? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength: number = field.errors? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

}
