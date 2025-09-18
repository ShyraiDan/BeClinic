export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(res.status === 404 ? 'Not found' : 'Error fetching data')
    return res.json()
  })
