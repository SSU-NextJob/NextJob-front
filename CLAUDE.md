# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `yarn dev` - Start development server
- `yarn build` - Build for production (runs TypeScript check first)
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build

### Type Checking
- `yarn tsc -b` - Run TypeScript compiler check (included in build command)

## Architecture

### Project Structure
- **React 19 + TypeScript + Vite**: Modern React setup with SWC for fast compilation
- **Chakra UI v3**: Primary UI component library
- **TailwindCSS**: Utility-first CSS framework for styling
- **Zustand**: State management for modals, loading states, and user data
- **React Query**: Server state management and caching
- **React Router v7**: Client-side routing
- **MSW**: Mock Service Worker for API mocking in development

### Key Directories
- `src/apis/`: API layer organized by domain (post, user, workspace, etc.)
- `src/components/`: React components organized by type
  - `atoms/`: Basic reusable components (Button, Input, etc.)
  - `modules/`: Complex components like modals, pagination
  - `workspace/`: Workspace-specific components (Kanban, documents)
- `src/hooks/`: Custom React hooks organized by feature
- `src/pages/`: Route components
- `src/store/`: Zustand stores (modal, loading, user state)
- `src/utils/`: Utility functions and guards

### Core Patterns

#### API Layer
- All API calls use the centralized `fetcher` function in `src/apis/index.ts`
- Backend proxy configured in Vite to route `/api/*` to `localhost:3000`
- Domain-specific API modules (post, user, workspace, etc.)

#### State Management
- **Modals**: Modal system using `src/store/modalStore.ts` with stack-based approach
- **Loading**: Global loading states via `src/store/loadingStore.ts` with key-based tracking
- **User**: User authentication and profile data in `src/store/userStore.ts`

#### Component Architecture
- Modal components must be in `src/components/modules/@modal/` and render through `ModalRoot`
- Loading states displayed via centralized Loading component
- Import order: standard library → third-party → internal modules (see App.tsx)

#### Routing
- Protected routes use `AuthGuard` wrapper
- Default redirect to `/post` for unmatched routes
- OAuth callback handling for Google authentication

### Development Guidelines

Based on `.cursor/rules/nextjob-frontend-rules.mdc`:

#### Code Conventions
- All Korean communication (commits, comments, documentation)
- Use `as const` objects instead of enums
- Remove console.log statements before commits
- API variable names must match backend payload/response naming
- PNG/JPG files should be converted to WebP format

#### API Integration
- After POST/PUT/DELETE/PATCH operations, trigger related GET requests for data refresh
- Show loading states during API calls and page transitions
- Use existing components; create new ones following shadcn-ui patterns when needed

#### Styling
- TailwindCSS preferred; custom styles only in App.css/index.css
- Maintain consistent px ratios across components
- Header at top with content below

#### Component Development
- Separate repeated UI/logic into reusable components
- Directory-based organization by role
- Document new features with type definitions

### Mock Data
- MSW configured for development environment
- Mock handlers organized by domain in `src/mocks/handlers/`
- Automatic startup in development mode via App.tsx