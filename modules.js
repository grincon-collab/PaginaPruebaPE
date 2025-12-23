// =====================================================
// MÓDULOS SDK - Genesys Predictive Engagement
// Este archivo carga y configura los módulos del SDK
// =====================================================

// Esperar a que el SDK esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Verificar si ac está disponible
    if (typeof ac === 'undefined') {
        console.warn('Genesys SDK (ac) no está disponible');
        return;
    }

    // =====================================================
    // MÓDULO: autotrackClick
    // Rastrea clicks en elementos específicos
    // =====================================================
    try {
        ac('load', 'autotrackClick', {
            clickEvents: [
                { selector: '#greenButton', eventName: 'green_button_clicked', customAttributes: { color: 'green', value: 10 } },
                { selector: '#blueButton', eventName: 'blue_button_clicked', customAttributes: { color: 'blue', value: 20 } },
                { selector: '#redButton', eventName: 'red_button_clicked', customAttributes: { color: 'red', value: 30 } },
                { selector: '.btn-cart', eventName: 'cart_button_clicked' },
                { selector: '.demo-click', eventName: 'demo_button_clicked' }
            ]
        }, function() {
            console.log('✅ Módulo autotrackClick cargado');
        });
    } catch (e) {
        console.log('autotrackClick no disponible:', e);
    }

    // =====================================================
    // MÓDULO: autotrackIdle
    // Detecta inactividad del usuario
    // =====================================================
    try {
        ac('load', 'autotrackIdle', {
            idleEvents: [
                { idleAfter: 30, eventName: 'idle_30_seconds' },
                { idleAfter: 60, eventName: 'idle_60_seconds' }
            ]
        }, function() {
            console.log('✅ Módulo autotrackIdle cargado');
        });
    } catch (e) {
        console.log('autotrackIdle no disponible:', e);
    }

    // =====================================================
    // MÓDULO: autotrackScrollDepth
    // Rastrea profundidad de scroll
    // =====================================================
    try {
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
    } catch (e) {
        console.log('autotrackScrollDepth no disponible:', e);
    }

    // =====================================================
    // MÓDULO: autotrackInViewport
    // Rastrea elementos visibles en viewport
    // =====================================================
    try {
        ac('load', 'autotrackInViewport', {
            inViewportEvents: [
                { selector: '#promoBox', eventName: 'promo_box_viewed' },
                { selector: '#ctaBox', eventName: 'cta_box_viewed' },
                { selector: '.module-section', eventName: 'module_section_viewed' }
            ]
        }, function() {
            console.log('✅ Módulo autotrackInViewport cargado');
        });
    } catch (e) {
        console.log('autotrackInViewport no disponible:', e);
    }

    console.log('📦 Todos los módulos del SDK han sido configurados');
});

// =====================================================
// FUNCIONES DE DEMO PARA LA INTERFAZ
// =====================================================

// Demo de clicks - Mostrar feedback visual
document.addEventListener('DOMContentLoaded', function() {
    const clickButtons = document.querySelectorAll('.demo-click');
    clickButtons.forEach(button => {
        button.addEventListener('click', function() {
            const statusDiv = document.getElementById('clickStatus');
            if (statusDiv) {
                statusDiv.className = 'status-message success';
                statusDiv.textContent = '✅ Click registrado en: ' + this.textContent.trim();
                statusDiv.style.display = 'block';
                setTimeout(() => { statusDiv.style.display = 'none'; }, 3000);
            }
            console.log('🖱️ Click event:', this.id);
        });
    });
});

// Demo de Idle - Simulación visual
let idleTimer30 = null;
let idleTimer60 = null;
let idleStartTime = Date.now();

function resetIdleDemo() {
    idleStartTime = Date.now();
    
    const idle30 = document.getElementById('idle30');
    const idle60 = document.getElementById('idle60');
    
    if (idle30) {
        idle30.querySelector('.idle-status').textContent = '⏳ Esperando...';
        idle30.classList.remove('idle-triggered');
    }
    if (idle60) {
        idle60.querySelector('.idle-status').textContent = '⏳ Esperando...';
        idle60.classList.remove('idle-triggered');
    }
    
    clearTimeout(idleTimer30);
    clearTimeout(idleTimer60);
    
    idleTimer30 = setTimeout(() => {
        if (idle30) {
            idle30.querySelector('.idle-status').textContent = '✅ ¡Inactivo detectado!';
            idle30.classList.add('idle-triggered');
        }
        console.log('⏸️ Idle 30s triggered');
    }, 30000);
    
    idleTimer60 = setTimeout(() => {
        if (idle60) {
            idle60.querySelector('.idle-status').textContent = '✅ ¡Inactivo detectado!';
            idle60.classList.add('idle-triggered');
        }
        console.log('⏸️ Idle 60s triggered');
    }, 60000);
    
    console.log('🔄 Demo de inactividad reiniciada');
}

