# 200Model8 Setup Script
Write-Host "🚀 Setting up 200Model8..." -ForegroundColor Cyan

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please restart your terminal after Node.js installation." -ForegroundColor Red
    Write-Host "💡 Run: winget install OpenJS.NodeJS" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Setup complete! You can now run:" -ForegroundColor Cyan
    Write-Host "   npm run dev          # Start on localhost:3000" -ForegroundColor White
    Write-Host "   npm run dev-mobile   # Start on all IPs:8080 for mobile testing" -ForegroundColor White
    Write-Host ""
    Write-Host "📱 For mobile testing, use: http://YOUR_IP:3000 or http://YOUR_IP:8080" -ForegroundColor Yellow
    Write-Host "💡 Find your IP with: ipconfig" -ForegroundColor Gray
} else {
    Write-Host "❌ Installation failed. Please check the errors above." -ForegroundColor Red
}
