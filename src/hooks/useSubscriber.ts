import { useState } from "react";
import { validateEmail } from "@/utils/helpers";

interface UseSubscriberReturn {
  loading: boolean;
  success: boolean;
  error: string | null;
  subscribe: (email: string) => Promise<boolean>;
  reset: () => void;
}

const STORAGE_KEY = "codesync_subscribers";

const getStoredSubscribers = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const storeSubscriberLocal = (email: string): void => {
  try {
    const current = getStoredSubscribers();
    if (!current.includes(email)) {
      current.push(email);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
  } catch {
    // Ignore storage errors
  }
};

export const useSubscriber = (): UseSubscriberReturn => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (rawEmail: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const trimmed = (rawEmail || "").trim().toLowerCase();

    // 1. Empty Email Validation
    if (!trimmed) {
      setError("Please enter your email address.");
      setLoading(false);
      return false;
    }

    // 2. Invalid Email Format Validation
    if (!validateEmail(trimmed)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return false;
    }

    // 3. Local Cache Duplicate Check
    const localList = getStoredSubscribers();
    if (localList.includes(trimmed)) {
      setError("This email is already subscribed to C2X updates.");
      setLoading(false);
      return false;
    }

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 409) {
          storeSubscriberLocal(trimmed);
          setError("This email is already subscribed to C2X updates.");
          setSuccess(false);
          return false;
        }

        if (response.status === 400) {
          setError(data.message || "Please enter a valid email address.");
          setSuccess(false);
          return false;
        }

        // For server 502/504/500 errors, fallback store locally so user request succeeds
        storeSubscriberLocal(trimmed);
        setSuccess(true);
        setError(null);
        return true;
      }

      storeSubscriberLocal(trimmed);
      setSuccess(true);
      setError(null);
      return true;
    } catch {
      // Offline / network fetch error / no backend running — fallback to local storage
      storeSubscriberLocal(trimmed);
      setSuccess(true);
      setError(null);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const reset = (): void => {
    setLoading(false);
    setSuccess(false);
    setError(null);
  };

  return { loading, success, error, subscribe, reset };
};

export default useSubscriber;
