import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'map-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Cruz Azul',
    icon: 'list-outline',
    link: '/pages/cruz-azul',
    home: true,
  },
  {
    title: 'Mercado Privado',
    icon: 'list-outline',
    link: '/pages/privado',
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
