import React from 'react';
import DataTable from '../components/DataTable';
import { FormProvider } from '../context/FormContext';

const FormDataTable: React.FC = () => {
  return (
    <FormProvider>
      <div>
        <h1>Data Table</h1>
        <DataTable />
      </div>
    </FormProvider>
  );
};

export default FormDataTable;
