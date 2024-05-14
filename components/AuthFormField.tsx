import React, { useState } from "react";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";

const formScheme = authFormSchema("sign-up");

interface AuthFormFieldProps {
  control: Control<z.infer<typeof formScheme>>;
  fieldName: FieldPath<z.infer<typeof formScheme>>;
  label: string;
  placeholder: string;
  type?: string;
}

const AuthFormField = ({
  control,
  fieldName,
  label,
  placeholder,
  type = "text",
}: AuthFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <div className="form-item">
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <FormControl>
              <Input
                className="input-class"
                placeholder={placeholder}
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message" />
          </FormItem>
        </div>
      )}
    />
  );
};

export default AuthFormField;
