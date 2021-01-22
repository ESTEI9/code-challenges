import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public color?: string;
  public message?: string;
  
  @ViewChild('toast') toast!: ElementRef;

  constructor(
      private toastService: ToastService,
      private renderer: Renderer2
  ) {
    this.toastService.createToast.subscribe((obj:any) => {
        this.color = obj.color;
        this.message = obj.message;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
      this.showToast();
  }

  showToast() {
    if(this.message) {
        this.renderer.addClass(this.toast.nativeElement, 'show');
        setTimeout(() => {
            this.renderer.removeClass(this.toast.nativeElement, 'show');
            this.color = undefined;
            this.message = undefined;
        }, 2000);
      }
  }

}
