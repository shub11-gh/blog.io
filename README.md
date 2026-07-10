<p align="center">
  <img src="public/logo.png" alt="Blog.io Logo" width="100" />
</p>

<h1 align="center">Blog.io</h1>

<p align="center">
  A modern, full-stack blogging platform built with React and Appwrite — featuring rich-text editing, cloud-based image management, and secure authentication.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Appwrite-BaaS-FD366E?logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-9-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit" />
</p>

---

## Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## About

**Blog.io** is a feature-rich blogging application that empowers users to create, publish, and manage blog posts through an intuitive interface. It leverages **Appwrite** as its Backend-as-a-Service for authentication, database operations, and file storage — eliminating the need for a custom backend while maintaining production-grade security and scalability.

The platform is designed with a clean component architecture, centralized state management, and a focus on developer experience using modern React patterns like custom hooks, `forwardRef`, and controlled form components.

---

## Features

| Feature | Description |
|---|---|
| **Authentication** | Secure email/password signup & login with session management via Appwrite |
| **Rich Text Editor** | Full-featured content editor powered by TinyMCE with toolbar customization |
| **Image Management** | Upload, preview, and replace featured images with client-side validation (type & size) |
| **Full CRUD** | Create, read, update, and delete blog posts with real-time slug auto-generation |
| **Author-only Actions** | Edit and delete buttons visible only to the post's author |
| **Protected Routes** | `AuthLayout` component guards routes based on authentication state |
| **Global State** | Centralized auth state management with Redux Toolkit |
| **Modern UI** | Clean, responsive interface built with Tailwind CSS v4 |
| **Blazing Fast** | Vite-powered dev server with HMR for instant feedback |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library with component-based architecture |
| [Vite 7](https://vite.dev/) | Next-gen build tool with lightning-fast HMR |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Predictable state management |
| [React Router 7](https://reactrouter.com/) | Declarative client-side routing |
| [React Hook Form](https://react-hook-form.com/) | Performant, flexible form handling |
| [TinyMCE](https://www.tiny.cloud/) | WYSIWYG rich text editor |
| [Lucide React](https://lucide.dev/) | Beautiful, consistent icon set |

### Backend (BaaS)
| Technology | Purpose |
|---|---|
| [Appwrite](https://appwrite.io/) | Authentication, Database, and File Storage |

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                    Client (React)                │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │  Pages   │──│Components│──│  Redux Store  │   │
│  │          │  │          │  │  (Auth State) │   │
│  └────┬─────┘  └─────┬────┘  └────────┬──────┘   │
│       │              │                │          │
│  ┌────┴──────────────┴────────────────┴───────┐  │
│  │           Appwrite Service Layer           │  │
│  │     (auth.js  |  appwriteConfig.js)        │  │
│  └─────────────────────┬──────────────────────┘  │
└────────────────────────┼─────────────────────────┘
                         │ HTTPS
┌────────────────────────┴──────────────────────────┐
│              Appwrite Cloud / Self-hosted         │
│                                                   │
│    ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│    │   Auth   │  │ Database │  │   Storage    │   │
│    │ Service  │  │ Service  │  │   (Bucket)   │   │
│    └──────────┘  └──────────┘  └──────────────┘   │
└───────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- An [Appwrite](https://appwrite.io/) account (Cloud or self-hosted)
- A [TinyMCE](https://www.tiny.cloud/) API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shub11-gh/trellz-app.git
   cd trellz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.sample .env
   ```
   Fill in the values — see [Environment Variables](#-environment-variables) below.

4. **Set up Appwrite**
   - Create a new project in your Appwrite console
   - Create a **Database** with a collection containing these attributes:
     | Attribute | Type | Required |
     |-----------|------|----------|
     | `title` | String | Yes |
     | `content` | String | Yes |
     | `featuredImage` | String | Yes |
     | `status` | String | Yes |
     | `userId` | String | Yes |
   - Create a **Storage bucket** for image uploads
   - Configure appropriate **permissions** on the collection and bucket

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_APPWRITE_URL=""              # Appwrite endpoint (e.g., https://cloud.appwrite.io/v1)
VITE_APPWRITE_PROJECT_ID=""       # Your Appwrite project ID
VITE_APPWRITE_PROJECT_NAME=""     # Your Appwrite project name
VITE_APPWRITE_DATABASE_ID=""      # Database ID containing your posts collection
VITE_APPWRITE_COLLECTION_ID=""    # Collection ID for blog posts
VITE_APPWRITE_BUCKET_ID=""        # Storage bucket ID for featured images
VITE_TINY_MCE_ID=""               # TinyMCE editor API key
```

---

## Project Structure

```
blog.io/
├── public/                     # Static assets (logo, favicons, manifest)
├── src/
│   ├── appwrite/
│   │   ├── auth.js             # Authentication service (signup, login, logout)
│   │   └── appwriteConfig.js   # Database & storage service (CRUD, file ops)
│   ├── components/
│   │   ├── AuthLayout/         # Route protection based on auth state
│   │   ├── Button/             # Reusable button with customizable colors
│   │   ├── Container/          # Max-width centered layout wrapper
│   │   ├── Footer/             # Site footer with navigation links
│   │   ├── Header/             # Navigation bar + LogoutButton
│   │   ├── Input/              # Controlled input with forwardRef & label
│   │   ├── Login/              # Login form with validation
│   │   ├── Logo/               # Brand logo with optional name display
│   │   ├── PostCard/           # Blog post preview card
│   │   ├── PostForm/           # Create/Edit post form with image upload
│   │   ├── RTE/                # TinyMCE rich text editor wrapper
│   │   ├── Select/             # Controlled select dropdown
│   │   ├── SignUp/             # Registration form with validation
│   │   └── index.js            # Barrel file for clean imports
│   ├── config/
│   │   └── config.js           # Centralized environment variable access
│   ├── features/
│   │   └── authSlice.js        # Redux slice for authentication state
│   ├── pages/
│   │   ├── AddPostPage.jsx     # Create new post
│   │   ├── AllPostsPage.jsx    # View all posts (authenticated)
│   │   ├── EditPostPage.jsx    # Edit existing post
│   │   ├── HomePage.jsx        # Landing page with post feed
│   │   ├── LoginPage.jsx       # Login page wrapper
│   │   ├── PostPage.jsx        # Single post view with author actions
│   │   └── SignUpPage.jsx      # Registration page wrapper
│   ├── store/
│   │   └── store.js            # Redux store configuration
│   ├── App.jsx                 # Root layout (Header + Outlet + Footer)
│   ├── App.css                 # Tailwind CSS import
│   ├── index.css               # Tailwind CSS import
│   └── main.jsx                # Entry point with router & Redux provider
├── .env.sample                 # Environment variable template
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration with React & Tailwind plugins
└── package.json
```

---

