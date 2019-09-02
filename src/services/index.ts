//import InMemory from './inMemory/index';
//import BinRPC from './binRPC/index';
import JsonRPC from './jsonRPC/index';
import { PatientAuthenticationResult, PatientAuthenticationStep, PatientAuthenticationError, getAuthenticatedPatient } from './AuthService';
import { Credentials } from './Credentials';

export default {
    // InMemory
    //, BinRPC
    JsonRPC,
    PatientAuthenticationResult,
    PatientAuthenticationStep,
    PatientAuthenticationError,
    getAuthenticatedPatient,
    Credentials
}