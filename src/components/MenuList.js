/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import {
  getDepartments,
  getDoctorCalendars,
} from "../app/modules/Auth/_redux/authService";
import {
  setDepartments,
  setDoctorCalendars,
  setDoctors,
  setDoctorsUsers,
} from "../app/modules/Auth/_redux/authAction";

const MenuContainer = styled.div`
  min-height: 75vh;
  background-color: #3f51b5;
  height: 75vh;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    color: f5f5f5;

    li {
      margin: 0;
      padding: 0;
      color: #fff;
      padding: 5px 0px 10px 15px;
      color: f5f5f5;
    }

    .linkMenu {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      text-decoration: none;
      color: f5f5f5;
    }
    .linkMenu:active {
      text-decoration: underline;
      color: f5f5f5;
    }
    .nameLinkMenu {
      padding: 0;
      margin: 0;
      color: #000;
    }

    li:hover {
      background-color: #7472ed;
      margin: 0;
      padding: 0;
      padding: 5px 0px 10px 15px;
      color: #fff;
    }
    li:active {
      background-color: grey;
      margin: 0;
      padding: 5px 0px 10px 15px;
      color: #fff;
    }
  }
`;

const MenuList = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const isUser = useSelector((state) => state.tokenStore.user);

  const isRole = useSelector((state) => state.tokenStore.user.role);
  const array = {
    isRole: useSelector((state) => state.tokenStore.user.role),
    paciente: [
      {
        name: "Citas",
      },

      {
        name: "Perfil",
      },
    ],
    medico: [
      {
        name: "Visualizar Agenda",
      },
      {
        name: "Perfil",
      },
    ],
    admin: [
      {
        name: "Inicio",
      },
      {
        name: "Especialidades",
      },

      {
        name: "Perfil",
      },
      {
        name: "Registrar Usuario",
      },
      {
        name: "Citas",
      },
    ],
    secretaria: [
      {
        name: "Perfil",
      },
      {
        name: "Registrar Paciente",
      },
      {
        name: "Citas",
      },
    ],
  };

  return (
    <>
      <MenuContainer>
        <ul>
          <label style={{ color: "white", fontSize: 40, marginLeft: 15 }}>
            {isRole}
          </label>

          {array.isRole === "Paciente"
            ? array.paciente.map((item, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: 15,
                    borderRadiusColor: "red",
                    borderRadius: 15,
                    borderColor: "red",
                    borderWidth: 1,
                  }}
                >
                  <NavLink
                    className="linkMenu"
                    to={`${url}/${item.name.replace(/ /g, "_")}`}
                    activeStyle={{
                      color: "white",
                      backgroundColor: "grey",
                    }}
                  >
                    <span
                      style={{
                        borderColor: "red",
                        borderRadius: 15,
                        color: "#f5f5f5",
                        fontWeight: "bold",
                        padding: 5,
                        fontSize: 20,
                        fontFamily: "century gothic",
                      }}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))
            : null}
          {array.isRole === "Medico"
            ? array.medico.map((item, index) => (
                <li
                  key={index}
                  style={{
                    borderRadiusColor: "red",
                    borderRadius: 15,
                    borderColor: "red",
                    borderWidth: 1,
                  }}
                >
                  <NavLink
                    className="linkMenu"
                    to={`${url}/${item.name.replace(/ /g, "_")}`}
                    activeStyle={{
                      color: "red",
                      backgroundColor: "blue",
                    }}
                  >
                    <span
                      style={{
                        borderColor: "red",
                        borderRadius: 15,
                        color: "#f5f5f5",
                        fontWeight: "bold",
                        padding: 5,
                        fontSize: 20,
                        fontFamily: "century gothic",
                      }}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))
            : null}
          {array.isRole === "Admin"
            ? array.admin.map((item, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: 10,
                    borderRadiusColor: "red",
                    borderRadius: 15,
                    borderColor: "red",
                    borderWidth: 1,
                  }}
                >
                  <NavLink
                    className="linkMenu"
                    to={`${url}/${item.name.replace(/ /g, "_")}`}
                    activeStyle={{
                      color: "red",
                      backgroundColor: "#7472ed",
                    }}
                  >
                    <span
                      style={{
                        borderColor: "red",
                        borderRadius: 15,
                        color: "#f5f5f5",
                        fontWeight: "bold",
                        padding: 5,
                        fontSize: 15,
                        fontFamily: "century gothic",
                      }}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))
            : null}
          {array.isRole === "secretaria"
            ? array.secretaria.map((item, index) => (
                <li
                  key={index}
                  style={{
                    borderRadiusColor: "red",
                    borderRadius: 15,
                    borderColor: "red",
                    borderWidth: 1,
                  }}
                >
                  <NavLink
                    className="linkMenu"
                    to={`${url}/${item.name.replace(/ /g, "_")}`}
                    activeStyle={{
                      color: "green",
                      backgroundColor: "#7472ed",
                    }}
                  >
                    <span
                      style={{
                        borderColor: "red",
                        borderRadius: 15,
                        color: "#f5f5f5",
                        fontWeight: "bold",
                        padding: 5,
                        fontSize: 20,
                        fontFamily: "century gothic",
                      }}
                    >
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))
            : null}
        </ul>
      </MenuContainer>
    </>
  );
};
export default MenuList;
