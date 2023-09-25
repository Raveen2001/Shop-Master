import { Typography, useTheme } from "@mui/material";
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
    <components.Option
      {...props}
      className="border-slate-300 border-b-[1px] border-dotted min-h-[56px] flex flex-col justify-center"
    >
      <Typography variant="subtitle1">{props.data.label}</Typography>
      <Typography variant="body1">{props.data.subLabel}</Typography>
    </components.Option>
  );
};

const SingleSelectSearch = ({
  data,
  className,
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
      className={`isolate z-10 ${className}`}
      classNames={{
        control: () => `h-[56px] rounded-[${muiTheme.shape.borderRadius}px]`,
      }}
      components={{
        Option: SelectOption as any,
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: muiTheme.palette.primary.main,
          primary25: muiTheme.palette.primary.light,
        },
      })}
    />
  );
};

export default SingleSelectSearch;
