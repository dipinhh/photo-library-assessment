import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './ui/common/header/header.component';

const routes: Routes = [
  {path: '',  redirectTo: 'home/photos', pathMatch: 'full'},
  {path: 'home', component: HeaderComponent, children:[
    {
      path: 'photos',
      loadChildren: () => import('./ui/all-photos/all-photos.module').then(m => m.AllPhotosModule)
    },
    {
      path: 'favorites',
      loadChildren: () => import('./ui/favorites/favorites.module').then(m => m.FavoritesModule)
    },
    {
      path: 'photos/:id',
      loadChildren: () => import('./ui/image-viewer/image-viewer.module').then(m => m.ImageViewerModule)
    },
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
