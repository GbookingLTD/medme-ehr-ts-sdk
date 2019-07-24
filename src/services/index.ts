//import InMemory from './inMemory/index';
//import BinRPC from './binRPC/index';
import JsonRPC from './jsonRPC/index';
import { AuthenticatedPatient, getPatientOrLogin } from './AuthService';

export default {
    // InMemory
    //, BinRPC
    JsonRPC,
    AuthenticatedPatient,
    getPatientOrLogin
}