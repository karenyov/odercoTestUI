<template>

<div class="col-md-11 shadow-lg" >
    <div class="card my-12 list-group-item shadow-sm" style="height:40em;">
        <div class="card-body">
            <h5 class="card-title">Cotar Frete</h5>

            <!-- Spinner-->
            <div v-if="loading">
              <SpinnerL/>
            </div>

            <form style="margin-top:20px;" @submit.prevent="submitCreate()">
                <div class="row">
                  <div class="col-md-12">
                      <select v-model="cotacao.uf" class="form-select" name="uf" aria-label="UF">
                        <option value="" selected>Selecione a UF</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </select>
                  </div>
                </div>

                <div class="row" style="margin-top:10px;">
                    <div class="col-md-12">
                        <label><b>Percentual cotação(%)</b></label>
                        <VueNumberFormat v-model:value="cotacao.valor_pedido" class="form-control"
                            :options="{ precision: 1, prefix: '', suffix: ' %', decimal: ',', thousand: '', acceptNegative: false, isInteger: false }">
                        </VueNumberFormat>
                    </div>
                </div>

                <div class="row" style="margin-top:10px;">
                  <div class="col-md-12">
                    <div v-bind:class="alertClass" role="alert" id="alert-msg" v-html="alertMsg"></div>
                  </div>
              </div>

                <div class="row" style="margin-top:10px;">
                  <div class="col-md-12">
                      <button :disabled="loading" type="submit" class="btn btn-primary float-end"  style="margin-left:5px;">Salvar</button>
                      <button type="reset" class="btn btn-default float-end">Limpar</button>
                  </div>
                </div>
            </form>

            <h5 class="card-title">Melhores Resultados</h5>
            <div class="row">
                <div class="col-md-12">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Transportadora</th>
                                <th scope="col">Valor Cotação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cotacao of cotacoes" :key="cotacao.id">
                                <th scope="row">{{ cotacao.id }}</th>
                                <td>{{ cotacao.transportadora }}</td>
                                <td>{{ $filters.real(cotacao.valor_cotacao) }}</td>
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
import { CotacaoService } from '@/services/CotacaoService'

  export default {
    name : 'CotarFreteComp',
    data : function () {
      return {
        cotacao : {
          uf : '',
          valor_pedido : '',
        },
        cotacoes : [],
        alertClass : '',
        alertMsg : '',
        loading : false,
      }
    },
    methods: {
      submitCreate : async function () {
        try {
          this.alertMsg = '';
          this.alertClass = '';
          this.loading = true;
          let response = await CotacaoService.cotarFrete(this.cotacao);
         
          if (response.data) {
            this.loading = false;
            response = response.data;
            if (response.success) {
              this.alertClass = 'alert alert-success';
              this.alertMsg = response.message;
              this.cotacoes = response.data;
            } else {
              this.alertClass = 'alert alert-danger';
              let errors = response.data;
              for (var e in errors) {
                this.alertMsg += errors[e] + '<br>';
              }
            }
          } 
        }
        catch (error) {
          this.loading = false;
          this.alertClass = 'alert alert-danger';
          this.alertMsg = error.response.data.message;
        }
      }
    },
  }
</script>

<style scoped>
</style>