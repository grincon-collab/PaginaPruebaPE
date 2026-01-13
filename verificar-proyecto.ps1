# Script de Verificación y Corrección para GitHub
# Ejecuta este script en PowerShell para verificar que todo esté listo

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  🔍 VERIFICACIÓN DE PROYECTO PARA GITHUB PAGES" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Cambiar al directorio del proyecto
$proyectoPath = "c:\Users\RC\Documents\Funciones\Pagina de pruebas para predictive"
Set-Location $proyectoPath

# 1. Verificar archivos HTML
Write-Host "📄 Verificando archivos HTML..." -ForegroundColor Yellow
$htmlFiles = @("index.html", "pagina2.html", "pagina3.html")
foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file existe" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file NO existe" -ForegroundColor Red
    }
}

# 2. Verificar carpeta js/
Write-Host "`n📁 Verificando carpeta js/..." -ForegroundColor Yellow
if (Test-Path "js") {
    Write-Host "  ✅ Carpeta js/ existe" -ForegroundColor Green
    
    $jsFiles = @("genesys-widget.js", "tracking-carrito.js", "tracking-reset.js", "config.example.js")
    foreach ($file in $jsFiles) {
        if (Test-Path "js\$file") {
            $size = (Get-Item "js\$file").Length
            Write-Host "  ✅ js/$file ($size bytes)" -ForegroundColor Green
        } else {
            Write-Host "  ❌ js/$file NO existe" -ForegroundColor Red
        }
    }
} else {
    Write-Host "  ❌ Carpeta js/ NO existe" -ForegroundColor Red
}

# 3. Verificar estado de Git
Write-Host "`n🔍 Verificando estado de Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "  ✅ Repositorio Git inicializado" -ForegroundColor Green
    
    # Ver archivos trackeados
    Write-Host "`n  📋 Archivos JavaScript en Git:" -ForegroundColor Cyan
    git ls-files | Select-String "\.js$" | ForEach-Object {
        Write-Host "     - $_" -ForegroundColor White
    }
    
    # Ver archivos no trackeados
    $untrackedJS = git status --porcelain | Select-String "^\?\?.*\.js$"
    if ($untrackedJS) {
        Write-Host "`n  ⚠️  Archivos JS NO trackeados:" -ForegroundColor Yellow
        $untrackedJS | ForEach-Object {
            Write-Host "     - $_" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  ❌ Git NO está inicializado" -ForegroundColor Red
    Write-Host "     Ejecuta: git init" -ForegroundColor White
}

# 4. Verificar configuración de remote
Write-Host "`n🌐 Verificando configuración de GitHub..." -ForegroundColor Yellow
$remote = git remote -v 2>$null | Select-String "origin"
if ($remote) {
    Write-Host "  ✅ Remote configurado:" -ForegroundColor Green
    $remote | ForEach-Object {
        Write-Host "     $_" -ForegroundColor White
    }
} else {
    Write-Host "  ❌ Remote NO configurado" -ForegroundColor Red
    Write-Host "     Ejecuta: git remote add origin https://github.com/USUARIO/REPO.git" -ForegroundColor White
}

# 5. Verificar referencias a archivos JS en HTML
Write-Host "`n🔗 Verificando referencias en HTML..." -ForegroundColor Yellow
foreach ($htmlFile in $htmlFiles) {
    if (Test-Path $htmlFile) {
        $content = Get-Content $htmlFile -Raw
        if ($content -match 'src="js/') {
            Write-Host "  ✅ $htmlFile tiene referencias a js/" -ForegroundColor Green
            # Extraer las referencias
            $matches = [regex]::Matches($content, 'src="(js/[^"]+)"')
            foreach ($match in $matches) {
                $jsPath = $match.Groups[1].Value
                Write-Host "     - $jsPath" -ForegroundColor Cyan
            }
        } else {
            Write-Host "  ⚠️  $htmlFile no tiene referencias a js/" -ForegroundColor Yellow
        }
    }
}

# 6. Resumen y acciones sugeridas
Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "  📊 RESUMEN Y ACCIONES SUGERIDAS" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$problemas = 0

# Verificar si hay archivos JS no trackeados
$untrackedJS = git status --porcelain 2>$null | Select-String "^\?\?.*js/"
if ($untrackedJS) {
    $problemas++
    Write-Host "`n⚠️  PROBLEMA $problemas`: Hay archivos JS no agregados a Git" -ForegroundColor Yellow
    Write-Host "   SOLUCIÓN:" -ForegroundColor White
    Write-Host "   git add js/" -ForegroundColor Green
    Write-Host "   git commit -m 'fix: Agregar archivos JavaScript'" -ForegroundColor Green
    Write-Host "   git push" -ForegroundColor Green
}

# Verificar si hay cambios sin commit
$changes = git status --porcelain 2>$null
if ($changes) {
    $problemas++
    Write-Host "`n⚠️  PROBLEMA $problemas`: Hay cambios sin hacer commit" -ForegroundColor Yellow
    Write-Host "   SOLUCIÓN:" -ForegroundColor White
    Write-Host "   git add ." -ForegroundColor Green
    Write-Host "   git commit -m 'fix: Actualizar archivos'" -ForegroundColor Green
    Write-Host "   git push" -ForegroundColor Green
}

if ($problemas -eq 0) {
    Write-Host "`n✅ ¡Todo parece estar bien!" -ForegroundColor Green
    Write-Host "`n   Próximos pasos:" -ForegroundColor White
    Write-Host "   1. Verifica que el push esté completo: git push" -ForegroundColor Cyan
    Write-Host "   2. Ve a GitHub y verifica que la carpeta js/ esté visible" -ForegroundColor Cyan
    Write-Host "   3. Espera 2-3 minutos" -ForegroundColor Cyan
    Write-Host "   4. Abre tu sitio en modo incógnito (Ctrl+Shift+N)" -ForegroundColor Cyan
    Write-Host "   5. Presiona F12 y revisa la consola" -ForegroundColor Cyan
}

# 7. Comando de fix automático
Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "  🔧 FIX AUTOMÁTICO (opcional)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "`n¿Quieres que corrija los problemas automáticamente?" -ForegroundColor Yellow
Write-Host "Esto hará: git add . && git commit && git push" -ForegroundColor White
Write-Host ""
$respuesta = Read-Host "Escribe 'SI' para continuar, o ENTER para salir"

if ($respuesta -eq "SI") {
    Write-Host "`n🔧 Ejecutando fix automático..." -ForegroundColor Cyan
    
    git add .
    Write-Host "  ✅ Archivos agregados" -ForegroundColor Green
    
    git commit -m "fix: Asegurar que todos los archivos estén en el repositorio"
    Write-Host "  ✅ Commit realizado" -ForegroundColor Green
    
    git push
    Write-Host "  ✅ Push completado" -ForegroundColor Green
    
    Write-Host "`n🎉 ¡Listo! Espera 2-3 minutos y recarga tu sitio en GitHub Pages" -ForegroundColor Green
    Write-Host "   Limpia el caché: Ctrl + Shift + Delete" -ForegroundColor Cyan
    Write-Host "   O abre en incógnito: Ctrl + Shift + N" -ForegroundColor Cyan
} else {
    Write-Host "`n👍 No se realizaron cambios" -ForegroundColor White
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "  ✨ VERIFICACIÓN COMPLETADA" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
