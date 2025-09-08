import { Blog } from '@/shared/types'

export const mockedBlogs: Blog[] = [
  {
    _id: '66de9b2f4c1a9b7a5f3c1d01',
    title: 'Zod + Next.js: валидация без боли',
    description: 'Пошагово настраиваем Zod в Next.js: схемы, парсинг на сервере и типобезопасность на клиенте.',
    image: 'https://example.com/images/zod-nextjs.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0123',
    createdAt: '2025-07-21T10:15:23.000Z',
    updatedAt: '2025-07-28T08:02:11.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d02',
    title: 'React Hook Form + Zod: лучшие практики',
    description: 'Как связать RHF и Zod для надёжной валидации форм, примеры схем и сообщений об ошибках.',
    image: 'https://example.com/images/rhf-zod.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0456',
    createdAt: '2025-08-02T14:03:00.000Z',
    updatedAt: '2025-08-04T09:41:37.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d03',
    title: 'Tailwind CSS 4: background-image по-новому',
    description: 'Разбираем способы задания фоновых изображений в Tailwind 4 и нюансы оптимизации.',
    image: 'https://example.com/images/tw4-bg.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0789',
    createdAt: '2025-08-11T08:20:10.000Z',
    updatedAt: '2025-08-11T12:55:42.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d04',
    title: 'Локализация Stripe Checkout в Next.js',
    description: 'Настраиваем языки и формат валюты для Stripe Checkout с помощью next-intl.',
    image: 'https://example.com/images/stripe-i18n.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0999',
    createdAt: '2025-08-17T16:45:55.000Z',
    updatedAt: '2025-08-18T07:12:13.000Z'
  },
  {
    _id: '66de9b2f4c1a9b7a5f3c1d05',
    title: 'Бесконечный скролл с RTK Query',
    description: 'Паттерны пагинации и кэширования для бесшовной подгрузки данных без перезаписи стейта.',
    image: 'https://example.com/images/rtk-infinite-scroll.png',
    authorId: '64ab3e9f2f1c4d7b8a9c0aaa',
    createdAt: '2025-08-23T09:01:31.000Z',
    updatedAt: '2025-08-25T11:29:05.000Z'
  }
]
