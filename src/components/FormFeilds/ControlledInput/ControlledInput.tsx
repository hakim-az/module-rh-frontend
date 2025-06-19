import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  type FieldError,
  type UseFormRegister,
  type RegisterOptions,
  type Path,
  type FieldValues,
} from 'react-hook-form'

interface UncontrolledInputProps<T extends FieldValues> {
  // add constraint here
  name: Path<T>
  label: string
  placeholder: string
  register: UseFormRegister<T>
  rules?: RegisterOptions<T, Path<T>>
  error?: FieldError
  inputType: string
}

export const ControlledInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  rules,
  error,
  inputType,
}: UncontrolledInputProps<T>) => {
  return (
    <div className="grid w-full items-start">
      <Label htmlFor={name as string} className="mb-2">
        {label} <span className="text-red-500 text-lg">*</span>
      </Label>
      <Input
        {...register(name, rules)}
        className="min-h-10 h-10"
        id={name as string}
        type={inputType}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 mt-2 text-sm">
          {error.message || 'Ce champ est requis'}
        </p>
      )}
    </div>
  )
}
