interface IProps {
  label: string
  value: string
}

export default function DisplayInput({ label, value }: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-lg">
        <p className="text-sm text-gray-900">{value || '-'}</p>
      </div>
    </div>
  )
}
