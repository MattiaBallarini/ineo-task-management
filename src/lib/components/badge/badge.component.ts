import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskStatusDirective } from '../../directives';
import { TTaskStatus } from '../../types';

@Component({
  selector: 'ineo-badge',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TaskStatusDirective],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  public status = input.required<TTaskStatus>();
}
