import Cell from "components/atoms/Cell";
import { H2 } from "components/atoms/styled";
import TextArea from "components/atoms/TextArea";
import React from "react";
import slugify from "slugify";

interface DiaryEntryInputProps {
  label: string;
  value: string;
  updateField: (value: string) => void;
  className?: string;
}

const fieldName = (label: string) => slugify(label, { lower: true });

const DiaryEntryInput: React.FC<DiaryEntryInputProps> = ({
  label,
  value,
  updateField,
  className,
}) => (
  <Cell className={className ?? ""}>
    <H2 id={`${fieldName(label)}-label`}>{label}</H2>
    <TextArea
      aria-labelledby={`${fieldName(label)}-label`}
      value={value}
      onChange={({ target }) => updateField(target.value)}
    />
  </Cell>
);

export default DiaryEntryInput;
