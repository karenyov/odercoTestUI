<template>

<div class="col-md-11 shadow-lg" >
    <div class="card my-12 list-group-item shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Listagem
                <button class="btn btn-primary btn-sm float-end" type="button" @click="clickLoadLista()">
                    <i class="fa fa-refresh"></i>  
                </button>
            </h5>

            <!-- Spinner-->
            <div v-if="loading">
                <SpinnerL/>
            </div>

            <div class="row" v-if="!loading">
                <div class="col-md-12">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">UF</th>
                                <th scope="col">Percentual Frete</th>
                                <th scope="col">Valor Taxa</th>
                                <th scope="col">Transportadora</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cotacao of cotacoes" :key="cotacao.id">
                                <th scope="row">{{ cotacao.id }}</th>
                                <td>{{ cotacao.uf }}</td>
                                <td>{{ $filters.porcentagem(cotacao.percentual_cotacao) }}</td>
                                <td>{{ $filters.real(cotacao.valor_extra) }}</td>
                                <td>{{ cotacao.transportadora }}</td> 
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>

    </div>
</div> 

</template>

<script>
import { CotacaoService } from "@/services/CotacaoService";
import SpinnerL from "@/components/core/SpinnerL.vue";

  export default {
    name : 'ListaComp',
    data: function () {
      return {
        loading : false,
        cotacoes : [],
        errorMessage : null
      }
    },
    created : async function () {
      try {
        this.loading = true;
        let response = await CotacaoService.getAllCotacao();
        this.cotacoes = response.data['data'];
        this.loading = false;
      } catch(error) {
        this.errorMessage = error;
        this.loading = false;
      }
    },
    methods : {
      clickLoadLista : async function () {
        try {
            this.loading = true;
            let response = await CotacaoService.getAllCotacao();
            this.cotacoes = response.data['data'];
            this.loading = false;
        } catch(error) {
            this.errorMessage = error;
            this.loading = false;
        }
      }
    },
    components: { SpinnerL }
  }
</script>

<style scoped>
</style>