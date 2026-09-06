import { useState } from "react";

function Bitacora({ volverAlPerfil, usuarioActivo }) {
    //Nombre del trabajador
    const nombreOperador = usuarioActivo || "operador de turno";
  // Estado con algunas novedades iniciales de prueba
  const [novedades, setNovedades] = useState([
    {
      id: 1,
      fecha: "04/09/2026 - 08:30 AM",
      tipo: "Mantenimiento",
      descripcion: "Falla temporal en la talanquera de entrada 1. Se atendió manualmente.",
      usuario: "Carlos Mendoza"
    },
    {
      id: 2,
      fecha: "04/09/2026 - 10:15 AM",
      tipo: "Incidencia",
      descripcion: "Vehículo con placa XYZ-123 ocupó dos espacios de parqueo.",
      usuario: "Carlos Mendoza"
    }
  ]);

  // Formulario para nueva novedad
  const [nuevoTipo, setNuevoTipo] = useState("Informativo");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");

  const agregarNovedad = (e) => {
    e.preventDefault();
    if (!nuevaDescripcion.trim()) return;

    const nuevaEntrada = {
      id: Date.now(),
      fecha: new Date().toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short"
      }),
      tipo: nuevoTipo,
      descripcion: nuevaDescripcion,
      usuario: nombreOperador
    };

    setNovedades([nuevaEntrada, ...novedades]);
    setNuevaDescripcion("");
  };

  // Color de borde dinámico según el tipo de novedad
  const obtenerColorTipo = (tipo) => {
    switch (tipo) {
      case "Incidencia":
        return "#ff4d4d";
      case "Mantenimiento":
        return "#ffa500";
      case "Seguridad":
        return "#ff0055";
      default:
        return "#94fdff";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f0f1a",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "750px",
          backgroundColor: "#161626",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",
          border: "1px solid #2a2a40",
          color: "#ffffff"
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #2a2a40",
            paddingBottom: "15px"
          }}
        >
          <h2 style={{ margin: 0, color: "#94fdff", fontSize: "22px" }}>
            📝 Bitácora de Novedades
          </h2>
          <button
            type="button"
            onClick={volverAlPerfil}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "transparent",
              color: "#94fdff",
              border: "1px solid #94fdff",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.2s"
            }}
          >
            ⬅️ Volver al Perfil
          </button>
        </div>

        {/* Formulario de registro */}
        <form onSubmit={agregarNovedad} style={{ marginBottom: "25px" }}>
          <label
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "#94fdff",
              display: "block",
              marginBottom: "8px"
            }}
          >
            Registrar Novedad
          </label>

          <select
            value={nuevoTipo}
            onChange={(e) => setNuevoTipo(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #2a2a40",
              backgroundColor: "#1a1a2e",
              color: "#ffffff",
              marginBottom: "10px",
              fontSize: "14px",
              outline: "none"
            }}
          >
            <option value="Informativo">ℹ️ Informativo</option>
            <option value="Incidencia">⚠️ Incidencia</option>
            <option value="Mantenimiento">🔧 Mantenimiento</option>
            <option value="Seguridad">🚨 Seguridad</option>
          </select>

          <textarea
            placeholder="Escribe el detalle de la novedad o evento..."
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #2a2a40",
              backgroundColor: "#1a1a2e",
              color: "#ffffff",
              resize: "vertical",
              marginBottom: "12px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box"
            }}
            required
          />

          <button
            type="submit"
            style={{
              display:"block",
              margin:"0 auto",
              padding: "12px 30px",
              fontSize: "15px",
              fontWeight: "bold",
              backgroundColor: "#00adb5",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.2s"
            }}
          >
            ➕ Registrar Novedad
          </button>
        </form>

        {/* Lista de Registros */}
        <div>
          <h3 style={{ color: "#94fdff", fontSize: "16px", marginBottom: "15px" }}>
            Historial del Turno ({novedades.length})
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxHeight: "220px",
              overflowY: "auto",
              paddingRight: "5px"
            }}
          >
            {novedades.length === 0 ? (
              <p style={{ color: "#888", textAlign: "center", fontSize: "14px" }}>
                No hay novedades registradas en este turno.
              </p>
            ) : (
              novedades.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#1a1a2e",
                    borderRadius: "6px",
                    padding: "12px",
                    borderLeft: `5px solid ${obtenerColorTipo(item.tipo)}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#aaa"
                    }}
                  >
                    <span>
                      <strong style={{ color: obtenerColorTipo(item.tipo) }}>
                        {item.tipo}
                      </strong>{" "}
                      • {item.usuario}
                    </span>
                    <span>{item.fecha}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "14px", color: "#e0e0e0", lineHeight: "1.4" }}>
                    {item.descripcion}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bitacora;