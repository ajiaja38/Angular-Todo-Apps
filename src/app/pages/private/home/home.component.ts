import { Component, OnInit } from '@angular/core';
import { CardTodoComponent } from '../../../components/card-todo/card-todo.component';
import { UserService } from '../../../data/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardTodoComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  name: string | undefined;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userService.getLoggedUser().subscribe({
        next: (response) => {
          this.name = response.data.name;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }, 1500);
  }
}
