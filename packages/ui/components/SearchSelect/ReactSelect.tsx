import { Typography, useTheme } from "@mui/material";
import { forwardRef } from "react";
import Select, {
  OptionProps,
  Props,
  SelectInstance,
  components,
} from "react-select";
import { TReactSelectOption } from "./models";

const SelectOption = (props: OptionProps<TReactSelectOption>) => {
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

const ReactSelect = forwardRef<
  SelectInstance<TReactSelectOption>,
  Props<TReactSelectOption>
>(function ReactSelect({ classNames, className, ...props }, ref) {
  const muiTheme = useTheme();
  return (
    <Select
      ref={ref}
      className={`${className}`}
      classNames={{
        control: () => `h-[56px] rounded-[${muiTheme.shape.borderRadius}px]`,
        ...classNames,
      }}
      {...props}
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
});

export default ReactSelect;
