import { Doctor } from '@/shared/types'

export const mockedDoctors: Doctor[] = [
  {
    _id: '66e0c1a5b7f3c1d01a1b2c30',
    email: 'anna.petrenko@clinic.com',
    doctorName: 'Анна Петренко',
    position: 'Педіатр',
    image: 'https://example.com/images/doctors/anna-petrenko.jpg',
    description:
      'Досвідчений педіатр з 10-річною практикою, спеціалізується на профілактиці та лікуванні дитячих хвороб.',
    phone: '+380501234567',
    createdAt: new Date('2024-03-10T09:15:00Z'),
    updatedAt: new Date('2024-12-15T16:45:00Z')
  },
  {
    _id: '66e0c1a5b7f3c1d01a1b2c31',
    email: 'oleksandr.shevchenko@clinic.com',
    doctorName: 'Олександр Шевченко',
    position: 'Хірург',
    image: 'https://example.com/images/doctors/oleksandr-shevchenko.jpg',
    description: 'Проводить оперативні втручання та спеціалізується на мінімально інвазивній хірургії.',
    phone: '+380671234568',
    createdAt: new Date('2023-08-05T11:30:00Z'),
    updatedAt: new Date('2025-01-20T08:10:00Z')
  },
  {
    _id: '66e0c1a5b7f3c1d01a1b2c32',
    email: 'maria.koval@clinic.com',
    doctorName: 'Марія Коваль',
    position: 'Стоматолог',
    phone: '+380931234569',
    createdAt: new Date('2024-01-12T13:20:00Z'),
    updatedAt: new Date('2025-02-28T15:00:00Z')
  },
  {
    _id: '66e0c1a5b7f3c1d01a1b2c33',
    email: 'ivan.bondar@clinic.com',
    doctorName: 'Іван Бондар',
    position: 'Кардіолог',
    description: 'Проводить консультації та діагностику серцево-судинних захворювань.',
    phone: '+380731234570',
    createdAt: new Date('2022-10-18T07:50:00Z'),
    updatedAt: new Date('2025-03-01T14:30:00Z')
  },
  {
    _id: '66e0c1a5b7f3c1d01a1b2c34',
    email: 'sofia.melnyk@clinic.com',
    doctorName: 'Софія Мельник',
    position: 'Лікар-ендокринолог',
    image: 'https://example.com/images/doctors/sofia-melnyk.jpg',
    phone: '+380671234571',
    createdAt: new Date('2024-06-25T10:05:00Z'),
    updatedAt: new Date('2025-02-15T12:40:00Z')
  }
]
