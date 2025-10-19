# Color Code Converter

## Overview

A free, SEO-optimized web application for converting color codes between multiple formats (HEX, RGB, HSL, CMYK). Built as a utility-first tool targeting designers and developers who need quick color format conversions. The application supports batch conversion, palette management, and export capabilities to various formats including PDF, PNG, and Adobe Swatch Exchange (.ase).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript using Vite as the build tool

**UI Component System**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design follows Material Design principles combined with inspiration from Coolors and Adobe Color, emphasizing clarity and designer-friendly aesthetics.

**Routing**: Wouter for lightweight client-side routing (single-page application)

**State Management**: 
- React hooks (useState) for local component state
- TanStack Query (React Query) for server state management and caching
- Theme context (ThemeProvider) for dark/light mode

**Design System**:
- Custom theme system using CSS variables for colors
- Support for light and dark modes
- Typography: Inter font family for UI, JetBrains Mono for color codes
- Border radius values: lg (9px), md (6px), sm (3px)

### Backend Architecture

**Runtime**: Node.js with Express.js server

**Development Setup**: 
- Vite middleware integration for HMR (Hot Module Replacement) in development
- Custom logging middleware for API request tracking
- Production build uses esbuild to bundle server code

**API Structure**: REST-style endpoints (currently minimal, extensible for future features)

**Database Ready**: 
- Drizzle ORM configured for PostgreSQL with Neon serverless driver
- Schema defined for users table (authentication foundation)
- In-memory storage implementation (MemStorage) as fallback/development option

### Core Features Architecture

**Color Conversion Engine**:
- `color-convert` library for accurate color space transformations
- Support for parsing multiple input formats: HEX, RGB, HSL, CMYK
- Studio code parser for importing color palettes from external tools
- Click-to-copy functionality on individual color codes with visual feedback

**Export Functionality**:
- PDF generation using jsPDF
- PNG export using html2canvas
- Adobe Swatch Exchange (.ase) format with custom binary format writer
- All exports happen client-side for privacy and speed

**UI/UX Features**:
- Fixed header with theme toggle (light/dark mode) at the top-right
- Inline format selector with checkboxes (HEX, RGB, HSL, CMYK) integrated into results header
- Click-to-copy individual color codes with hover elevation and checkmark feedback
- Single-click color picker activation with full drag support
- Consolidated action buttons (Add Color, Copy Palette, Export dropdown, More actions)
- Theme preference persists via localStorage

**SEO Optimization**:
- Comprehensive meta tags (Open Graph, Twitter Cards)
- Structured data (FAQ schema) for rich search results
- Semantic HTML and accessibility features

### External Dependencies

**Database**:
- PostgreSQL via Neon serverless (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries
- Connection pooling with connect-pg-simple for sessions (configured but not actively used)

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling
- Lucide React for icons

**Color Processing**:
- color-convert: Color space conversion algorithms

**Export Libraries**:
- jsPDF: PDF generation
- html2canvas: DOM to canvas conversion for PNG export

**Development Tools**:
- Vite: Build tool and dev server
- TypeScript: Type safety
- Replit-specific plugins for development experience (runtime error overlay, cartographer, dev banner)

**Form & Validation**:
- React Hook Form with @hookform/resolvers
- Zod for schema validation
- Drizzle-zod for database schema to Zod schema conversion

**State & Data Fetching**:
- TanStack Query (React Query) for async state management
- Custom query client with credential-based fetching

### Design Decisions

**Client-Side Processing**: All color conversions and exports happen in the browser to ensure privacy, speed, and no server load. This allows the tool to work offline after initial load.

**TypeScript-First**: Strict TypeScript configuration for type safety across client, server, and shared code.

**Modular Component Architecture**: Components are isolated, reusable, and well-typed. Example components exist for development/testing purposes.

**Progressive Enhancement**: Base functionality works without JavaScript, with enhanced features layered on top.

**SEO-Driven Content Structure**: Dedicated sections (HeroSection, HowItWorks, SEOContent) designed to rank for target keywords while maintaining usability.

**Cross-Promotion Strategy**: Integrated promotional components (CrossPromo) to drive traffic to related tools in the ecosystem.

**Theme System Flexibility**: CSS variable-based theming allows for easy customization and supports both light and dark modes out of the box.