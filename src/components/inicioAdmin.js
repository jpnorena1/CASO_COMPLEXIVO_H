import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import "fontsource-roboto";
import ".././app/modules/assets/css/Dashboard.css";

import PublicIcon from "@material-ui/icons/Public";
import VideocamIcon from "@material-ui/icons/Videocam";
import CardsHeader from "../components/CardsHeader";
import Cards from "../components/Cards";
import Graphics from "../components/Graphics";
import TableMaterial from "../components/TableMaterial";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  iconos: {
    color: "white",
  },
  container: {
    paddingTop: "40px",
    alignItems: "center",
  },
  containerGrafica: {
    marginTop: "40px",
  },
  containerTabla: {
    marginTop: "40px",
  },
}));

const data = [
  {
    id: 1,
    video:
      "Paciente",
    fecha: "6 de sep. 2020",
    visualizaciones: 32,
  },
  {
    id: 2,
    video: "Cómo Solucionar Error al Crear Applicación de React JS",
    fecha: "5 de sep. 2020",
    visualizaciones: 31,
  },
  {
    id: 3,
    video:
      "Cómo Utilizar Forever en Node JS || Ejecutar Node JS en Segundo Plano || Background Node JS",
    fecha: "4 de sep. 2020",
    visualizaciones: 21,
  },
];

function Dashboar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <CardsHeader
            titulo="HOSPITAL"
            texto="EL ORO"
            color="#017F8D"
            font="white"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <CardsHeader
            icono={<PublicIcon className={classes.iconos} />}
            titulo="PAÍS"
            texto="LOJA-ECUADOR"
            color="#017F8D"
            font="white"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <CardsHeader
            icono={<VideocamIcon className={classes.iconos} />}
            titulo="CANTIDAD DE USUARIOS"
            texto="85"
            color="#017F8D"
            font="white"
          />
        </Grid>

        <Grid
          container
          spacing={1}
          className={classes.container}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
        >
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Cards titulo="REGISTROS" texto="692" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Cards titulo="CITAS MEDICAS" texto="30"
             />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Cards titulo="ENFERMAEDADES CONCURRENTES" texto="COVID 19 " />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Cards titulo="PORCENTAJE IMPRESIONES" texto="14.2%" />
          </Grid>
        </Grid>

        <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          className={classes.containerGrafica}
        >
          <Graphics />
        </Grid>

        <Grid item xs={12} className={classes.containerTabla}>
          <TableMaterial data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboar;
