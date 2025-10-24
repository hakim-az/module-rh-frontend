interface Iprops {
  title: string
  description: string
}

export default function SectionHeader({ title, description }: Iprops) {
  return (
    <div className="flex flex-col gap-4 text-[#334155] ">
      <span className="text-2xl font-bold">{title}</span>
      <p>{description} </p>
    </div>
  )
}
