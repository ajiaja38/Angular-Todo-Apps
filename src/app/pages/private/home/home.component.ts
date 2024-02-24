import { Component } from '@angular/core';
import { CardTodoComponent } from '../../../components/card-todo/card-todo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardTodoComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
