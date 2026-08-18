import { Check } from "lucide-react";

export default function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <Check size={16} />
          {toast.message}
        </div>
      ))}
    </div>
  );
}
