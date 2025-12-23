// =====================================================
// ESCENARIO 1: Carrito de Compras
// Eventos: cart_opened, cart_idle_30s
// =====================================================

let cartTimer = null;
let cartTimeSpent = 0;
let cartIdleEventSent = false;
let helpModalShown = false;

// =====================================================
// ABRIR CARRITO
// =====================================================
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'flex';
    
    // Enviar evento cart_opened a Genesys
    if (typeof ac !== 'undefined') {
        ac('event', {
            eventName: 'cart_opened',
            customAttributes: {
                timestamp: new Date().toISOString(),
                page: 'checkout'
            }
        });
        console.log('📡 Evento enviado: cart_opened');
    }
    
    // Actualizar indicador visual
    const indicator = document.getElementById('cartOpenedIndicator');
    const status = document.getElementById('cartOpenedStatus');
    if (indicator) indicator.classList.add('triggered');
    if (status) status.textContent = '✅ Enviado!';
    
    // Iniciar timer de inactividad en el carrito
    startCartTimer();
}

// =====================================================
// CERRAR CARRITO
// =====================================================
function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
    
    // Detener el timer
    stopCartTimer();
    
    console.log('🛒 Carrito cerrado');
}

// =====================================================
// TIMER DE INACTIVIDAD EN CARRITO
// =====================================================
function startCartTimer() {
    // Resetear contador
    cartTimeSpent = 0;
    
    // Iniciar intervalo
    cartTimer = setInterval(function() {
        cartTimeSpent++;
        
        // Actualizar display del timer
        const timerDisplay = document.getElementById('cartTimer');
        if (timerDisplay) {
            timerDisplay.textContent = cartTimeSpent + 's';
        }
        
        // A los 30 segundos, enviar evento
        if (cartTimeSpent === 30 && !cartIdleEventSent) {
            cartIdleEventSent = true;
            
            // Enviar evento cart_idle_30s a Genesys
            if (typeof ac !== 'undefined') {
                ac('event', {
                    eventName: 'cart_idle_30s',
                    customAttributes: {
                        secondsInCart: cartTimeSpent,
                        timestamp: new Date().toISOString()
                    }
                });
                console.log('📡 Evento enviado: cart_idle_30s');
            }
            
            // Actualizar indicador visual
            const indicator = document.getElementById('cartIdleIndicator');
            const status = document.getElementById('cartIdleStatus');
            if (indicator) indicator.classList.add('triggered');
            if (status) status.textContent = '✅ Enviado!';
            
            // Mostrar modal de ayuda
            showHelpModal();
        }
        
    }, 1000);
}

function stopCartTimer() {
    if (cartTimer) {
        clearInterval(cartTimer);
        cartTimer = null;
    }
}

// =====================================================
// MODAL DE AYUDA
// =====================================================
function showHelpModal() {
    if (helpModalShown) return;
    helpModalShown = true;
    
    // Cerrar carrito y mostrar ayuda
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('helpModal').style.display = 'flex';
    
    console.log('💬 Modal de ayuda mostrado');
}

function closeHelpModal() {
    document.getElementById('helpModal').style.display = 'none';
}

function connectToAgent() {
    alert('🎧 Conectando con un asesor...\n\nEn producción, aquí se abriría el widget de chat de Genesys.');
    closeHelpModal();
    
    // Enviar evento de conexión
    if (typeof ac !== 'undefined') {
        ac('event', {
            eventName: 'agent_connection_requested',
            customAttributes: {
                source: 'cart_idle_help',
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
    console.log('🛒 Escenario 1: Carrito de Compras iniciado');
    console.log('📋 Eventos monitoreados:');
    console.log('   - cart_opened: Al abrir el carrito');
    console.log('   - cart_idle_30s: 30 segundos con el carrito abierto');
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
