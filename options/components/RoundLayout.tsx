export const RoundLayout = ({ title, children }: any) => {
  return (
    <div className="p-5 mb-5 bg-white rounded">
      <span className="text-sm font-medium">{title}</span>
      <div
        className="mt-4 mb-6"
        style={{ borderTop: "2px dashed #d1d0d1" }}></div>
      {children}
    </div>
  )
}
