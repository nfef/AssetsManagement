import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.styles.css';

const LoginPage = () => {
  const handleSubmit = (values: { login: string; password: string }) => {
    // Gérer la soumission du formulaire
    console.log(values);
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="login-container text-white p-5 rounded shadow" style={{ width: '500px' }}>
        <div className="text-center mb-4">
          <img src={require('../../images/logo-horizontal.png')} alt="Logo de l'entreprise" className="logo mb-3" />
          <h2 className="title">Connexion</h2>
        </div>
        <Formik
          initialValues={{ login: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="login-form">
              <div className="mb-3">
                <label htmlFor="login" className="form-label">Login</label>
                <Field id="login" name="login" type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <Field id="password" name="password" type="password" className="form-control" />
              </div>
              <Button type="submit" variant="contained" className="btn btn-light w-100">
                Se connecter
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;