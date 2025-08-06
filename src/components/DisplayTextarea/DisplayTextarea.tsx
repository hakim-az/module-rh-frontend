interface IProps {
  label: string
  value: string
}

export default function DisplayTextarea({ label, value }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
        {label}
      </label>
      <span className="border border-gray-300 flex items-start justify-start min-h-30 text-black p-4 rounded">
        {value}
      </span>
    </div>
  )
}
