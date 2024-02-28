import { Component, OnInit } from '@angular/core';
import { CardTodoComponent } from '../../../components/card-todo/card-todo.component';
import { UserService } from '../../../data/services/user.service';
import { TodoService } from '../../../data/services/todo.service';
import { TodoDto } from '../../../data/interface';
import { SkeletonModule } from 'primeng/skeleton';
import { CardTodoSkeletonComponent } from '../../../components/card-todo-skeleton/card-todo-skeleton.component';
import { EmptyTodoComponent } from '../../../components/empty-todo/empty-todo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardTodoComponent,
    SkeletonModule,
    CardTodoSkeletonComponent,
    EmptyTodoComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  name: string | undefined;
  todos: TodoDto[] = [];
  isLoading: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.userService.getLoggedUser().subscribe({
        next: (response) => {
          this.name = response.data.name;
        },
        error: (err) => {
          console.log(err);
        },
      });

      this.todoService.getAllActiveTodo().subscribe({
        next: (response) => {
          this.todos = [...this.todos, ...response.data];
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });

      this.isLoading = false;
    }, 1500);
  }
}
