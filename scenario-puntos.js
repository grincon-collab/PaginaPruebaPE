// =====================================================
// ESCENARIO 3: Usuario no activo en Puntos Gabrica
// Detecta usuarios que no usan el programa de puntos
// =====================================================

let profileTimeSpent = 0;
let puntosAccessed = false;
let facturasUploaded = 0;
let sectionsVisited = [];
let puntosHelpModalShown = false;
let profileTimer = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎁 Escenario Puntos Gabrica iniciado');
    
    // Simular inicio de sesión
    sendGenesysEvent('user_logged_in', {
        userId: 'user_12345',
        userType: 'padre_mascota'
    });
    
    // Iniciar timer de perfil
    startProfileTimer();
    
    // Verificar estado de puntos después de un tiempo
    setTimeout(checkPuntosActivity, 30000); // 30 segundos
});

// =====================================================
// TIMER DE PERFIL
// =====================================================
function startProfileTimer() {
    profileTimer = setInterval(function() {
        profileTimeSpent++;
        updateProfileTimeIndicator();
        
        // Trigger: 30 segundos en perfil sin acceder a puntos
        if (profileTimeSpent === 30 && !puntosAccessed && !puntosHelpModalShown) {
            triggerPuntosHelp('time_in_profile_no_puntos');
        }
    }, 1000);
}

function updateProfileTimeIndicator() {
    const timeValue = document.getElementById('profileTime');
    const indicator = document.getElementById('timeInProfileIndicator');
    
    if (timeValue) {
        timeValue.textContent = profileTimeSpent + 's';
    }
    
    if (indicator && profileTimeSpent >= 30 && !puntosAccessed) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// NAVEGACIÓN EN PERFIL
// =====================================================
function navigateToSection(section) {
    if (!sectionsVisited.includes(section)) {
        sectionsVisited.push(section);
    }
    
    sendGenesysEvent('profile_section_visited', {
        section: section,
        totalSections: sectionsVisited.length
    });
    
    console.log('📁 Sección visitada:', section);
    
    // Feedback visual
    alert('📁 Navegando a: ' + section.charAt(0).toUpperCase() + section.slice(1));
}

function navigateToPuntos() {
    puntosAccessed = true;
    updatePuntosAccessIndicator();
    
    // Mostrar sección de puntos
    const puntosSection = document.getElementById('puntosSection');
    if (puntosSection) {
        puntosSection.style.display = 'block';
        puntosSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    sendGenesysEvent('puntos_section_accessed', {
        timeToAccess: profileTimeSpent,
        facturasLoaded: facturasUploaded
    });
    
    console.log('🎁 Usuario accedió a Puntos Gabrica');
    
    // Limpiar trigger de tiempo
    const indicator = document.getElementById('timeInProfileIndicator');
    if (indicator) {
        indicator.classList.remove('triggered');
    }
    
    // Si no tiene facturas, mostrar ayuda después de un momento
    if (facturasUploaded === 0 && !puntosHelpModalShown) {
        setTimeout(function() {
            triggerPuntosHelp('no_facturas_uploaded');
        }, 5000);
    }
}

function updatePuntosAccessIndicator() {
    const accessElement = document.getElementById('puntosAccess');
    const indicator = document.getElementById('puntosAccessIndicator');
    
    if (accessElement) {
        accessElement.textContent = puntosAccessed ? 'Sí' : 'No';
    }
    
    if (indicator && puntosAccessed) {
        indicator.classList.remove('triggered');
        indicator.classList.add('success');
    }
}

// =====================================================
// CARGA DE FACTURAS
// =====================================================
function showUploadFactura() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    sendGenesysEvent('factura_upload_started', {
        currentFacturas: facturasUploaded
    });
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function submitFactura() {
    facturasUploaded++;
    updateFacturasIndicator();
    
    sendGenesysEvent('factura_uploaded', {
        facturaNumber: facturasUploaded,
        totalFacturas: facturasUploaded
    });
    
    closeUploadModal();
    
    // Actualizar estado vacío
    const emptyState = document.getElementById('emptyState');
    if (emptyState && facturasUploaded > 0) {
        emptyState.innerHTML = `
            <span class="empty-icon">✅</span>
            <h3>¡Factura enviada!</h3>
            <p>Tu factura está siendo validada. Los puntos se acreditarán en 24-48 horas.</p>
            <button class="btn btn-primary" onclick="showUploadFactura()">
                📄 Cargar otra factura
            </button>
        `;
    }
    
    console.log('📄 Factura cargada | Total:', facturasUploaded);
    alert('✅ Factura enviada correctamente. Los puntos se acreditarán pronto.');
}

function updateFacturasIndicator() {
    const countElement = document.getElementById('facturasCount');
    const indicator = document.getElementById('facturasIndicator');
    
    if (countElement) {
        countElement.textContent = facturasUploaded;
    }
    
    if (indicator) {
        if (facturasUploaded > 0) {
            indicator.classList.remove('triggered');
            indicator.classList.add('success');
        }
    }
}

// =====================================================
// VERIFICAR ACTIVIDAD EN PUNTOS
// =====================================================
function checkPuntosActivity() {
    // Si después de 30 segundos no ha accedido a puntos
    if (!puntosAccessed && !puntosHelpModalShown) {
        sendGenesysEvent('puntos_not_accessed', {
            timeInProfile: profileTimeSpent,
            sectionsVisited: sectionsVisited
        });
    }
}

// =====================================================
// MODAL DE AYUDA PUNTOS
// =====================================================
function triggerPuntosHelp(reason) {
    puntosHelpModalShown = true;
    
    sendGenesysEvent('puntos_help_triggered', {
        reason: reason,
        timeInProfile: profileTimeSpent,
        puntosAccessed: puntosAccessed,
        facturasUploaded: facturasUploaded
    });
    
    const modal = document.getElementById('puntosHelpModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    console.log('🎁 Ayuda de Puntos activada por:', reason);
}

function closePuntosHelpModal() {
    const modal = document.getElementById('puntosHelpModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    sendGenesysEvent('puntos_help_dismissed', {
        action: 'later'
    });
}

function connectToPuntosAgent() {
    sendGenesysEvent('puntos_agent_requested', {
        context: 'puntos_activation',
        timeInProfile: profileTimeSpent,
        facturasUploaded: facturasUploaded
    });
    
    alert('💬 Conectando con un asesor de Puntos Gabrica...\n\nEn una implementación real, esto abriría el webchat o WhatsApp.');
    
    closePuntosHelpModal();
    console.log('💬 Solicitada conexión con agente de Puntos');
}

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
    if (profileTimer) {
        clearInterval(profileTimer);
    }
});
