import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { Horses } from './pages/Horses';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CookiesPolicy } from './pages/CookiesPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { ComplaintsPolicy } from './pages/ComplaintsPolicy';
import { CMSLogin } from './pages/CMSLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { PageEditor } from './pages/admin/PageEditor';
import { GlobalSettings } from './pages/admin/GlobalSettings';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: 'sluzby', Component: Services },
        { path: 'blog', Component: Blog },
        { path: 'nasi-kone', Component: Horses },
        { path: 'o-nas', Component: About },
        { path: 'kontakt', Component: Contact },
        { path: 'ochrana-osobnich-udaju', Component: PrivacyPolicy },
        { path: 'cookies', Component: CookiesPolicy },
        { path: 'obchodni-podminky', Component: TermsConditions },
        { path: 'reklamacni-rad', Component: ComplaintsPolicy },
        { path: 'cms-prihlaseni', Component: CMSLogin },
        { path: '*', Component: NotFound },
      ],
    },
    {
      path: '/admin',
      Component: AdminLayout,
      children: [
        { 
          index: true,
          Component: PageEditor
        },
        { path: 'settings', Component: GlobalSettings },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);