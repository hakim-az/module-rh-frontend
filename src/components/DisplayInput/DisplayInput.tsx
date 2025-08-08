import { Label } from '../ui/label'

interface IProps {
  label: string
  value: string
}

export default function DisplayInput({ label, value }: IProps) {
  return (
    <div className="flex flex-col">
      <Label className="mb-2">
        {label} <span className="text-transparent text-lg">*</span>
      </Label>
      <span className="border border-gray-300 flex items-center justify-start min-h-10 text-black px-3 rounded">
        {value}
      </span>
    </div>
  )
}
