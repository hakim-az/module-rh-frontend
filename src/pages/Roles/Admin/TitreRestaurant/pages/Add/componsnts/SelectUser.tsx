import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Select, { type SingleValue } from 'react-select'
import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import type { IRestauForm } from '../Add'
import { Label } from '@/components/ui/label'

interface IOption {
  value: string
  label: string
}

interface ILightUser {
  id: string
  prenom: string
  nomComplet: string
}

interface PropsType {
  errors: FieldErrors<IRestauForm>
  setValue: UseFormSetValue<IRestauForm>
  clearErrors: UseFormClearErrors<IRestauForm>
  isSubmitting: boolean
  setError: UseFormSetError<IRestauForm>
}

export default function SelectUser({
  errors,
  setValue,
  clearErrors,
  isSubmitting,
  setError,
}: PropsType) {
  const [allUsers, setAllUsers] = useState<ILightUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchAllUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/light`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      setAllUsers(response.data.data)
    } catch (error) {
      console.error('Error fetching all users:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  const options: IOption[] = allUsers.map((user) => ({
    value: user.id,
    label: `${user.prenom} ${user.nomComplet}`,
  }))

  const handleChange = (selectedOption: SingleValue<IOption>) => {
    if (selectedOption) {
      setValue('user_id', selectedOption.value)
      setSelectedId(selectedOption.value)
      clearErrors('user_id')
    } else {
      setValue('user_id', '') // just empty string, no casting
      setSelectedId(null)
    }
  }

  useEffect(() => {
    if (selectedId) {
      clearErrors('user_id')
    } else if (isSubmitting) {
      setError('user_id', {
        type: 'manual',
        message: 'Veuillez sélectionner un salarié',
      })
    }
  }, [clearErrors, selectedId, isSubmitting, setError])

  // find selected option from state for controlled Select value
  const selectedOption = options.find((opt) => opt.value === selectedId) || null

  return (
    <div className="flex flex-col w-full font-roboto">
      <Label className="mb-2">
        Sélectionnez un salarié <span className="text-red-500 text-lg">*</span>
      </Label>
      <Select
        options={options}
        isLoading={isLoading}
        placeholder="Sélectionnez un salarié"
        onChange={handleChange}
        value={selectedOption}
        className="w-full"
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#f9fafb' : 'white',
            borderRadius: '4px',
            border: `1px solid ${state.isFocused ? '#3C83EC' : '#d1d5db'}`,
            padding: '4px',
            fontSize: '14px',
            boxShadow: state.isFocused ? '0 0 0 2px #3C83EC' : 'none',
            '&:hover': {
              borderColor: '#3C83EC',
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: '0 8px',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#6b7280',
            fontSize: '14px',
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '4px',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
            color: state.isSelected ? '#3C83EC' : '#111827',
            padding: '8px 12px',
            fontSize: '14px',
            cursor: 'pointer',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#111827',
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: '#9ca3af',
            '&:hover': {
              color: '#3C83EC',
            },
          }),
          clearIndicator: (provided) => ({
            ...provided,
            color: '#9ca3af',
            '&:hover': {
              color: '#3C83EC',
            },
          }),
        }}
        isClearable
      />
      {errors.user_id && (
        <span className="text-sm mt-1 text-red-500">
          {errors.user_id.message}
        </span>
      )}
    </div>
  )
}
