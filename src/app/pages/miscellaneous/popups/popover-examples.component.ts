import { Component } from '@angular/core';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-popover-form',
  template: `
  <div class="row">
  <div class="col">
    <nb-card>

      <nb-card-header>Bodega 6</nb-card-header>

      <nb-card-body>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Categoría</label>
              <input disabled [(ngModel)]="popupData.CLASE_ABC" name="CLASE_ABC" type="text" class="form-control">
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Meses Disponibles Bodega 6</label>
              <input disabled [(ngModel)]="popupData.md06" name="md06" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Disponible</label>
              <input disabled [(ngModel)]="popupData.CANT_DISPONIBLE" name="CANT_DISPONIBLE" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Pedida</label>
              <input disabled [(ngModel)]="popupData.CANT_PEDIDA" name="CANT_PEDIDA" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>En Tránsito</label>
              <input disabled [(ngModel)]="popupData.CANT_TRANSITO" name="CANT_TRANSITO" type="text" class="form-control">
            </div>
          </div>
        </div>
      </nb-card-body>
    </nb-card>
  </div>

  <div class="col">
    <nb-card>
      <nb-card-header>Bodega 2</nb-card-header>

      <nb-card-body>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Categoría (privado)</label>
              <input disabled [(ngModel)]="popupData.CLASE_ABC_privado" name="CLASE_ABC_privado" type="text" class="form-control">
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Meses Disponibles Bodega 2</label>
              <input disabled [(ngModel)]="popupData.md02" name="md02" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Disponible (privado)</label>
              <input disabled [(ngModel)]="popupData.CANT_DISPONIBLE_privado" name="CANT_DISPONIBLE_privado" type="text" class="form-control">
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Minima Existencia Permitida Bod2</label>
              <input disabled [(ngModel)]="popupData.me02" name="me02" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>Pedida (privado)</label>
              <input disabled [(ngModel)]="popupData.CANT_PEDIDA_privado" name="CANT_PEDIDA_privado" type="text" class="form-control">
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label>Meses Disponibles Bod2 Privado</label>
              <input disabled [(ngModel)]="popupData.md02_privado" name="md02_privado" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>En Tránsito (privado)</label>
              <input disabled [(ngModel)]="popupData.CANT_TRANSITO_privado" name="CANT_TRANSITO_privado" type="text" class="form-control">
            </div>
          </div>
        </div>
      </nb-card-body>
    </nb-card>
  </div>
</div>
  `,
  styles: [`
    :host {
        display: block;
        padding-bottom: 5rem;
        font-family: courier;
        border: 10px solid black;

    }
  `],
})
export class NgxPopoverFormComponent {
    popupData: Object = {};

    constructor(private userService: UserService) {
        this.popupData = this.userService.popupData;
    }
}


