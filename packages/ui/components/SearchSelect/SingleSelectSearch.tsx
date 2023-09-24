import { useTheme } from "@mui/material";
import { useMemo } from "react";
import Select, { OptionProps, Props, components } from "react-select";
import { TReactSelectOptions } from "./models";
import { get } from "lodash";

type TSingleSelectSearchProps = Props & {
  data?: any[];
  searchKeys?: string[];
  labelKey?: string;
  subLabelKey?: string;
  valueKey?: string;
};

const SelectOption = (props: OptionProps<TReactSelectOptions>) => {
  return (
    <components.Option {...props}>
      <div>{props.data.label}</div>
      <div>{props.data.subLabel}</div>
    </components.Option>
  );
};

const SingleSelectSearch = ({
  data,
  searchKeys,
  labelKey,
  subLabelKey,
  valueKey,
  ...props
}: TSingleSelectSearchProps) => {
  const muiTheme = useTheme();
  const options: TReactSelectOptions[] = useMemo(() => {
    if (!data || !labelKey || !valueKey) return [];
    const options = data.map((item) => {
      return {
        label: get(item, labelKey),
        subLabel: get(item, subLabelKey ?? "", ""),
        value: get(item, valueKey),
      } as any;
    });
    return options;
  }, [data, labelKey, subLabelKey, valueKey]);
  return (
    <Select
      options={options}
      {...props}
      className="isolate z-10"
      components={{
        Option: SelectOption as any,
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: muiTheme.palette.primary.main,
        },
      })}
    />
  );
};

export default SingleSelectSearch;
