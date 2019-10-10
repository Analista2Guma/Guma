
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable, OnChanges } from '@angular/core';


@Injectable()
export class UserService {

  user: Object;
  displayObject: Object;
  displayObjectType: String;
  CAData: Object[];
  privData: Object[];
  popupData: Object;

  constructor() {
    // this.userArray = Object.values(this.users);
  }

  // STATE INFO (user, action, displayObject...)
  getUser(): Observable<any> {
    return observableOf(this.user);
  }

  setUser( newUser ) {
    // console.log(newUser);
    this.user = newUser;
  }

  setDisplayObject( obj: Object ) {
    this.displayObject = obj;
  }

  getDisplayObject(): Observable<any> {
    return observableOf(this.displayObject);
  }

  setDisplayObjectType( type: String ) {
    this.displayObjectType = type;
  }

  getDisplayObjectType(): Observable<any> {
    return observableOf(this.displayObjectType);
  }

  setCAData( obj: Object[] ) {
    // console.log("CAData being set");
    this.CAData = obj;
  }

  getCAData() {
    return observableOf(this.CAData);
  }

  setPrivData( obj: Object[] ) {
    this.privData = obj;
  }

  getPrivData() {
    return observableOf(this.privData);
  }

  setPopupData( obj: Object ) {
    this.popupData = obj;
  }

  // Component Functionality
  contains(array, element) {
    let result = false;
    if (array === []) result = false;
    array.forEach(item => {
      if (item === element) {
        result = true;
      }
    });
    return result;
  }
}
