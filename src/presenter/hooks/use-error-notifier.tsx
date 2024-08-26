import { useState, useCallback } from "react";
import { toast } from "sonner";

export function useErrorNotifier() {
  const [error, setError] = useState<Error | null>(null);

  const notifyError = useCallback((err: Error) => {
    console.error("Captured error:", err);
    toast(`An error occurred: ${err.message}`);
    setError(err);
  }, []);

  return { error, notifyError };
}
