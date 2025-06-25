import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud } from 'lucide-react'
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form'

function formatFileSize(size: number) {
  if (size < 1024) return `${size} bytes`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

type FileUploaderProps<T extends FieldValues> = {
  title: string
  name: Path<T>
  onFileSelect: (file: File) => void
  error?: string
  setValue: UseFormSetValue<T>
  defaultFile?: File
}

export default function FileUploader<T extends FieldValues>({
  title,
  name,
  onFileSelect,
  error,
  setValue,
  defaultFile,
}: FileUploaderProps<T>) {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    defaultFile ?? null
  )
  const [dropError, setDropError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setSelectedFile(file)
        setDropError(null)
        setValue(name, file as PathValue<T, Path<T>>, { shouldValidate: true })
        onFileSelect(file)
      }
    },
    [onFileSelect, name, setValue]
  )

  const onDropRejected = useCallback(() => {
    setSelectedFile(null)
    setDropError('Le fichier dépasse la taille maximale autorisée de 10 Mo.')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
  })

  useEffect(() => {
    if (defaultFile) {
      setSelectedFile(defaultFile)
      setValue(name, defaultFile as PathValue<T, Path<T>>)
    }
  }, [defaultFile, name, setValue])

  return (
    <div className="space-y-2 bg-white">
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

        {selectedFile ? (
          <div className="text-sm text-gray-700">
            <p>
              <strong>Nom:</strong> {selectedFile.name}
            </p>
            <p>
              <strong>Type:</strong> {selectedFile.type || 'N/A'}
            </p>
            <p>
              <strong>Taille:</strong> {formatFileSize(selectedFile.size)}
            </p>
            <p>
              <strong>Modifié le:</strong>{' '}
              {new Date(selectedFile.lastModified).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div className="py-5">
            <p className="text-sm text-gray-600">
              Déposez un fichier ou{' '}
              <span className="text-blue-500 underline">sélectionnez</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">Taille max: 10 Mo</p>
          </div>
        )}
      </div>

      {dropError && <p className="text-sm text-red-500">{dropError}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
