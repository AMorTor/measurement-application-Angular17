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
  path: "COM4",
  baudRate: 9600,
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// Manejador de eventos para los datos recibidos en el puerto serial
let latestData = "";

parser.on("data", (data) => {
  console.log("Datos recibidos por el puerto serial:", data.toString());
  latestData = data.toString();
});

// Ruta para recibir información del cliente
app.post("/enviar-datos", (req, res) => {
  const { numero } = req.body;
  console.log("Comando recibido:", numero);

  port.write(numero.toString(), (err) => {
    if (err) {
      console.error("Error al enviar datos por el puerto serial:", err.message);
      res
        .status(500)
        .json({ error: "Error al enviar datos por el puerto serial" });
    } else {
      console.log("Comando enviado por el puerto serial correctamente");
      // Espera a recibir datos del PIC
      setTimeout(() => {
        res.json({ message: "Datos recibidos del PIC", data: latestData });
      }, 1); // Ajusta el tiempo de espera según sea necesario
    }
  });
});

// Ruta para obtener la última data recibida
app.get("/obtener-datos", (_req, res) => {
  res.json({ data: latestData });
});

// Manejador de ruta para cualquier otra solicitud
app.use((_req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
