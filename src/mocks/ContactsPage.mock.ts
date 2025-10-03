import type { ContactsItem, ContactsOfficeItem, ContactsAdvantageItem, WorkingHoursItem } from '@/shared/types'

export const mockedContactsItems: ContactsItem[] = [
  {
    icon: '/contacts-icon-1.webp',
    type: 'phone',
    title: 'contacts.contacts.emergencyHospital',
    info: '800 123 45 67'
  },
  {
    icon: '/contacts-icon-2.webp',
    type: 'email',
    title: 'contacts.contacts.email',
    info: 'info@beclinic.com'
  },
  {
    icon: '/contacts-icon-3.webp',
    type: 'address',
    title: 'contacts.contacts.address',
    info: 'вулиця Хрещатик, 16'
  }
]

export const mockedAdvantageItems: ContactsAdvantageItem[] = [
  {
    icon: '/icon-img-17.webp',
    type: 'doctor',
    title: 'contacts.advantages.experiencedDoctors.title',
    description: 'contacts.advantages.experiencedDoctors.description'
  },
  {
    icon: '/icon-img-18.webp',
    type: 'treatment',
    title: 'contacts.advantages.personalHealth.title',
    description: 'contacts.advantages.personalHealth.description'
  },
  {
    icon: '/icon-img-19.webp',
    type: 'service',
    title: 'contacts.advantages.urgentCases.title',
    description: 'contacts.advantages.urgentCases.description'
  }
]

export const mockedOfficeItems: ContactsOfficeItem[] = [
  {
    address: 'contacts.location.addressOne',
    email: 'info@beclinic.com',
    phone: '800 1234 56 78'
  },
  {
    address: 'contacts.location.addressTwo',
    email: 'info@beclinic.com',
    phone: '800 1234 56 78'
  }
]

export const mockedWorkingHours: WorkingHoursItem[] = [
  {
    businessDay: '9:00-19:00',
    saturday: '10:00-18:00',
    sunday: 'contacts.location.weekend'
  },
  {
    businessDay: '9:00-19:00',
    saturday: '10:00-18:00',
    sunday: 'contacts.location.weekend'
  }
]
