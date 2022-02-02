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

const data = [
  {
    id: 1,
    nombreEspecialidad: "",
    descripcion: "",
    fechaRegistro: "",
    usuarioModif: "",
    estado: "",
    modificacionRegistro: "",
  },
];

class RegisterEspec extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombreEspecialidad: "",
      descripcion: "",
      fechaRegistro: "",
      usuarioModif: "",
      estado: "",
      modificacionRegistro: "",
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
      if (dato.id === registro.id) {
        arreglo[contador].personaje = dato.personaje;
        arreglo[contador].anime = dato.anime;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  async componentDidMount() {
    const res = await axios.get(
      "https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/especialidades/probandoRut"
    );
    this.setState({ data: res.data });
    // console.log(res.data);
  }

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

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Nombre Especialidad</th>
                <th>Descripción Especialidad</th>
                <th>Fecha Registro</th>
                <th>Usuario Que Modifico</th>
                <th>Fecha Modificacion"</th>
                <th>Medico "estado"</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.especialidadId}>
                  <td>{dato.nombreEspecialidad}</td>
                  <td>{dato.descripcion}</td>
                  <td>
                    {dato.fechaRegistro.split(
                      " GMT+0000 (Coordinated Universal Time)"
                    )}
                  </td>
                  <td>Juaneko</td>
                  <td>
                    {dato.modificacionRegistro.split(
                      "GMT+0000 (Coordinated Universal Time)"
                    )}
                  </td>

                  <td
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: dato.estado === "ACTIVO" ? "blue" : "red",
                    }}
                  >
                    {dato.estado}
                  </td>
                  <td>
                    <Button
                      style={{ backgroundColor: "#00b894" }}
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="yellow" onClick={() => this.editar(this.state.form)}>
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
              <h3>Insertar Especialidad</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label> Especialidad:</label>
              <br />
              <select>
                <option value="1"> Medicina Interna</option>
                <option value="2">Pediatría </option>
                <option value="3">Endocrinología</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Descripción Especialidad:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Estado:</label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre Especialidad:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre Especialidad:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
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

export default RegisterEspec;
