import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'empty-todo',
  standalone: true,
  imports: [],
  templateUrl: './empty-todo.component.html',
})
export class EmptyTodoComponent implements OnInit {
  currentPath: String | undefined;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentPath = this.route.snapshot.routeConfig?.path;
  }
}
