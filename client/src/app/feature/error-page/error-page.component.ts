import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  message: String;

  constructor(private el: ElementRef, private renderer: Renderer2, private titleService: Title, private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body,"body-error");
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body,"body-error");
    this.titleService.setTitle("Oops");
    this.message = this.route.snapshot.queryParams['error'] || "Page Not Found"
  }
}