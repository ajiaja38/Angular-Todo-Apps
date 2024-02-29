import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastService } from '../../../data/services/toast.service';
import { TodoService } from '../../../data/services/todo.service';
import { Router } from '@angular/router';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FileUploadModule,
    SpinnerComponent,
    InputTextareaModule,
  ],
  templateUrl: './add-todo.component.html',
})
export class AddTodoComponent {
  isLoading: boolean = false;
  image: string = '';

  addTodoForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(
    private readonly toastService: ToastService,
    private readonly todoService: TodoService,
    private readonly router: Router
  ) {}

  onFileChange(event: FileUploadEvent): void {
    if (event.files.length) {
      this.isLoading = true;
      setTimeout(() => {
        const formData: FormData = new FormData();
        formData.append('file', event.files[0]);

        this.todoService.uploader(formData).subscribe({
          next: (response) => {
            this.image = response.data.filename;
          },
          error: (err) => {
            console.log(err);
          },
        });

        this.isLoading = false;
      }, 1000);
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    setTimeout(() => {
      const formValue = this.addTodoForm;
      if (formValue.controls['title'].errors) {
        this.toastService.error('Judul Tidak Boleh Kosong');
        this.isLoading = false;
        return;
      }

      if (formValue.controls['content'].errors) {
        this.toastService.error('Isi Tidak Boleh Kosong');
        this.isLoading = false;
        return;
      }

      this.todoService
        .createTodo({
          title: formValue.value.title,
          content: formValue.value.content,
          image: this.image,
        })
        .subscribe({
          next: () => {
            this.toastService.success('Todo Berhasil Ditambahkan');
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            console.log(err);
          },
        });

      this.isLoading = false;
    }, 1500);
  }
}
