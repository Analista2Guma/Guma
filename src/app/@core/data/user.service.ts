
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class UserService {

  user: Object;
  displayObject: Object;
  displayObjectType: String;
  CAData: Map<string, Object>;
  privData: Map<string, Object>;
  aggregateData: Map<string, Object>;
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

  setCAData( obj: Map<string, Object> ) {
    console.log("CAData being set: ", obj);
    this.CAData = obj;
  }

  getCAData() {
    return observableOf(this.CAData);
  }

  setPrivData( obj: Map<string, Object> ) {
    console.log("privData being set: ", obj);
    this.privData = obj;
  }

  getPrivData() {
    return observableOf(this.privData);
  }

  setAggregateData( obj: Map<string, Object> ) {
    console.log("AggData being set: ", obj);
    this.aggregateData = obj;
  }

  getAggregateData() {
    return observableOf(this.aggregateData);
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
