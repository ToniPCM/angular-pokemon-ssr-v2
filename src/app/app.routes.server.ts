import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Server, // Esto fuerza el SSR para cada petición
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // El resto se puede pre-renderizar
  },
];
