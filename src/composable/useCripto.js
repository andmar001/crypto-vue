import { ref, onMounted,computed } from 'vue'

export default function useCripto() {
   const monedas = ref([
      { codigo: "USD", texto: "Dolar de Estados Unidos" },
      { codigo: "MXN", texto: "Peso Mexicano" },
      { codigo: "EUR", texto: "Euro" },
      { codigo: "GBP", texto: "Libra Esterlina" },
   ]);

   const cotizacion = ref({})
   const cargando = ref(false)
   const error = ref('')

   const criptomonedas = ref([]);

   onMounted(() => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
      fetch(url)
         .then((respuesta) => respuesta.json()) //como queremos que se resuelva la promesa
         .then(({ Data }) => {
         criptomonedas.value = Data;
         });
   });

   const obtenerCotizacion = async(cotizar) => {
      cargando.value = true  //Spinner
      cotizacion.value = {}  //Spinner
  
      try{
         const { moneda, criptomoneda } = cotizar
         const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
   
         const respuesta = await fetch(url)
         const data = await respuesta.json()
         //llena el state de cotizacion
         cotizacion.value = data.DISPLAY[criptomoneda][moneda]
      }
      catch(error){
         console.log(error)
      }
      finally{
         cargando.value = false //Spinner
      }
   }

   const mostrarResultado = computed(() => {
      return Object.values(cotizacion.value).length !== 0
   })

   return {
      monedas,
      criptomonedas,
      cotizacion,
      obtenerCotizacion,
      cargando,
      error,
      mostrarResultado
   };
}