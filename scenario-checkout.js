// =====================================================
// ESCENARIO 1: Carrito de Compras - Funciones UI
// (El tracking se maneja en tracking-escenario1.js)
// =====================================================

// =====================================================
// ABRIR CARRITO
// =====================================================
function openCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('🛒 Carrito abierto');
        
        // Actualizar indicador visual
        const indicator = document.getElementById('cartOpenedIndicator');
        const status = document.getElementById('cartOpenedStatus');
        if (indicator) indicator.classList.add('triggered');
        if (status) status.textContent = '✅ Carrito abierto!';
    }
}

// =====================================================
// CERRAR CARRITO
// =====================================================
function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('🛒 Carrito cerrado');
    }
}

// =====================================================
// MODAL DE AYUDA
// =====================================================
function showHelpModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('helpModal').style.display = 'flex';
    console.log('💬 Modal de ayuda mostrado');
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function connectToAgent() {
    alert('🎧 Conectando con un asesor...\n\nEn producción, aquí se abriría el widget de chat de Genesys.');
    closeHelpModal();
    
    // Enviar evento de conexión
    if (typeof ac !== 'undefined') {
        ac('event', {
            eventName: 'agent_connection_requested',
            customAttributes: {
                source: 'cart_help',
                timestamp: new Date().toISOString()
            }
        });
    }
}

function proceedToCheckout() {
    alert('🛒 Procediendo al checkout...\n\nEsta es una página de demostración.');
    closeCart();
}

// =====================================================
// INICIALIZACIÓN
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Escenario 1: Funciones UI cargadas');
});

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const helpModal = document.getElementById('helpModal');
    
    if (event.target === cartModal) {
        closeCart();
    }
    if (event.target === helpModal) {
        closeHelpModal();
    }
}
