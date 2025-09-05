export const removeScrollBar = (state: boolean) => {
  const html = document.querySelector('html') as HTMLElement
  html.style.overflowY = state ? 'scroll' : 'hidden'
}
