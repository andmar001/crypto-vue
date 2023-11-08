<script setup>
  import { ref, onMounted } from 'vue'

  const monedas = ref([
      { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
      { codigo: 'MXN', texto: 'Peso Mexicano'},
      { codigo: 'EUR', texto: 'Euro'},
      { codigo: 'GBP', texto: 'Libra Esterlina'},
  ])
  const criptomonedas = ref([])

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
      .then(respuesta => respuesta.json())      //como queremos que se resuelva la promesa
      .then(({Data}) => {
        criptomonedas.value = Data
      })
  })

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo"> Cotizador de<span>Criptomonedas</span></h1>

    <div class="contenido">
      <form class="formulario">
        
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda">
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
          <select id="cripto">
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