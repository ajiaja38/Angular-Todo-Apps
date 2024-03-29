import { Component, OnInit } from '@angular/core';
import { CardTodoComponent } from '../../../components/card-todo/card-todo.component';
import { UserService } from '../../../data/services/user.service';
import { TodoService } from '../../../data/services/todo.service';
import { TodoDto } from '../../../data/interface';
import { SkeletonModule } from 'primeng/skeleton';
import { CardTodoSkeletonComponent } from '../../../components/card-todo-skeleton/card-todo-skeleton.component';
import { EmptyTodoComponent } from '../../../components/empty-todo/empty-todo.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardTodoComponent,
    SkeletonModule,
    CardTodoSkeletonComponent,
    EmptyTodoComponent,
    InputTextModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  name: string | undefined;
  todos: TodoDto[] = [];
  originalTodos: TodoDto[] = [];
  isLoading: boolean = false;
  searchValue: string | undefined;

  constructor(
    private readonly userService: UserService,
    private readonly todoService: TodoService
  ) {}

  onSearchChange(e: Event): void {
    const newValue = (e.target as HTMLInputElement).value.toLowerCase();

    if (!newValue) {
      this.todos = [...this.originalTodos];
    } else {
      this.todos = this.originalTodos.filter((data) =>
        data.title.toLowerCase().includes(newValue)
      );
    }
  }

  getAllActiveData(): void {
    this.todoService.getAllActiveTodo().subscribe({
      next: (response) => {
        this.todos = [...response.data];
        this.originalTodos = [...response.data];
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

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

      this.getAllActiveData();

      this.isLoading = false;
    }, 1500);
  }
}
