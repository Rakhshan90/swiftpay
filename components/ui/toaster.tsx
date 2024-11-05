"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-primary-200 border-none">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-secondary-200">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-slate-50">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-slate-50 hover:text-secondary-200" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
