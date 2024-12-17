import {
  Directive,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  input,
} from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Directive({
  selector: '[isLoading]',
  standalone: true,
})
export class IsLoadingDirective implements OnChanges {
  public isLoading = input<boolean>(false);
  private componentRef: ComponentRef<SpinnerComponent> | null = null;

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.view.clear();

    if (this.isLoading()) {
      if (!this.componentRef) {
        this.componentRef = this.view.createComponent(SpinnerComponent);
      }
    } else {
      this.view.createEmbeddedView(this.template);
      if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
      }
    }
  }
}
