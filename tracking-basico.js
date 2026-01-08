// ============================================== 
// TRACKING ESCENARIO BÁSICO
// Predictive Engagement - Genesys Cloud
// ============================================== 

(function(a,t,c,l,o,u,d){a['_genesysJourneySdk']=o;a[o]=a[o]||function(){
(a[o].q=a[o].q||[]).push(arguments)},a[o].l=1*new Date();u=t.createElement(c),
d=t.getElementsByTagName(c)[0];u.async=1;u.src=l;u.charset='utf-8';d.parentNode.insertBefore(u,d)
})(window, document, 'script', 'https://apps.mypurecloud.com/journey/sdk/js/web/v1/ac.js', 'ac');

ac('init', '9bb35534-a7d5-45db-b818-dab73775234a', { region: 'use1' });
ac('load', 'autotrackUrlChange');

console.log('✅ Tracking Básico - SDK de Predictive Engagement cargado');
console.log('📋 Configuración:');
console.log('   • Deployment ID: 9bb35534-a7d5-45db-b818-dab73775234a');
console.log('   • Región: use1');
console.log('   • autotrackUrlChange: Activo');
