import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField as MuiTextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputLabel,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import FormField from '../components/FormField';
import { SelectChangeEvent } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useFormContext, FormProvider } from '../context/FormContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home: React.FC = () => {
  const { formName, setFormName, fields, addField, saveForm } = useFormContext();
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleAddField = () => {
    if (!fieldLabel || !fieldType) {
      setSnackbarMessage('Field label and type cannot be empty');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const newField = { label: fieldLabel, type: fieldType, options: fieldType === 'radio' || fieldType === 'select' ? options : undefined };
    addField(newField);
    setFieldLabel('');
    setFieldType('');
    setOptions([]);
    setOption('');
  };

  const handleAddOption = () => {
    setOptions([...options, option]);
    setOption('');
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to the Form Builder Application
      </Typography>
      <Typography variant="body1" gutterBottom>
        This application allows you to create custom forms, view a library of created forms, and view the data collected from those forms.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box component="form" noValidate autoComplete="off">
            <Typography variant="h4" gutterBottom>
              Customize Form
            </Typography>
            <MuiTextField
              fullWidth
              label="Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              margin="normal"
              required
            />
            <MuiTextField
              fullWidth
              label="Field Label"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="field-type-label">Field Type</InputLabel>
              <Select
                labelId="field-type-label"
                value={fieldType}
                onChange={(e: SelectChangeEvent<string>) => setFieldType(e.target.value as string)}
                displayEmpty
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="textarea">Text Area</MenuItem>
                <MenuItem value="radio">Radio Buttons</MenuItem>
                <MenuItem value="select">Drop-down</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone Number</MenuItem>
              </Select>
            </FormControl>
            {(fieldType === 'radio' || fieldType === 'select') && (
              <Box>
                <MuiTextField
                  fullWidth
                  label="Option"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  margin="normal"
                />
                <IconButton onClick={handleAddOption}>
                  <AddIcon />
                </IconButton>
                <Box>
                  {options.map((opt, index) => (
                    <Typography key={index}>{opt}</Typography>
                  ))}
                </Box>
              </Box>
            )}
            <Button variant="contained" color="primary" onClick={handleAddField} sx={{ mt: 2 }}>
              Add Field
            </Button>
            <Button variant="contained" color="secondary" onClick={saveForm} sx={{ mt: 2, ml: 2 }}>
              Save Form
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Preview
          </Typography>
          <Box>
            <form>
              {fields.map((field, index) => (
                <FormField
                  key={index}
                  formId="preview"
                  field={field}
                  value=""
                  onChange={() => {}}
                />
              ))}
            </form>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const HomeWithProvider: React.FC = () => (
  <FormProvider>
    <Home />
  </FormProvider>
);

export default HomeWithProvider;
