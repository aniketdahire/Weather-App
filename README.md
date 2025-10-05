# 🌤️ Weather App

A professional, secure weather application built with Angular 18. Features real-time weather data, 5-day forecasts, and responsive design.

## ✨ Features

- 🔍 **City Search**: Search for weather in any city worldwide
- 🌡️ **Current Weather**: Temperature, conditions, humidity, wind speed
- 📅 **5-Day Forecast**: Extended weather predictions
- 📱 **Responsive Design**: Works on all devices
- 💾 **Local Storage**: Remembers your last searched city
- ⚡ **Loading States**: Smooth user experience
- 🚨 **Error Handling**: Clear error messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for free account
   - Get your API key

4. **Setup environment (SECURE)**
   ```bash
   npm run setup
   # Enter your API key when prompted
   # This creates local environment files (NOT committed to git)
   ```

5. **Run the application**
   ```bash
   npm start
   ```

## 🔒 Security & Best Practices

### ✅ Professional Security Implementation

- **🔐 No API keys in source code** - Environment variables only
- **📁 .gitignore protection** - Sensitive files never committed
- **🌍 Environment-based config** - Different settings for dev/prod
- **🛡️ Template files** - Safe setup for new developers

### 🏗️ Architecture

- **Angular 18** - Latest framework features
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Tailwind CSS** - Utility-first styling
- **Standalone Components** - Modern Angular architecture

## 🚀 Deployment

### For Production (Recommended)

1. **Set environment variables** on your hosting platform:
   - **Vercel**: Project Settings → Environment Variables → `WEATHER_API_KEY`
   - **Netlify**: Site Settings → Environment Variables → `WEATHER_API_KEY`
   - **AWS**: Environment Variables → `WEATHER_API_KEY`

2. **Deploy**
   ```bash
   npm run build
   # Deploy dist/weather-app folder
   ```

### For Development (Local)

- Use `npm run setup` to configure your local environment
- API key stays secure on your machine only
- Environment files are in `.gitignore` (never committed)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── environments/        # Environment configuration
│   ├── service/            # Weather API service
│   └── app.component.*     # Main app component
├── assets/                 # Static assets
└── styles.css             # Global styles
```

## 🛠️ Development

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Setup environment
npm run setup
```

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WEATHER_API_KEY` | OpenWeatherMap API key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Angular](https://angular.io/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
