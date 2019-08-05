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
  }

  close() {
    const newRoute = 'pages/' + this.displayObjectType;
    this.router.navigate([newRoute]);
  }

  ngOnInit() {
    this.userService.getDisplayObject()
    .subscribe((product: any) => this.displayObject = product);
    // console.log("Alvarita\n");
    // console.log(this.displayObject);
  }
}
