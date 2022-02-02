import React from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { connect, useSelector, useEffect } from "react-redux";
import { date } from "yup";
import registerAtentionPat from "../../../../components/registerAtentionPat";
const options = [
  {
    label: "Endocrinología",
    value: "Endocrinología",
  },
  {
    label: "Pediatria",
    value: "Pediatria",
  },
  {
    label: "Ginecologia",
    value: "ginecologia",
  },

  {
    label: "medicina general",
    value: "medicina general",
  },
];
const data = [{}];

class CitaMedico extends React.Component {
  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }
  fech() {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const fecha = `${dia}/${mes}/${anio}`;
  }
  getAllCItasAdmin() {
    const esto = this.props.unas;
    console.log(esto, "esto");
    axios
      .get(
        `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/medic/getRequestByUser/${esto}`
      )
      .then((response) => {
        if (response.status === 200) {
          const datas = response.data;
          this.setState({ other: datas });
          console.log(datas, "asda");
        }
      })
      .catch((error) => {
        //
        console.log(error);
      });
  }
  getHorario() {
    axios
      .get(
        `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/horarios`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDescription(value) {
    if (value === "Endocrinología") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          //console.log(error);
        });
    } else if (value === "Pediatria") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.res;
            this.setState({ datas: data });
          } else {
            this.setState({ datas: [] });
          }
        })
        .catch((error) => {
          //console.log(error);
        });
    } else if (value === "ginecologia") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          //console.log(data, "nice");
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          //console.log(error);
        });
    } else if (value === "medicina general") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  }

  componentWillMount() {
    axios
      .get(
        `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas/findScheulding`
      )
      .then((response) => {
        if (response.status === 200) {
          const dataHorarario = response.data.data;
          this.setState({ horarios: dataHorarario });
          //console.log(this.state);
        } else {
          this.setState({ datas: [] });
        }
      })
      .catch((error) => {
        //console.log(error);
      });
    this.fech();
    this.getAllCItasAdmin();
    this.getDescription();
  }

  state = {
    data: data,
    fecha: new Date(),
    datas: [],
    other: [],
    fechaActual: "",
    horarios: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      fecha: "",
      hora: "",
      especialidad: "",
      paciente: "",
      edad: "",
      motivo: "",
    },
    form2: {
      identificacionUser: "",
      medicoId: "",
      fechaCita: "",
      horaCita: "",
      especialidadId: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].personaje = dato.personaje;
        arreglo[contador].paciente = dato.paciente;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + dato.id
    );
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleChanges = (e) => {
    this.setState({
      form2: {
        ...this.state.form2,
        [e.target.name]: e.target.value,
      },
    });
    //console.log(this.state.form2);
  };

  AgendarCita = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fecha: this.state.form2.fechaCita,
      identificacion: this.state.form2.identificacionUser,

      especialidad: this.state.form2.especialidadId,
      hora: this.state.form2.horaCita,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas/agendarCIta",
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            modalInsertar: false,
          });
        }
      })

      .catch((error) => console.log(error));
  };

  render() {
    function una() {
      return (
        <>
          <registerAtentionPat />
        </>
      );
    }
    /*
    function getCitasByUser() {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/medic/getRequestByUser/${unas}`
        )
        .then((response) => {})

        .catch((error) => {
          //
          console.log(error);
        });
    }

    getCitasByUser();*/
    console.log(this.props, "estas sn mis props");
    return (
      <>
        <Container>
          <div style={{ margin: 15 }}>
            <Button
              color="primary"
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "grey",
              }}
              onClick={() => this.mostrarModalInsertar()}
            >
              DIA
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={this.mostrarModalActualizar}
            >
              SEMANA
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => this.mostrarModalInsertar()}
            >
              MES
            </Button>
          </div>
          <br />
          <Table>
            <thead>
              <tr>
                <th>FECHA</th>
                <th>HORA</th>
                <th>ESPECIALIDAD</th>
                <th>NOMBRES Y APELLIDOS</th>
                <th>EDAD</th>
                <th>MOTIVO</th>
              </tr>
            </thead>

            <tbody>
              {this.state.other.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.fecha.split("T00:00:00.000Z")}</td>
                  <td>{dato.horaInicial}</td>
                  <td>{dato.nombreEspecialidad}</td>
                  <td>{dato.user}</td>
                  <td>
                    {dato.dateBirth != null
                      ? this.calcularEdad(dato.dateBirth) + " AÑOS"
                      : null}
                  </td>
                  <td>{dato.motivo}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Atencion
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal
          isOpen={this.state.modalActualizar}
          style={{ maxWidth: "1000px", width: "150%" }}
        >
          <ModalBody>
            <div style={{ marginTop: 5, overflow: 15 }}>
              {console.log(this.state.form, "estas son mis states")}
              <div className="container" style={{ marginTop: 5 }}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div
                        className="card-header"
                        style={{ backgroundColor: "blue " }}
                      >
                        <h4 style={{ color: "white" }}>Atencion paciente</h4>
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
                                name="Nombre"
                                value={this.state.form.firstName}
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
                                value={this.state.form.lastName}
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
                                value={this.state.form.email}
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
                                value={this.state.form.phoneNumber}
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
                                value={this.state.form.addres}
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
                                value={this.state.form.country}
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
                        <div className="row"></div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Fecha de Nacimiento</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Fecha de Nacimiento"
                                value={this.state.form.dateBirth}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Sexo</label>
                              <select
                                value={this.state.form.sex}
                                className="form-control"
                              >
                                <option>{this.state.form.sex}</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>MOTIVO</label>
                              <select className="form-control">
                                <option>{this.state.form.motivo}</option>
                              </select>
                            </div>
                          </div>

                          <label style={{ fontSize: 20 }}>DIAGNOSTICO</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Agendar Cita</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Identificacion:</label>
              <input
                className="form-control"
                name="identificacionUser"
                type="text"
                onChange={this.handleChanges}
              />
            </FormGroup>
            <FormGroup>
              <label>Especialidad:</label>
              <select className="form-control">
                <option>Seleccion Especial</option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    onChange={this.handleChanges}
                    onClick={() => this.getDescription(option.value)}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup></FormGroup>
            <FormGroup>
              <label>Medico:</label>

              <select
                className="form-control"
                name="medicoId"
                onChange={this.handleChanges}
              >
                <option>Seleccionar Medico</option>
                {this.state.datas === "undefined"
                  ? "seleccione una especialidad"
                  : this.state.datas.map((option) => (
                      <option value={option.userMedic}>
                        {` ${option.firstName} ${option.lastName} `}
                      </option>
                    ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label>Fecha:</label>
              <input
                className="form-control"
                name="fechaCita"
                value={this.fech()}
                min={this.fech()}
                type="date"
                onChange={this.handleChanges}
              />
            </FormGroup>

            <FormGroup>
              <label>Hora:</label>
              <select
                className="form-control"
                name="horaCita"
                onChange={this.handleChanges}
              >
                <option value="8:00">Seleccione Hora</option>
                {this.state.horarios === "undefined"
                  ? "seleccione una especialidad"
                  : this.state.horarios.map((option) => (
                      <option value={option.horarioId}>
                        {option.horaInicial} - {option.horaFinal}
                      </option>
                    ))}
              </select>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.AgendarCita}>
              Agendar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default CitaMedico;
