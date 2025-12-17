import { useEffect, useState, type ReactNode } from "react";
import { SubmitMessageDiv } from "./SubmitMessageStyles";

export type SubmitMessageStatus = null | "success" | "error";

type SubmitMessageProps = {
  type: SubmitMessageStatus;
  successMessage?: string;
  errorMessage?: string;
  displayTime?: number;
};

const default_displayTime = 2500;

const useVisibilityTimer = (active: boolean, duration: number): boolean => {
  const [isVisible, setIsVisible] = useState(active);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  return isVisible;
};

const SubmitMessage = ({
  type,
  successMessage = "Mensagem enviada com sucesso!",
  errorMessage = "Erro ao enviar a mensagem. Tente novamente mais tarde.",
  displayTime = default_displayTime,
}: SubmitMessageProps) => {
  if (type === null) return null;

  const isVisible = useVisibilityTimer(true, displayTime);
  const message = type === "success" ? successMessage : errorMessage;

  return (
    <SubmitMessageDiv
      type={type}
      $isVisible={isVisible}
      aria-live="polite"
      role="alert"
    >
      {message}
    </SubmitMessageDiv>
  );
};

export interface UseSubmitMessageReturn {
  Feedback: ReactNode;
  showSuccess: (msg?: string) => void;
  showError: (msg?: string) => void;
}

interface useSubmitMessage {
  successMessage?: string;
  errorMessage?: string;
}

const useSubmitMessage = ({
  errorMessage,
  successMessage,
}: useSubmitMessage): UseSubmitMessageReturn => {
  const [state, setState] = useState<{
    type: SubmitMessageStatus;
    message?: string;
    id: number;
  }>({ type: null, id: 0 });

  const showSuccess = (message: string = successMessage ?? "Sucesso!") => {
    setState({ type: "success", message, id: Date.now() });
  };

  const showError = (message: string = errorMessage ?? "Erro!") => {
    setState({ type: "error", message, id: Date.now() });
  };

  useEffect(() => {
    if (state.type !== null) {
      const timer = setTimeout(() => {
        setState((prev) =>
          prev.id === state.id ? { ...prev, type: null } : prev
        );
      }, default_displayTime + 1000);
      return () => clearTimeout(timer);
    }
  }, [state.id, state.type, default_displayTime]);

  const Feedback = state.type ? (
    <SubmitMessage
      key={state.id}
      type={state.type}
      successMessage={state.type === "success" ? state.message : undefined}
      errorMessage={state.type === "error" ? state.message : undefined}
      displayTime={default_displayTime}
    />
  ) : null;

  return {
    Feedback,
    showSuccess,
    showError,
  };
};

export { SubmitMessage, useSubmitMessage };
