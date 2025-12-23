// ============================================== 
// GENESYS CLOUD PREDICTIVE ENGAGEMENT TRACKING   
// Este archivo se carga en todas las páginas del sitio
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
// CARGAR MÓDULOS DEL SDK
// =====================================================

// MÓDULO: autotrackClick - Rastrea clicks en elementos
ac('load', 'autotrackClick', {
    clickEvents: [
        { selector: '.btn-cart', eventName: 'cart_button_clicked' },
        { selector: '.btn-primary', eventName: 'primary_button_clicked' },
        { selector: '.btn-secondary', eventName: 'secondary_button_clicked' },
        { selector: '#greenButton', eventName: 'green_button_clicked', customAttributes: { color: 'green', value: 10 } },
        { selector: '#blueButton', eventName: 'blue_button_clicked', customAttributes: { color: 'blue', value: 20 } },
        { selector: '#redButton', eventName: 'red_button_clicked', customAttributes: { color: 'red', value: 30 } },
        { selector: '.demo-click', eventName: 'demo_button_clicked' }
    ]
}, function() {
    console.log('✅ Módulo autotrackClick cargado');
});

// MÓDULO: autotrackIdle - Detecta inactividad del usuario
ac('load', 'autotrackIdle', {
    idleEvents: [
        { idleAfter: 30, eventName: 'idle_30_seconds' },
        { idleAfter: 60, eventName: 'idle_60_seconds' },
        { idleAfter: 120, eventName: 'idle_2_minutes' }
    ]
}, function() {
    console.log('✅ Módulo autotrackIdle cargado');
});

// MÓDULO: autotrackScrollDepth - Rastrea profundidad de scroll
ac('load', 'autotrackScrollDepth', {
    scrollDepthEvents: [
        { percentage: 25, eventName: 'scroll_depth_25' },
        { percentage: 50, eventName: 'scroll_depth_50' },
        { percentage: 75, eventName: 'scroll_depth_75' },
        { percentage: 100, eventName: 'scroll_depth_100' }
    ]
}, function() {
    console.log('✅ Módulo autotrackScrollDepth cargado');
});

// MÓDULO: autotrackInViewport - Rastrea elementos visibles
ac('load', 'autotrackInViewport', {
    inViewportEvents: [
        { selector: '#promoBox', eventName: 'promo_box_viewed' },
        { selector: '#ctaBox', eventName: 'cta_box_viewed' },
        { selector: '.info-card', eventName: 'info_card_viewed' },
        { selector: '.content-card', eventName: 'content_card_viewed' },
        { selector: '#cartModal', eventName: 'cart_modal_viewed' }
    ]
}, function() {
    console.log('✅ Módulo autotrackInViewport cargado');
});

console.log('📦 Genesys Predictive Engagement - Tracking y módulos cargados');
