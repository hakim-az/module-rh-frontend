import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud } from 'lucide-react'

function formatFileSize(size: number) {
  if (size < 1024) return `${size} bytes`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export default function FileUploader({
  file,
  setFile,
  title,
}: {
  file: File | null
  setFile: (file: File) => void
  title: string
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
      }
    },
    [setFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
  })

  return (
    <div className="space-y-2">
      <label className="font-medium mb-3 inline-block text-black">
        {title}
        <span className="text-red-500"> *</span>
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md px-6 py-20 text-center cursor-pointer transition ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}>
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto mb-2 h-6 w-6 text-gray-400" />

        {file ? (
          <div className="text-sm text-gray-700">
            <p>
              <strong>Fichier:</strong> {file.name}
            </p>
            <p>
              <strong>Type:</strong> {file.type || 'N/A'}
            </p>
            <p>
              <strong>Taille:</strong> {formatFileSize(file.size)}
            </p>
            <p>
              <strong>Derniére modification:</strong>{' '}
              {new Date(file.lastModified).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div className="py-5">
            <p className="text-sm text-gray-600">
              Drop here to attach or{' '}
              <span className="text-blue-500 underline">upload</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">Max size: 10 Mb</p>
          </div>
        )}
      </div>
    </div>
  )
}
