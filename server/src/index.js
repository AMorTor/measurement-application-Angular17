const express = require("express");
const cors = require("cors");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
const PORT = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el body de las solicitudes como JSON
app.use(express.json());

// Configuración del puerto serial
const port = new SerialPort({
  path: "COM6",
  baudRate: 9600,
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// Manejador de eventos para los datos recibidos en el puerto serial
parser.on("data", (data) => {
  console.log("Datos recibidos por el puerto serial:", data.toString());
});

// Ruta para recibir información del cliente
app.post("/enviar-datos", (req, res) => {
  const datosRecibidos = req.body;
  // Aquí puedes procesar los datos recibidos, por ejemplo, enviarlos al puerto serial
  console.log("Datos recibidos:", datosRecibidos);

  // Convertimos los datos a una cadena y los enviamos por el puerto serial
  const dataString = JSON.stringify(datosRecibidos);
  port.write(dataString, (err) => {
    if (err) {
      console.error("Error al enviar datos por el puerto serial:", err.message);
      res
        .status(500)
        .json({ error: "Error al enviar datos por el puerto serial" });
    } else {
      console.log("Datos enviados por el puerto serial correctamente");
      res.json({
        message:
          "Datos recibidos correctamente y enviados por el puerto serial",
      });
    }
  });
});

// Manejador de ruta para cualquier otra solicitud
app.use((_req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
