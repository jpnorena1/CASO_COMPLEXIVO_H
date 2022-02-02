/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { Switch, Route, useRouteMatch, Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuList from "../../../components/MenuList";
import VisualizarAgenda from "./Pages/VisualizarAgenda";
import Appointment from "./Pages/Appointment";
import AgendarCitaUser from "./Pages/AgendarCitaUser";
import AgendarCitaAdmin from "./Pages/AgendarCitaAdmin";
import RegisterEspec from "./Pages/RegisterEspec";
import ProfileUser from "../../../components/ProfileUser";
import SignupAuxiliar from "../Auth/pages/SignupAuxiliar";
import SignupMedic from "../Auth/pages/SignupMedic";
import PatientInformation from "../Auth/pages/PatientInformation";
import FullCalendarEven from "./Pages/FullCalendar";
import PrimarySearchAppBar from "../../../components/PrimarySearchAppBar";
import Button from "@material-ui/core/Button";
import Dashboar from "../../../components/inicioAdmin";
import SignupAdministrador from "../Auth/pages/SignupAdministrador";
import CardsHeader from "../../../components/CardsHeader";
import CitaMedico from "./Pages/CitaMedico";
const Wrapper = styled.div``;

const LeftContainer = styled.div`
  min-height: 100vh;
  min-width: 170px;
`;

const RigthContainer = styled.div`
  min-height: 100vh;
`;
const LogoContainer = styled.div`
  min-height: 15vh;
  height: 15vh;
`;

const TopContainer = styled.div`
  height: 22vh;
  min-height: 22vh;
  width: 100%;
  min-width: 100%;
`;

const BottonContainer = styled.div`
  height: 78vh;
  min-height: 78vh;
  width: 100%;
  min-width: 100%;
`;

const Dashboard = () => {
  const myStyle = {
    backgroundImage:
      "url('https://i.pinimg.com/564x/83/60/4d/83604dfcdfc757cea47ae170cbacfc19.jpg')')",

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    height: "1000vh",
    width: "100vw",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundColor: "black",
  };

  const { path, url } = useRouteMatch();
  const prueba = useSelector((state) => state);
  const user = useSelector((state) => state);
  const users = user.tokenStore.user.role;

  const unas = user.tokenStore.user.userId;

  return (
    <>
      <PrimarySearchAppBar />
      <Wrapper className="container-fluid flex-nowrap">
        <div
          className="row flex-row flex-nowrap .MuiAppBar-colorPrimary {"
          style={{ backgroundColor: "#3F51B5" }}
        >
          <LeftContainer>
            <div className="row d-flex flex-column m-0 p-0">
              <div className="col m-0 p-0">
                <LogoContainer />
              </div>
            </div>
            <div className="col m-0 p-0">
              <MenuList />
            </div>
          </LeftContainer>
          <RigthContainer
            className="col-10"
            style={{ backgroundColor: "white" }}
          >
            <Switch>
              {users === "Admin" ? (
                <>
                  <Route exact path={`${path}`}>
                    <div
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <h2>Bienvenido Administrador</h2>
                      <h3>Seleccione una opción</h3>
                    </div>
                  </Route>
                  <Route exact path={`${path}/Inicio`}>
                    <Dashboar />
                  </Route>
                  <Route exact path={`${path}/Perfil`}>
                    <ProfileUser />
                  </Route>
                  <Route exact path={`${path}/Citas`}>
                    <h2>Citas</h2>
                    <AgendarCitaAdmin />
                  </Route>
                  <Route path={`${path}/Visualizar_Agenda/`}>
                    <FullCalendarEven />
                  </Route>
                  <Route path={`${path}/Especialidades`}>
                    <RegisterEspec />
                  </Route>
                  <Route path={`${path}/Inicio_admin`}>
                    <Appointment />
                  </Route>

                  <Route path={`${path}/Registrar_Paciente/paciente`}>
                    <PatientInformation />
                  </Route>
                  <Redirect from="/" to="/Dashboard" />

                  <Route path={`${path}/Registrar_Auxiliar/auxiliar`}>
                    <SignupAuxiliar />
                  </Route>

                  <Route path={`${path}/Registrar_Usuario/Administrador`}>
                    <SignupAdministrador />
                  </Route>
                  <Route path={`${path}/Registrar_Medico/medico`}>
                    <SignupMedic />
                  </Route>

                  <Route path={`${path}/Registrar_Usuario`}>
                    <div
                      style={{
                        flex1: 1,
                        flexDirection: "column-reverse",
                        justifyContent: "center",
                        alignItems: "center",

                        marginTop: "30px",
                      }}
                    >
                      <div
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          style={{
                            height: "150px",
                            width: "150px",
                            marginLeft: "120px",
                            marginTop: "100px",
                          }}
                        >
                          <Link
                            to={`${path}/Registrar_Usuario/Administrador`}
                            id="kt_login_signup"
                            className="pl-3"
                          >
                            <img
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                              src="https://epa.gov.co/images/imagenes/Administrador.png"
                            />
                          </Link>
                          <h2
                            style={{
                              width: "20%",
                              height: "30%",
                              fontWeight: "bold",
                            }}
                          >
                            ADMINISTRADOR
                          </h2>
                        </Button>

                        <Button
                          opacity={null}
                          style={{
                            height: "150px",
                            width: "150px",
                            marginLeft: "30%",
                            marginTop: "100px",
                          }}
                        >
                          <Link
                            to={`${path}/Registrar_Auxiliar/auxiliar`}
                            id="kt_login_signup"
                            className="pl-3"
                          >
                            <img
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                              src="https://thumbs.dreamstime.com/z/imagen-auxiliar-t%C3%A9cnica-del-icono-85460330.jpg"
                            />
                          </Link>
                          <h2
                            style={{
                              width: "20%",
                              height: "30%",
                              fontWeight: "bold",
                              marginLeft: "20px",
                            }}
                          >
                            AUXILIAR
                          </h2>
                        </Button>
                      </div>
                      <div
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          style={{
                            height: "150px",
                            width: "150px",
                            marginLeft: "120px",
                            marginTop: "100px",
                          }}
                        >
                          <Link
                            to={`${path}/Registrar_Medico/medico`}
                            id="kt_login_signup"
                            className="pl-3"
                          >
                            <img
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                              src="https://cdn-icons-png.flaticon.com/512/3143/3143629.png"
                            />
                          </Link>
                          <h2
                            style={{
                              width: "20%",
                              height: "30%",
                              fontWeight: "bold",
                              marginLeft: "20px",
                            }}
                          >
                            MEDICO
                          </h2>
                        </Button>

                        <Button
                          opacity={null}
                          style={{
                            height: "150px",
                            width: "150px",
                            marginLeft: "30%",
                            marginTop: "100px",
                          }}
                        >
                          <Link
                            to={`${path}/Registrar_Paciente/paciente`}
                            id="kt_login_signup"
                            className="pl-3"
                          >
                            <img
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                              src="https://thumbs.dreamstime.com/z/icono-paciente-masculino-del-perfil-con-forma-c%C3%ADrculo-vector-plano-eps-estilo-147647649.jpg"
                            />
                          </Link>
                          <h2
                            style={{
                              width: "20%",
                              height: "30%",
                              fontWeight: "bold",
                              marginLeft: "20px",
                            }}
                          >
                            PACIENTE
                          </h2>
                        </Button>
                      </div>
                    </div>
                  </Route>
                </>
              ) : null}
              {users === "secretaria" ? (
                <>
                  <Route path={`${path}/Perfil`}>
                    <ProfileUser />
                  </Route>

                  <Route path={`${path}/Citas`}>
                    <AgendarCitaAdmin />
                  </Route>
                  <Route path={`${path}/Registrar_Paciente/`}>
                    <PatientInformation />
                  </Route>
                  <Route path={`${path}/Registrar_Usuario/medico`}>
                    <SignupMedic />
                  </Route>
                </>
              ) : null}

              {users === "Paciente" ? (
                <>
                  <Route exact path={`${path}/`}>
                    <div className="d-flex flex-row justify-content-center align-items-center w-100 h-75">
                      <h2>Seleccione un servicio</h2>
                    </div>
                  </Route>
                  <Route path={`${path}/Inicio_paciente`}>
                    <Appointment />
                  </Route>
                  <Route path={`${path}/Perfil`}>
                    <ProfileUser />
                  </Route>
                  <Route path={`${path}/Citas`}>
                    <AgendarCitaUser />
                  </Route>
                </>
              ) : null}
              {users === "Medico" ? (
                <>
                  <Route exact path={`${path}/`}>
                    <div className="d-flex flex-row justify-content-center align-items-center w-100 h-75">
                      <h2>Seleccione un servicio</h2>
                    </div>
                  </Route>
                  <Route path={`${path}/Inicio`}>
                    <Appointment />
                  </Route>

                  <Route path={`${path}/Perfil`}>
                    <ProfileUser />
                  </Route>

                  <Route path={`${path}/Visualizar_Agenda`}>
                    <CitaMedico unas={unas} />
                  </Route>
                </>
              ) : null}
            </Switch>
          </RigthContainer>
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;
