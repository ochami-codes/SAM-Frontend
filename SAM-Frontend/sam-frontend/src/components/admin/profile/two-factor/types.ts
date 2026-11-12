import type { TwoFactorStatus, TwoFactorSetup } from "@/src/lib/api/twoFactor";

export type TwoFactorMode = "profile" | "required";

export interface TwoFactorStatusProps {
  status: TwoFactorStatus;
}

export interface TwoFactorPasswordFormProps {
  password: string;
  isLoading: boolean;
  onPasswordChange: (password: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  mode: TwoFactorMode;
}

export interface TwoFactorSetupProps {
  setup: TwoFactorSetup;
  mode: TwoFactorMode;
}

export interface TwoFactorVerificationProps {
  verificationCode: string;
  isVerifying: boolean;
  onVerificationCodeChange: (code: string) => void;
  onVerify: () => void;
}

export interface TwoFactorRecoveryCodesProps {
  recoveryCodes: string[];
  hasCopiedCodes: boolean;
  onCopy: () => void;
  onFinish: () => void;
  mode: TwoFactorMode;
}