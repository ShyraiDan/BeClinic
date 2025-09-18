import { Patient } from '@/shared/types'

export const mockPatient: Patient = {
  _id: '66f0a3b7d6c2f19a0b4e2c11',
  email: 'olena.hryn@example.com',
  userName: 'Olena Hryn',
  dateOfBirth: new Date('2025-08-29T08:30:00.000Z'),
  phoneNumber: '+380671234567',
  bloodType: 'A',
  diabetes: 'none',
  rhFactor: '+',
  bloodTransfusion: 'never',
  intoleranceToMedicines: 'none',
  infectiousDiseases: 'COVID-19 (2021, mild)',
  surgicalInterventions: 'Appendectomy (2015)',
  allergies: 'Penicillin',
  image: 'https://example.com/avatars/olena-hryn.jpg'
}
