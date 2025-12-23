// ============================================== 
// TRACKING ESCENARIO 3: Puntos Gabrica
// Eventos: points_section_viewed, inactive_in_points
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
// CONFIGURACIÓN ESPECÍFICA: ESCENARIO 3
// =====================================================

// Rastrear clicks en secciones de puntos
ac('load', 'autotrackClick', {
    clickEvents: [
        { 
            selector: '.points-balance', 
            eventName: 'points_balance_clicked',
            customAttributes: { 
                scenario: 'puntos_gabrica',
                action: 'check_balance'
            }
        },
        { 
            selector: '.btn-upload-invoice', 
            eventName: 'upload_invoice_clicked',
            customAttributes: { 
                scenario: 'puntos_gabrica',
                action: 'upload_attempt'
            }
        },
        { 
            selector: '.btn-redeem', 
            eventName: 'redeem_points_clicked',
            customAttributes: { 
                scenario: 'puntos_gabrica',
                action: 'redeem_attempt'
            }
        },
        { 
            selector: '.reward-card', 
            eventName: 'reward_viewed',
            customAttributes: { 
                scenario: 'puntos_gabrica'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackClick configurado para puntos');
});

// Detectar secciones de puntos visibles
ac('load', 'autotrackInViewport', {
    inViewportEvents: [
        { 
            selector: '.points-dashboard', 
            eventName: 'points_dashboard_viewed',
            customAttributes: {
                scenario: 'puntos_gabrica'
            }
        },
        { 
            selector: '.rewards-section', 
            eventName: 'rewards_section_viewed',
            customAttributes: {
                scenario: 'puntos_gabrica'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackInViewport configurado para dashboard de puntos');
});

// Detectar inactividad en la sección de puntos
ac('load', 'autotrackIdle', {
    idleEvents: [
        { 
            idleAfter: 60, 
            eventName: 'points_idle_60s',
            customAttributes: {
                scenario: 'puntos_gabrica',
                trigger: 'inactive_user'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackIdle configurado para: points_idle_60s');
});

console.log('📦 Tracking Escenario 3: Puntos Gabrica - Cargado');
console.log('📋 Eventos monitoreados:');
console.log('   • points_balance_clicked - Ver saldo de puntos');
console.log('   • upload_invoice_clicked - Subir factura');
console.log('   • redeem_points_clicked - Canjear puntos');
console.log('   • points_idle_60s - 60s sin actividad');
