import { Payment } from '@/shared/types'

export const mockedPayments: Payment[] = [
  {
    _id: '66f007a5c9c4a1f2b3d40111',
    amount: 120,
    isPayed: true,
    createdAt: new Date('2025-09-03T16:20:33.000Z'),
    updatedAt: new Date('2025-09-03T16:40:10.000Z'),
    patient: {
      _id: '66f007a5c9c4a1f2b3d4aa01',
      email: 'olivia.morris@example.com',
      userName: 'Olivia Morris',
      dateOfBirth: new Date('2025-08-29T08:30:00.000Z'),
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
    appointment: {
      _id: '66f007a5c9c4a1f2b3d4bb01',
      patient: {
        _id: '66f007a5c9c4a1f2b3d4aa01',
        email: 'olivia.morris@example.com',
        userName: 'Olivia Morris',
        dateOfBirth: new Date('2025-08-29T08:30:00.000Z'),
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
        avatarUrl: 'https://example.com/images/doctors/oleksandr-shevchenko.jpg',
        description: 'Проводить оперативні втручання та спеціалізується на мінімально інвазивній хірургії.',
        phone: '+380671234568',
        createdAt: new Date('2023-08-05T11:30:00Z'),
        updatedAt: new Date('2025-01-20T08:10:00Z')
      },
      reason: 'Annual check-up',
      startTime: new Date('2025-08-29T08:30:00.000Z'),
      endTime: new Date('2025-08-29T08:30:00.000Z'),
      description: 'Routine annual exam. ECG if time allows.',
      analyses: [],
      createdAt: new Date('2025-08-29T08:30:00.000Z'),
      updatedAt: new Date('2025-08-29T08:30:00.000Z')
    }
  },
  {
    _id: '66f007a5c9c4a1f2b3d40222',
    amount: 85.5,
    isPayed: false,
    createdAt: new Date('2025-09-08T13:55:00.000Z'),
    updatedAt: new Date('2025-09-08T15:10:00.000Z'),
    patient: {
      _id: '66f007a5c9c4a1f2b3d4aa02',
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
    appointment: {
      _id: '66f007a5c9c4a1f2b3d4bb02',
      patient: {
        _id: '66f007a5c9c4a1f2b3d4aa02',
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
        avatarUrl: 'https://example.com/images/doctors/oleksandr-shevchenko.jpg',
        description: 'Проводить оперативні втручання та спеціалізується на мінімально інвазивній хірургії.',
        phone: '+380671234568',
        createdAt: new Date('2023-08-05T11:30:00Z'),
        updatedAt: new Date('2025-01-20T08:10:00Z')
      },
      reason: 'Cough and mild fever',
      startTime: new Date('2025-08-29T08:30:00.000Z'),
      endTime: new Date('2025-08-29T08:30:00.000Z'),
      description: 'Suspected viral infection. Recommend rest and fluids.',
      analyses: [],
      createdAt: new Date('2025-08-29T08:30:00.000Z'),
      updatedAt: new Date('2025-08-29T08:30:00.000Z')
    }
  },
  {
    _id: '66f007a5c9c4a1f2b3d40333',
    amount: 250,
    isPayed: true,
    createdAt: new Date('2025-09-12T12:00:00.000Z'),
    updatedAt: new Date('2025-09-12T12:45:00.000Z'),
    patient: {
      _id: '66f007a5c9c4a1f2b3d4aa03',
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
    appointment: {
      _id: '66f007a5c9c4a1f2b3d4bb03',
      patient: {
        _id: '66f007a5c9c4a1f2b3d4aa03',
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
        avatarUrl: 'https://example.com/images/doctors/oleksandr-shevchenko.jpg',
        description: 'Проводить оперативні втручання та спеціалізується на мінімально інвазивній хірургії.',
        phone: '+380671234568',
        createdAt: new Date('2023-08-05T11:30:00Z'),
        updatedAt: new Date('2025-01-20T08:10:00Z')
      },
      reason: 'Acne consultation + treatment plan',
      startTime: new Date('2025-08-29T08:30:00.000Z'),
      endTime: new Date('2025-08-29T08:30:00.000Z'),
      analyses: [],
      createdAt: new Date('2025-08-29T08:30:00.000Z'),
      updatedAt: new Date('2025-08-29T08:30:00.000Z')
    }
  }
]
