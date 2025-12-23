// =====================================================
// ESCENARIO 2: Support-to-Sales Switch
// Detecta intención técnica y ofrece ayuda de especialista
// =====================================================

let productsViewed = [];
let specsViewed = [];
let cartItems = [];
let specialistModalShown = false;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛍️ Escenario Support-to-Sales iniciado');
    
    sendGenesysEvent('products_page_loaded', {
        page: 'catalogo'
    });
});

// =====================================================
// VER PRODUCTO (PDP)
// =====================================================
function viewProduct(productId, productName) {
    // Registrar producto visto si no está en la lista
    if (!productsViewed.includes(productId)) {
        productsViewed.push(productId);
        updatePdpIndicator();
    }
    
    sendGenesysEvent('product_viewed', {
        productId: productId,
        productName: productName,
        totalViewed: productsViewed.length
    });
    
    console.log('👁️ Producto visto:', productName, '| Total:', productsViewed.length);
    
    // Highlight del producto
    highlightProduct(productId);
    
    // Verificar trigger: 3+ productos sin agregar al carrito
    checkSupportToSalesTrigger();
}

function highlightProduct(productId) {
    // Remover highlight anterior
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('viewed');
    });
    
    // Agregar clase de visto a todos los productos vistos
    productsViewed.forEach(id => {
        const cards = document.querySelectorAll('.product-card');
        if (cards[id - 1]) {
            cards[id - 1].classList.add('viewed');
        }
    });
}

function updatePdpIndicator() {
    const countElement = document.getElementById('pdpCount');
    const indicator = document.getElementById('pdpIndicator');
    
    if (countElement) {
        countElement.textContent = productsViewed.length;
    }
    
    if (indicator && productsViewed.length >= 3 && cartItems.length === 0) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// VER ESPECIFICACIONES TÉCNICAS
// =====================================================
function viewSpecs(productId, productName) {
    // Registrar especificación vista
    if (!specsViewed.includes(productId)) {
        specsViewed.push(productId);
        updateSpecsIndicator();
    }
    
    sendGenesysEvent('specs_viewed', {
        productId: productId,
        productName: productName,
        totalSpecsViewed: specsViewed.length
    });
    
    console.log('📋 Especificaciones vistas:', productName, '| Total:', specsViewed.length);
    
    // Mostrar modal de especificaciones
    showSpecsModal(productId, productName);
    
    // Verificar trigger
    checkSupportToSalesTrigger();
}

function showSpecsModal(productId, productName) {
    const modal = document.getElementById('specsModal');
    const title = document.getElementById('specsTitle');
    
    if (title) {
        title.textContent = 'Especificaciones: ' + productName;
    }
    
    // Datos de ejemplo según producto
    const specs = getProductSpecs(productId);
    document.getElementById('specProtein').textContent = specs.protein;
    document.getElementById('specFat').textContent = specs.fat;
    document.getElementById('specFiber').textContent = specs.fiber;
    document.getElementById('specMoisture').textContent = specs.moisture;
    document.getElementById('specIngredient').textContent = specs.ingredient;
    document.getElementById('specSize').textContent = specs.size;
    
    if (modal) {
        modal.style.display = 'block';
    }
}

function getProductSpecs(productId) {
    const specsData = {
        1: { protein: '26%', fat: '12%', fiber: '3%', moisture: '12%', ingredient: 'Pollo', size: 'Mediano' },
        2: { protein: '34%', fat: '13%', fiber: '4%', moisture: '12%', ingredient: 'Pescado', size: 'Pequeño' },
        3: { protein: '32%', fat: '18%', fiber: '2%', moisture: '12%', ingredient: 'Salmón', size: 'Mediano' },
        4: { protein: '40%', fat: '16%', fiber: '2%', moisture: '12%', ingredient: 'Pollo y arroz', size: 'Pequeño' },
        5: { protein: '28%', fat: '14%', fiber: '3%', moisture: '12%', ingredient: 'Pollo', size: 'Pequeño' },
        6: { protein: '26%', fat: '16%', fiber: '3%', moisture: '12%', ingredient: 'Salmón', size: 'Mediano' }
    };
    
    return specsData[productId] || specsData[1];
}

function closeSpecsModal() {
    const modal = document.getElementById('specsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateSpecsIndicator() {
    const countElement = document.getElementById('specsCount');
    const indicator = document.getElementById('specsIndicator');
    
    if (countElement) {
        countElement.textContent = specsViewed.length;
    }
    
    if (indicator && specsViewed.length >= 2) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// AGREGAR AL CARRITO
// =====================================================
function addToCart(productId, productName) {
    if (!cartItems.includes(productId)) {
        cartItems.push(productId);
        updateCartIndicator();
    }
    
    sendGenesysEvent('product_added_to_cart', {
        productId: productId,
        productName: productName,
        cartSize: cartItems.length
    });
    
    console.log('🛒 Agregado al carrito:', productName, '| Items:', cartItems.length);
    
    // Feedback visual
    alert('✅ ' + productName + ' agregado al carrito');
    
    // Al agregar al carrito, resetear el indicador de trigger
    const indicator = document.getElementById('pdpIndicator');
    if (indicator) {
        indicator.classList.remove('triggered');
    }
}

function updateCartIndicator() {
    const countElement = document.getElementById('cartCount');
    
    if (countElement) {
        countElement.textContent = cartItems.length;
    }
}

// =====================================================
// FILTRAR CATEGORÍAS
// =====================================================
function filterCategory(category) {
    // Actualizar botones activos
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filtrar productos
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory.includes(category)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    sendGenesysEvent('category_filtered', {
        category: category
    });
}

// =====================================================
// VERIFICAR TRIGGER SUPPORT-TO-SALES
// =====================================================
function checkSupportToSalesTrigger() {
    // Trigger: 3+ productos vistos sin agregar al carrito
    const condition1 = productsViewed.length >= 3 && cartItems.length === 0;
    
    // Trigger: 2+ especificaciones vistas
    const condition2 = specsViewed.length >= 2;
    
    if ((condition1 || condition2) && !specialistModalShown) {
        // Esperar un momento antes de mostrar
        setTimeout(function() {
            triggerSpecialistHelp(condition1 ? 'multiple_pdp_no_cart' : 'multiple_specs_viewed');
        }, 1500);
    }
}

function triggerSpecialistHelp(reason) {
    specialistModalShown = true;
    
    sendGenesysEvent('specialist_help_triggered', {
        reason: reason,
        productsViewed: productsViewed.length,
        specsViewed: specsViewed.length,
        cartItems: cartItems.length
    });
    
    const modal = document.getElementById('specialistModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    console.log('🎯 Ayuda de especialista activada por:', reason);
}

function closeSpecialistModal() {
    const modal = document.getElementById('specialistModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    sendGenesysEvent('specialist_modal_dismissed', {
        action: 'continue_browsing'
    });
}

function connectToSpecialist() {
    sendGenesysEvent('specialist_connection_requested', {
        context: 'support_to_sales',
        productsViewed: productsViewed,
        specsViewed: specsViewed
    });
    
    alert('👨‍⚕️ Conectando con un especialista en productos...\n\nEn una implementación real, esto abriría el webchat de Genesys Cloud con contexto del producto.');
    
    closeSpecialistModal();
    console.log('👨‍⚕️ Solicitada conexión con especialista');
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
