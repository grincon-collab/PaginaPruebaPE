# Páginas de Prueba - Genesys Journey Tracking

Este proyecto contiene páginas de demostración para implementar y probar el tracking de Genesys Journey en diferentes escenarios de e-commerce.

## 📋 Estructura del Proyecto

```
├── index.html              # Página principal con botón de reinicio
├── pagina2.html           # Segunda página de ejemplo
├── pagina3.html           # Página con carrito de compras
├── js/
│   ├── genesys-widget.js      # Widget de chat de Genesys
│   ├── tracking-carrito.js    # Sistema de tracking del carrito
│   └── tracking-reset.js      # Utilidad de reinicio de tracking
├── .gitignore             # Archivos excluidos de Git
└── README.md              # Este archivo
```

## 🚀 Características

### Página Principal (index.html)
- Navegación a otras páginas
- Botón de reinicio de tracking
- Widget de chat de Genesys

### Página 2 (pagina2.html)
- Página simple con widget de Genesys
- Enlaces de navegación

### Página 3 - Carrito de Compras (pagina3.html)
- Carrito deslizable lateral
- Tracking de eventos:
  - **Apertura del carrito** (`abrirMiCarrito`)
  - **Cierre del carrito** (`cerrarMiCarrito`)
  - **Tiempo de inactividad** (`tiempoEsperaMaximo` - 60 segundos)
- Detección automática de actividad del usuario
- Overlay oscuro al abrir el carrito

## 🔧 Configuración

### Deployment ID de Genesys

⚠️ **IMPORTANTE**: Este proyecto usa un `deploymentId` de ejemplo. Para usar en producción:

1. Abre el archivo `js/genesys-widget.js`
2. Reemplaza el `deploymentId` con tu propio ID:

```javascript
deploymentId: 'TU-DEPLOYMENT-ID-AQUI'
```

### Eventos Personalizados

Los eventos enviados a Genesys Journey incluyen:

| Evento | Descripción | Atributos |
|--------|-------------|-----------|
| `abrirMiCarrito` | Usuario abre el carrito | `scope`, `url`, `ts` |
| `cerrarMiCarrito` | Usuario cierra el carrito | `scope`, `url`, `ts` |
| `tiempoEsperaMaximo` | 60s de inactividad en el carrito | `scope`, `idleMs`, `url`, `ts` |
| `finalizarSesionTracking` | Reset manual del tracking | `url`, `timestamp`, `action` |

## 📦 Instalación y Uso

1. **Clonar o descargar el repositorio**
   ```bash
   git clone [URL-DEL-REPOSITORIO]
   ```

2. **Configurar tu Deployment ID**
   - Edita `js/genesys-widget.js`
   - Reemplaza el `deploymentId`

3. **Abrir en un servidor web**
   - Usa Live Server en VS Code, o
   - Cualquier servidor HTTP local

   ```bash
   # Ejemplo con Python
   python -m http.server 8000
   
   # Luego abre: http://localhost:8000
   ```

## 🧪 Pruebas

### Probar el Tracking del Carrito

1. Abre `pagina3.html`
2. Abre la consola del navegador (F12)
3. Haz clic en el botón "🛒 Carrito"
4. Observa el evento `abrirMiCarrito` en la consola
5. Espera 60 segundos sin interactuar → evento `tiempoEsperaMaximo`
6. Cierra el carrito → evento `cerrarMiCarrito`

### Reiniciar Tracking

1. Ve a `index.html`
2. Haz clic en "🔄 Reiniciar Tracking"
3. Confirma la limpieza de datos

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES5)
- Genesys Cloud Journey SDK

## 📝 Notas Importantes

- El tiempo de inactividad está configurado a 60 segundos (60000ms)
- Los eventos se registran tanto en consola como en Genesys Journey
- El código JS está minificado intencionalmente para producción
- Se usa MutationObserver para detectar cambios en el DOM
- Compatible con todos los navegadores modernos

## 🔐 Seguridad

- No incluir credenciales sensibles en el código
- El `.gitignore` está configurado para excluir archivos de configuración local
- Revisar el `deploymentId` antes de subir a repositorios públicos

## 📄 Licencia

Este es un proyecto de demostración. Úsalo libremente para tus implementaciones.

## 🤝 Contribuciones

Si encuentras errores o mejoras:
1. Abre un issue
2. Crea un pull request
3. Contacta al equipo de desarrollo

## 📧 Soporte

Para preguntas sobre Genesys Journey, consulta la [documentación oficial de Genesys](https://developer.genesys.cloud/).
