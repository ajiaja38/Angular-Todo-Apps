import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-todo-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './card-todo-skeleton.component.html',
})
export class CardTodoSkeletonComponent {}
