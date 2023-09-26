export type TReactSelectData = Record<
  string,
  string | number | null | undefined | boolean
>;
export type TReactSelectOption = {
  label: string | number;
  value: string | number;
  subLabel?: string | number;
};
