import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../@core/data/usuario.service';


@Component({
  selector: 'ngx-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  displayObject: Object;
  displayObjectType: String;

  constructor(private router: Router,
              private userService: UsuarioService) {
    this.userService.getDisplayObject()
    .subscribe((product: any) => {
      this.displayObject = product;
    });
    this.userService.getDisplayObjectType()
    .subscribe((objType: any) => this.displayObjectType = objType);
  }

  close() {
    const newRoute = 'paginas/' + this.displayObjectType;
    this.router.navigate([newRoute]);
  }

  ngOnInit() {
    if (!this.displayObject ) this.router.navigate(['paginas/ca']);
  }
}
