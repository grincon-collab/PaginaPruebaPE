/**
 * Sistema de Reinicio de Tracking
 * 
 * Permite reiniciar el tracking de Genesys y limpiar todos los datos
 * de seguimiento almacenados. Útil para pruebas y debugging.
 */

/**
 * Reinicia todo el sistema de tracking
 * - Envía evento de finalización a Genesys
 * - Limpia variables globales del tracking
 * - Limpia datos del localStorage
 */
function reiniciarTracking() {
    // Enviar evento de finalización a Genesys
    try {
        Genesys("command", "Journey.record", {
            eventName: 'finalizarSesionTracking',
            customAttributes: {
                url: location.href,
                timestamp: new Date().toISOString(),
                action: 'reset'
            }
        });
        console.log('📊 Evento: finalizarSesionTracking enviado a Genesys');
    } catch(e) {
        console.error('Error enviando evento de finalización:', e);
    }

    // Limpiar variables globales del tracking
    if (window.__apdMinicartInit) {
        delete window.__apdMinicartInit;
        console.log('✅ Variable __apdMinicartInit eliminada');
    }

    if (window.__apdBindMinicart) {
        delete window.__apdBindMinicart;
        console.log('✅ Función __apdBindMinicart eliminada');
    }

    // Limpiar localStorage si hay datos
    try {
        localStorage.removeItem('trackingData');
        console.log('✅ Datos de tracking eliminados del localStorage');
    } catch(e) {
        console.warn('No se pudo limpiar localStorage:', e);
    }

    // Mostrar confirmación
    alert('✅ Tracking reiniciado correctamente.\n\nPuedes comenzar una nueva prueba.');
    
    // Opcional: descomentar para recargar la página automáticamente
    // location.reload();
}
