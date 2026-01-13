# ✅ Checklist para Subir a GitHub

## 📋 Antes de Subir

- [ ] **Revisar el Deployment ID**
  - Archivo: `js/genesys-widget.js`
  - ¿Es seguro compartir este ID públicamente?
  - Si no: Reemplazar por `'TU-DEPLOYMENT-ID-AQUI'` o hacer el repo privado

- [ ] **Revisar archivos sensibles**
  - ¿Hay contraseñas, tokens o API keys?
  - ¿Están todos en el `.gitignore`?

- [ ] **Probar que las páginas funcionan**
  - [ ] `index.html` carga correctamente
  - [ ] `pagina2.html` carga correctamente
  - [ ] `pagina3.html` - El carrito se abre/cierra
  - [ ] Scripts JS se cargan sin errores (F12 → Console)
  - [ ] Widget de Genesys aparece

## 🚀 Pasos para Subir

- [ ] **1. Inicializar Git**
  ```bash
  git init
  ```

- [ ] **2. Agregar archivos**
  ```bash
  git add .
  ```

- [ ] **3. Primer commit**
  ```bash
  git commit -m "feat: Initial commit - Genesys tracking modularizado"
  ```

- [ ] **4. Crear repositorio en GitHub**
  - Ir a github.com
  - Click en "New repository"
  - Nombre: `genesys-journey-tracking-demo`
  - Descripción: "Páginas de demostración con Genesys Journey tracking"
  - Elegir: Public o Private
  - NO marcar "Initialize with README"
  - Click "Create repository"

- [ ] **5. Conectar con GitHub**
  ```bash
  git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
  git branch -M main
  git push -u origin main
  ```

## 🔍 Después de Subir

- [ ] **Verificar en GitHub**
  - [ ] Todos los archivos están presentes
  - [ ] El README.md se ve bien
  - [ ] No hay archivos sensibles visibles

- [ ] **Actualizar el README si es necesario**
  - [ ] Agregar URL del demo (si usas GitHub Pages)
  - [ ] Instrucciones de instalación claras
  - [ ] Screenshots o GIFs (opcional)

- [ ] **GitHub Pages (Opcional)**
  - [ ] Settings → Pages
  - [ ] Source: main branch
  - [ ] Esperar 2-3 minutos
  - [ ] Probar URL: `https://tu-usuario.github.io/tu-repo/`

## 📝 Notas

**Estructura final del proyecto:**
```
📁 Pagina de pruebas para predictive/
├── 📁 js/
│   ├── 📄 genesys-widget.js        ← Widget de Genesys
│   ├── 📄 tracking-carrito.js      ← Tracking del carrito
│   └── 📄 tracking-reset.js        ← Reinicio de tracking
├── 📄 .gitignore                   ← Archivos excluidos
├── 📄 index.html                   ← Página principal
├── 📄 pagina2.html                 ← Segunda página
├── 📄 pagina3.html                 ← Página con carrito
├── 📄 configuracion.html           ← Guía de configuración
├── 📄 README.md                    ← Documentación
├── 📄 GITHUB-SETUP.md              ← Guía de GitHub
└── 📄 CHECKLIST.md                 ← Este archivo
```

## ⚠️ Recordatorios Importantes

1. **Nunca subas**:
   - Contraseñas
   - API keys privadas
   - Tokens de acceso
   - Información personal sensible

2. **Si subiste algo por error**:
   - NO es suficiente con borrarlo en un nuevo commit
   - Estará en el historial de Git
   - Usa `git filter-branch` o GitHub support para eliminarlo

3. **Buenas prácticas**:
   - Commits pequeños y frecuentes
   - Mensajes de commit descriptivos
   - Revisar cambios antes de hacer push
   - Mantener el README actualizado

## 🎯 Comandos Rápidos

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "descripción"

# Subir a GitHub
git push

# Descargar cambios
git pull

# Ver diferencias
git diff

# Ver historial
git log --oneline
```

---

**¿Listo?** ¡Marca cada checkbox y adelante! 🚀
