import { User } from 'lucide-react'

type BannerProps = {
  title: string
  description: string | React.ReactNode
}

export default function Banner({ title, description }: BannerProps) {
  return (
    <div className="w-11/12 p-10 relative mx-auto overflow-hidden bg-[#fff] border border-gray-300 my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg">
      <User className="absolute right-0 bottom-0 -my-14 w-96 h-96 stroke-[#000000]/20" />
      <div>
        <span className="text-[#000000] text-2xl inline-block mb-4 font-medium">
          {title}
        </span>
        {description}
      </div>
    </div>
  )
}
