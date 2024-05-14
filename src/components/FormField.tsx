import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField as MuiTextField,
  Typography
} from '@mui/material';
import { Field } from '../types';

interface Props {
  formId: string;
  field: Field;
  value: any;
  onChange: (fieldLabel: string, value: any) => void;
}

const FormField: React.FC<Props> = ({ formId, field, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field.label, e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    onChange(field.label, e.target.value as string);
  };

  switch (field.type) {
    case 'text':
      return (
        <MuiTextField
          label={field.label}
          type="text"
          value={value || ''}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      );
    case 'textarea':
      return (
        <MuiTextField
          label={field.label}
          type="text"
          multiline
          rows={4}
          value={value || ''}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      );
    case 'radio':
      return (
        <Box marginY={2}>
          <Typography>{field.label}</Typography>
          {field.options?.map((option, optIndex) => (
            <Box key={optIndex}>
              <input
                type="radio"
                id={`${formId}-${field.label}-${option}`}
                name={field.label}
                value={option}
                checked={value === option}
                onChange={handleChange}
              />
              <label htmlFor={`${formId}-${field.label}-${option}`}>{option}</label>
            </Box>
          ))}
        </Box>
      );
    case 'select':
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{field.label}</InputLabel>
          <Select value={value || ''} onChange={handleSelectChange}>
            {field.options?.map((option, optIndex) => (
              <MenuItem key={optIndex} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case 'email':
      return (
        <MuiTextField
          label={field.label}
          type="email"
          value={value || ''}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      );
    case 'phone':
      return (
        <MuiTextField
          label={field.label}
          type="tel"
          value={value || ''}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      );
    default:
      return null;
  }
};

export default FormField;
