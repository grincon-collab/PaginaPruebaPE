# 🔧 Solución: El Proyecto No Funciona en GitHub Pages

## 🔍 Diagnóstico del Problema

Cuando el proyecto funciona localmente pero NO en GitHub Pages, usualmente es por una de estas razones:

### 1️⃣ Verifica la Consola del Navegador

1. Abre tu sitio en GitHub Pages: `https://TU-USUARIO.github.io/TU-REPO/`
2. Presiona **F12** para abrir las herramientas de desarrollo
3. Ve a la pestaña **Console**
4. Busca errores en rojo

#### Errores Comunes:

**Error: "404 Not Found" para archivos JS**
```
Failed to load resource: the server responded with a status of 404 (Not Found)
https://tu-usuario.github.io/tu-repo/js/genesys-widget.js
```
**Causa**: La carpeta `js/` no se subió correctamente

**Error: "Genesys is not defined"**
**Causa**: El script de Genesys no cargó (problema de red o bloqueo)

**Error: Mixed Content (HTTP/HTTPS)**
**Causa**: Estás cargando recursos HTTP en una página HTTPS

## ✅ Soluciones

### Solución 1: Verificar que Todos los Archivos se Subieron

```powershell
# En tu terminal PowerShell, en la carpeta del proyecto
cd "c:\Users\RC\Documents\Funciones\Pagina de pruebas para predictive"

# Ver qué archivos están trackeados por Git
git ls-files

# Deberías ver:
# .gitignore
# CAMBIOS.md
# CHECKLIST.md
# ... (todos los archivos)
# js/genesys-widget.js
# js/tracking-carrito.js
# js/tracking-reset.js
# js/config.example.js
```

Si NO ves los archivos JS:

```powershell
# Agregar explícitamente la carpeta js
git add js/

# Verificar que se agregaron
git status

# Commit y push
git commit -m "fix: Agregar archivos JavaScript"
git push
```

### Solución 2: Verificar el Nombre del Repositorio vs la URL

Si tu repositorio se llama `Pagina de pruebas para predictive`, GitHub Pages lo convierte a:
```
https://tu-usuario.github.io/Pagina-de-pruebas-para-predictive/
```

**Problema**: Los espacios se convierten en guiones

**Solución**: Usa el nombre exacto con guiones en la URL

### Solución 3: Verificar la Estructura en GitHub

1. Ve a tu repositorio en GitHub
2. Verifica que veas esta estructura:
   ```
   📁 tu-repositorio/
   ├── 📁 js/
   │   ├── genesys-widget.js
   │   ├── tracking-carrito.js
   │   ├── tracking-reset.js
   │   └── config.example.js
   ├── index.html
   ├── pagina2.html
   ├── pagina3.html
   └── ... (otros archivos)
   ```

3. Haz clic en la carpeta `js/`
4. Verifica que los 4 archivos estén ahí

Si **NO** están:
```powershell
# Forzar agregar la carpeta js
git add -f js/*
git commit -m "fix: Forzar agregar archivos JavaScript"
git push
```

### Solución 4: Esperar y Limpiar Caché

GitHub Pages puede tardar:

1. **Espera 2-5 minutos** después de hacer push
2. **Limpia el caché del navegador**:
   - Chrome: `Ctrl + Shift + Delete`
   - O presiona `Ctrl + F5` para recargar sin caché
3. **Prueba en modo incógnito**: `Ctrl + Shift + N`

### Solución 5: Verificar el Deployment ID

El widget de Genesys puede no cargar si el Deployment ID es inválido.

1. Abre `js/genesys-widget.js` en GitHub
2. Verifica el `deploymentId`
3. Si es de prueba, puede no funcionar en producción

**Prueba temporal**: Comenta el código de Genesys para ver si el resto funciona

```javascript
// js/genesys-widget.js - Comentar temporalmente
/*
(function (g, e, n, es, ys) {
  // ... todo el código
})(window, 'Genesys', ...);
*/

console.log('Genesys widget desactivado temporalmente');
```

### Solución 6: Verificar en la Pestaña Network

1. Abre tu sitio en GitHub Pages
2. Presiona **F12** → **Network** (Red)
3. Recarga la página (`F5`)
4. Verifica que estos archivos se carguen con estado **200**:
   - `index.html` → 200 OK
   - `js/genesys-widget.js` → 200 OK
   - `js/tracking-carrito.js` → 200 OK
   - `js/tracking-reset.js` → 200 OK

