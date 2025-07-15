interface IProps {
  label: string
  value: string
}

export default function DisplayInput({ label, value }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
        {label}
      </label>
      <span className="border border-gray-300 flex items-center justify-start h-11 text-black px-3 rounded">
        {value}
      </span>
    </div>
  )
}
