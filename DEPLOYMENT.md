# 🚀 Deployment Guide for 200Model8

## 📋 Prerequisites
- Git installed on your system
- GitHub account
- Vercel account (free)
- OpenRouter API key

## 🔧 Local Setup

### 1. Install Dependencies
```powershell
npm install
```

### 2. Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 3. Run Development Server
```powershell
# Standard development
npm run dev

# For mobile testing (accessible from other devices)
npm run dev-mobile
```

## 🌐 GitHub & Vercel Deployment

### 1. Initialize Git Repository
```powershell
git init
git add .
git commit -m "Initial commit: 200Model8 - Free AI Chat Interface"
```

### 2. Create GitHub Repository
```powershell
# Using GitHub CLI (if installed)
gh repo create 200Model8-Chat --public --push

# Or manually:
# 1. Go to github.com/new
# 2. Create repository named "200Model8-Chat"
# 3. Push code:
git remote add origin https://github.com/yourusername/200Model8-Chat.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `200Model8-Chat` repository
5. Add environment variable:
   - `NEXT_PUBLIC_OPENROUTER_API_KEY`: Your OpenRouter API key
6. Deploy!

## 🔍 Search Configuration

The app includes Exa search integration. The API key is already configured in the code for the search functionality.

## 📱 Features Included

- ✅ **Free AI Models**: Llama 3.1, Mistral, Gemma, Phi-3, etc.
- ✅ **Web Search**: Real-time search with Exa
- ✅ **File Upload**: Images and text files
- ✅ **Message Editing**: Edit and resend messages
- ✅ **3 Themes**: Light, Dark, Gradient
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **Smart Notifications**: Model switching alerts

## 🎯 Post-Deployment

After deployment, your app will be available at:
`https://your-project-name.vercel.app`

Users can:
1. Visit the URL
2. Add their OpenRouter API key in settings
3. Start chatting with free AI models
4. Use web search for current information
5. Upload files for analysis

## 🔧 Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version (use 18+)
2. **Search not working**: Verify Exa API integration
3. **Models not responding**: Check OpenRouter API key

### Support:
- Check console for error messages
- Verify environment variables
- Test locally first

---

**Made with ❤️ for free AI access everywhere!**
