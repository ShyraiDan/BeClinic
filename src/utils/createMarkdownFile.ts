export const createMarkdownFile = (markdownText: string, fileName: string) => {
  const blob = new Blob([markdownText], { type: 'text/markdown' })
  const file = new File([blob], fileName, { type: 'text/markdown' })

  return file
}
