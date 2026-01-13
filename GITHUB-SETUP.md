# 🚀 Guía para Subir el Proyecto a GitHub

## Paso 1: Inicializar Git en tu Proyecto

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
git init
```

## Paso 2: Agregar Archivos al Repositorio

```bash
git add .
```

## Paso 3: Hacer el Primer Commit

```bash
git commit -m "feat: Initial commit - Páginas de prueba con Genesys tracking modularizado"
```

## Paso 4: Crear un Repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz clic en el botón **"New"** o **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa la información:
   - **Repository name**: `genesys-journey-tracking-demo` (o el nombre que prefieras)
   - **Description**: "Páginas de demostración para Genesys Journey tracking"
   - **Visibilidad**: 
     - ✅ **Public** - Si quieres que sea visible para todos
     - ⚠️ **Private** - Si prefieres que solo tú lo veas
   - **NO** marques "Initialize this repository with a README" (ya tienes uno)
5. Haz clic en **"Create repository"**

## Paso 5: Conectar tu Repositorio Local con GitHub

GitHub te mostrará comandos. Copia y ejecuta estos (reemplaza con tu URL):

```bash
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

### Ejemplo:
```bash
git remote add origin https://github.com/miusuario/genesys-journey-tracking-demo.git
git branch -M main
git push -u origin main
```

## Paso 6: Verificar que se Subió Correctamente

1. Recarga la página de tu repositorio en GitHub
2. Deberías ver todos tus archivos:
   ```
   📁 js/
      ├── genesys-widget.js
      ├── tracking-carrito.js
      └── tracking-reset.js
   📄 index.html
   📄 pagina2.html
   📄 pagina3.html
   📄 README.md
   📄 .gitignore
   ```

## 🔒 Importante: Proteger Información Sensible

### Antes de hacer el repositorio público:

1. **Revisa el Deployment ID** en `js/genesys-widget.js`:
   ```javascript
   deploymentId: '8a4367b7-a7a9-4f0e-b4f8-a79c899c9db8'
   ```

2. **Opciones**:
   - ✅ **Reemplázalo por un placeholder**:
     ```javascript
     deploymentId: 'TU-DEPLOYMENT-ID-AQUI'
     ```
   - ✅ **Crea un archivo de configuración separado** (no incluido en git):
     ```javascript
     // config.js (agregado a .gitignore)
     window.GENESYS_CONFIG = {
       deploymentId: 'tu-id-real'
     };
     ```

3. **Si ya subiste el ID real y quieres eliminarlo del historial**:
   ```bash
   # ⚠️ CUIDADO: Esto reescribe el historio
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch js/genesys-widget.js" \
     --prune-empty --tag-name-filter cat -- --all
   
   git push origin --force --all
   ```

## 📤 Actualizar el Repositorio (Futuros Cambios)

Cuando hagas cambios:

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar los cambios
git add .

# 3. Hacer commit con un mensaje descriptivo
git commit -m "feat: Descripción de los cambios"

# 4. Subir a GitHub
git push
```

## 🌐 Activar GitHub Pages (Opcional)

Para que tu sitio sea accesible en línea:

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **"Build and deployment"**:
   - **Source**: Selecciona **"Deploy from a branch"** (NO uses GitHub Actions)
   - **Branch**: Selecciona **"main"** (o "master")
   - **Folder**: Selecciona **"/ (root)"**
5. Haz clic en **Save**
6. Espera 1-2 minutos y recarga la página
7. Verás un mensaje verde con tu URL:
   ```
   https://TU-USUARIO.github.io/TU-REPOSITORIO/
   ```

### ⚠️ IMPORTANTE para GitHub Pages:
- **NO subas el Deployment ID real** si usas GitHub Pages con repositorio público
- Considera usar un deployment ID de prueba/demo
- **NO uses GitHub Actions** para desplegar - usa "Deploy from a branch"
- Si el deployment se queda atascado, ve a [SOLUCION-GITHUB-PAGES.md](SOLUCION-GITHUB-PAGES.md)

### 🚨 Si GitHub Pages se Queda Atascado:
Lee la guía completa en [SOLUCION-GITHUB-PAGES.md](SOLUCION-GITHUB-PAGES.md)

## 🎯 Mejores Prácticas

### Mensajes de Commit

Usa convenciones claras:

```bash
# Nuevas características
git commit -m "feat: Agregar tracking de búsqueda"

# Corrección de bugs
git commit -m "fix: Corregir evento de cierre de carrito"

# Documentación
git commit -m "docs: Actualizar README con nuevas instrucciones"

# Refactorización
git commit -m "refactor: Separar lógica de tracking en módulos"

# Estilo/formato
git commit -m "style: Mejorar formato de código JS"
```

## 🔄 Clonar el Repositorio en Otra Computadora

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
cd TU-REPOSITORIO
```

## 📋 Comandos Git Útiles

```bash
# Ver el estado de los archivos
git status

# Ver el historial de commits
git log --oneline

# Ver qué cambió en un archivo
git diff archivo.js

# Deshacer cambios no guardados
git checkout -- archivo.js

# Ver repositorios remotos configurados
git remote -v

# Descargar cambios de GitHub
git pull
```

## ❓ Solución de Problemas

### "Permission denied"
```bash
# Configura tu usuario de GitHub
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### "Updates were rejected"
```bash
# Descarga los cambios primero
git pull origin main --rebase
git push
```

### Olvidaste Agregar algo al .gitignore
```bash
# Eliminar del tracking pero mantener el archivo local
git rm --cached archivo-sensible.js
echo "archivo-sensible.js" >> .gitignore
git commit -m "chore: Actualizar .gitignore"
git push
```

## 📞 Recursos Adicionales

- [GitHub Docs](https://docs.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Aprende Git Interactivo](https://learngitbranching.js.org/)

---

**¡Listo!** Tu proyecto está ahora organizado y listo para compartir en GitHub 🎉
