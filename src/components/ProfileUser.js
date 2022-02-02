import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom"
import "./App.css";


const ProfileUser = () => {
    const infoUser = useSelector(state => state.tokenStore.user);
    console.log(infoUser);
    return (
        <div>
            <div className="container"  style={{marginTop:20}}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={{backgroundColor:"black"}}>
                                <h4 style={{color:"white"}}>Perfil de Usuario</h4>
                            </div>  
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Nombre</label>
                                            <input type="text" className="form-control" placeholder="Nombre" value={infoUser.firstName} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Apellido</label>
                                            <input type="text" className="form-control" placeholder="Apellido" value={infoUser.lastName}/>

                                        </div>  
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" placeholder="Email" value={infoUser.email} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Telefono</label>
                                            <input type="text" className="form-control" placeholder="Telefono" value={infoUser.phone} />
                                        </div>  
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Direccion</label>
                                            <input type="text" className="form-control" placeholder="Direccion" value={infoUser.addres}/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Ciudad</label>
                                            <input type="text" className="form-control" placeholder="Ciudad" value={infoUser.country} />

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Pais</label>
                                            <input type="text" className="form-control" placeholder="Pais" value={"Ecuador"}/>   
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Fecha de Nacimiento</label>
                                            <input type="date" className="form-control" placeholder="Fecha de Nacimiento" value={infoUser.dateBirth} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Sexo</label>
                                            <select className="form-control" value={infoUser.phone}>
                                                <option>Masculino</option>
                                               
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>ROLE</label>
                                            <select className="form-control">
                                                <option>{infoUser.role}</option>
                                               
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
    export default ProfileUser;