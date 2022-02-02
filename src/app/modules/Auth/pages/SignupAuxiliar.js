/*import React, { useState, useEffect, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setPatientInformation } from "../_redux/authAction";
import { registerPeople, registerUser } from "../_redux/authService";
import { ToastContext } from "../../../../components/ToastContextProvider";

const WrapperField = styled.div`
  padding: 5px;
`;

const WrapperLogin = styled.div`
  min-width: 70vw;
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width: 100%;
  max-width: 200px;
`;

const TitleSection = styled.div`
  padding: 15px 0 0 0;
  margin: 0;
  width: 100%;
  max-width: 600px;
  h3 {
    font-size: 1.2rem;
  }
`;

const SignupAuxiliar = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { patientRole, patientDepartment } = useSelector(
    (state) => state.tokenStore
  );
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const history = useHistory();

  useEffect(() => {
    setLoading(false);
    return () => setLoading(false);
  }, []);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    primerNombre: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    apellidos: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    cedula: Yup.string()
      .min(3, "Minimum 3 nuemeros")
      .max(11, "Maximo 11 numeros")
      .required("Tiene que ser numero"),
    telefono: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    historynumber: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    correo: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    nombreDeUsuario: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    contraseña: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    ciudad: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    direccion: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    fechaDeNacimiento: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    genero: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      primerNombre: "",
      apellidos: "",
      cedula: "",
      telefono: "",
      direccion: "",
      correo: "",
      nombreDeUsuario: "",
      contraseña: "",
      ciudad: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      enableLoading();
      setTimeout(() => {
        registerPeople(
          values.primerNombre,
          values.apellidos,
          values.cedula,
          values.telefono,
          values.direccion
        )
          .then(
            ({
              data: {
                data: {
                  attributes: {
                    nombre,
                    apellido,
                    cedula,
                    telefono,
                    direccion,
                    ciudad,
                  },
                  id,
                },
              },
            }) => {
              registerUser(
                values.email,
                values.username,
                values.password,
                id,
                patientRole[0].id,
                patientDepartment[0].id
              )
                // eslint-disable-next-line no-unused-vars
                .then(({ data }) => {
                  notifySuccess("The user was successfully created");
                  disableLoading();
                  history.push("/auth/login");
                })
                .catch((error) => {
                  notifyError(error.message);
                  disableLoading();
                  formik.setSubmitting(false);
                });
              disableLoading();
            }
          )
          .catch((error) => {
            notifyError(error.message);
            disableLoading();
            formik.setSubmitting(false);
          });
      }, 1400);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WrapperLogin className="d-flex flex-column align-items-center">
        <TitleSection>
          <h3>Informacion Personal</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="primerNombre">Primer Nombre</InputLabel>
            <Input
              id="primerNombre"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.primerNombre}
              aria-describedby="component-error-text"
            />
            {formik.errors.primerNombre ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.primerNombre}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
            <Input
              id="apellidos"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.apellidos}
              aria-describedby="component-error-text"
            />
            {formik.errors.apellidos ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.apellidos}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="documentid">Cedula</InputLabel>
            <Input
              id="cedula"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.cedula}
              aria-describedby="component-error-text"
            />
            {formik.errors.cedula ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.cedula}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="telefono">Telefono</InputLabel>
            <Input
              id="telefono"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.telefono}
              aria-describedby="component-error-text"
            />
            {formik.errors.telefono ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.telefono}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="phone">Ciudad</InputLabel>
            <Input
              id="ciudad"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.ciudad}
              aria-describedby="component-error-text"
            />
            {formik.errors.ciudad ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.ciudad}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="historynumber">Direccion</InputLabel>
            <Input
              id="direccion"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.direccion}
              aria-describedby="component-error-text"
            />
            {formik.errors.direccion ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.direccion}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <TitleSection>
          <h3>Informacion de usuario</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="email">Correo</InputLabel>
            <Input
              id="correo"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.correo}
              aria-describedby="component-error-text"
            />
            {formik.errors.correo ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.correo}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
            <Input
              id="nombreDeUsuario"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.nombreDeUsuario}
              aria-describedby="component-error-text"
            />
            {formik.errors.nombreDeUsuario ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.nombreDeUsuario}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="contraseña">Contraseña</InputLabel>
            <Input
              id="contraseña"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.contraseña}
              aria-describedby="component-error-text"
            />
            {formik.errors.contraseña ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.contraseña}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Save
          </Button>
          {loading && <CircularProgress color="secondary" />}
        </WrapperButton>
      </WrapperLogin>
    </form>
  );
};
export default SignupAuxiliar;
*/
import React, { useState, useEffect, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import { Link, Route, useHistory } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
  
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authCodeUser } from "../_redux/authService";
import axios from "axios";
import { ToastContext } from "../../../../components/ToastContextProvider";

