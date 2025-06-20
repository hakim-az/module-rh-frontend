import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  useWatch,
  useFormContext,
} from 'react-hook-form'
import { useEffect } from 'react'

interface SelectOption {
  label: string
  value: string
}

interface ControlledSelectProps<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder: string
  control: Control<T>
  rules?: object
  items: SelectOption[]
  error?: FieldError
  selectDefaultValue: string
}

export const ControlledSelect = <T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  rules,
  items,
  error,
  selectDefaultValue,
}: ControlledSelectProps<T>) => {
  const { setValue } = useFormContext()
  const currentValue = useWatch({ name, control })
  const { formState } = useFormContext()
  const showError = formState.isSubmitted && error

  useEffect(() => {
    if (!currentValue) {
      setValue(name, selectDefaultValue as T[typeof name], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }
  }, [currentValue, name, selectDefaultValue, setValue])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="grid items-start w-full">
          <Label htmlFor={name} className="mb-2">
            {label} <span className="text-red-500 text-lg">*</span>
          </Label>
          <Select
            onValueChange={field.onChange}
            value={field.value || selectDefaultValue}>
            <SelectTrigger className="w-full min-h-10 h-5 max-h-5">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showError && (
            <p className="text-red-500 mt-2 text-sm">Ce champ est requis</p>
          )}
        </div>
      )}
    />
  )
}
