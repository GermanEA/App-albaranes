import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'albaranes',
    loadChildren: () => import('./pages/albaranes/albaranes.module').then( m => m.AlbaranesPageModule)
  },  
  {
    path: 'canvas',
    loadChildren: () => import('./pages/canvas/canvas.module').then( m => m.CanvasPageModule)
  },
  {
    path: 'albaran',
    loadChildren: () => import('./pages/albaran/albaran.module').then( m => m.AlbaranPageModule)
  },
  {
    path: 'inicio/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
