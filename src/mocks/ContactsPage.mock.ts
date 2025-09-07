import type { ContactsItem, ContactsOfficeItem, ContactsAdvantageItem, WorkingHoursItem } from '@/shared/types'

export const mockedContactsItems: ContactsItem[] = [
  {
    icon: '/contacts-icon-1.webp',
    type: 'phone',
    title: 'Невідкладна допомога',
    info: '800 123 45 67'
  },
  {
    icon: '/contacts-icon-2.webp',
    type: 'email',
    title: 'Email',
    info: 'info@beclinic.com'
  },
  {
    icon: '/contacts-icon-3.webp',
    type: 'address',
    title: 'Адреса',
    info: 'вулиця Соборна, 51а'
  }
]

export const mockedAdvantageItems: ContactsAdvantageItem[] = [
  {
    icon: '/icon-img-17.webp',
    type: 'doctor',
    title: 'Досвідчені лікарі',
    description: "Ваше здоров'я - це ваш найважливіший актив. Довіряти його слід лише найкращим професіоналам."
  },
  {
    icon: '/icon-img-18.webp',
    type: 'treatment',
    title: 'Персоналізоване лікування',
    description: 'Вибір лікування ідеально відповідає вашим цілям лікування ускладнень при ранньому втручанні.'
  },
  {
    icon: '/icon-img-19.webp',
    type: 'service',
    title: 'Негайне обслуговування',
    description: 'Ваш план лікування розрахований на постійний прогрес, з оперативним виконанням кожного етапу.'
  }
]

export const mockedOfficeItems: ContactsOfficeItem[] = [
  {
    address: 'вулиця Соборна, 51а',
    email: 'info@beclinic.com',
    phone: '800 1234 56 78'
  },
  {
    address: 'вулиця Келецька, 41',
    email: 'info@beclinic.com',
    phone: '800 1234 56 78'
  }
]

export const mockedWorkingHours: WorkingHoursItem[] = [
  {
    businessDay: '9:00-19:00',
    saturday: '10:00-18:00',
    sunday: 'Вихідний'
  },
  {
    businessDay: '9:00-19:00',
    saturday: '10:00-18:00',
    sunday: 'Вихідний'
  }
]
