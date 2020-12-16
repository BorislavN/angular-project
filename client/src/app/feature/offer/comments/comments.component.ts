import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { IComment } from 'src/app/shared/interface/comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  form: FormGroup;
  comments: IComment[];
  isLoading: boolean;
  hasUser$: Observable<boolean>;

  constructor(private authService: AuthService,
    private commentService: CommentService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder) {

    this.isLoading = false;
    this.hasUser$ = this.authService.isLogged$;

    this.form = this.builder.group({
      text: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Offer Comments");
    this.comments = this.route.snapshot.data['comments'];
  }

  submitFormHandler(): void {
    this.isLoading = true;

    this.commentService.addComment(this.route.snapshot.params['id'], this.form.value).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.comments = result;
        this.form.reset();
      },
      error: (err) => {
        this.router.navigate(["/error"], { queryParams: { error: (err?.error?.message || "An error occurred while posting!") } });
      }
    });
  }

}
