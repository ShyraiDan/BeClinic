import { Analysis } from '@/shared/types'

export const mockedAnalyses: Analysis[] = [
  {
    _id: '66f11b2a0a1b2c3d4e5f7001',
    patientId: '66f10a9e0b1c2d3e4f5b7001',
    analysisName: 'Complete Blood Count (CBC)',
    date: new Date('2025-09-03T16:20:33.000Z'),
    description: 'Routine annual check; mild leukocytosis.',
    fileName: 'cbc_2025-09-06_olivia-morris.pdf',
    createdAt: new Date('2025-09-01T08:15:23.000Z'),
    updatedAt: new Date('2025-09-01T09:42:10.000Z')
  },
  {
    _id: '66f11b2a0a1b2c3d4e5f7002',
    patientId: '66f10a9e0b1c2d3e4f5b7002',
    analysisName: 'PCR COVID-19',
    date: new Date('2025-09-03T16:20:33.000Z'),
    description: 'Tested due to cough and low-grade fever. Result: negative.',
    createdAt: new Date('2025-09-03T16:20:33.000Z'),
    updatedAt: new Date('2025-09-03T16:40:10.000Z')
  },
  {
    _id: '66f11b2a0a1b2c3d4e5f7003',
    patientId: '66f10a9e0b1c2d3e4f5b7003',
    analysisName: 'Hormone Panel (Testosterone, DHEA-S, Prolactin)',
    date: new Date('2025-09-03T16:20:33.000Z'),
    description: 'Dermatology workup for acne; labs ordered prior to follow-up.',
    fileName: 'hormone-panel_2025-09-12_marta-ivanova.pdf',
    createdAt: new Date('2025-09-05T00:00:00.000Z'),
    updatedAt: new Date('2025-09-07T12:34:56.000Z')
  },
  {
    _id: '66f11b2a0a1b2c3d4e5f7004',
    patientId: '66f10a9e0b1c2d3e4f5b7004',
    analysisName: 'Rapid Strep Test',
    date: new Date('2025-09-03T16:20:33.000Z'),
    description: 'Sore throat evaluation. Result: pending.',
    createdAt: new Date('2025-08-31T23:59:59.000Z'),
    updatedAt: new Date('2025-09-01T00:00:59.000Z')
  },
  {
    _id: '66f11b2a0a1b2c3d4e5f7005',
    patientId: '66f10a9e0b1c2d3e4f5b7005',
    analysisName: 'Lipid Panel (TC/LDL/HDL/TG)',
    date: new Date('2025-09-03T16:20:33.000Z'),
    description: 'Follow-up for endocrine consult; triglycerides borderline high.',
    fileName: 'lipid-panel_2025-09-02_taras-hnatyuk.pdf',
    createdAt: new Date('2025-09-08T13:55:00.000Z'),
    updatedAt: new Date('2025-09-08T15:10:00.000Z')
  }
]
