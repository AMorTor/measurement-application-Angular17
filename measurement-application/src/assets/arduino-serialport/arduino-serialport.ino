void setup() {
  Serial.begin(9600); // Iniciar comunicación serial a 9600 baudios
}

void loop() {
  if (Serial.available() > 0) { // Si hay datos disponibles en el puerto serial
    int dato = Serial.parseInt(); // Leer el número enviado desde el puerto serial
    
    if (dato != 0) { // Si se ha recibido un número válido
      Serial.print("Mensaje recibido: ");
      Serial.println(dato); // Imprimir el número recibido
      Serial.println("Tipo de dato recibido: Integer"); // Imprimir el tipo de dato recibido
    } else {
      Serial.println("No se ha recibido un número válido."); // Imprimir si no se ha recibido un número válido
    }
  }
}
