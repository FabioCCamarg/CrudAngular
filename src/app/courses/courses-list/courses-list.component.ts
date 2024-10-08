import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../course/model/course';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayColumns = ['name', 'categoria', 'actions'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);

  }
  onEdit(course: Course) {
    this.edit.emit(course);
  }
  onDelete(course : Course) {
    this.remove.emit(course);
  }
}
