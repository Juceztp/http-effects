import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  constructor (private actions$: Actions, public userService: UserService) {}

  @Effect()
  loadUser$ = this.actions$
    .ofType(userActions.LOAD_USER)
    .pipe(
      switchMap( action => this.userService
        .getUserById(action['id'])
        .pipe(
          map(user => new userActions.LoadUserSuccess(user)),
          catchError(error => of(new userActions.LoadUserFail(error)))
        ))
    );
}
