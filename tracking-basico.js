// ============================================== 
// TRACKING ESCENARIO BÁSICO
// Fragmento de Predictive Engagement
// ============================================== 

/* fragmento */
if(document.readyState=="complete"){
    apd_cargarFragmento()
} else {
    window.addEventListener("load", apd_cargarFragmento())
};

function apd_cargarFragmento(){
    var apd_script=document.getElementsByTagName("script")[0];
    var apd_fragmentoPredictiveEngagement=document.createElement("script");
    
    apd_fragmentoPredictiveEngagement.text="(function(a,t,c,l,o,u,d){a['_genesysJourneySdk']=o;a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)},a[o].l=1*new Date();u=t.createElement(c),d=t.getElementsByTagName(c)[0];u.async=1;u.src=l;u.charset='utf-8';d.parentNode.insertBefore(u,d)})(window,document,'script','https://apps.mypurecloud.com/journey/sdk/js/web/v1/ac.js','ac');ac('init','9bb35534-a7d5-45db-b818-dab73775234a',{region:'use1'});ac('load','autotrackUrlChange',{onUrlChange:function(url){ac('pageview',{location:location.href,title:document.title+' ('+location.href+')'})}});ac('forms:track','form',{captureFormDataOnSubmit:true,captureFormDataOnAbandon:true})";
    
    apd_script.parentNode.insertBefore(apd_fragmentoPredictiveEngagement,apd_script);
    
    console.log('✅ Tracking Básico - Fragmento de Predictive Engagement cargado');
    console.log('📋 Eventos configurados:');
    console.log('   • ac(\'pageview\') - Vista de página');
    console.log('   • autotrackUrlChange - Cambios de URL');
    console.log('   • forms:track - Tracking de formularios');
};
/*fragmento*/
