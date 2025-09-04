# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Check site metadata
pnpm check-site-meta
```

## Code Quality & Linting

This project uses **Biome** for linting and formatting. Biome rules are configured in `biome.json`:
- Tab indentation (2 spaces width)
- Single quotes for JS/JSX
- No semicolons where not required
- Line width: 120 characters

**Git hooks** (via lefthook) automatically run Biome on staged files before commits.

## Architecture Overview

This is a **multilingual Next.js 15 blog/content site** with the following key architectural patterns:

### Internationalization (i18n)
- Built with `next-intl` for full i18n support
- Routes: `/[locale]/...` where locale is `en` or `zh`
- Content stored in `content/{locale}/` directories
- Middleware automatically redirects root path to localized versions
- Default locale: configurable in `i18n/routing.ts`

### Content Management
- **MDX-based content** stored in `content/{locale}/{category}/` structure
- Categories: `method`, `pattern`, `principle`, `tool`, `vision`
- Content processing via `lib/generators.ts` with:
  - Gray matter for frontmatter parsing
  - Automatic TOC generation from H2 headings
  - Batch processing for performance
  - Visibility filtering (draft/published)

### Route Structure
- Main pages: `app/[locale]/page.tsx` (homepage)
- Category pages: `app/[locale]/(internal)/{category}/page.tsx` (listings)
- Article pages: `app/[locale]/(internal)/{category}/[slug]/page.tsx`
- Internal layout: `app/[locale]/(internal)/layout.tsx`

### UI Components
- Built with **shadcn/ui** and **Radix UI primitives**
- **Tailwind CSS** for styling (v4)
- **Framer Motion** for animations
- Components in `/components` directory

### Data Flow
1. Content files (`*.mdx`) → `lib/generators.ts` → Blog components
2. Site configuration in `configs/site.ts`
3. Type definitions in `types/` (blog.ts, config.ts)
4. State management with **Zustand** in `stores/`

### Key Features
- **SEO optimization**: Open Graph, Twitter Cards, canonical URLs
- **TOC generation**: Automatic table of contents from H2 headings
- **Content categorization**: method, pattern, principle, tool, vision
- **Pinned posts**: Support for featured/pinned content
- **Responsive design**: Mobile-first approach

## Package Manager
- Uses **pnpm** (>=10.8.0)
- Node.js >=22.14.0 required

## Git Workflow
- **Lefthook** pre-commit hooks run Biome checks
- **Commitlint** enforces conventional commit messages
- **Commitizen** available for guided commits via `cz-customizable`