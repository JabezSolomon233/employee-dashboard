import { Navigate } from "react-router-dom"

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element
}) {
  const isLoggedIn = localStorage.getItem("role") // or token later

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}
