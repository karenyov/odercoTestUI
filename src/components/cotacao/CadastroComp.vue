<template>

<div class="col-md-11 shadow-lg" >
    <div class="card my-12 list-group-item shadow-sm" style="height:40em;">
        <div class="card-body">
          
            <h5 class="card-title">Cadastro Cotação de Frete</h5>

            <!-- Spinner-->
            <div v-if="loading">
              <SpinnerL/>
            </div>

            <form style="margin-top:20px;" @submit.prevent="submitCreate()">
              <div class="row">
                  <div class="col-md-12">
                      <select v-model="cotacao.transportadora_id" :disabled="transportadoras.length <= 0" class="form-select" name="transportadora_id" aria-label="Transportadora">
                        <option value="" selected>Selecione a Transportadora</option>
                        <option :value="transportadora.id" v-for="transportadora of transportadoras" :key="transportadora.id">{{ transportadora.nome }}</option>
                      </select>
                  </div>
              </div>
              <div class="row" style="margin-top:10px;">
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
                    <VueNumberFormat v-model:value="cotacao.percentual_cotacao" class="form-control"
                      :options="{ precision: 1, prefix: '', suffix: ' %', decimal: ',', thousand: '', acceptNegative: false, isInteger: false }">
                    </VueNumberFormat>
                  </div>
              </div>
              <div class="row" style="margin-top:10px;">
                  <div class="col-md-12">
                      <label><b>Valor extra(R$)</b></label>
                      <VueNumberFormat v-model:value="cotacao.valor_extra" class="form-control"
                        :options="{ precision: 2, prefix: 'R$', suffix: ' ', decimal: ',', thousand: '.', acceptNegative: false, isInteger: false }">
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

        </div>

    </div>
</div> 

</template>

<script>
import { CotacaoService } from '@/services/CotacaoService'
import { TransportadoraService } from '@/services/TransportadoraService'

  export default {
    name : 'CadastroComp',
    data : function () {
      return {
        cotacao : {
          uf : '',
          percentual_cotacao : '',
          valor_extra : '',
          transportadora_id : '',
        },
        transportadoras : [],
        alertClass : '',
        alertMsg : '',
        loading : false,
      }
    },
    created : async function () {
      try {
        let response = await TransportadoraService.getAllTransportadoras();
        this.transportadoras = response.data["data"];
      }
      catch (error) {
        this.errorMessage = error;
        console.log(error);
      }
    },
    methods: {
      submitCreate : async function () {
        try {
          this.alertMsg = '';
          this.alertClass = '';
          this.loading = true;
          
          let response = await CotacaoService.cadastroCotacao(this.cotacao);
          if (response.data) {
            this.loading = false;
            response = response.data;
            if (response.success) {
              this.alertClass = 'alert alert-success';
              this.alertMsg = response.message;
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
          console.log(error);
        }
      }
    },
  }
</script>

<style scoped>
</style>