import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type Control, Controller, useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { H4, P } from '@/components/ui/typography'
import { DoctorEditAppointmentFormValues } from '@/shared/types'

interface MedicineFormProps {
  control: Control<DoctorEditAppointmentFormValues>
}

export const MedicineForm = ({ control }: MedicineFormProps) => {
  const t = useTranslations('forms')

  const {
    fields: medicines,
    append: appendMedicines,
    remove: removeMedicines
  } = useFieldArray<DoctorEditAppointmentFormValues>({
    control,
    name: 'medicine'
  })

  return (
    <fieldset>
      <legend>
        <H4>{t('appointmentForm.medicine.label')}</H4>
      </legend>
      <div className='flex flex-col gap-4'>
        {medicines.map((medicine, index) => (
          <section key={medicine.id} className='bg-white shadow-custom-right p-4 rounded-md'>
            <Controller
              name={`medicine.${index}.medicineName`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className='mb-4'>
                  <div className='flex justify-between items-center mb-4'>
                    <Label htmlFor={`medicine.${index}.medicineName`}>
                      {t('appointmentForm.medicine.fields.medicineName.label')}
                    </Label>
                    <Button
                      variant='icon'
                      className='!px-2 !py-0 h-7 w-7 rounded-lg bg-blue-200 enabled:hover:bg-purple-100'
                      type='button'
                      onClick={() => removeMedicines(index)}>
                      <Trash2 className='text-white' size={14} />
                    </Button>
                  </div>

                  <Input
                    type='text'
                    id={`medicine.${index}.medicineName`}
                    placeholder={t('appointmentForm.medicine.fields.medicineName.placeholder')}
                    {...field}
                  />
                  {error?.message && <ErrorText>{error.message}</ErrorText>}
                </div>
              )}
            />

            <Controller
              name={`medicine.${index}.dosing`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className='mb-4'>
                  <Label htmlFor={`medicine.${index}.dosing`}>
                    {t('appointmentForm.medicine.fields.medicineDosing.label')}
                  </Label>
                  <Input
                    type='text'
                    id={`medicine.${index}.dosing`}
                    placeholder={t('appointmentForm.medicine.fields.medicineDosing.placeholder')}
                    {...field}
                  />
                  {error?.message && <ErrorText>{error.message}</ErrorText>}
                </div>
              )}
            />

            <Controller
              name={`medicine.${index}.description`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className='mb-4'>
                  <Label htmlFor={`medicine.${index}.description`}>
                    {t('appointmentForm.medicine.fields.medicineDescription.label')}
                  </Label>
                  <Input
                    type='text'
                    id={`medicine.${index}.description`}
                    placeholder={t('appointmentForm.medicine.fields.medicineDescription.placeholder')}
                    {...field}
                  />
                  {error?.message && <ErrorText>{error.message}</ErrorText>}
                </div>
              )}
            />
          </section>
        ))}
      </div>
      <Button
        type='button'
        className='mt-4'
        onClick={() => appendMedicines({ medicineName: '', dosing: '', description: '' })}>
        {t('appointmentForm.medicine.button')}
      </Button>
    </fieldset>
  )
}
