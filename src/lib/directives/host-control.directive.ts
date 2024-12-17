import {
  Directive,
  inject,
  Injector,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

export class IneoErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && control.touched);
  }
}

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: HostControlDirective,
    },
  ],
})
export class HostControlDirective
  implements ControlValueAccessor, OnInit, OnDestroy
{
  control!: FormControl;

  private readonly injector = inject(Injector);
  private subscription?: Subscription;

  public onChange = (_: unknown) => {};
  public onTouched = () => {};
  public disabled = false;

  ngOnInit() {
    const ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });

    if (ngControl instanceof FormControlDirective) {
      this.control = ngControl.control;
    } else if (ngControl instanceof FormControlName) {
      const container = this.injector.get(ControlContainer)
        .control as FormGroup;
      this.control = container.controls[ngControl.name!] as FormControl;
    } else {
      this.control = new FormControl();
    }
  }

  writeValue(_: unknown) {}

  registerOnChange(onChange: (_: unknown) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
