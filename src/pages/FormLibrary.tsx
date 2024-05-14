import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Snackbar,
  Typography
} from '@mui/material';
import FormField from '../components/FormField';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useFormContext, FormProvider } from '../context/FormContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormLibrary: React.FC = () => {
  const { forms, formData, handleInputChange, handleSubmit, handleDelete } = useFormContext();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleFormSubmit = (formId: string) => {
    if (!handleSubmit(formId)) {
      setSnackbarMessage('Form validation failed');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setSnackbarMessage('Form submitted successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Form Library
      </Typography>
      {forms.length === 0 ? (
        <Typography variant="body1">No forms available. Create some forms first.</Typography>
      ) : (
        <Grid container spacing={2}>
          {forms.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {form.name}
                  </Typography>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleFormSubmit(form.id);
                    }}
                  >
                    {form.fields.map((field, index) => {
                      const formDataEntry = formData.find((data) => data.formId === form.id);
                      return (
                        <FormField
                          key={index}
                          formId={form.id}
                          field={field}
                          value={formDataEntry?.data[field.label] || ''}
                          onChange={(fieldLabel, value) => handleInputChange(form.id, fieldLabel, value)}
                        />
                      );
                    })}
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                      Submit
                    </Button>
                  </form>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" onClick={() => handleDelete(form.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const FormLibraryWithProvider: React.FC = () => (
  <FormProvider>
    <FormLibrary />
  </FormProvider>
);

export default FormLibraryWithProvider;
