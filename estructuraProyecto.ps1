# Script PowerShell para crear la estructura del proyecto Agenda Escolar
# Ejecutar desde la carpeta donde quieras crear el proyecto

Write-Host "🚀 Creando estructura del proyecto Agenda Escolar..." -ForegroundColor Green

# Crear directorio principal
$projectName = "agenda-escolar"
New-Item -ItemType Directory -Path $projectName -Force
Set-Location $projectName

Write-Host "📁 Creando estructura de carpetas..." -ForegroundColor Yellow

# Crear estructura de carpetas
$folders = @(
    "public",
    "public/icons",
    "src",
    "src/assets",
    "src/assets/images",
    "src/assets/icons",
    "src/components",
    "src/components/Calendar",
    "src/components/TaskList",
    "src/components/Notifications",
    "src/components/UserMenu",
    "src/components/Announcements",
    "src/components/Common",
    "src/pages",
    "src/hooks",
    "src/services",
    "src/context",
    "src/utils",
    "src/styles"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force
    Write-Host "  ✓ $folder" -ForegroundColor Cyan
}

Write-Host "📄 Creando archivos base..." -ForegroundColor Yellow

# Crear archivos base vacíos
$files = @(
    "public/index.html",
    "public/manifest.json",
    "src/App.jsx",
    "src/index.js",
    "src/router.jsx",
    "src/pages/Dashboard.jsx",
    "src/pages/Login.jsx",
    "src/pages/Register.jsx",
    "src/pages/AdminPanel.jsx",
    "src/pages/Profile.jsx",
    "src/components/Calendar/Calendar.jsx",
    "src/components/Calendar/CalendarDay.jsx",
    "src/components/TaskList/TaskList.jsx",
    "src/components/TaskList/TaskItem.jsx",
    "src/components/Notifications/NotificationList.jsx",
    "src/components/Notifications/NotificationItem.jsx",
    "src/components/UserMenu/UserMenu.jsx",
    "src/components/Announcements/AnnouncementList.jsx",
    "src/components/Announcements/AnnouncementItem.jsx",
    "src/components/Common/Header.jsx",
    "src/components/Common/Sidebar.jsx",
    "src/components/Common/LoadingSpinner.jsx",
    "src/components/Common/Modal.jsx",
    "src/hooks/useAuth.js",
    "src/hooks/useTasks.js",
    "src/hooks/useNotifications.js",
    "src/services/authService.js",
    "src/services/taskService.js",
    "src/services/notificationService.js",
    "src/services/announcementService.js",
    "src/services/firebaseConfig.js",
    "src/context/AuthContext.jsx",
    "src/context/SettingsContext.jsx",
    "src/utils/dateUtils.js",
    "src/utils/validations.js",
    "src/utils/constants.js",
    "src/styles/globals.css",
    "src/styles/variables.css",
    "package.json",
    ".env.example",
    ".gitignore",
    "README.md"
)

foreach ($file in $files) {
    New-Item -ItemType File -Path $file -Force
    Write-Host "  ✓ $file" -ForegroundColor Green
}

Write-Host "`n🎉 ¡Estructura del proyecto creada exitosamente!" -ForegroundColor Green
Write-Host "📂 Proyecto creado en: $((Get-Location).Path)" -ForegroundColor White
Write-Host "`n📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. cd $projectName" -ForegroundColor White
Write-Host "  2. npm install" -ForegroundColor White
Write-Host "  3. Configurar Firebase en .env" -ForegroundColor White
Write-Host "  4. npm start" -ForegroundColor White