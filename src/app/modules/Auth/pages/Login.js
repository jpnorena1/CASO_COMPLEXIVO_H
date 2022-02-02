/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setToken, saveMyUser } from "../_redux/authAction";
import { loginUser } from "../_redux/authService";
import { ToastContext } from "../../../../components/ToastContextProvider";

const WrapperUsername = styled.div`
  padding: 15px;
`;

const WrapperLogin = styled.div`
  min-width: 70vw;
`;

const WrapperPassword = styled.div`
  padding: 15px;
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width: 100%;
  max-width: 200px;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { notifyError, notifySuccess } = useContext(ToastContext);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    nameUser: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("this field is required"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("this field is required"),
  });

  const formik = useFormik({
    initialValues: { nameUser: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      loginUser({
        nameUser: values.nameUser,
        password: values.password,
      })
        .then((response) => {
          const token = response[0].token;
          const user = response[0].user;
           console.log(user, "user");
          dispatch(saveMyUser(user));
          dispatch(setToken(token));

          notifySuccess("Login success");
        })
        .catch((error) => {
          //console.log(error);
          notifyError("Login failed");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WrapperLogin className="d-flex flex-column align-items-center">
        <WrapperUsername className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="Nombre de usuario">
              Nombre de usuario
            </InputLabel>
            <Input
              id="nameUser"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.nameUser}
              onBlur={formik.handleBlur}
              aria-describedby="component-error-text"
            />
            {formik.touched.username && formik.errors.username ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.username}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperUsername>

        <WrapperPassword className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              aria-describedby="component-error-text"
            />
          </FormControl>
        </WrapperPassword>
        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
          {loading && <CircularProgress color="secondary" />}
        </WrapperButton>
      </WrapperLogin>
    </form>
  );
};

export default Login;
