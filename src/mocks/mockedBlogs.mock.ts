import { Blog } from '@/shared/types'

export const mockedBlogs: Blog[] = [
  {
    _id: '66de9b2f4c1a9b7a5f3c1d01',
    title: {
      en: 'Zod + Next.js: validation made easy',
      uk: 'Zod + Next.js: валідація без болю'
    },
    description: {
      en: 'Step-by-step setting up Zod in Next.js: schemas, server parsing, and client type-safety.',
      uk: 'Покроково налаштовуємо Zod у Next.js: схеми, парсинг на сервері та типобезпека на клієнті.'
    },
    image: 'https://example.com/images/zod-nextjs.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0123',
    createdAt: '2025-07-21T10:15:23.000Z',
    updatedAt: '2025-07-28T08:02:11.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d02',
    title: {
      en: 'React Hook Form + Zod: best practices',
      uk: 'React Hook Form + Zod: найкращі практики'
    },
    description: {
      en: 'How to combine RHF and Zod for reliable validation: sample schemas and error messages.',
      uk: 'Як поєднати RHF і Zod для надійної валідації: приклади схем і повідомлень про помилки.'
    },
    image: 'https://example.com/images/rhf-zod.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0456',
    createdAt: '2025-08-02T14:03:00.000Z',
    updatedAt: '2025-08-04T09:41:37.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d03',
    title: {
      en: 'Tailwind CSS 4: background-image the new way',
      uk: 'Tailwind CSS 4: background-image по-новому'
    },
    description: {
      en: 'Ways to set background images in Tailwind 4 and optimization nuances.',
      uk: 'Способи задання фонового зображення в Tailwind 4 і нюанси оптимізації.'
    },
    image: 'https://example.com/images/tw4-bg.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0789',
    createdAt: '2025-08-11T08:20:10.000Z',
    updatedAt: '2025-08-11T12:55:42.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d04',
    title: {
      en: 'Localizing Stripe Checkout in Next.js',
      uk: 'Локалізація Stripe Checkout у Next.js'
    },
    description: {
      en: 'Configure languages and currency format for Stripe Checkout using next-intl.',
      uk: 'Налаштовуємо мови та формат валюти для Stripe Checkout за допомогою next-intl.'
    },
    image: 'https://example.com/images/stripe-i18n.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0999',
    createdAt: '2025-08-17T16:45:55.000Z',
    updatedAt: '2025-08-18T07:12:13.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d05',
    title: {
      en: 'Infinite scroll with RTK Query',
      uk: 'Нескінченний скрол з RTK Query'
    },
    description: {
      en: 'Pagination and caching patterns for seamless loading without overwriting state.',
      uk: 'Патерни пагінації та кешування для безшовного завантаження даних без перезапису стану.'
    },
    image: 'https://example.com/images/rtk-infinite-scroll.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0aaa',
    createdAt: '2025-08-23T09:01:31.000Z',
    updatedAt: '2025-08-25T11:29:05.000Z'
  }
]
