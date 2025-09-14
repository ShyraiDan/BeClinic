import messages from './messages/en.json'

declare global {
  type Ns = keyof typeof messages

  type TKey<N extends Ns> = Extract<keyof (typeof messages)[N], string>

  type TFqKey = {
    [N in Ns]: `${Extract<N, string>}.${Extract<keyof (typeof messages)[N], string>}`
  }[Ns]
}
