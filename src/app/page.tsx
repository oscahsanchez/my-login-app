import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "../components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Port City Apparell
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-black lg:block">
        <img
          src="/images/pca.png"
          alt="Port City Apparel Logo"
          className="absolute inset-0 h-full w-full object-contain p-12 dark:invert dark:brightness-[0.9]"
        />
      </div>
    </div>
  )
}

