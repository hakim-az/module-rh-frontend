import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  type FieldError,
  type UseFormRegister,
  type RegisterOptions,
  type Path,
  type FieldValues,
} from 'react-hook-form'

interface ControlledTextareaProps<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder: string
  register: UseFormRegister<T>
  rules?: RegisterOptions<T, Path<T>>
  error?: FieldError
  rows?: number
  defaultValue?: string
}

export const ControlledTextarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  rules,
  error,
  rows = 4,
  defaultValue = '',
}: ControlledTextareaProps<T>) => {
  return (
    <div className="grid w-full items-start">
      <Label htmlFor={name as string} className="mb-2">
        {label}
      </Label>
      <Textarea
        id={name as string}
        placeholder={placeholder}
        rows={rows}
        defaultValue={defaultValue}
        {...(rules ? register(name, rules) : register(name))}
        className="h-40 p-4"
      />
      {error && (
        <p className="text-red-500 mt-2 text-sm">
          {error.message || 'Ce champ est requis'}
        </p>
      )}
    </div>
  )
}
