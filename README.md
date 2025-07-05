# 200Model8 - Free AI Chat Interface

A beautiful, modern chat interface that provides **FREE** access to multiple AI models through OpenRouter. Chat with Llama 3.1, Mistral, Gemma, and other free models - all in one place!

## ✨ Features

- 🆓 **Free AI Models**: Access Llama 3.1, Mistral 7B, Gemma 7B, Phi-3, and more FREE models
- 💬 **Beautiful Chat UI**: Modern, responsive design with 3 themes (light/dark/gradient)
- 🔍 **Web Search**: Integrated Exa search for real-time information
- 📁 **File Upload**: Upload images and text files (model-dependent)
- ✏️ **Message Editing**: Edit and resend messages
- 🔔 **Smart Notifications**: Get notified when switching models
- 🚀 **Fast & Free**: Optimized for speed and completely free to use
- 🌐 **Easy Deployment**: Deploy to Vercel with one click
- 🔒 **Secure**: API keys stored locally, no server-side storage
- 📱 **Mobile Friendly**: Works perfectly on all devices

## 🚀 Quick Start

### 1. Get Your OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Go to [API Keys](https://openrouter.ai/keys) and create a new key
4. Copy your API key

### 2. Local Development

**First, restart your PowerShell/Terminal to refresh PATH after Node.js installation**

```powershell
# Navigate to project directory
cd 200Model8

# Install Node.js dependencies
npm install

# Start development server (accessible on all devices)
npm run dev

# OR for mobile testing on port 8080
npm run dev-mobile
```

**Access Options:**
- **Local**: [http://localhost:3000](http://localhost:3000)
- **Mobile Testing**: `http://YOUR_MACHINE_IP:3000` (find your IP with `ipconfig`)
- **Port 8080**: Use `npm run dev-mobile` then access `http://YOUR_MACHINE_IP:8080`

### 3. Add Your API Key

1. Click the Settings icon in the top right
2. Paste your OpenRouter API key
3. Toggle web search on/off using the search icon
4. Start chatting!

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/200Model8)

1. Click the deploy button above
2. Connect your GitHub account
3. Deploy the project
4. Your free AI chat is live!

## 🆓 Available Free Models

- **Meta**: Llama 3.1 8B, Llama 3 8B (Free)
- **Microsoft**: Phi-3 Mini (Free)
- **Google**: Gemma 7B (Free)
- **Mistral AI**: Mistral 7B (Free)
- **Hugging Face**: Zephyr 7B (Free)
- **OpenChat**: OpenChat 7B (Free)
- **Gryphe**: Mythomist 7B (Free)
- **Low Cost**: Claude 3 Haiku, GPT-3.5 Turbo

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: OpenRouter AI
- **Deployment**: Vercel

## 📝 Environment Variables

For production deployment, you can set:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai) for providing access to multiple AI models
- [Vercel](https://vercel.com) for free hosting
- All the amazing AI model providers

---

**Made with ❤️ by Jeff**

*Bringing free AI to everyone, everywhere.*
