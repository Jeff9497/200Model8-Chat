# 200Model8 GitHub Setup Script
Write-Host "🚀 Setting up 200Model8 for GitHub..." -ForegroundColor Cyan

# Initialize git repository
Write-Host "📁 Initializing git repository..." -ForegroundColor Yellow
git init

# Add all files
Write-Host "📝 Adding files to git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: 200Model8 - Free AI Chat Interface

Features:
- 🆓 Free AI models (Llama 3.1, Mistral, Gemma, etc.)
- 🔍 Web search integration with Exa
- 📁 File upload support
- ✏️ Message editing
- 🎨 3 themes (light/dark/gradient)
- 📱 Mobile responsive design
- 🔔 Smart notifications"

Write-Host "✅ Git repository initialized!" -ForegroundColor Green
Write-Host ""
Write-Host "🔑 Next steps:" -ForegroundColor Cyan
Write-Host "1. Provide your GitHub access token" -ForegroundColor White
Write-Host "2. We'll create the remote repository" -ForegroundColor White
Write-Host "3. Push code to GitHub" -ForegroundColor White
Write-Host "4. Deploy to Vercel" -ForegroundColor White
