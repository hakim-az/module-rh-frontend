import { downloadFile } from '@/lib/downloadFile'
import { Download } from 'lucide-react'
import { useCallback, useState } from 'react'

interface ActionsCellProps {
  fileName: string
}

export default function ActionsCell({ fileName }: ActionsCellProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // donload file
  const handleDownload = useCallback(async () => {
    if (!fileName) return

    setIsLoading(true)
    try {
      await downloadFile(fileName)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [fileName])

  console.log('fileName', fileName)

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Download
          onClick={() => {
            console.log('hello coffre')
            handleDownload()
          }}
          className="hover:text-blue-500 cursor-pointer  transition-all ease-in-out delay-75"
        />
      )}
    </div>
  )
}
