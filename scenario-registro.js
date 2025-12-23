// =====================================================
// ESCENARIO 4: Registro de Cliente Potencial
// Detecta interés de negocios en ser distribuidores
// =====================================================

let catalogoDownloaded = false;
let sectionsVisited = [];
let productsReviewed = 0;
let registroModalShown = false;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏢 Escenario Registro Cliente iniciado');
    
    sendGenesysEvent('portal_empresarial_loaded', {
        page: 'portal_empresarial'
    });
});

// =====================================================
// NAVEGACIÓN DE SECCIONES
// =====================================================
function visitSection(section) {
    if (!sectionsVisited.includes(section)) {
        sectionsVisited.push(section);
        updateSectionsIndicator();
    }
    
    sendGenesysEvent('portal_section_visited', {
        section: section,
        totalSections: sectionsVisited.length
    });
    
    console.log('📁 Sección visitada:', section, '| Total:', sectionsVisited.length);
    
    // Scroll a la sección correspondiente
    if (section === 'catalogo') {
        const catalogoSection = document.getElementById('catalogoSection');
        if (catalogoSection) {
            catalogoSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Verificar trigger
    checkRegistroTrigger();
}

function updateSectionsIndicator() {
    const countElement = document.getElementById('sectionsCount');
    const indicator = document.getElementById('sectionsIndicator');
    
    if (countElement) {
        countElement.textContent = sectionsVisited.length;
    }
    
    if (indicator && sectionsVisited.length >= 2) {
        indicator.classList.add('triggered');
    }
}

function scrollToCatalogo() {
    visitSection('catalogo');
}

// =====================================================
// CATÁLOGO
// =====================================================
function downloadCatalogo() {
    catalogoDownloaded = true;
    updateCatalogoIndicator();
    
    sendGenesysEvent('catalogo_downloaded', {
        format: 'pdf',
        sectionsVisited: sectionsVisited.length
    });
    
    console.log('📥 Catálogo descargado');
    
    // Simular descarga
    alert('📥 Descargando catálogo de productos...\n\nEn una implementación real, se descargaría el PDF.');
    
    // Verificar trigger
    checkRegistroTrigger();
}

function viewCatalogoOnline() {
    if (!sectionsVisited.includes('catalogo_online')) {
        sectionsVisited.push('catalogo_online');
        updateSectionsIndicator();
    }
    
    sendGenesysEvent('catalogo_viewed_online', {
        sectionsVisited: sectionsVisited.length
    });
    
    console.log('👁️ Catálogo visto en línea');
    
    alert('👁️ Abriendo visor de catálogo...\n\nEn una implementación real, se abriría el catálogo interactivo.');
    
    checkRegistroTrigger();
}

function updateCatalogoIndicator() {
    const element = document.getElementById('catalogoDownloaded');
    const indicator = document.getElementById('catalogoIndicator');
    
    if (element) {
        element.textContent = catalogoDownloaded ? 'Sí' : 'No';
    }
    
    if (indicator && catalogoDownloaded) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// REVISAR CATEGORÍAS DE PRODUCTOS
// =====================================================
function reviewCategory(category) {
    productsReviewed++;
    updateProductsIndicator();
    
    if (!sectionsVisited.includes('category_' + category)) {
        sectionsVisited.push('category_' + category);
        updateSectionsIndicator();
    }
    
    sendGenesysEvent('product_category_reviewed', {
        category: category,
        totalReviewed: productsReviewed
    });
    
    console.log('📦 Categoría revisada:', category);
    
    alert('📦 Explorando categoría: ' + category.charAt(0).toUpperCase() + category.slice(1) + '\n\nEn una implementación real, se mostraría la lista de productos.');
    
    checkRegistroTrigger();
}

function updateProductsIndicator() {
    const element = document.getElementById('productsReviewed');
    
    if (element) {
        element.textContent = productsReviewed;
    }
}

// =====================================================
// VERIFICAR TRIGGER DE REGISTRO
// =====================================================
function checkRegistroTrigger() {
    // Trigger 1: Catálogo descargado
    const condition1 = catalogoDownloaded;
    
    // Trigger 2: 2+ secciones visitadas
    const condition2 = sectionsVisited.length >= 2;
    
    if ((condition1 || condition2) && !registroModalShown) {
        setTimeout(function() {
            triggerRegistroHelp(condition1 ? 'catalogo_downloaded' : 'multiple_sections');
        }, 2000);
    }
}

function triggerRegistroHelp(reason) {
    registroModalShown = true;
    
    sendGenesysEvent('registro_help_triggered', {
        reason: reason,
        catalogoDownloaded: catalogoDownloaded,
        sectionsVisited: sectionsVisited.length,
        productsReviewed: productsReviewed
    });
    
    const modal = document.getElementById('registroModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    console.log('🏢 Ayuda de registro activada por:', reason);
}

function closeRegistroModal() {
    const modal = document.getElementById('registroModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    sendGenesysEvent('registro_modal_dismissed', {
        action: 'exploring'
    });
}

function connectToRegistroAgent() {
    sendGenesysEvent('registro_agent_requested', {
        context: 'new_client_registration',
        catalogoDownloaded: catalogoDownloaded,
        sectionsVisited: sectionsVisited
    });
    
    alert('📝 Conectando con un ejecutivo de registro...\n\nEn una implementación real, esto abriría el webchat con contexto de registro de cliente.');
    
    closeRegistroModal();
    console.log('📝 Solicitada conexión con agente de registro');
}

// =====================================================
// FORMULARIO DE CONTACTO
// =====================================================
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = {
        companyName: document.getElementById('companyName').value,
        nit: document.getElementById('nit').value,
        contactName: document.getElementById('contactName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        businessType: document.getElementById('businessType').value
    };
    
    sendGenesysEvent('contact_form_submitted', formData);
    
    console.log('📤 Formulario enviado:', formData);
    
    alert('✅ Solicitud enviada correctamente.\n\nUn ejecutivo se pondrá en contacto contigo pronto.');
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
