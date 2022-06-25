import axios from "axios";

export class TransportadoraService {

    static serverURL = 'http://localhost:8100/api';

    static getAllTransportadoras() {
        let dataURL = `${this.serverURL}/transportadora`;
        return axios.get(dataURL);
    }
}