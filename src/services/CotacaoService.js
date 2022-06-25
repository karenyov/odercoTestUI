import axios from "axios";

export class CotacaoService {

    static serverURL = 'http://localhost:8100/api';

    static getAllCotacao() {
        let dataURL = `${this.serverURL}/cotacao`;
        return axios.get(dataURL);
    }

    static cadastroCotacao(cotacao) {
        let dataURL = `${this.serverURL}/cotacao`;
        return axios.post(dataURL, cotacao);
    }

    static cotarFrete(cotacao) {
        let dataURL = `${this.serverURL}/cotacao`;
        return axios.put(dataURL, cotacao);
    }
}