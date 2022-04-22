export type dropdownType = {
  defaultValue: { value: string; label: string };
  selected: { value: string; label: string };
  options: Array<{ value: string; label: string }>;
  onChange: any;
};
