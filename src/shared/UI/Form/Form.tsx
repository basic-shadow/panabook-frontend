import React from "react";
import { type FieldValues, useForm, type DeepPartial } from "react-hook-form";

export default function Form<T extends FieldValues>({
  defaultValues,
  children,
  onSubmit,
  className,
}: {
  onSubmit: (data: T) => void;
  className?: string;
  defaultValues?: DeepPartial<T>;
  children: React.ReactElement<{
    label?: string;
    name?: string;
    register?: any;
  }>;
}) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={() => handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
}
