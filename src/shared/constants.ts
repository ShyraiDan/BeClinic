import { routing } from '@/i18n/routing'

export const SUPPORTED_LOCALES = routing.locales
export const BUCKET_URL = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/beclinic`
