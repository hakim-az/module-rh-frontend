import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud } from 'lucide-react'
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form'

type ImageUploaderProps<T extends FieldValues> = {
  title: string
  name: Path<T>
  onImageSelect: (file: File) => void
  error?: string
  setValue: UseFormSetValue<T>
  defaultImage?: File
  required?: boolean
}

export default function ImageUploader<T extends FieldValues>({
  title,
  name,
  onImageSelect,
  error,
  setValue,
  defaultImage,
  required,
}: ImageUploaderProps<T>) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dropError, setDropError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        const preview = URL.createObjectURL(file)

        setPreviewUrl(preview)
        setDropError(null)

        setValue(name, file as PathValue<T, Path<T>>, { shouldValidate: true })
        onImageSelect(file)
      }
    },
    [name, onImageSelect, setValue]
  )

  const onDropRejected = useCallback(() => {
    setPreviewUrl(null)
    setDropError(
      'Veuillez télécharger une image valide de moins de 10 Mo (JPG, PNG).'
    )
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10 MB
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
  })

  useEffect(() => {
    if (defaultImage) {
      const defaultPreview = URL.createObjectURL(defaultImage)
      setPreviewUrl(defaultPreview)
      setValue(name, defaultImage as PathValue<T, Path<T>>)
    }

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [defaultImage, name, previewUrl, setValue])

  return (
    <div className="space-y-2 bg-white">
      <label className="font-medium mb-3 inline-block text-black">
        {title}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md px-6 py-20 text-center cursor-pointer transition ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}>
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto mb-4 h-6 w-6 text-gray-400" />

        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Aperçu de l'image"
            className="mx-auto max-h-64 rounded-md object-contain"
          />
        ) : (
          <div className="py-5">
            <p className="text-sm text-gray-600">
              Déposez une image ou{' '}
              <span className="text-blue-500 underline">sélectionnez</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Formats acceptés : JPG, PNG. Taille max : 10 Mo
            </p>
          </div>
        )}
      </div>

      {dropError && <p className="text-sm text-red-500">{dropError}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
