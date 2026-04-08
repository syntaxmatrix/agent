
import { RegisterForm } from "@/components/Register"
import { GalleryVerticalEnd, Link } from "lucide-react"
    

export default function RegisterPage() {
  return (
    <div className="auth-wrapper p-4">
      <div className="auth-card">
        <div className="flex justify-center gap-2 mb-6">
          <Link
           href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Agentic AI.
          </Link>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

