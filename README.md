# BeClinic – a modern healthcare web platform for clinics and doctors.

BeClinic is a modern healthcare web platform for clinics and doctors, helping patients discover services, explore departments, and book visits with a clean, trustworthy UI.

:globe_with_meridians: [**Live Demo**](https://be-clinic-two.vercel.app)

## :rocket: Tech Stack

### ⚛️ Frontend

- **Next.js 15** – React framework for SSR, SSG, and App Router
- **ShadCN UI** - Headless UI library of accessible React components
- **Tailwind CSS 3** + **tailwind-merge** + **class-variance-authority** – utility-first styling and component variants
- **swiper** – modern slider/carousel component
- **lucide-react** – icon library

### 🌍 Internationalization

- **next-intl** – i18n support for multi-language content

### 🔒 Authentication & Security

- **next-auth v5 (beta)** – authentication & session management
- **bcrypt** – password hashing

### 💾 Database & Data Layer

- **mongoose** – MongoDB ODM
- **nanoid** – unique ID generation
- **date-fns** – date/time manipulation

### 🔎 Data Fetching & State

- **@tanstack/react-query v5** – data fetching & caching
- **@tanstack/react-query-devtools** – query debugging
- **@fullcalendar** - calendar

### 📝 Content & Markdown

- **@uiw/react-md-editor** – markdown editor
- **markdown-to-jsx** – render Markdown in React
- **gray-matter** – frontmatter parsing

### ☁️ Cloud & API Integrations

- **@aws-sdk/client-s3** – file storage on AWS S3
- **stripe** – payments integration
- **@vercel/analytics** & **@vercel/speed-insights** – performance & usage analytics
- **nodemailer** - email notifications

### ✅ Forms & Validation

- **react-hook-form** – form handling
- **@hookform/resolvers** – integration with schema validation
- **zod** – schema validation & type inference

### 🎨 Developer Experience & Tooling

- **TypeScript 5** – static typing
- **ESLint 9** + **Prettier 3** – linting & formatting
- **@typescript-eslint** – TypeScript linting rules
- **eslint-plugin-unused-imports** – cleanup unused imports
- **autoprefixer** + **postcss** – CSS processing

## 🎯 Features

- 👤 Patient Portal — profile, visits, medical records
- 🩺 Doctor Portal — schedule, patients, prescriptions
- 🔒 **Authentication** – secure user registration and login system
- 🌍 **Localization** – full support for **Ukrainian** and **English**
- 💳 **Stripe Payment** – payment services with integrated payment system
- 📅 Appointment Booking — create & manage visits
- 🧪 Lab Tests — create and track results
- ✍️ Markdown Blog — formatted posts with preview
- ✉️ Email Notifications — event-based alerts

## 🛠 Getting Started

**Prerequisites**

- Node.js 20+
- npm package manager

**Installation**

1. Clone the repository:

```bash
https://github.com/ShyraiDan/BeClinic.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env.local file and add all env variables
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## :iphone: Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Autofix ESLint errors
