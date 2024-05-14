import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
  Box,
  Button
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useFormContext } from '../context/FormContext';
import { FormData } from '../types';

const DataTable: React.FC = () => {
  const { forms, formData, clearAllData } = useFormContext();
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('formName');

  React.useEffect(() => {
    const uniqueHeaders = new Set<string>();
    formData.forEach((entry: FormData) => {
      if (entry.data) {
        Object.keys(entry.data).forEach((key) => {
          uniqueHeaders.add(key);
        });
      }
    });
    setHeaders(Array.from(uniqueHeaders));
  }, [formData]);

  const getFormName = (formId: string): string => {
    const form = forms.find((form) => form.id === formId);
    return form ? form.name : 'Unknown Form';
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...formData].sort((a: FormData, b: FormData) => {
    if (orderBy === 'formName') {
      return order === 'asc'
        ? getFormName(a.formId).localeCompare(getFormName(b.formId))
        : getFormName(b.formId).localeCompare(getFormName(a.formId));
    } else {
      const aValue = a.data[orderBy] || '';
      const bValue = b.data[orderBy] || '';
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Data Table</Typography>
        <Button variant="contained" color="secondary" onClick={clearAllData}>
          Clear All Data
        </Button>
      </Box>
      {formData.length === 0 ? (
        <Typography variant="body1">No form data available.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'formName' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'formName'}
                  direction={orderBy === 'formName' ? order : 'asc'}
                  onClick={() => handleRequestSort('formName')}
                >
                  Form Name
                  {orderBy === 'formName' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              {headers.map((header) => (
                <TableCell key={header} sortDirection={orderBy === header ? order : false}>
                  <TableSortLabel
                    active={orderBy === header}
                    direction={orderBy === header ? order : 'asc'}
                    onClick={() => handleRequestSort(header)}
                  >
                    {header}
                    {orderBy === header ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{getFormName(entry.formId)}</TableCell>
                {headers.map((header) => (
                  <TableCell key={header}>{entry.data ? entry.data[header] || 'N/A' : 'N/A'}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default DataTable;
