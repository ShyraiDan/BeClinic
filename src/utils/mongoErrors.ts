// utils/mongo-errors.ts
import { MongoServerError } from 'mongodb'

import { DbError } from '@/shared/types'

export const mapMongoError = (err: unknown): DbError => {
  if (err instanceof MongoServerError) {
    switch (err.code) {
      case 11000:
        return { code: 'DUPLICATE_KEY', message: err.errmsg }
    }
  }

  return { code: 'unknown', message: 'Unknown error' }
}