Si aparecen **404**:
- Los archivos no están en el repositorio
- La ruta es incorrecta

## 🛠️ Script de Verificación Completo

Copia y ejecuta esto en PowerShell:

```powershell
# Navegar al proyecto
cd "c:\Users\RC\Documents\Funciones\Pagina de pruebas para predictive"

Write-Host "🔍 Verificando archivos del proyecto..." -ForegroundColor Cyan

# Verificar archivos JS locales
if (Test-Path "js/genesys-widget.js") {
    Write-Host "✅ js/genesys-widget.js existe" -ForegroundColor Green
} else {
    Write-Host "❌ js/genesys-widget.js NO existe" -ForegroundColor Red
}

if (Test-Path "js/tracking-carrito.js") {
    Write-Host "✅ js/tracking-carrito.js existe" -ForegroundColor Green
} else {
    Write-Host "❌ js/tracking-carrito.js NO existe" -ForegroundColor Red
}

if (Test-Path "js/tracking-reset.js") {
    Write-Host "✅ js/tracking-reset.js existe" -ForegroundColor Green
} else {
    Write-Host "❌ js/tracking-reset.js NO existe" -ForegroundColor Red
}

Write-Host "`n🔍 Verificando estado de Git..." -ForegroundColor Cyan

# Ver archivos trackeados
git ls-files | Select-String "\.js$"

Write-Host "`n📊 Estado actual de Git:" -ForegroundColor Cyan
git status

Write-Host "`n💡 Comandos sugeridos:" -ForegroundColor Yellow
Write-Host "git add js/" -ForegroundColor White
Write-Host "git commit -m 'fix: Asegurar que archivos JS están en el repo'" -ForegroundColor White
Write-Host "git push" -ForegroundColor White
```

## 🎯 Checklist de Verificación

Marca cada paso:

- [ ] Los archivos JS existen localmente en la carpeta `js/`
- [ ] Los archivos JS están en el repositorio de GitHub (visible en la web)
- [ ] GitHub Pages está configurado en Settings → Pages
- [ ] La configuración es "Deploy from a branch" → "main" → "/ (root)"
- [ ] Han pasado al menos 2 minutos desde el último push
- [ ] La consola del navegador (F12) no muestra errores 404
- [ ] La pestaña Network muestra que los JS se cargan con 200 OK
- [ ] El caché del navegador está limpio (probado en incógnito)

## 📞 Si Aún No Funciona

### Prueba Local con Servidor

Para asegurarte de que funciona localmente:

```powershell
# En la carpeta del proyecto
cd "c:\Users\RC\Documents\Funciones\Pagina de pruebas para predictive"

# Iniciar servidor local
python -m http.server 8000

# Abrir en navegador: http://localhost:8000
```

Si funciona localmente pero NO en GitHub Pages:

1. **Compara las URLs** en la consola del navegador
2. **Verifica que los archivos estén en GitHub**
3. **Espera 5 minutos** y prueba de nuevo

### Alternativa: Crear un Archivo de Prueba

Crea un archivo simple para probar:

```html
<!-- test.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
</head>
<body>
    <h1>Prueba de GitHub Pages</h1>
    <div id="resultado"></div>
    <script src="js/genesys-widget.js"></script>
    <script>
        document.getElementById('resultado').innerText = 
            typeof Genesys !== 'undefined' ? 
            '✅ Script cargó correctamente' : 
            '❌ Script NO cargó';
    </script>
</body>
</html>
```

Súbelo y visita: `https://tu-usuario.github.io/tu-repo/test.html`

## 🔍 Información a Compartir si Necesitas Ayuda

Si el problema persiste, necesito saber:

1. **URL de tu repositorio**: `https://github.com/usuario/repo`
2. **URL de GitHub Pages**: `https://usuario.github.io/repo/`
3. **Errores en la consola** (F12 → Console): Captura de pantalla
4. **Errores en Network** (F12 → Network): Qué archivos fallan
5. **Resultado de**: `git ls-files | Select-String "js"`

---

**En el 99% de los casos, el problema es que:**
- ✅ Los archivos JS no se subieron a GitHub
- ✅ Hay que esperar unos minutos
- ✅ El caché del navegador está guardando la versión antigua

**¡Sigue estos pasos y funcionará!** 🚀
