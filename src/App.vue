<script setup>
  import { ref } from 'vue'

  const monedas = ref([
      { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
      { codigo: 'MXN', texto: 'Peso Mexicano'},
      { codigo: 'EUR', texto: 'Euro'},
      { codigo: 'GBP', texto: 'Libra Esterlina'},
  ])

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo"> Cotizador de<span>Criptomonedas</span></h1>

    <div class="contenido">
      <form class="formulario">
        <label for="moneda">Moneda:</label>
        <select id="moneda">
          <option 
            v-for="(moneda) in monedas" 
            :key="moneda.codigo" 
            :value="moneda.codigo"
          >
            {{ moneda.texto }}
          </option>
        </select>
      </form>
    </div>

  </div>
</template>