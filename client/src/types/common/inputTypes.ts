export type inputBoxTypes = {
  label: string;
  placeholder: string;
  status?: string;
  type?: string;
  onChange?: () => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  message?: string;
  disabled?: boolean;
};

export type inputTypes = {
  placeholder: string;
  status: string;
  type: string;
  disabled?: boolean;
  onChange?: () => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type inputMessageTypes = {
  message?: string;
  status?: string;
};
