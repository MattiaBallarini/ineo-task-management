import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PageComponent } from '@lib';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TasksFacade } from './store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    RouterModule,
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private taskFacade = inject(TasksFacade);
  protected currentPage$ = this.taskFacade.currentPage$;
}
