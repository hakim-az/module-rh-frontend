import { cn } from '@/lib/utils'

interface IProps {
  label: string
  value: string
}

export default function DisplayInput({ label, value }: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        className={cn(
          'flex items-center gap-2 text-sm leading-none font-medium select-none'
        )}>
        {label}
      </label>
      <input
        className={cn(
          'selection:bg-primary border-input flex h-11 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
        )}
        placeholder={value}
        disabled
      />
    </div>
  )
}
