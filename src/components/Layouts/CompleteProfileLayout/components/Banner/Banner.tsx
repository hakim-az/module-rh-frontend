type BannerProps = {
  title: string
  description: string | React.ReactNode
}

export default function Banner({ title, description }: BannerProps) {
  return (
    <div className="w-11/12 mx-auto max-w-[1200px] min-h-[250px] mb-16 text-white p-10 rounded-md bg-black">
      <h2 className="text-3xl font-semibold mb-4 text-center">{title}</h2>
      <p className="text-justify">{description}</p>
    </div>
  )
}
