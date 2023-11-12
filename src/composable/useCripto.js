export default function useCripto(){
   const cotizarMoneda = () => {
      console.log('cotizando desde useCripto')
   }
   const auth = false
   return {
      cotizarMoneda,
      auth
   }
}