import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarModal from "../src/assets/img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha]= useState("")
  const [id, setId]= useState("")

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
    setNombre(gastoEditar.nombre)
    setCantidad(gastoEditar.cantidad)
    setCategoria(gastoEditar.categoria)
    setId(gastoEditar.id)
    setFecha(gastoEditar.fecha)
    }
 }, [])

  const handleOcultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validamos los campos
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      return;
    }

    guardarGasto({ nombre, cantidad, categoria, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CerrarModal}
          alt="cerrar modal"
          onClick={handleOcultarModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            placeholder="Ingresa nombre gasto realizado..."
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="Ingresa cantidad del gasto realizado: ej.300"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoría del gasto realizado</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="seleccione">-- Seleccione categoría --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos ">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={gastoEditar.nombre ? "Guardar cambios" : "Agregar gasto"} />
      </form>
    </div>
  );
};

export default Modal;
