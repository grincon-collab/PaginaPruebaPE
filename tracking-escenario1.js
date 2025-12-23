// ============================================== 
// TRACKING ESCENARIO 1: Carrito de Compras
// Eventos: cart_opened, cart_idle_30s
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

// Detectar cuando el modal del carrito está visible (viewport)
ac('load', 'autotrackInViewport', {
    inViewportEvents: [
        { 
            selector: '#cartModal', 
            eventName: 'cart_modal_viewed',
            customAttributes: {
                scenario: 'checkout_rescue'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackInViewport configurado para: cart_modal_viewed');
});

// Detectar inactividad (idle) mientras el carrito está abierto
ac('load', 'autotrackIdle', {
    idleEvents: [
        { 
            idleAfter: 30, 
            eventName: 'cart_idle_30s',
            customAttributes: {
                scenario: 'checkout_rescue',
                trigger: 'friction_detected'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackIdle configurado para: cart_idle_30s');
});

console.log('📦 Tracking Escenario 1: Carrito de Compras - Cargado');
console.log('📋 Eventos monitoreados:');
console.log('   • cart_opened - Click en ícono del carrito');
console.log('   • cart_modal_viewed - Modal del carrito visible');
console.log('   • cart_idle_30s - 30 segundos de inactividad');
