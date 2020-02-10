import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../@core/data/user.service';


@Component({
  selector: 'ngx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  displayObject: Object;
  displayObjectType: String;

  constructor(private router: Router,
              private userService: UserService) {
    this.userService.getDisplayObject()
    .subscribe((product: any) => {
      console.log(product);
      this.displayObject = product;
    });
    this.userService.getDisplayObjectType()
    .subscribe((objType: any) => this.displayObjectType = objType);
  }

  close() {
    const newRoute = 'pages/' + this.displayObjectType;
    this.router.navigate([newRoute]);
  }

  ngOnInit() {
    if (!this.displayObject ) this.router.navigate(['pages/ca']);
  }
}
