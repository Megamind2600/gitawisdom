# Gita Reflection App

## Overview

This is a full-stack web application built for self-guided reflection using the Bhagavad Gita. The app provides an AI-powered conversational interface that helps users explore philosophical concepts through interactions with Gita verses, while emphasizing that it offers no advice and encourages personal introspection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with a custom theme inspired by Krishna/Mahabharata colors (saffron, sacred gold, lotus pink)
- **UI Components**: Radix UI components with shadcn/ui styling system
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Simple state-based routing within the main App component (home, reflection, shloka views)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Development**: Hot reloading with Vite integration
- **API**: RESTful endpoints for conversations and content management

### Build & Development
- **Development**: Vite dev server with Express API proxy
- **Production**: Static React build served by Express
- **TypeScript**: Strict configuration with path aliases
- **Deployment**: ESBuild for server bundling

## Key Components

### Database Schema (Drizzle ORM)
- **chapters**: Stores Bhagavad Gita chapters with metadata
- **shlokas**: Individual verses with Sanskrit, transliteration, translation, and commentary
- **conversations**: User sessions with AI conversation history and progress tracking

### Frontend Pages
- **Home**: Landing page with disclaimers and app introduction
- **Reflection**: AI-powered conversational interface for guided reflection
- **Shloka Display**: Detailed view of individual Gita verses with audio playback

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **AI Integration**: OpenAI API integration for conversational responses
- **Session Management**: PostgreSQL session storage with connect-pg-simple

### UI Features
- **Audio Playback**: Text-to-speech for Sanskrit verses and translations
- **Progress Tracking**: Visual progress bars for reflection sessions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA labels and keyboard navigation support

## Data Flow

1. **User Journey**: Home → Start Reflection → AI Conversation → Shloka Display
2. **Session Management**: Each reflection session gets a unique ID for conversation tracking
3. **AI Interaction**: User messages are sent to OpenAI API, responses guide users through reflection
4. **Content Delivery**: Shlokas are fetched based on AI recommendations or user progress
5. **Progress Tracking**: Conversation state and progress are persisted in PostgreSQL

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and modern features
- **Express**: Web server framework
- **Drizzle ORM**: Type-safe database queries and migrations
- **Neon Database**: Serverless PostgreSQL hosting

### AI & Content
- **OpenAI API**: GPT-based conversational AI for reflection guidance
- **Web Speech API**: Browser-based text-to-speech for audio features

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library
- **React Query**: Server state management and caching

### Development Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string for Neon database
- **OPENAI_API_KEY**: API key for OpenAI integration
- **NODE_ENV**: Environment flag for development/production builds

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations are applied via `db:push` command

### Production Deployment
- **Server**: Node.js server serves both API and static files
- **Database**: Neon PostgreSQL with connection pooling
- **Static Assets**: React build files served by Express
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple

### Development Workflow
- **Local Development**: `npm run dev` starts both Vite dev server and Express API
- **Database Management**: `npm run db:push` for schema changes
- **Type Checking**: `npm run check` for TypeScript validation

The application follows a monorepo structure with shared TypeScript types and schemas, enabling type safety across the full stack while maintaining clear separation between client and server concerns.