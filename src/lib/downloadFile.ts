import axios from 'axios'

export const downloadFile = async (fileName: string) => {
  if (!fileName) {
    console.error('No file name provided for download')
    return
  }

  try {
    const encodedFileName = encodeURIComponent(fileName)

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/files/download/${encodedFileName}`,
      {
        responseType: 'blob',
      }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url

    const name = fileName.split('/').pop() || 'download.pdf'
    link.setAttribute('download', name)

    document.body.appendChild(link)
    link.click()
    link.remove()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
    throw error
  }
}
