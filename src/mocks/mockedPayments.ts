import { Payment } from '@/shared/types'

export const mockedPayments: Payment[] = [
  {
    _id: '66f007a5c9c4a1f2b3d40111',
    amount: 120,
    isPayed: true,
    createdAt: '2025-09-03T16:20:33.000Z',
    updatedAt: '2025-09-03T16:40:10.000Z',
    patient: {
      _id: '66f007a5c9c4a1f2b3d4aa01',
      email: 'olivia.morris@example.com',
      userName: 'Olivia Morris',
      dateOfBirth: '1991-06-12',
      phoneNumber: '+1 (415) 555-0132',
      bloodType: 'O',
      diabetes: 'none',
      rhFactor: '+',
      bloodTransfusion: 'never',
      intoleranceToMedicines: 'penicillin',
      infectiousDiseases: 'none',
      surgicalInterventions: 'appendectomy (2008)',
      allergies: 'pollen',
      image: 'https://example.com/patients/olivia.jpg'
    },
    appointment: {
      _id: '66f007a5c9c4a1f2b3d4bb01',
      patient: {
        _id: '66f007a5c9c4a1f2b3d4aa01',
        email: 'olivia.morris@example.com',
        userName: 'Olivia Morris',
        dateOfBirth: '1991-06-12',
        phoneNumber: '+1 (415) 555-0132',
        bloodType: 'O',
        diabetes: 'none',
        rhFactor: '+',
        bloodTransfusion: 'never',
        intoleranceToMedicines: 'penicillin',
        infectiousDiseases: 'none',
        surgicalInterventions: 'appendectomy (2008)',
        allergies: 'pollen',
        image: 'https://example.com/patients/olivia.jpg'
      },
      doctor: {
        _id: '66f007a5c9c4a1f2b3d4dd02',
        doctorName: 'Dr. Sofia Riabchuk',
        position: 'General Practitioner'
      },
      reason: 'Annual check-up',
      startTime: '2025-09-10T09:00:00.000Z',
      endTime: '2025-09-10T10:00:00.000Z',
      description: 'Routine annual exam. ECG if time allows.',
      analyzes: []
    }
  },
  {
    _id: '66f007a5c9c4a1f2b3d40222',
    amount: 85.5,
    isPayed: false,
    createdAt: '2025-09-08T13:55:00.000Z',
    updatedAt: '2025-09-08T15:10:00.000Z',
    patient: {
      _id: '66f007a5c9c4a1f2b3d4aa02',
      email: 'denys.kovalenko@example.com',
      userName: 'Denys Kovalenko',
      dateOfBirth: '1987-02-23',
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
        dateOfBirth: '1987-02-23',
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
        _id: '66f007a5c9c4a1f2b3d4dd02',
        doctorName: 'Dr. Sofia Riabchuk',
        position: 'General Practitioner'
      },
      reason: 'Cough and mild fever',
      startTime: '2025-09-08T14:30:00.000Z',
      endTime: '2025-09-08T15:00:00.000Z',
      description: 'Suspected viral infection. Recommend rest and fluids.',
      analyzes: []
    }
  },
  {
    _id: '66f007a5c9c4a1f2b3d40333',
    amount: 250,
    isPayed: true,
    createdAt: '2025-09-12T12:00:00.000Z',
    updatedAt: '2025-09-12T12:45:00.000Z',
    patient: {
      _id: '66f007a5c9c4a1f2b3d4aa03',
      email: 'marta.ivanova@example.com',
      userName: 'Marta Ivanova',
      dateOfBirth: '1995-11-05',
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
        dateOfBirth: '1995-11-05',
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
        _id: '66f007a5c9c4a1f2b3d4dd02',
        doctorName: 'Dr. Sofia Riabchuk',
        position: 'General Practitioner'
      },
      reason: 'Acne consultation + treatment plan',
      startTime: '2025-09-12T12:00:00.000Z',
      endTime: '2025-09-12T12:45:00.000Z',
      analyzes: []
    }
  }
]
