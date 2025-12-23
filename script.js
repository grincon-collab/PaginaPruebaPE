// Funciones para el Modal del Carrito de Compras
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar modal al hacer click fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCart();
    }
});

// Función para aplicar el Tracking Snippet
function applySnippet() {
    const snippetTextarea = document.getElementById('trackingSnippet');
    const statusDiv = document.getElementById('snippetStatus');
    const trackingContainer = document.getElementById('trackingContainer');
    
    if (!snippetTextarea) return;
    
    const snippetCode = snippetTextarea.value.trim();
    
    if (!snippetCode) {
        showStatus(statusDiv, 'error', '❌ Por favor, ingrese el código del Tracking Snippet');
        return;
    }
    
    try {
        // Limpiar el contenedor anterior
        trackingContainer.innerHTML = '';
        
        // Crear un elemento temporal para parsear el snippet
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = snippetCode;
        
        // Buscar scripts en el snippet
        const scripts = tempDiv.querySelectorAll('script');
        
        if (scripts.length > 0) {
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                
                // Copiar atributos
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copiar contenido del script
                if (script.textContent) {
                    newScript.textContent = script.textContent;
                }
                
                // Agregar al documento
                document.head.appendChild(newScript);
            });
            
            showStatus(statusDiv, 'success', '✅ Tracking Snippet aplicado correctamente');
            
            // Guardar en localStorage para persistencia
            localStorage.setItem('genesysTrackingSnippet', snippetCode);
            
        } else {
            // Si no hay scripts, intentar inyectar directamente
            const scriptElement = document.createElement('script');
            scriptElement.textContent = snippetCode;
            document.head.appendChild(scriptElement);
            
            showStatus(statusDiv, 'success', '✅ Código inyectado correctamente');
            localStorage.setItem('genesysTrackingSnippet', snippetCode);
        }
        
    } catch (error) {
        showStatus(statusDiv, 'error', '❌ Error al aplicar el snippet: ' + error.message);
        console.error('Error applying tracking snippet:', error);
    }
}

// Función para mostrar mensajes de estado
function showStatus(element, type, message) {
    if (!element) return;
    
    element.className = 'status-message ' + type;
    element.textContent = message;
    element.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// Función para simular eventos (para Página 2)
function simulateEvent(eventType) {
    const statusDiv = document.getElementById('eventStatus');
    
    // Verificar si hay un objeto de Genesys Cloud disponible
    const hasGenesys = typeof ac !== 'undefined' || typeof Genesys !== 'undefined';
    
    let message = '';
    
    switch(eventType) {
        case 'click_product':
            message = '🎯 Evento "Click en Producto" simulado';
            console.log('Simulated event: click_product', { timestamp: new Date().toISOString() });
            break;
        case 'add_to_cart':
            message = '🛒 Evento "Agregar al Carrito" simulado';
            console.log('Simulated event: add_to_cart', { timestamp: new Date().toISOString() });
            break;
        case 'view_page':
            message = '📄 Evento "Vista de Página" simulado';
            console.log('Simulated event: view_page', { timestamp: new Date().toISOString() });
            break;
        default:
            message = '⚠️ Evento desconocido';
    }
    
    if (hasGenesys) {
        message += ' (Genesys detectado)';
    } else {
        message += ' (Genesys no detectado - solo consola)';
    }
    
    showStatus(statusDiv, 'info', message);
}

// Cargar snippet guardado al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedSnippet = localStorage.getItem('genesysTrackingSnippet');
    const snippetTextarea = document.getElementById('trackingSnippet');
    
    if (savedSnippet && snippetTextarea) {
        snippetTextarea.value = savedSnippet;
        
        // Mostrar mensaje de que hay un snippet guardado
        const statusDiv = document.getElementById('snippetStatus');
        if (statusDiv) {
            showStatus(statusDiv, 'info', 'ℹ️ Se encontró un Tracking Snippet guardado. Presione "Aplicar" para activarlo.');
        }
    }
    
    console.log('Predictive Engage Lab - Página cargada correctamente');
    console.log('Para ver eventos simulados, revise la consola del navegador');
});

// Función para limpiar el snippet guardado
function clearSnippet() {
    localStorage.removeItem('genesysTrackingSnippet');
    const snippetTextarea = document.getElementById('trackingSnippet');
    if (snippetTextarea) {
        snippetTextarea.value = '';
    }
    const statusDiv = document.getElementById('snippetStatus');
    showStatus(statusDiv, 'info', 'ℹ️ Tracking Snippet eliminado');
}