const WrapperField = styled.div`
  padding: 5px;
`;

const WrapperLogin = styled.div`
  min-width: 70vw;
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width: 100%;
  max-width: 200px;
`;

const TitleSection = styled.div`
  padding: 15px 0 0 0;
  margin: 0;
  width: 100%;
  max-width: 600px;
  h3 {
    font-size: 1.2rem;
  }
`;

const PatientInformation = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { patientRole, patientDepartment } = useSelector(
    (state) => state.tokenStore
  );
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const history = useHistory();

  useEffect(() => {
    setLoading(false);
    return () => setLoading(false);
  }, []);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };
function auths(e){
  e.preventDefault();
  var data = JSON.stringify({
    "nameUser": formik.values.nameUser,
    "phoneNumber": formik.values.phoneNumber,
    "lastName": formik.values.lastName,
    "firstName": formik.values.firstName,
    "password": formik.values.password,
    "email": formik.values.email,
    "identificacion": formik.values.identificacion,
    "addres": formik.values.addres,
    "country": formik.values.country,
    "dateBirth": formik.values.dateBirth,
    "sex": formik.values.sex,
  });
  
  var config = {
    method: 'post',
    url: 'https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/medico/registrarSec',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)

  .then(function (response) {
    const data=response.data.ok;
    if(data ===true){
      console.log("entramos");
      notifySuccess("Usuario Administrador creado con exito");
      history.push("/auth/login");
   
    }else{  
      console.log("no entramos")
    }

    

  })
  .catch(function (error) {
    console.log(error);
  });
  
} 
  const LoginSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    lastName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    identificacion: Yup.string()
      .min(3, "Minimum 3 nuemeros")
      .max(11, "Maximo 11 numeros")
      .required("Tiene que ser numero"),
    phoneNumber: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    historynumber: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    email: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    nameUser: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    country: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    addres: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    dateBirth: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
      sex: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
  });

  const formik = useFormik({
    initialValues: {
    nameUser: "",
    phoneNumber: "",
    lastName: "",
    firstName: "",
    password: "",
    email: "",
    identificacion: "",
    addres: "",
    country: "",
    dateBirth: "",
    sex: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      
       
    },
  });

  return (
    <form onSubmit= {formik.handleSubmit}  >
      <WrapperLogin className="d-flex flex-column align-items-center">
        <TitleSection>
          <h3>Informacion Personal</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="firstName">Primer Nombre</InputLabel>
            <Input
              id="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              aria-describedby="component-error-text"
            />
            {formik.errors.firstName ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.firstName}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="lastName">lastName</InputLabel>
            <Input
              id="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              aria-describedby="component-error-text"
            />
            {formik.errors.lastName ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.lastName}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="documentid">identificacion</InputLabel>
            <Input
              id="identificacion"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.identificacion}
              aria-describedby="component-error-text"
            />
            {formik.errors.identificacion ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.identificacion}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="phoneNumber">phoneNumber</InputLabel>
            <Input
              id="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              aria-describedby="component-error-text"
            />
            {formik.errors.phoneNumber ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.phoneNumber}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="phone">country</InputLabel>
            <Input
              id="country"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.country}
              aria-describedby="component-error-text"
            />
            {formik.errors.country ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.country}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="historynumber">addres</InputLabel>
            <Input
              id="addres"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.addres}
              aria-describedby="component-error-text"
            />
            {formik.errors.addres ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.addres}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <TitleSection>
          <h3>Informacion de usuario</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              id="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              aria-describedby="component-error-text"
            />
            {formik.errors.email ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.email}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
            <Input
              id="nameUser"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.nameUser}
              aria-describedby="component-error-text"
            />
            {formik.errors.nameUser ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.nameUser}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              aria-describedby="component-error-text"
            />
            {formik.errors.password ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.password}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
         
            <InputLabel htmlFor="firstName">Sexo</InputLabel>
            
            <select
              id="sex"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.sex}
            >
              <option>Masculino</option>
              <option>Femenino</option>
              </select>


            {formik.errors.sex ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.sex}
              </FormHelperText>
            ) : null}
         
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            
            <Input
              id="dateBirth"
              type="date"
              onChange={formik.handleChange}
          
              value={formik.values.dateBirth}

              aria-describedby="component-error-text"
            />
            {formik.errors.dateBirth ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.dateBirth}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={auths}
            
          >
            Save
          </Button>
          {loading && <CircularProgress color="secondary" />}
        </WrapperButton>
      </WrapperLogin>
    </form>
  );
};

export default PatientInformation;
