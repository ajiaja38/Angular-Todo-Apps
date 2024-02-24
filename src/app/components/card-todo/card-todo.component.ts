import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'card-todo',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './card-todo.component.html',
})
export class CardTodoComponent {}
