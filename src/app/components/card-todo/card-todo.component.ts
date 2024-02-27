import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TodoDto } from '../../data/interface';

@Component({
  selector: 'card-todo',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './card-todo.component.html',
})
export class CardTodoComponent {
  @Input() todo!: TodoDto;
  defaultImage: string =
    'https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }
}
