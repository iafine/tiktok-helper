export const ContentLayout = ({ children }: any) => {
  return (
    <div className="w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-between max-w-6xl w-full h-full">
        <div className="w-full pt-10 pb-5">{children}</div>
      </div>
    </div>
  )
}
