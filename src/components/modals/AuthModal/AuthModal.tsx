import Image from 'next/image'
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
  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>З поверненням, пацієнте!</DialogTitle>
        <P className='font-medium mb-2'>Будь ласка, внесiть свої дані для входу.</P>
        <PatientSignInForm />
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          Досі немає аккаунту?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNUP_PATIENT)}>
            Зареєструватися
          </span>
        </P>

        <P className='mb-2'>
          Працюєте в медичному центрі?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_DOCTOR)}>
            Увійти
          </span>
        </P>
      </div>
    </div>
  )
}

const PatientSignUpModalContent = ({ setModalType }: ModalContentProps) => {
  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>Вітаємо, пацієнте!</DialogTitle>
        <P className='font-medium mb-2'>Будь ласка, внесiть свої дані для реєстрації.</P>
        <PatientSignUpForm />
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          Вже маєте акаунт?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_PATIENT)}>
            Увійти
          </span>
        </P>

        <P className='mb-2'>
          Працюєте в медичному центрі?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_DOCTOR)}>
            Увійти
          </span>
        </P>
      </div>
    </div>
  )
}

const DoctorSignInModalContent = ({ setModalType }: ModalContentProps) => {
  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>З поверненням, лікарю!</DialogTitle>
        <P className='font-medium mb-2'>Будь ласка, внесiть свої дані для входу.</P>
        <DoctorSignInForm />
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          Новий працівник у BeClinic?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNUP_DOCTOR)}>
            Зареєструватися
          </span>
        </P>

        <P className='mb-2'>
          Бажаєте увійти як пацієнт?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_PATIENT)}>
            Увійти
          </span>
        </P>
      </div>
    </div>
  )
}

const DoctorSignUpModalContent = ({ setModalType }: ModalContentProps) => {
  return (
    <div className='flex flex-col justify-between h-full my-5 lg:mt-0'>
      <div className='flex flex-col'>
        <DialogTitle className='font-bold font-primary mb-2 text-[32px]'>Вітаємо, лікарю!</DialogTitle>
        <P className='font-medium mb-2'>Будь ласка, внесiть свої дані для реєстрації.</P>
        <div className='h-[450px] overflow-y-auto'>
          <DoctorSignUpForm />
        </div>
      </div>

      <div className='flex flex-col'>
        <P className='mb-2'>
          Працюєте в медичному центрі?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_DOCTOR)}>
            Увійти
          </span>
        </P>

        <P className='mb-2'>
          Бажаєте увійти як пацієнт?{' '}
          <span className='text-[#0674d1] cursor-pointer' onClick={() => setModalType(AUTH_MODAL_ENUM.SIGNIN_PATIENT)}>
            Увійти
          </span>
        </P>
      </div>
    </div>
  )
}

export const AuthModal = () => {
  const [modalType, setModalType] = useState<AUTH_MODAL_ENUM>(AUTH_MODAL_ENUM.SIGNIN_PATIENT)

  return (
    <StyledModal
      contentClassName='h-[700px] lg:w-[960px] lg:!max-w-[960px]'
      triggerButton={
        <Button variant='outline' className='hover:bg-blue-200 hover:text-white'>
          Увійти
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
          {modalType === AUTH_MODAL_ENUM.SIGNIN_PATIENT && <PatientSignInModalContent setModalType={setModalType} />}
          {modalType === AUTH_MODAL_ENUM.SIGNUP_PATIENT && <PatientSignUpModalContent setModalType={setModalType} />}
          {modalType === AUTH_MODAL_ENUM.SIGNIN_DOCTOR && <DoctorSignInModalContent setModalType={setModalType} />}
          {modalType === AUTH_MODAL_ENUM.SIGNUP_DOCTOR && <DoctorSignUpModalContent setModalType={setModalType} />}
        </div>
      </div>
    </StyledModal>
  )
}
