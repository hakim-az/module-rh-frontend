interface Iprops {
  title: string
  description: string | React.ReactNode
}

export default function SectionHeader({ title, description }: Iprops) {
  return (
    <div className="flex flex-col gap-4 text-[#334155]">
      <span className="text-2xl font-bold">{title}</span>
      <div className="text-xs lg:text-sm text-slate-600 leading-relaxed">
        {description}
      </div>
    </div>
  )
}
