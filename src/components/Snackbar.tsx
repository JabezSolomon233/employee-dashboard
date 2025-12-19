interface Props {
  message: string
  type: "success" | "error"
}

export default function Snackbar({ message, type }: Props) {
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded text-white ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  )
}
