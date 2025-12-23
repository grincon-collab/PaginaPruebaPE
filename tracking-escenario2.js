// ============================================== 
// TRACKING ESCENARIO 2: Support-to-Sales
// Eventos: product_viewed, browsing_without_conversion
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
// CONFIGURACIÓN ESPECÍFICA: ESCENARIO 2
// =====================================================

// Rastrear clicks en productos
ac('load', 'autotrackClick', {
    clickEvents: [
        { 
            selector: '.product-card', 
            eventName: 'product_viewed',
            customAttributes: { 
                scenario: 'support_to_sales',
                action: 'view_product'
            }
        },
        { 
            selector: '.btn-view-details', 
            eventName: 'product_details_clicked',
            customAttributes: { 
                scenario: 'support_to_sales'
            }
        },
        { 
            selector: '.btn-add-cart', 
            eventName: 'add_to_cart_clicked',
            customAttributes: { 
                scenario: 'support_to_sales',
                action: 'conversion'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackClick configurado para productos');
});

// Detectar productos visibles en pantalla
ac('load', 'autotrackInViewport', {
    inViewportEvents: [
        { 
            selector: '.product-card', 
            eventName: 'product_in_viewport',
            customAttributes: {
                scenario: 'support_to_sales'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackInViewport configurado para productos');
});

// Detectar scroll en la página de productos
ac('load', 'autotrackScrollDepth', {
    scrollDepthEvents: [
        { percentage: 50, eventName: 'products_scroll_50' },
        { percentage: 100, eventName: 'products_scroll_100' }
    ]
}, function() {
    console.log('✅ autotrackScrollDepth configurado');
});

// Detectar inactividad mientras navega productos
ac('load', 'autotrackIdle', {
    idleEvents: [
        { 
            idleAfter: 45, 
            eventName: 'browsing_idle_45s',
            customAttributes: {
                scenario: 'support_to_sales',
                trigger: 'needs_assistance'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackIdle configurado para: browsing_idle_45s');
});

console.log('📦 Tracking Escenario 2: Support-to-Sales - Cargado');
console.log('📋 Eventos monitoreados:');
console.log('   • product_viewed - Click en producto');
console.log('   • product_details_clicked - Ver detalles');
console.log('   • add_to_cart_clicked - Agregar al carrito');
console.log('   • browsing_idle_45s - 45s sin actividad');
