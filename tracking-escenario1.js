// ============================================== 
// TRACKING ESCENARIO 1: Carrito de Compras
// Evento compuesto: tiempo_Espera_Carro (carrito visible + 30s)
// ============================================== 

(function(a,t,c,l,o,u,d){a['_genesysJourneySdk']=o;a[o]=a[o]||function(){
(a[o].q=a[o].q||[]).push(arguments)},a[o].l=1*new Date();u=t.createElement(c),
d=t.getElementsByTagName(c)[0];u.async=1;u.src=l;u.charset='utf-8';d.parentNode.insertBefore(u,d)
})(window, document, 'script', 'https://apps.mypurecloud.com/journey/sdk/js/web/v1/ac.js', 'ac');

// Inicializar el SDK
ac('init', '9bb35534-a7d5-45db-b818-dab73775234a', { region: 'use1' });

// Registrar pageview
ac('pageview');

// =====================================================
// CONFIGURACIÓN ESPECÍFICA: ESCENARIO 1
// =====================================================

// Rastrear click en el ícono del carrito
ac('load', 'autotrackClick', {
    clickEvents: [
        { 
            selector: '.cart-icon-container', 
            eventName: 'cart_opened',
            customAttributes: { 
                scenario: 'checkout_rescue',
                action: 'open_cart'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackClick configurado para: cart_opened');
});

// =====================================================
// EVENTO COMPUESTO: tiempo_Espera_Carro
// Condición: Carrito visible + 30 segundos de espera
// =====================================================

let cartTimer = null;
let cartOpenTime = 0;
let tiempoEsperaEventSent = false;

// Observador para detectar cuando el modal del carrito se hace visible
const cartObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            const isVisible = cartModal.style.display === 'flex' || cartModal.style.display === 'block';
            
            if (isVisible && !cartTimer) {
                // Carrito se abrió - iniciar timer
                console.log('🛒 Carrito visible - iniciando contador de 30s');
                cartOpenTime = 0;
                tiempoEsperaEventSent = false;
                
                cartTimer = setInterval(function() {
                    cartOpenTime++;
                    
                    // Verificar si el carrito sigue visible
                    const stillVisible = cartModal.style.display === 'flex' || cartModal.style.display === 'block';
                    
                    if (stillVisible && cartOpenTime >= 30 && !tiempoEsperaEventSent) {
                        // CONDICIÓN CUMPLIDA: Carrito visible + 30 segundos
                        tiempoEsperaEventSent = true;
                        
                        ac('event', {
                            eventName: 'tiempo_Espera_Carro',
                            customAttributes: {
                                scenario: 'checkout_rescue',
                                trigger: 'cart_visible_30s',
                                seconds_waited: cartOpenTime,
                                timestamp: new Date().toISOString()
                            }
                        });
                        
                        console.log('📡 EVENTO COMPUESTO ENVIADO: tiempo_Espera_Carro');
                        console.log('   ✓ Carrito visible: SÍ');
                        console.log('   ✓ Tiempo de espera: ' + cartOpenTime + 's');
                    }
                    
                    if (!stillVisible) {
                        // Carrito se cerró - detener timer
                        clearInterval(cartTimer);
                        cartTimer = null;
                        console.log('🛒 Carrito cerrado - timer detenido en ' + cartOpenTime + 's');
                    }
                }, 1000);
                
            } else if (!isVisible && cartTimer) {
                // Carrito se cerró
                clearInterval(cartTimer);
                cartTimer = null;
                console.log('🛒 Carrito cerrado - timer detenido');
            }
        }
    });
});

// Iniciar observador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartObserver.observe(cartModal, { 
            attributes: true, 
            attributeFilter: ['style'] 
        });
        console.log('👁️ Observador de carrito iniciado');
    }
});

console.log('📦 Tracking Escenario 1: Carrito de Compras - Cargado');
console.log('📋 Evento compuesto configurado:');
console.log('   • tiempo_Espera_Carro = Carrito visible + 30 segundos');
