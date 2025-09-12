import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useState } from 'react'

import { DoctorSignInForm } from '@/components/forms/DoctorSignInForm/DoctorSignInForm'
import { DoctorSignUpForm } from '@/components/forms/DoctorSignUpForm/DoctorSignUpForm'
import { PatientSignInForm } from '@/components/forms/PatientSignInForm/PatientSignInForm'
import { PatientSignUpForm } from '@/components/forms/PatientSignUpForm/PatientSignUpForm'
import { StyledModal } from '@/components/StyledModal/StyledModal'
import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { P } from '@/components/ui/typography'

enum AUTH_MODAL_ENUM {
  SIGNIN_PATIENT = 'signin-patient',
  SIGNIN_DOCTOR = 'signin-doctor',
  SIGNUP_PATIENT = 'signup-patient',
  SIGNUP_DOCTOR = 'signup-doctor'
}

const isPatientModal = (modalType: AUTH_MODAL_ENUM) => {
  return modalType === AUTH_MODAL_ENUM.SIGNIN_PATIENT || modalType === AUTH_MODAL_ENUM.SIGNUP_PATIENT
}

interface ModalContentProps {
  setModalType: Dispatch<SetStateAction<AUTH_MODAL_ENUM>>
}

const PatientSignInModalContent = ({ setModalType }: ModalContentProps) => {
  const t = useTranslations('modals')

  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>{t('auth.welcomePatient')}</DialogTitle>
        <P className='font-medium mb-2'>{t('auth.enterData')}</P>
        <PatientSignInForm />
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          {t('auth.noAccount')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNUP_PATIENT)}>
            {t('auth.signUp')}
          </span>
        </P>

        <P className='mb-2'>
          {t('auth.signInAsDoctor')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_DOCTOR)}>
            {t('auth.signIn')}
          </span>
        </P>
      </div>
    </div>
  )
}

const PatientSignUpModalContent = ({ setModalType }: ModalContentProps) => {
  const t = useTranslations('modals')

  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>{t('auth.newPatient')}</DialogTitle>
        <P className='font-medium mb-2'>{t('auth.enterData')}</P>
        <PatientSignUpForm />
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          {t('auth.haveAccount')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_PATIENT)}>
            {t('auth.signIn')}
          </span>
        </P>

        <P className='mb-2'>
          {t('auth.signInAsDoctor')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_DOCTOR)}>
            {t('auth.signIn')}
          </span>
        </P>
      </div>
    </div>
  )
}

const DoctorSignInModalContent = ({ setModalType }: ModalContentProps) => {
  const t = useTranslations('modals')

  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>{t('auth.welcomeDoctor')}</DialogTitle>
        <P className='font-medium mb-2'>{t('auth.enterData')}</P>
        <DoctorSignInForm />
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          {t('auth.signUpAsDoctor')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNUP_DOCTOR)}>
            {t('auth.signUp')}
          </span>
        </P>

        <P className='mb-2'>
          {t('auth.signInAsPatient')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_PATIENT)}>
            {t('auth.signIn')}
          </span>
        </P>
      </div>
    </div>
  )
}

const DoctorSignUpModalContent = ({ setModalType }: ModalContentProps) => {
  const t = useTranslations('modals')

  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>{t('auth.newDoctor')}</DialogTitle>
        <P className='font-medium mb-2'>{t('auth.enterDoctorData')}</P>
        <div className='h-[450px] overflow-y-auto'>
          <DoctorSignUpForm />
        </div>
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          {t('auth.signInAsDoctor')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_DOCTOR)}>
            {t('auth.signIn')}
          </span>
        </P>

        <P className='mb-2'>
          {t('auth.signInAsPatient')}{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_PATIENT)}>
            {t('auth.signIn')}
          </span>
        </P>
      </div>
    </div>
  )
}

interface FormComponentProps {
  modalType: AUTH_MODAL_ENUM
  setModalType: Dispatch<SetStateAction<AUTH_MODAL_ENUM>>
}

const FormComponent = ({ modalType, setModalType }: FormComponentProps) => {
  switch (modalType) {
    case AUTH_MODAL_ENUM.SIGNIN_PATIENT:
      return <PatientSignInModalContent setModalType={setModalType} />
    case AUTH_MODAL_ENUM.SIGNUP_PATIENT:
      return <PatientSignUpModalContent setModalType={setModalType} />
    case AUTH_MODAL_ENUM.SIGNIN_DOCTOR:
      return <DoctorSignInModalContent setModalType={setModalType} />
    case AUTH_MODAL_ENUM.SIGNUP_DOCTOR:
      return <DoctorSignUpModalContent setModalType={setModalType} />
  }
}

export const AuthModal = () => {
  const [modalType, setModalType] = useState<AUTH_MODAL_ENUM>(AUTH_MODAL_ENUM.SIGNIN_PATIENT)
  const t = useTranslations('modals')

  return (
    <StyledModal
      contentClassName='h-[700px] lg:w-[960px] lg:!max-w-[960px]'
      triggerButton={
        <Button variant='outline' className='hover:bg-blue-200 hover:text-white'>
          {t('auth.signIn')}
        </Button>
      }>
      <div className='lg:w-[960px]'>
        <div className='h-full flex flex-col lg:grid lg:grid-cols-2 lg:w-[920px]'>
          <div className='hidden lg:relative lg:w-full lg:h-full lg:block'>
            <Image
              width={460}
              height={700}
              src={isPatientModal(modalType) ? '/patient-auth.jpg' : '/doctor-auth.jpg'}
              alt={isPatientModal(modalType) ? 'patients' : 'doctors'}
              className='absolute -top-6 -left-6 -bottom-6 w-full h-[700px] rounded-l-lg'
            />
          </div>
          <FormComponent modalType={modalType} setModalType={setModalType} />
        </div>
      </div>
    </StyledModal>
  )
}
