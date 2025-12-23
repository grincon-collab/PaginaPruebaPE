// ============================================== 
// TRACKING ESCENARIO 4: Registro Cliente Potencial
// Eventos: catalog_download, business_interest
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
// CONFIGURACIÓN ESPECÍFICA: ESCENARIO 4
// =====================================================

// Rastrear clicks en elementos de registro
ac('load', 'autotrackClick', {
    clickEvents: [
        { 
            selector: '.btn-download-catalog', 
            eventName: 'catalog_downloaded',
            customAttributes: { 
                scenario: 'registro_cliente',
                action: 'download_catalog',
                interest_level: 'high'
            }
        },
        { 
            selector: '.btn-register', 
            eventName: 'register_clicked',
            customAttributes: { 
                scenario: 'registro_cliente',
                action: 'start_registration'
            }
        },
        { 
            selector: '.service-card', 
            eventName: 'service_viewed',
            customAttributes: { 
                scenario: 'registro_cliente'
            }
        },
        { 
            selector: '.btn-contact', 
            eventName: 'contact_clicked',
            customAttributes: { 
                scenario: 'registro_cliente',
                action: 'request_contact'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackClick configurado para registro');
});

// Detectar secciones importantes visibles
ac('load', 'autotrackInViewport', {
    inViewportEvents: [
        { 
            selector: '.services-section', 
            eventName: 'services_section_viewed',
            customAttributes: {
                scenario: 'registro_cliente'
            }
        },
        { 
            selector: '.registration-form', 
            eventName: 'registration_form_viewed',
            customAttributes: {
                scenario: 'registro_cliente',
                interest_level: 'high'
            }
        },
        { 
            selector: '.pricing-section', 
            eventName: 'pricing_viewed',
            customAttributes: {
                scenario: 'registro_cliente',
                interest_level: 'very_high'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackInViewport configurado para secciones');
});

// Rastrear scroll para medir interés
ac('load', 'autotrackScrollDepth', {
    scrollDepthEvents: [
        { 
            percentage: 50, 
            eventName: 'page_scroll_50',
            customAttributes: { scenario: 'registro_cliente' }
        },
        { 
            percentage: 75, 
            eventName: 'page_scroll_75',
            customAttributes: { scenario: 'registro_cliente', interest_level: 'medium' }
        },
        { 
            percentage: 100, 
            eventName: 'page_scroll_100',
            customAttributes: { scenario: 'registro_cliente', interest_level: 'high' }
        }
    ]
}, function() {
    console.log('✅ autotrackScrollDepth configurado');
});

// Detectar inactividad de cliente potencial
ac('load', 'autotrackIdle', {
    idleEvents: [
        { 
            idleAfter: 45, 
            eventName: 'registration_idle_45s',
            customAttributes: {
                scenario: 'registro_cliente',
                trigger: 'potential_lead'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackIdle configurado para: registration_idle_45s');
});

console.log('📦 Tracking Escenario 4: Registro Cliente - Cargado');
console.log('📋 Eventos monitoreados:');
console.log('   • catalog_downloaded - Descarga de catálogo');
console.log('   • register_clicked - Inicio de registro');
console.log('   • service_viewed - Ver servicios');
console.log('   • registration_idle_45s - 45s sin actividad');
