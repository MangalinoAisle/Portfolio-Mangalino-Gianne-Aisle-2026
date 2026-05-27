import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Resume } from './pages/resume/resume';
import { Contact } from './pages/contact/contact';
// ADD THESE IMPORTS:
import { Blog } from './pages/blog/blog';
import { BlogDetail } from './pages/blog/blog-detail/blog-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'projects', component: Projects },
  { path: 'resume', component: Resume },
  { path: 'contact', component: Contact },
  // ADD THESE TWO PATHS:
  { path: 'blog', component: Blog },
  { path: 'blog/:id', component: BlogDetail },
  { path: '**', redirectTo: '' }
];