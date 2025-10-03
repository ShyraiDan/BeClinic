import { Review } from '@/shared/types'

export const mockedReviews: Review[] = [
  {
    _id: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e1',
    userName: 'John Doe',
    userPhoto: '/about-img5.jpg',
    userPosition: 'Designer',
    review: {
      uk: 'Дуже вдячна лікарю за уважність і професійний підхід. Все було чітко, спокійно та без поспіху. Отримала відповіді на всі свої запитання і план лікування, який вже дає результати. Рекомендую!',
      en: 'I am very grateful to the doctor for his attentiveness and professional approach. Everything was clear, calm, and unhurried. I received answers to all my questions and a treatment plan that is already showing results. I recommend him!'
    }
  },
  {
    _id: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e2',
    userName: 'John Doe',
    userPhoto: '/about-img5.jpg',
    userPosition: 'Designer',
    review: {
      uk: 'Прийом пройшов загалом добре. Лікар уважний, вислухав усі скарги. Єдине — довелося трохи зачекати через затримку в графіку, але це не зіпсувало загального враження. Дякую!',
      en: "The appointment went well overall. The doctor was attentive and listened to all my complaints. The only thing was that I had to wait a little due to a delay in the schedule, but that didn't spoil the overall impression. Thank you!"
    }
  },
  {
    _id: '3bfb2b3b-09ee-4055-a74c-ba5f341bb1e3',
    userName: 'John Doe',
    userPhoto: '/about-img5.jpg',
    userPosition: 'Designer',
    review: {
      uk: 'Просто супер! Лікар — золота людина. Після консультації з’явилось відчуття спокою і впевненості, що все буде добре.',
      en: 'Just great! The doctor is a wonderful person. After the consultation, I felt calm and confident that everything would be fine.'
    }
  }
]
