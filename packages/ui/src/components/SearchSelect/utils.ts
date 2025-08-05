import { get } from "lodash";
import { TReactSelectOption } from "./models";

export const createOptions = <T>(
  data: T[],
  options: {
    label: keyof T;
    value: keyof T;
    subLabel: string | keyof T;
  },
): TReactSelectOption[] => {
  return data.map(
    (item) =>
      ({
        label: item[options.label],
        value: item[options.value],
        subLabel: options.subLabel ? get(item, options.subLabel) : undefined,
      }) as TReactSelectOption,
  );
};
