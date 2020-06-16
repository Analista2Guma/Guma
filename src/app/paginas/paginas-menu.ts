import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Sugerencias',
    icon: 'map-outline',
    link: '/paginas/sugerencias',
    home: true,
  },
  {
    title: 'Cruz Azul',
    icon: 'list-outline',
    link: '/paginas/cruz-azul',
    home: true,
  },
  {
    title: 'Mercado Privado',
    icon: 'list-outline',
    link: '/paginas/privado',
    home: true,
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
