<template>
  <NavBar/>

  <div class="container" style="margin-top:70px;">
    <h2>Transportadora</h2>
  </div>

  <div class="container" style="margin-top:20px;">
    <div class="row">
      <div class="col-md-6 col-ms-12">
        <CadastroComp/>
      </div>
      <div class="col-md-6 col-ms-12">
        <CotarFreteComp/>
      </div>
    </div>
  </div>

  <div class="container" style="margin-top:20px;">
    <div class="row">
      <div class="col-md-12 col-ms-12">
        <ListaComp/>
      </div>
    </div>
  </div>
  
  <FooterB/>

</template>

<script>
import NavBar from "@/components/core/NavBar";
import FooterB from "@/components/core/FooterB";

import CadastroComp from "@/components/cotacao/CadastroComp";
import CotarFreteComp from "@/components/cotacao/CotarFreteComp";
import ListaComp from "@/components/cotacao/ListaComp";

  export default {
    name : 'App',
    components: { NavBar, FooterB, CadastroComp, CotarFreteComp, ListaComp } 
  }

</script>

<style>

</style>
