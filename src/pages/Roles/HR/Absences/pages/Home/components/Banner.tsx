import { CalendarOff } from 'lucide-react'

export default function Banner() {
  return (
    <div className="w-11/12 p-10 relative mx-auto overflow-hidden bg-[#4040D2]/20 my-16 max-w-[1280px] text-white h-[320px] rounded-lg">
      <CalendarOff className="absolute right-0 bottom-0 -my-14 w-96 h-96 stroke-[#4040D2]/80" />
      <div>
        <span className="text-[#4040D2] text-2xl inline-block mb-4 font-medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit :
        </span>
        <ul className="list-disc pl-6 text-lg text-[#4040D2]">
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>
      </div>
    </div>
  )
}
