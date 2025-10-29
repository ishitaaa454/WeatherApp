# Weather Now

## Real-time Weather Dashboard

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather updates, 5-day forecasts, and detailed weather information for any city worldwide.

## Features

- Real-time weather data from OpenWeatherMap API
- 5-day weather forecast
- Current location weather detection
- Recent searches functionality
- Dark/Light mode toggle
- Temperature unit switching (Celsius/Fahrenheit)
- Responsive design with beautiful UI

## How to run this project

Follow these steps to set up and run the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 3: Install dependencies
npm install

# Step 4: Set up your environment variables
# Create a .env file and add your OpenWeatherMap API key:
# VITE_OWM_KEY=your_api_key_here

# Step 5: Start the development server
npm run dev
```

## Setup Instructions

### 1. Get an OpenWeatherMap API Key
- Visit [OpenWeatherMap API](https://openweathermap.org/api)
- Sign up for a free account
- Navigate to your API keys section
- Copy your API key

### 2. Configure Environment Variables
Create a `.env` file in the project root and add:
```
VITE_OWM_KEY=your_api_key_here
```

### 3. Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

This project is built with modern web technologies:

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library
- **Zustand** - State management
- **React Query** - Data fetching
- **OpenWeatherMap API** - Weather data source

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── lib/                # Utilities and API functions
├── store/              # State management
├── hooks/              # Custom React hooks
└── main.tsx            # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
