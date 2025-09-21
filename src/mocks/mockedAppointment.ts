import { Appointment } from '@/shared/types'

export const mockedAppointment: Appointment[] = [
  // PAST — 2025-08-29
  {
    _id: '66f210a10c1d2e3f4a5b6001',
    patient: {
      _id: '66f2p0000000000000000001',
      email: 'olivia.morris@example.com',
      userName: 'Olivia Morris',
      dateOfBirth: new Date('2023-08-05T11:30:00Z'),
      phoneNumber: '+1 (415) 555-0132',
      bloodType: 'O',
      diabetes: 'none',
      rhFactor: '+',
      bloodTransfusion: 'never',
      intoleranceToMedicines: 'penicillin',
      infectiousDiseases: 'none',
      surgicalInterventions: 'appendectomy (2008)',
      allergies: 'pollen',
      avatarUrl: 'https://example.com/patients/olivia.jpg'
    },
    doctor: {
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
    reason: 'Follow-up ECG',
    startTime: new Date('2025-08-29T08:30:00.000Z'),
    endTime: new Date('2025-08-29T09:10:00.000Z'),
    description: 'Post-annual exam follow-up; review ECG.',
    analyses: []
  },

  // PAST — 2025-09-01
  {
    _id: '66f210a10c1d2e3f4a5b6002',
    patient: {
      _id: '66f2p0000000000000000005',
      email: 'taras.hnatyuk@example.com',
      userName: 'Taras Hnatyuk',
      dateOfBirth: new Date('2025-08-29T08:30:00.000Z'),
      phoneNumber: '+380 (68) 555-0777',
      bloodType: 'A',
      diabetes: 'none',
      rhFactor: '+',
      bloodTransfusion: 'once (2010)',
      intoleranceToMedicines: 'aspirin',
      infectiousDiseases: 'none',
      surgicalInterventions: 'knee arthroscopy (2012)',
      allergies: 'seasonal'
    },
    doctor: {
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
    reason: 'Thyroid panel follow-up',
    startTime: new Date('2025-09-01T08:30:00.000Z'),
    endTime: new Date('2025-09-01T09:15:00.000Z'),
    analyses: []
  },

  // PAST — 2025-09-08
  {
    _id: '66f210a10c1d2e3f4a5b6003',
    patient: {
      _id: '66f2p0000000000000000002',
      email: 'denys.kovalenko@example.com',
      userName: 'Denys Kovalenko',
      dateOfBirth: new Date('2025-08-29T08:30:00.000Z'),
      phoneNumber: '+380 (67) 555-0101',
      bloodType: 'A',
      diabetes: 'type 2 (diet controlled)',
      rhFactor: '-',
      bloodTransfusion: 'none',
      intoleranceToMedicines: 'none',
      infectiousDiseases: 'none',
      surgicalInterventions: 'none',
      allergies: 'dust mites'
    },
    doctor: {
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
    reason: 'Cough and mild fever',
    startTime: new Date('2025-09-01T08:30:00.000Z'),
    endTime: new Date('2025-09-01T09:15:00.000Z'),
    description: 'Viral syndrome suspected; supportive care.',
    analyses: []
  },

  // FUTURE — 2025-09-10
  {
    _id: '66f210a10c1d2e3f4a5b6004',
    patient: {
      _id: '66f2p0000000000000000004',
      email: 'yulia.bondar@example.com',
      userName: 'Yulia Bondar',
      dateOfBirth: new Date('2025-08-29T08:30:00.000Z'),
      phoneNumber: '+380 (50) 555-0444',
      bloodType: 'AB',
      diabetes: 'none',
      rhFactor: '-',
      bloodTransfusion: 'none',
      intoleranceToMedicines: 'none',
      infectiousDiseases: 'none',
      surgicalInterventions: 'none',
      allergies: 'cat dander'
    },
    doctor: {
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
    reason: 'Sore throat and ear pain',
    startTime: new Date('2025-09-01T08:30:00.000Z'),
    endTime: new Date('2025-09-01T09:15:00.000Z'),
    analyses: []
  },

  // FUTURE — 2025-09-12
  {
    _id: '66f210a10c1d2e3f4a5b6005',
    patient: {
      _id: '66f2p0000000000000000003',
      email: 'marta.ivanova@example.com',
      userName: 'Marta Ivanova',
      dateOfBirth: new Date('2025-08-29T08:30:00.000Z'),
      phoneNumber: '+380 (63) 555-0222',
      bloodType: 'B',
      diabetes: 'none',
      rhFactor: '+',
      bloodTransfusion: 'never',
      intoleranceToMedicines: 'ibuprofen',
      infectiousDiseases: 'chickenpox (childhood)',
      surgicalInterventions: 'tonsillectomy (2003)',
      allergies: 'nuts'
    },
    doctor: {
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
    reason: 'Acne consultation + treatment plan',
    startTime: new Date('2025-09-01T08:30:00.000Z'),
    endTime: new Date('2025-09-01T09:15:00.000Z'),
    analyses: []
  }
]