// Iniciar demo de idle al cargar
document.addEventListener('DOMContentLoaded', resetIdleDemo);

// Demo de Scroll Depth - Actualizar indicadores
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        const currentScrollSpan = document.getElementById('currentScrollPercent');
        if (currentScrollSpan) {
            currentScrollSpan.textContent = scrollPercent;
        }
        
        // Actualizar indicadores
        updateScrollIndicator('scroll25', 25, scrollPercent);
        updateScrollIndicator('scroll50', 50, scrollPercent);
        updateScrollIndicator('scroll75', 75, scrollPercent);
        updateScrollIndicator('scroll100', 100, scrollPercent);
    });
});

function updateScrollIndicator(id, threshold, current) {
    const indicator = document.getElementById(id);
    if (indicator) {
        const progress = indicator.querySelector('.scroll-progress');
        if (current >= threshold) {
            indicator.classList.add('scroll-reached');
            if (progress) progress.style.width = '100%';
        } else {
            indicator.classList.remove('scroll-reached');
            if (progress) progress.style.width = Math.min((current / threshold) * 100, 100) + '%';
        }
    }
}

// Demo de SPA Navigation
function simulateSpaNav(path) {
    const urlDisplay = document.getElementById('currentSpaUrl');
    if (urlDisplay) {
        urlDisplay.textContent = path;
    }
    
    // Simular evento de cambio de URL
    console.log('🔗 SPA Navigation to:', path);
    
    // Enviar pageview si ac está disponible
    if (typeof ac !== 'undefined') {
        try {
            ac('pageview', {
                location: window.location.origin + path,
                title: 'SPA Demo - ' + path
            });
            console.log('📄 Pageview enviado para:', path);
        } catch (e) {
            console.log('No se pudo enviar pageview:', e);
        }
    }
}

// Enviar evento personalizado
function sendCustomEvent() {
    const eventName = document.getElementById('eventName');
    const eventValue = document.getElementById('eventValue');
    const statusDiv = document.getElementById('customEventStatus');
    
    if (!eventName || !eventName.value.trim()) {
        if (statusDiv) {
            statusDiv.className = 'status-message error';
            statusDiv.textContent = '❌ Por favor ingrese un nombre de evento';
            statusDiv.style.display = 'block';
        }
        return;
    }
    
    const eventData = {
        eventName: eventName.value.trim()
    };
    
    if (eventValue && eventValue.value.trim()) {
        eventData.customAttributes = {
            value: eventValue.value.trim()
        };
    }
    
    console.log('⚡ Enviando evento personalizado:', eventData);
    
    if (typeof ac !== 'undefined') {
        try {
            ac('event', eventData);
            if (statusDiv) {
                statusDiv.className = 'status-message success';
                statusDiv.textContent = '✅ Evento "' + eventData.eventName + '" enviado correctamente';
                statusDiv.style.display = 'block';
            }
        } catch (e) {
            if (statusDiv) {
                statusDiv.className = 'status-message error';
                statusDiv.textContent = '❌ Error al enviar evento: ' + e.message;
                statusDiv.style.display = 'block';
            }
        }
    } else {
        if (statusDiv) {
            statusDiv.className = 'status-message info';
            statusDiv.textContent = 'ℹ️ Evento simulado (SDK no disponible): ' + eventData.eventName;
            statusDiv.style.display = 'block';
        }
    }
    
    setTimeout(() => {
        if (statusDiv) statusDiv.style.display = 'none';
    }, 5000);
}

// Viewport Observer para demo visual
document.addEventListener('DOMContentLoaded', function() {
    const viewportElements = document.querySelectorAll('.viewport-element');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const statusSpan = entry.target.querySelector('.viewport-status');
            if (entry.isIntersecting) {
                entry.target.classList.add('in-viewport');
                if (statusSpan) statusSpan.textContent = '👁️ Visible';
                console.log('👁️ Elemento visible:', entry.target.id);
            } else {
                entry.target.classList.remove('in-viewport');
                if (statusSpan) statusSpan.textContent = '👁️‍🗨️ No visible';
            }
        });
    }, { threshold: 0.5 });
    
    viewportElements.forEach(el => observer.observe(el));
});
