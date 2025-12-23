// =====================================================
// ESCENARIO 5: Knowledge-Driven Assistance
// Detecta bloqueo por falta de información en landing de puntos
// =====================================================

let videoPlayed = false;
let registroTimeSpent = 0;
let registroTimer = null;
let isInRegistroSection = false;
let guideModalShown = false;
let scrollPercent = 0;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Escenario Knowledge-Driven Assistance iniciado');
    
    sendGenesysEvent('landing_puntos_loaded', {
        page: 'landing_puntos'
    });
    
    // Observar cuando el usuario llega a la sección de registro
    setupRegistroObserver();
    
    // Rastrear scroll
    setupScrollTracking();
});

// =====================================================
// REPRODUCCIÓN DE VIDEO
// =====================================================
function playVideo() {
    videoPlayed = true;
    updateVideoIndicator();
    
    const placeholder = document.getElementById('videoPlaceholder');
    const video = document.getElementById('videoPlayer');
    
    if (placeholder && video) {
        placeholder.style.display = 'none';
        video.style.display = 'block';
        video.play();
    }
    
    sendGenesysEvent('video_played', {
        videoId: 'puntos_explicativo',
        timestamp: new Date().toISOString()
    });
    
    console.log('▶️ Video reproducido');
    
    // Trigger: Video reproducido
    if (!guideModalShown) {
        // Esperar a que vea un poco del video
        setTimeout(function() {
            if (!guideModalShown) {
                triggerGuideHelp('video_watched');
            }
        }, 10000); // 10 segundos después de iniciar el video
    }
}

function updateVideoIndicator() {
    const element = document.getElementById('videoPlayed');
    const indicator = document.getElementById('videoIndicator');
    
    if (element) {
        element.textContent = videoPlayed ? 'Sí' : 'No';
    }
    
    if (indicator && videoPlayed) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// OBSERVADOR DE SECCIÓN DE REGISTRO
// =====================================================
function setupRegistroObserver() {
    const registroSection = document.getElementById('registro');
    
    if (!registroSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Usuario entró a la sección de registro
                if (!isInRegistroSection) {
                    isInRegistroSection = true;
                    startRegistroTimer();
                    
                    sendGenesysEvent('registro_section_entered', {
                        timestamp: new Date().toISOString()
                    });
                    
                    console.log('📝 Usuario entró a sección de registro');
                }
            } else {
                // Usuario salió de la sección de registro
                if (isInRegistroSection) {
                    isInRegistroSection = false;
                    stopRegistroTimer();
                    
                    sendGenesysEvent('registro_section_left', {
                        timeSpent: registroTimeSpent
                    });
                    
                    console.log('📝 Usuario salió de sección de registro | Tiempo:', registroTimeSpent + 's');
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(registroSection);
}

// =====================================================
// TIMER DE REGISTRO
// =====================================================
function startRegistroTimer() {
    if (registroTimer) return;
    
    registroTimer = setInterval(function() {
        registroTimeSpent++;
        updateRegistroTimeIndicator();
        
        // Trigger: 45 segundos en la sección de registro
        if (registroTimeSpent === 45 && !guideModalShown) {
            triggerGuideHelp('time_in_registro');
        }
        
        // Enviar evento cada 15 segundos
        if (registroTimeSpent % 15 === 0) {
            sendGenesysEvent('registro_time_milestone', {
                seconds: registroTimeSpent
            });
        }
    }, 1000);
}

function stopRegistroTimer() {
    if (registroTimer) {
        clearInterval(registroTimer);
        registroTimer = null;
    }
}

function updateRegistroTimeIndicator() {
    const element = document.getElementById('registroTime');
    const indicator = document.getElementById('registroTimeIndicator');
    
    if (element) {
        element.textContent = registroTimeSpent + 's';
    }
    
    if (indicator && registroTimeSpent >= 45) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// TRACKING DE SCROLL
// =====================================================
function setupScrollTracking() {
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        scrollPercent = Math.round((window.scrollY / documentHeight) * 100);
        
        updateScrollIndicator();
    });
}

function updateScrollIndicator() {
    const element = document.getElementById('scrollPercent');
    
    if (element) {
        element.textContent = scrollPercent + '%';
    }
}

// =====================================================
// MODAL DE AYUDA GUIADA
// =====================================================
function triggerGuideHelp(reason) {
    guideModalShown = true;
    
    sendGenesysEvent('guide_help_triggered', {
        reason: reason,
        videoPlayed: videoPlayed,
        registroTimeSpent: registroTimeSpent,
        scrollPercent: scrollPercent
    });
    
    const modal = document.getElementById('guideModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    console.log('🎓 Ayuda guiada activada por:', reason);
}

function closeGuideModal() {
    const modal = document.getElementById('guideModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    sendGenesysEvent('guide_modal_dismissed', {
        action: 'self_service'
    });
}

function connectToGuideAgent() {
    sendGenesysEvent('guide_agent_requested', {
        context: 'knowledge_assistance',
        videoPlayed: videoPlayed,
        registroTimeSpent: registroTimeSpent
    });
    
    alert('👨‍🏫 Conectando con un asesor especializado en Puntos Gabrica...\n\nEn una implementación real, esto abriría el webchat con un agente que te guiará paso a paso.');
    
    closeGuideModal();
    console.log('👨‍🏫 Solicitada conexión con agente guía');
}

// =====================================================
// FORMULARIO DE REGISTRO
// =====================================================
function submitRegistro(event) {
    event.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        documento: document.getElementById('documento').value,
        email: document.getElementById('emailRegistro').value,
        telefono: document.getElementById('telefono').value,
        ciudad: document.getElementById('ciudad').value,
        mascotas: document.getElementById('mascotas').value
    };
    
    sendGenesysEvent('registro_form_submitted', {
        ...formData,
        timeToComplete: registroTimeSpent
    });
    
    console.log('📤 Registro enviado:', formData);
    
    alert('✅ ¡Registro exitoso!\n\nBienvenido a Puntos Gabrica. Ya puedes comenzar a acumular puntos.');
}

// Rastrear interacción con campos del formulario
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('#registroForm input, #registroForm select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            sendGenesysEvent('form_field_focused', {
                fieldId: this.id,
                fieldType: this.type || 'select'
            });
        });
        
        field.addEventListener('blur', function() {
            sendGenesysEvent('form_field_completed', {
                fieldId: this.id,
                hasValue: this.value.length > 0
            });
        });
    });
});

// =====================================================
// FUNCIÓN AUXILIAR PARA ENVIAR EVENTOS A GENESYS
// =====================================================
function sendGenesysEvent(eventName, attributes) {
    if (typeof ac !== 'undefined') {
        try {
            ac('event', {
                eventName: eventName,
                customAttributes: attributes
            });
            console.log('📤 Evento enviado:', eventName, attributes);
        } catch (e) {
            console.log('⚠️ Error enviando evento:', e);
        }
    } else {
        console.log('📤 [Simulado] Evento:', eventName, attributes);
    }
}

// Limpiar timer al salir
window.addEventListener('beforeunload', function() {
    stopRegistroTimer();
    
    if (isInRegistroSection) {
        sendGenesysEvent('registro_abandoned', {
            timeSpent: registroTimeSpent
        });
    }
});
