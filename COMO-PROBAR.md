# 🚀 Cómo Abrir y Probar el Proyecto

## 🖥️ Métodos para Visualizar las Páginas

### Método 1: Live Server en VS Code (Recomendado)

1. **Instalar la extensión Live Server** (si no la tienes):
   - Presiona `Ctrl+Shift+X` para abrir Extensions
   - Busca "Live Server"
   - Haz clic en "Install"

2. **Abrir con Live Server**:
   - Haz clic derecho en `index.html`
   - Selecciona "Open with Live Server"
   - Se abrirá automáticamente en tu navegador

### Método 2: Python HTTP Server

```bash
# Abre una terminal en la carpeta del proyecto
cd "c:\Users\RC\Documents\Funciones\Pagina de pruebas para predictive"

# Ejecuta el servidor (Python 3)
python -m http.server 8000

# Abre en tu navegador:
# http://localhost:8000
```

### Método 3: PowerShell (Windows)

```powershell
# Abre PowerShell en la carpeta del proyecto
cd "c:\Users\RC\Documents\Funciones\Pagina de pruebas para predictive"

# Inicia un servidor simple
# Requiere Python instalado
python -m http.server 8000

# O usa Node.js si lo tienes:
npx http-server -p 8000
```

### Método 4: Doble Clic (Limitado)

⚠️ **Nota**: Abrir los archivos HTML directamente con doble clic puede funcionar, pero algunos navegadores bloquean scripts locales por seguridad.

1. Navega a la carpeta del proyecto
2. Doble clic en `index.html`
3. Si ves errores en consola, usa otro método

## 🧪 Cómo Probar Cada Funcionalidad

### 1. Probar la Página Principal (index.html)

✅ **Verificar:**
- [ ] La página carga sin errores
- [ ] Los botones de navegación funcionan
- [ ] El botón "🔄 Reiniciar Tracking" responde
- [ ] El widget de Genesys aparece (esquina inferior derecha)

🔍 **Consola del Navegador** (F12):
```
No debe haber errores en rojo
Los scripts JS deben cargar correctamente
```

### 2. Probar la Segunda Página (pagina2.html)

✅ **Verificar:**
- [ ] La navegación desde index.html funciona
- [ ] Los enlaces "Regresar" funcionan
- [ ] El widget de Genesys está presente

### 3. Probar el Carrito (pagina3.html)

✅ **Verificar:**
- [ ] El botón "🛒 Carrito (3)" está visible
- [ ] Al hacer clic, el carrito se abre desde la derecha
- [ ] El overlay oscuro aparece detrás
- [ ] El botón "×" cierra el carrito
- [ ] Presionar ESC cierra el carrito
- [ ] El widget de Genesys está presente

🔍 **Consola del Navegador** (F12):

**Al abrir el carrito, deberías ver:**
```
📊 Evento: abrirMiCarrito {scope: "abrirCarro", url: "...", ts: "..."}
```

**Al interactuar con el carrito:**
```
👆 Actividad detectada en carrito
```

**Si esperas 60 segundos sin tocar:**
```
📊 Evento: tiempoEsperaMaximo {scope: "timeOut", idleMs: 60000, ...}
```

**Al cerrar el carrito:**
```
📊 Evento: cerrarMiCarrito {scope: "cerrarCarro", url: "...", ts: "..."}
```

### 4. Probar el Reinicio de Tracking (index.html)

✅ **Pasos:**
1. Ve a `pagina3.html` y abre el carrito
2. Regresa a `index.html`
3. Haz clic en "🔄 Reiniciar Tracking"
4. Confirma en el popup

🔍 **Consola del Navegador** (F12):
```
📊 Evento: finalizarSesionTracking enviado a Genesys
✅ Variable __apdMinicartInit eliminada
✅ Función __apdBindMinicart eliminada
✅ Datos de tracking eliminados del localStorage
```

## 🐛 Solución de Problemas

### Error: "Failed to load resource: net::ERR_FILE_NOT_FOUND"

**Problema**: Los archivos JS no se encuentran

**Solución**:
```bash
# Verifica la estructura de carpetas
ls js/

# Deberías ver:
# genesys-widget.js
# tracking-carrito.js
# tracking-reset.js
# config.example.js
```

### Error: "Genesys is not defined"

**Problema**: El widget de Genesys no cargó

**Posibles causas**:
1. No hay conexión a internet
2. El deploymentId es inválido
3. Bloqueadores de scripts (AdBlock, etc.)

**Solución**:
- Desactiva bloqueadores temporalmente
- Verifica la conexión a internet
- Revisa el deploymentId en `js/genesys-widget.js`

### El carrito no responde a clics

**Problema**: JavaScript no está cargando

**Solución**:
1. Abre la consola (F12)
2. Busca errores en rojo
3. Verifica que los scripts se cargaron:
   ```javascript
   console.log(typeof window.__apdBindMinicart)
   // Debería mostrar: "function"
   ```

### El tracking no envía eventos

**Problema**: Configuración de Genesys

**Verificación**:
```javascript
// En la consola del navegador
console.log(window.Genesys)
// Debería mostrar una función

// Probar manualmente:
Genesys("command", "Journey.record", {
    eventName: 'test',
    customAttributes: { test: true }
});
```

## 📊 Verificación Completa

### Checklist de Funcionalidad

- [ ] **index.html**
  - [ ] Página carga
  - [ ] Navegación funciona
  - [ ] Botón de reset funciona
  - [ ] Widget visible

- [ ] **pagina2.html**
  - [ ] Página carga
  - [ ] Navegación funciona
  - [ ] Widget visible

- [ ] **pagina3.html**
  - [ ] Página carga
  - [ ] Carrito abre/cierra
  - [ ] Overlay funciona
  - [ ] ESC cierra carrito
  - [ ] Eventos se registran
  - [ ] Widget visible

- [ ] **Scripts JS**
  - [ ] `genesys-widget.js` carga
  - [ ] `tracking-carrito.js` carga
  - [ ] `tracking-reset.js` carga
  - [ ] No hay errores en consola

## 🎯 Siguiente Paso

Una vez verificado todo:
1. Lee [CHECKLIST.md](CHECKLIST.md)
2. Sigue [GITHUB-SETUP.md](GITHUB-SETUP.md)
3. ¡Sube tu proyecto a GitHub!

## 📞 Herramientas de Desarrollo

### Consola del Navegador (F12)

```javascript
// Ver si Genesys está cargado
window.Genesys

// Ver si el tracking está inicializado
window.__apdMinicartInit

// Ver la función de binding
window.__apdBindMinicart

// Probar la función de reset
reiniciarTracking()
```

### Network Tab (F12 → Network)

Verifica que se carguen:
- ✅ `genesys-widget.js`
- ✅ `tracking-carrito.js`
- ✅ `tracking-reset.js`
- ✅ `genesys.min.js` (desde mypurecloud.com)

### Application Tab (F12 → Application)

**Local Storage**: Verifica datos de tracking (si hay)
**Session Storage**: Verifica datos de sesión

---

## ✨ Todo Listo

Si todo funciona correctamente:
- ✅ Las páginas cargan
- ✅ La navegación funciona
- ✅ El carrito responde
- ✅ Los eventos se registran
- ✅ No hay errores en consola

**¡Estás listo para subir a GitHub! 🚀**

---

*Última actualización: 13 de Enero, 2026*
