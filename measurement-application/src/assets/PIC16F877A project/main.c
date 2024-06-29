#include <main.h>
#define ERROR 0

// Prototipo de funciones
void init_adc(int channel);
void handleTemperature();
void handleWeight();
void handleHeartbeat();
void detectFlanco();
void init_pwm();
void checkTemperature(float temperature);

// Variables globales y definiciones 

// ------- Para TIMER1 (ventana de 10 segundos)
#define REPEAT_TIME_WINDOW 19       // 10 segundos en milisegundos
#define SAMPLE_INTERVAL 1           // Intervalo de muestreo del ADC en milisegundos

// Variables para temporizadores y medici�n de tiempo
int16 count_1ms = 0;
int16 count_10s = 0;

// Variables para leer el ADC y detectar flancos
int16 adc_port;
int16 prev_adc_port = 0;
int flanco_count = 0;
int heart_rate = 0;

// Variables para PWM
int16 duty;
int pwm_timer, poscaler;

// Para el manejo de la temperatura
float voltage;
float temperature;
float weigth;

void main() {
    set_tris_b(0x00); // Configura el puerto B como salida
    output_b(0x00); // Inicializa el puerto B en 0
    
    setup_timer_1(T1_INTERNAL | T1_DIV_BY_8); // Configura el temporizador 1 para la ventana de 10 segundos
    set_timer1(0); // Inicializa el temporizador 1
    
    enable_interrupts(GLOBAL); // Habilita interrupciones globales
    enable_interrupts(INT_RDA); // Habilita interrupciones del puerto serial
    
    setup_adc_ports(ALL_ANALOG); // Configura todos los puertos del ADC como anal�gicos
    setup_adc(ADC_CLOCK_INTERNAL); // Configura el ADC con reloj interno
    printf("- Programa iniciado -");
    
    while(TRUE) {
        // Bucle principal del programa
    }
}

#INT_RDA // Interrupci�n al recibir un dato por el puerto serial
void serial_isr() {
    char received_char = getc(); // Lee el car�cter recibido

    switch (received_char) {
        case '0':
            handleTemperature();
            break;
            
        case '1':
            handleWeight();
            break;
            
        case '2':
            handleHeartbeat();
            break;
            
        default:
            printf("Car�cter no reconocido: %c\r\n", received_char);
            break;
    }
}

#int_timer1
void timer_1() {
    count_10s++; // Incrementa el contador de 10 segundos
    
    if (count_10s >= REPEAT_TIME_WINDOW) {
        output_toggle(PIN_B0); // Alternar el estado del pin B0
        heart_rate = (flanco_count * 6); // Calcular la frecuencia card�aca
        printf("Frecuencia card�aca: %d BPM\r\n", heart_rate); // Imprimir la frecuencia card�aca
        count_10s = 0; // Reinicia el contador de 10 segundos
        flanco_count = 0; // Reinicia el contador de flancos
    }
}

#int_timer2
void timer_2() {
    count_1ms++; // Incrementa el contador de 1 ms
    if (count_1ms >= SAMPLE_INTERVAL) {
        count_1ms = 0; // Reinicia el contador de 1 ms
        detectFlanco(); // Realiza la detecci�n del flanco cada 1 ms
    }
}

void detectFlanco() {
    set_adc_channel(2); // Selecciona el canal ADC 2 (AN2)
    adc_port = read_adc(); // Lee el valor del ADC

    // Detecta un flanco de subida (de bajo a alto)
    if (prev_adc_port < 512 && adc_port >= 512) {
        flanco_count++; // Incrementa el contador de flancos
        printf("N�mero de flancos detectados: %d\r\n", flanco_count); // Imprime el n�mero de flancos detectados
    }

    prev_adc_port = adc_port; // Actualiza el valor previo del ADC
}

void init_adc(int channel) {
    set_adc_channel(channel);
    adc_port = read_adc();
    voltage = adc_port * (5.0 / 1023.0);
    temperature = voltage * 100;
    weigth = voltage + ERROR;
}

void init_pwm(){
   
   pwm_timer =  249;
   poscaler = 1;
   set_tris_c(0xFE);
   setup_timer_2(T2_DIV_BY_4, pwm_timer, poscaler);
   setup_ccp1(ccp_pwm);
   duty = 0;
   while(true){
      // Lee el adc(3) para determinar la velocidad del motor
      init_adc(3);
      duty = adc_port;
      set_pwm1_duty(duty);
      
      // Lee el adc(0) para determinar la temperatura y con ello,
      // girar el motor hacia la derecha, izquierda o detenerlo
      delay_ms(1000);
      init_adc(0);
      if(temperature >= 0 & temperature < 30){ // de 0�C a 30�C
         printf("%2.2f\r\n",temperature);
         //Giro a la izquierda del motor
         output_b(0x01);
         
      } else if(temperature > 30 & temperature < 50){
         printf("%2.2f\r\n",temperature);
         // No hace nada
         output_b(0x00);
         
      } else if(temperature > 50 & temperature < 100) {
         printf("%2.2f\r\n",temperature);
         //Giro a la derecha del motor
         output_b(0x02);
         
      }else if(temperature > 100){
         printf("%2.2f\r\n",temperature);
         output_b(0x04);
         
      }
   }
}



void handleTemperature() {
    // Implementa el manejo de la temperatura aqu�
    printf("Manejo de la temperatura\r\n");
    init_pwm();
    
}

void handleWeight() {
    // Implementa el manejo del peso aqu�
    printf("Manejo del peso\r\n");
    
    while(true){
      init_adc(1);
      printf("%2.2f\r\n",weigth);
      delay_ms(400);
    }
}

void handleHeartbeat() {
    // Implementa el manejo del ritmo card�aco aqu�
    printf("Manejo del ritmo card�aco\r\n");
    enable_interrupts(INT_TIMER1); // Habilita interrupciones del temporizador 1
    
    setup_timer_2(T2_DIV_BY_16, 249, 1); // Configura el temporizador 2 para interrupciones cada 1 ms
    enable_interrupts(INT_TIMER2); // Habilita interrupciones del temporizador 2
}

