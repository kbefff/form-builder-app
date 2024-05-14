# Form Builder Application

## Overview

This project is a Form Builder application developed using React. The application allows users to create custom forms by selecting field types, setting validation rules, and naming forms. It also includes features to display the form data in a sortable table. The state management is handled using Context API, and the form structures are persisted in localStorage.

## Features

- **Field Type Selection**: Users can choose different types of form fields (e.g., text, number, date, checkbox).
- **Validation Rules**: Set validation rules for each field (e.g., required, email format).
- **Form Naming**: Users can name their forms for easy identification.
- **Data Display**: View and sort submitted form data in a table.
- **State Management**: Uses Context API for state management.
- **Persistence**: Form structures are saved in localStorage.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kbeff/form-builder.git
   cd form-builder
2. **Install Dependencies**
   ```bash
   npm install
3. **Run the Development Server**
   ```bash
   npm run start
The application will be available at http://localhost:3000.


## Usage
**Creating a Form**
1. Navigate to the form creation page.
2. Add fields by selecting the type and setting validation rules.
3. Name the form and save it.


**Viewing and Using Forms**
1. Navigate to the form library page to view all saved forms.
2. Select a form to fill out its fields and submit your responses.
3. You can delete individual forms from the library.

**Viewing Form Data**

1. After submitting a form, navigate to the data view page.
2. The submitted data will be displayed in a sortable table.
3. Use the "Clear All Data" button to delete all stored form data.