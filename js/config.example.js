/**
 * Archivo de Configuración de Ejemplo para Genesys
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo y renómbralo a: config.js
 * 2. Reemplaza 'TU-DEPLOYMENT-ID-AQUI' con tu Deployment ID real
 * 3. Asegúrate de que config.js esté en el .gitignore
 * 4. NO subas config.js a GitHub
 * 
 * USO:
 * - Incluye este archivo ANTES de genesys-widget.js en tu HTML
 * - Ejemplo: <script src="js/config.js"></script>
 *           <script src="js/genesys-widget.js"></script>
 */

window.GENESYS_CONFIG = {
  // Reemplaza con tu Deployment ID de Genesys Cloud
  deploymentId: 'TU-DEPLOYMENT-ID-AQUI',
  
  // Configuración del entorno (normalmente 'prod')
  environment: 'prod',
  
  // URL del script de Genesys (normalmente no necesitas cambiarlo)
  scriptUrl: 'https://apps.mypurecloud.com/genesys-bootstrap/genesys.min.js'
};

// Para usar esta configuración, modifica genesys-widget.js para leer estos valores:
// deploymentId: window.GENESYS_CONFIG?.deploymentId || 'default-id'
