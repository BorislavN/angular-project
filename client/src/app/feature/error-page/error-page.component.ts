import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  message: String;
  subscription: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2, private titleService: Title, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, "body-error");
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, "body-error");
    this.titleService.setTitle("Oops");

    this.subscription = this.route.queryParams.subscribe((val) => {
      this.message = val.error || "Page Not Found";
    });
  }
}