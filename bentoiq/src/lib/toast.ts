import { toast } from "sonner";
import { TOAST_DURATION } from "@/lib/constants";

type ToastVariant = "success" | "error" | "warning" | "info" | "default";

interface ShowToastOptions {
  title:       string;
  description?: string;
  variant?:    ToastVariant;
  duration?:   number;
}

/**
 * Centralized toast notification system using Sonner.
 * All toasts in the app should go through this module.
 */
export const showToast = ({
  title,
  description,
  variant  = "default",
  duration = TOAST_DURATION.MEDIUM,
}: ShowToastOptions): void => {
  const options = { description, duration };

  switch (variant) {
    case "success": toast.success(title, options); break;
    case "error":   toast.error(title,   options); break;
    case "warning": toast.warning(title, options); break;
    case "info":    toast.info(title,    options); break;
    default:        toast(title,         options); break;
  }
};

// ── Convenience wrappers ─────────────────────────────────────────────────────
export const toastSuccess = (title: string, description?: string) =>
  showToast({ title, description, variant: "success" });

export const toastError = (title: string, description?: string) =>
  showToast({ title, description, variant: "error", duration: TOAST_DURATION.LONG });

export const toastInfo = (title: string, description?: string) =>
  showToast({ title, description, variant: "info" });

export const toastWarning = (title: string, description?: string) =>
  showToast({ title, description, variant: "warning" });
