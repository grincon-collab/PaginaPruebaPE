// ============================================== 
// TRACKING ESCENARIO 5: Knowledge-Driven Assistance
// Eventos: video_played, registration_assistance_needed
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
// CONFIGURACIÓN ESPECÍFICA: ESCENARIO 5
// =====================================================

// Rastrear clicks en elementos de landing
ac('load', 'autotrackClick', {
    clickEvents: [
        { 
            selector: '.btn-play-video', 
            eventName: 'video_play_clicked',
            customAttributes: { 
                scenario: 'knowledge_assistance',
                action: 'play_video',
                content_type: 'educational'
            }
        },
        { 
            selector: '.video-container', 
            eventName: 'video_interaction',
            customAttributes: { 
                scenario: 'knowledge_assistance'
            }
        },
        { 
            selector: '.btn-join-program', 
            eventName: 'join_program_clicked',
            customAttributes: { 
                scenario: 'knowledge_assistance',
                action: 'start_enrollment'
            }
        },
        { 
            selector: '.benefit-card', 
            eventName: 'benefit_clicked',
            customAttributes: { 
                scenario: 'knowledge_assistance'
            }
        },
        { 
            selector: '.faq-item', 
            eventName: 'faq_clicked',
            customAttributes: { 
                scenario: 'knowledge_assistance',
                action: 'seeking_info'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackClick configurado para landing');
});

// Detectar elementos visibles en la landing
ac('load', 'autotrackInViewport', {
    inViewportEvents: [
        { 
            selector: '.video-section', 
            eventName: 'video_section_viewed',
            customAttributes: {
                scenario: 'knowledge_assistance'
            }
        },
        { 
            selector: '.benefits-section', 
            eventName: 'benefits_viewed',
            customAttributes: {
                scenario: 'knowledge_assistance'
            }
        },
        { 
            selector: '.enrollment-form', 
            eventName: 'enrollment_form_viewed',
            customAttributes: {
                scenario: 'knowledge_assistance',
                intent: 'registration'
            }
        },
        { 
            selector: '.faq-section', 
            eventName: 'faq_section_viewed',
            customAttributes: {
                scenario: 'knowledge_assistance',
                intent: 'seeking_answers'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackInViewport configurado para landing');
});

// Rastrear scroll en la landing
ac('load', 'autotrackScrollDepth', {
    scrollDepthEvents: [
        { 
            percentage: 25, 
            eventName: 'landing_scroll_25',
            customAttributes: { scenario: 'knowledge_assistance' }
        },
        { 
            percentage: 50, 
            eventName: 'landing_scroll_50',
            customAttributes: { scenario: 'knowledge_assistance' }
        },
        { 
            percentage: 75, 
            eventName: 'landing_scroll_75',
            customAttributes: { scenario: 'knowledge_assistance', engagement: 'high' }
        }
    ]
}, function() {
    console.log('✅ autotrackScrollDepth configurado');
});

// Detectar inactividad - posible necesidad de ayuda
ac('load', 'autotrackIdle', {
    idleEvents: [
        { 
            idleAfter: 30, 
            eventName: 'landing_idle_30s',
            customAttributes: {
                scenario: 'knowledge_assistance',
                trigger: 'needs_guidance'
            }
        },
        { 
            idleAfter: 60, 
            eventName: 'landing_idle_60s',
            customAttributes: {
                scenario: 'knowledge_assistance',
                trigger: 'assistance_recommended'
            }
        }
    ]
}, function() {
    console.log('✅ autotrackIdle configurado para landing');
});

console.log('📦 Tracking Escenario 5: Knowledge Assistance - Cargado');
console.log('📋 Eventos monitoreados:');
console.log('   • video_play_clicked - Reproducir video');
console.log('   • join_program_clicked - Unirse al programa');
console.log('   • faq_clicked - Ver preguntas frecuentes');
console.log('   • landing_idle_30s/60s - Inactividad en landing');
