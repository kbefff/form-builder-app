import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Field, Form, FormData } from '../types';

interface FormContextType {
  formName: string;
  setFormName: (name: string) => void;
  fields: Field[];
  setFields: (fields: Field[]) => void;
  addField: (field: Field) => void;
  saveForm: () => void;
  forms: Form[];
  formData: FormData[];
  handleInputChange: (formId: string, fieldLabel: string, value: any) => void;
  handleSubmit: (formId: string) => boolean;
  handleDelete: (id: string) => void;
  clearAllData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formName, setFormName] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    const storedForms = localStorage.getItem('forms');
    if (storedForms) {
      setForms(JSON.parse(storedForms));
    }

    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const addField = (field: Field) => {
    setFields([...fields, field]);
  };

  const saveForm = () => {
    if (!formName) {
      return;
    }

    const form: Form = {
      id: Date.now().toString(),
      name: formName,
      fields,
    };

    const updatedForms = [...forms, form];
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));

    setFormName('');
    setFields([]);
  };

  const handleInputChange = (formId: string, fieldLabel: string, value: any) => {
    setFormData((prev) => {
      const updatedData = prev.map((entry) =>
        entry.formId === formId ? { ...entry, data: { ...entry.data, [fieldLabel]: value } } : entry
      );
      localStorage.setItem('formData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const validateForm = (formId: string): boolean => {
    const form = forms.find((form) => form.id === formId);
    if (!form) return false;

    for (const field of form.fields) {
      const value = formData.find((data) => data.formId === formId)?.data[field.label] || '';

      if (field.type === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return false;
      }

      if (field.type === 'phone' && !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value)) {
        return false;
      }

      if (value === '') {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (formId: string): boolean => {
    if (!validateForm(formId)) {
      return false;
    }

    const entryIndex = formData.findIndex((data) => data.formId === formId);
    if (entryIndex === -1) {
      setFormData((prev) => {
        const updatedData = [...prev, { formId, data: {} }];
        localStorage.setItem('formData', JSON.stringify(updatedData));
        return updatedData;
      });
    }

    return true;
  };

  const handleDelete = (id: string) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  };

  const clearAllData = () => {
    setFormData([]);
    localStorage.removeItem('formData');
  };

  return (
    <FormContext.Provider
      value={{
        formName,
        setFormName,
        fields,
        setFields,
        addField,
        saveForm,
        forms,
        formData,
        handleInputChange,
        handleSubmit,
        handleDelete,
        clearAllData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
