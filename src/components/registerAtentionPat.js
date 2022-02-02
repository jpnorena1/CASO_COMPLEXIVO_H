import React, { useEffect } from "react";
import styled from "styled-components";

import { NavLink, useRouteMatch } from "react-router-dom";
import "./App.css";

const registerAtentionPat = () => {
  return (
    <div style={{ width: "200%" }}>
      <div className="container" style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header" style={{ backgroundColor: "black" }}>
                <h4 style={{ color: "white" }}>Perfil de Usuario</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Telefono</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefono"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Direccion</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Direccion"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Ciudad</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ciudad"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Pais</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pais"
                        value={"Ecuador"}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Fecha de Nacimiento</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Fecha de Nacimiento"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Sexo</label>
                      <select className="form-control">
                        <option>Masculino</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>ROLE</label>
                      <select className="form-control">
                        <option></option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default registerAtentionPat;
