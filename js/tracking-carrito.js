/**
 * Sistema de Tracking de Minicart
 * 
 * Este módulo rastrea las interacciones del usuario con el carrito de compras:
 * - Abre/cierra el carrito
 * - Tiempo de inactividad (idle time)
 * - Actividad del usuario dentro del carrito
 * 
 * Los eventos son enviados a Genesys Journey para análisis de comportamiento.
 */

(function(){
    // Prevenir inicialización múltiple
    if(window.__apdMinicartInit){ return; }
    window.__apdMinicartInit=true;

    // Nombres de eventos para Genesys Journey
    var EVENT_OPEN='abrirMiCarrito';
    var EVENT_CLOSE='cerrarMiCarrito';
    var EVENT_IDLE='tiempoEsperaMaximo';
    
    // Configuración de tiempo de inactividad (60 segundos)
    var IDLE_TIME_MS=60000;

    // Selectores CSS para el carrito
    var DRAWER_SELECTOR='#cartPanel';
    var OPEN_CLASS='open';

    // Estado interno
    var drawerOpen=false;
    var idleTimer=null;
    var idleSent=false;
    var currentDrawer=null;
    var drawerObserver=null;

    /**
     * Obtiene el elemento del carrito del DOM
     */
    function getDrawer(){ 
        return document.querySelector(DRAWER_SELECTOR); 
    }

    /**
     * Verifica si el carrito está abierto
     */
    function isDrawerOpen(d){
        if(!d) return false;
        return d.classList.contains(OPEN_CLASS);
    }

    /**
     * Limpia el temporizador de inactividad
     */
    function clearIdleTimer(){
        if(idleTimer){ 
            clearTimeout(idleTimer); 
            idleTimer=null; 
        }
    }

    /**
     * Inicia el temporizador de inactividad
     * Si el usuario no interactúa en IDLE_TIME_MS, se dispara el evento
     */
    function armIdleTimer(){
        clearIdleTimer();
        idleSent=false;
        idleTimer=setTimeout(function(){
            if(!drawerOpen) return;
            if(idleSent) return;
            idleSent=true;
            
            console.log('📊 Evento:', EVENT_IDLE, {
                scope:'timeOut', 
                idleMs:IDLE_TIME_MS, 
                url:location.href, 
                ts:new Date().toISOString()
            });
            
            try{ 
                Genesys("command", "Journey.record", {
                    eventName: EVENT_IDLE,
                    customAttributes: {
                        scope: 'timeOut',
                        idleMs: IDLE_TIME_MS,
                        url: location.href,
                        ts: new Date().toISOString()
                    }
                });
            }catch(e){ 
                console.error('Error enviando evento a Genesys:', e); 
            }
            
            // Mostrar messenger si está disponible
            try{ 
                if(window.__apdShowMessenger){ 
                    window.__apdShowMessenger(); 
                } 
            }catch(e){}
        }, IDLE_TIME_MS);
    }

    /**
     * Registra actividad del usuario y reinicia el temporizador
     */
    function markActivity(){
        if(!drawerOpen) return;
        console.log('👆 Actividad detectada en carrito');
        armIdleTimer();
    }

    /**
     * Maneja el evento de apertura del carrito
     */
    function onOpen(){
        drawerOpen=true;
        console.log('📊 Evento:', EVENT_OPEN, {
            scope:'abrirCarro', 
            url:location.href, 
            ts:new Date().toISOString()
        });
        
        try{ 
            Genesys("command", "Journey.record", {
                eventName: EVENT_OPEN,
                customAttributes: {
                    scope: 'abrirCarro',
                    url: location.href,
                    ts: new Date().toISOString()
                }
            });
        }catch(e){ 
            console.error('Error enviando evento a Genesys:', e); 
        }
        
        try{ 
            if(window.__apdShowMessenger){ 
                window.__apdShowMessenger(); 
            } 
        }catch(e){}
        
        armIdleTimer();
    }

    /**
     * Maneja el evento de cierre del carrito
     */
    function onClose(){
        drawerOpen=false;
        clearIdleTimer();
        idleSent=false;
        
        console.log('📊 Evento:', EVENT_CLOSE, {
            scope:'cerrarCarro', 
            url:location.href, 
            ts:new Date().toISOString()
        });
        
        try{ 
            Genesys("command", "Journey.record", {
                eventName: EVENT_CLOSE,
                customAttributes: {
                    scope: 'cerrarCarro',
                    url: location.href,
                    ts: new Date().toISOString()
                }
            });
        }catch(e){ 
            console.error('Error enviando evento a Genesys:', e); 
        }
    }

    /**
     * Evalúa el estado actual del carrito y dispara eventos si es necesario
     */
    function evaluateState(){
        var d=currentDrawer || getDrawer();
        if(!d) return;
        var open=isDrawerOpen(d);
        if(open && !drawerOpen){ onOpen(); }
        if(!open && drawerOpen){ onClose(); }
    }

    /**
     * Adjunta listeners de actividad al carrito
     */
    function attachActivityListeners(d){
        if(!d) return;
        if(d.__apdActivityBound) return;
        d.__apdActivityBound=true;
        
        var events=['pointerdown','click','keydown','scroll','touchstart','mousemove'];
        for(var i=0;i<events.length;i++){
            d.addEventListener(events[i], markActivity, true);
        }
    }

    /**
     * Observa cambios en la clase del carrito para detectar apertura/cierre
     */
    function observeDrawer(d){
        if(drawerObserver){ 
            try{ drawerObserver.disconnect(); }catch(e){} 
        }
        
        drawerObserver=new MutationObserver(function(mutations){
            for(var i=0;i<mutations.length;i++){
                if(mutations[i].type==='attributes'){
                    evaluateState();
                    break;
                }
            }
        });
        
        drawerObserver.observe(d,{
            attributes:true,
            attributeFilter:['class']
        });
    }

    /**
     * Vincula el tracking al carrito
     */
    function bind(){
        var d=getDrawer();
        if(!d) return;
        if(currentDrawer===d){
            evaluateState();
            return;
        }
        currentDrawer=d;
        attachActivityListeners(d);
        observeDrawer(d);
        evaluateState();
    }

    /**
     * Función de inicialización pública
     * Intenta vincular el tracking cada 300ms hasta encontrar el carrito
     */
    window.__apdBindMinicart=function(){
        var tries=0;
        var t=setInterval(function(){
            tries++;
            bind();
            if(currentDrawer || tries>=15){ 
                clearInterval(t); 
            }
        }, 300);
    };

    // Auto-inicialización
    window.__apdBindMinicart();
})();
