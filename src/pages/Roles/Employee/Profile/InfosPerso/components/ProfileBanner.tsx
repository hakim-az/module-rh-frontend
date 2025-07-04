export default function ProfileBanner() {
  return (
    <div className="w-full h-[260px] mb-32 lg:h-[300px] bg-gray-300 border-b-4 border-b-black">
      <div className="w-11/12 max-w-[1280px] mt-[200px] lg:mt-[228px] gap-10 flex items-center justify-start mx-auto bottom-0">
        <img
          src=""
          alt=""
          className="h-28 w-28 min-h-28 min-w-28 lg:w-36 lg:h-36  bg-gray-300 border-2 border-black rounded-full"
        />
        <div className="flex flex-col gap-3 bg-black/40 p-3 w-[200px] text-white">
          <span className="text-lg lg:text-xl font-medium">John Doe</span>
          <span className="text-base lg:text-lg">Développeur web</span>
        </div>
      </div>
    </div>
  )
}
