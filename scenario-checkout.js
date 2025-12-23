// =====================================================
// ESCENARIO 1: Checkout Rescue
// Detecta fricción en el proceso de pago
// =====================================================

let checkoutTimeSpent = 0;
let paymentChangeCount = 0;
let failedPaymentCount = 0;
let checkoutTimer = null;
let helpModalShown = false;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Escenario Checkout Rescue iniciado');
    
    // Iniciar contador de tiempo
    startCheckoutTimer();
    
    // Enviar evento de inicio de checkout
    sendGenesysEvent('checkout_started', {
        page: 'checkout',
        step: 'payment'
    });
});

// =====================================================
// TIMER DE CHECKOUT
// =====================================================
function startCheckoutTimer() {
    checkoutTimer = setInterval(function() {
        checkoutTimeSpent++;
        updateTimeIndicator();
        
        // Trigger: 60 segundos en checkout
        if (checkoutTimeSpent === 60 && !helpModalShown) {
            triggerCheckoutHelp('time_spent_60s');
        }
        
        // Eventos cada 30 segundos
        if (checkoutTimeSpent % 30 === 0) {
            sendGenesysEvent('checkout_time_milestone', {
                seconds: checkoutTimeSpent
            });
        }
    }, 1000);
}

function updateTimeIndicator() {
    const timeValue = document.getElementById('timeValue');
    const indicator = document.getElementById('timeIndicator');
    
    if (timeValue) {
        timeValue.textContent = checkoutTimeSpent + 's';
    }
    
    if (indicator && checkoutTimeSpent >= 60) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// CAMBIO DE MÉTODO DE PAGO
// =====================================================
function selectPayment(method) {
    paymentChangeCount++;
    updatePaymentChangeIndicator();
    
    // Mostrar/ocultar formulario de tarjeta
    const cardForm = document.getElementById('cardForm');
    if (cardForm) {
        cardForm.style.display = (method === 'credit' || method === 'debit') ? 'block' : 'none';
    }
    
    // Enviar evento a Genesys
    sendGenesysEvent('payment_method_changed', {
        method: method,
        changeCount: paymentChangeCount
    });
    
    console.log('💳 Método de pago cambiado a:', method, '| Total cambios:', paymentChangeCount);
    
    // Trigger: 3 o más cambios de método de pago
    if (paymentChangeCount >= 3 && !helpModalShown) {
        triggerCheckoutHelp('multiple_payment_changes');
    }
}

function updatePaymentChangeIndicator() {
    const countElement = document.getElementById('paymentChangeCount');
    const indicator = document.getElementById('paymentChanges');
    
    if (countElement) {
        countElement.textContent = paymentChangeCount;
    }
    
    if (indicator && paymentChangeCount >= 3) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// INTENTO DE PAGO
// =====================================================
function attemptPayment() {
    const cardNumber = document.getElementById('cardNumber').value;
    const payButton = document.getElementById('payButton');
    
    // Simular procesamiento
    if (payButton) {
        payButton.textContent = '⏳ Procesando...';
        payButton.disabled = true;
    }
    
    sendGenesysEvent('payment_attempt', {
        attemptNumber: failedPaymentCount + 1
    });
    
    // Simular respuesta después de 2 segundos
    setTimeout(function() {
        // Simular fallo si el número de tarjeta no es válido
        if (!cardNumber || cardNumber.length < 16) {
            handlePaymentFailure();
        } else {
            // 50% de probabilidad de fallo para demo
            if (Math.random() > 0.5) {
                handlePaymentFailure();
            } else {
                handlePaymentSuccess();
            }
        }
        
        if (payButton) {
            payButton.textContent = '🔒 Pagar $289.900';
            payButton.disabled = false;
        }
    }, 2000);
}

function handlePaymentFailure() {
    failedPaymentCount++;
    updateFailedIndicator();
    
    // Mostrar modal de error
    const modal = document.getElementById('paymentFailedModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    // Enviar evento a Genesys
    sendGenesysEvent('payment_failed', {
        failCount: failedPaymentCount,
        reason: 'card_declined'
    });
    
    console.log('❌ Pago fallido | Total intentos fallidos:', failedPaymentCount);
    
    // Trigger: Pago fallido
    if (!helpModalShown) {
        setTimeout(function() {
            triggerCheckoutHelp('payment_failed');
        }, 1500);
    }
}

function handlePaymentSuccess() {
    sendGenesysEvent('payment_success', {
        amount: 289900
    });
    
    alert('✅ ¡Pago exitoso! Tu pedido ha sido confirmado.');
    console.log('✅ Pago exitoso');
}

function updateFailedIndicator() {
    const countElement = document.getElementById('failedCount');
    const indicator = document.getElementById('failedAttempts');
    
    if (countElement) {
        countElement.textContent = failedPaymentCount;
    }
    
    if (indicator && failedPaymentCount >= 1) {
        indicator.classList.add('triggered');
    }
}

// =====================================================
// MODAL DE AYUDA PREDICTIVA
// =====================================================
function triggerCheckoutHelp(reason) {
    helpModalShown = true;
    
    // Enviar evento a Genesys
    sendGenesysEvent('checkout_help_triggered', {
        reason: reason,
        timeSpent: checkoutTimeSpent,
        paymentChanges: paymentChangeCount,
        failedAttempts: failedPaymentCount
    });
    
    // Mostrar modal
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    console.log('🆘 Ayuda activada por:', reason);
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    sendGenesysEvent('help_modal_dismissed', {
        action: 'continue_alone'
    });
}

function closePaymentFailedModal() {
    const modal = document.getElementById('paymentFailedModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function connectToAgent() {
    sendGenesysEvent('agent_connection_requested', {
        context: 'checkout_rescue',
        timeSpent: checkoutTimeSpent,
        paymentChanges: paymentChangeCount,
        failedAttempts: failedPaymentCount
    });
    
    // Aquí se integraría con Genesys Webchat
    alert('💬 Conectando con un asesor...\n\nEn una implementación real, esto abriría el webchat de Genesys Cloud.');
    
    closeHelpModal();
    console.log('💬 Solicitada conexión con agente');
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
    if (checkoutTimer) {
        clearInterval(checkoutTimer);
    }
    
    sendGenesysEvent('checkout_abandoned', {
        timeSpent: checkoutTimeSpent,
        paymentChanges: paymentChangeCount,
        failedAttempts: failedPaymentCount
    });
});
