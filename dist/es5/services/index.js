//import InMemory from './inMemory/index';
//import BinRPC from './binRPC/index';
import JsonRPC from "./jsonRPC/index";
import { PatientAuthenticationResult, PatientAuthenticationStep, PatientAuthenticationError, getAuthenticatedPatient, ConnectionError, } from "./AuthService";
import { Credentials } from "./Credentials";
import { RpcErrorCodes } from "./RpcErrorCodes";
import Filters from "./filters/index";
export default {
    // InMemory
    //, BinRPC
    JsonRPC: JsonRPC,
    PatientAuthenticationResult: PatientAuthenticationResult,
    PatientAuthenticationStep: PatientAuthenticationStep,
    PatientAuthenticationError: PatientAuthenticationError,
    ConnectionError: ConnectionError,
    getAuthenticatedPatient: getAuthenticatedPatient,
    Credentials: Credentials,
    RpcErrorCodes: RpcErrorCodes,
    Filters: Filters,
};
