/**
 * Genesys Chat Widget - Configuración e Inicialización
 * 
 * Este archivo contiene la inicialización del widget de chat de Genesys.
 * Carga el script de Genesys y lo configura con el deployment ID correspondiente.
 * 
 * IMPORTANTE: El deploymentId es específico para cada implementación.
 * Asegúrate de usar tu propio deployment ID de Genesys Cloud.
 */

(function (g, e, n, es, ys) {
  g['_genesysJs'] = e;
  g[e] = g[e] || function () {
    (g[e].q = g[e].q || []).push(arguments)
  };
  g[e].t = 1 * new Date();
  g[e].c = es;
  ys = document.createElement('script');
  ys.async = 1;
  ys.src = n;
  ys.charset = 'utf-8';
  document.head.appendChild(ys);
})(window, 'Genesys', 'https://apps.mypurecloud.com/genesys-bootstrap/genesys.min.js', {
  environment: 'prod',
  deploymentId: '8a4367b7-a7a9-4f0e-b4f8-a79c899c9db8'
});
