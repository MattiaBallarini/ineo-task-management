import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import * as actions from './actions';
import { TaskService } from './services';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { getToday, getTomorrow, TINeoPage } from '@lib';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../../../lib/modals/task-modal.component';
import { Store } from '@ngrx/store';
import * as selectors from './selectors';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);
  private store = inject(Store);

  currentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      map(
        ({ payload }) =>
          (payload.routerState.url
            .split('?')[0]
            .split('/')
            .pop() as TINeoPage) || ''
      ),
      map((currentPage) => actions.SetCurrentPage({ currentPage }))
    )
  );

  statuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      withLatestFrom(this.store.select(selectors.SelectStatuses)),
      filter(([, statuses]) => !statuses),
      map(actions.GetTaskStatuses)
    )
  );

  navigateToDashboardPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      filter((action) => action.payload.routerState.url.includes('/dashboard')),
      map(() => ({ from: getToday(), to: getToday() })),
      map(actions.GetTasks)
    )
  );

  navigateToTaskPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      filter((action) => action.payload.routerState.url.includes('/tasks')),
      map(() => actions.GetTasks({}))
    )
  );

  openTaskModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.OpenTaskModal),
        withLatestFrom(this.store.select(selectors.SelectStatuses)),
        tap(([{ task }]) =>
          this.dialog.open(TaskModalComponent, {
            data: task,
            width: '80vh',
            height: '580px',
          })
        )
      ),
    { dispatch: false }
  );

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.GetTasks),
      switchMap((request) =>
        this.taskService.getTasks(request).pipe(
          map((tasks) => actions.GetTasksSuccess({ tasks })),
          catchError((errors) => of(actions.GetTasksFailure({ errors })))
        )
      )
    )
  );

  getTaskStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.GetTaskStatuses),
      switchMap(() =>
        this.taskService.getTaskStatuses().pipe(
          map((statuses) => actions.GetTaskStatusesSuccess({ statuses })),
          catchError((errors) => of(actions.GetTaskStatusesFailure({ errors })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.CreateTask),
      switchMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map((task) => actions.CreateTaskSuccess({ task })),
          catchError((errors) => of(actions.CreateTaskFailure({ errors })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UpdateTask),
      switchMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map((task) => actions.UpdateTaskSuccess({ task })),
          catchError((errors) => of(actions.UpdateTaskFailure({ errors })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.DeleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => actions.DeleteTaskSuccess({ id })),
          catchError((errors) => of(actions.DeleteTaskFailure({ errors })))
        )
      )
    )
  );

  taskSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.CreateTaskSuccess, actions.UpdateTaskSuccess),
      withLatestFrom(this.store.select(selectors.SelectCurrentPage)),
      tap(() => this.dialog.closeAll()),
      map(([, page]) => ({
        from: page === 'dashboard' ? getToday() : undefined,
        to: page === 'dashboard' ? getToday() : undefined,
      })),
      map(actions.GetTasks)
    )
  );
}
