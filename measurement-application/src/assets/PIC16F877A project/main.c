#include <main.h>

void main() {
   int16 adc_value;
   char command;

   setup_adc_ports(ALL_ANALOG);
   setup_adc(ADC_CLOCK_INTERNAL);

   while(TRUE) {
      if (kbhit()) {
         command = getc();
         switch(command) {
            case '1':
               set_adc_channel(0);
               delay_us(20);
               adc_value = read_adc();
               printf("Temperatura: %lu\n", adc_value);
               break;
            case '2':
               set_adc_channel(1);
               delay_us(20);
               adc_value = read_adc();
               printf("Bascula: %lu\n", adc_value);
               break;
            case '3':
               set_adc_channel(2);
               delay_us(20);
               adc_value = read_adc();
               printf("Ritmo Cardiaco: %lu\n", adc_value);
               break;
            default:
               printf("Comando desconocido\n");
               break;
         }
      }
   }
}
