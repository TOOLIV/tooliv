export type inputBoxTypes = {
  label: string;
  placeholder: string;
  status?: string;
  type?: string;
  onChange?: () => void;
  message?: string;
};

export type inputTypes = {
  placeholder: string;
  status: string;
  type: string;
  onChange?: () => void;
};

export type inputMessageTypes = {
  message?: string;
  status?: string;
};
