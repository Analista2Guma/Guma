import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-cruz-azul',
  templateUrl: './cruz-azul.component.html',
  styleUrls: ['./cruz-azul.component.scss'],
})
export class CruzAzulComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
    },
  };

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    
    // ... list of items
    
    {
      id: 11,
      name: 'Nicholas DuBuque',
      username:'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
