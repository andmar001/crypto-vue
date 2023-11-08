<script setup>
  import { ref,reactive, onMounted } from 'vue'
  import Alerta from './components/Alerta.vue'

  const monedas = ref([
      { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
      { codigo: 'MXN', texto: 'Peso Mexicano'},
      { codigo: 'EUR', texto: 'Euro'},
      { codigo: 'GBP', texto: 'Libra Esterlina'},
  ])
  
  const criptomonedas = ref([])
  const error = ref('')

  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  })

  const cotizacion = ref({})

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    fetch(url)
      .then(respuesta => respuesta.json())      //como queremos que se resuelva la promesa
      .then(({Data}) => {
        criptomonedas.value = Data
      })
  })

  const cotizarCripto = () => {
    //Validar que cotizar este lleno
    if(Object.values(cotizar).includes('')){
      error.value = 'Los campos son obligatorios'
      setTimeout(() => {
        error.value = ''
      }, 3000);
      return
    }
    obtenerCotizacion();
  }

  const obtenerCotizacion = async() => {
    const { moneda, criptomoneda } = cotizar
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    const respuesta = await fetch(url)
    const data = await respuesta.json()
    //llena el state de cotizacion
    cotizacion.value = data.DISPLAY[criptomoneda][moneda] 
  }

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo"> Cotizador de<span>Criptomonedas</span></h1>

    <div class="contenido">
    
      <Alerta
        v-if="error"
      >
        {{ error  }}
      </Alerta>
      
      <form 
        class="formulario"
        @submit.prevent="cotizarCripto"
      >
        
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select 
            id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">--Selecciona--</option>
            <option 
              v-for="(moneda) in monedas" 
              :key="moneda" 
              :value="moneda.codigo"
            >
              {{ moneda.texto }}
            </option>
          </select>
        </div>
      
        <div class="campo">
          <label for="cripto">Criptomonedas:</label>
          <select 
            id="cripto"
            v-model="cotizar.criptomoneda"
          >
            <option value="">--Selecciona--</option>
            <option 
              v-for="criptomoneda in criptomonedas" 
              :key="criptomoneda" 
              :value="criptomoneda.CoinInfo.Name"
            >
              {{ criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
      
        <input type="submit" value="Cotizar">

      </form>
    </div>

  </div>
</template>