import TextArea from "app/components/atoms/TextArea";
import React from "react";
import slugify from "slugify";

interface DiaryEntryInputProps {
  label: string;
  value: string;
  updateField: (value: string) => void;
  className?: string;
}

const slugFieldName = (label: string) => slugify(label, { lower: true });

const DiaryEntryInput: React.FC<DiaryEntryInputProps> = ({
  label,
  value,
  updateField,
  className,
}) => {
  const fieldLabel = slugFieldName(label);
  return (
    <div className={className ?? ""}>
      <label id={`${fieldLabel}-label`} aria-label={fieldLabel}>
        <label htmlFor={fieldLabel}>{label}</label>
      </label>
      <TextArea
        id={fieldLabel}
        aria-labelledby={`${fieldLabel}-label`}
        value={value}
        onChange={({ target }) => updateField(target.value)}
      />
    </div>
  );
};

export default DiaryEntryInput;
