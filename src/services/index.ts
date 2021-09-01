//import InMemory from './inMemory/index';
//import BinRPC from './binRPC/index';
import JsonRPC from "./jsonRPC/index";
import {
  PatientAuthenticationResult,
  PatientAuthenticationStep,
  PatientAuthenticationError,
  getAuthenticatedPatient,
  ConnectionError,
} from "./AuthService";
import { Credentials } from "./Credentials";
import { RpcErrorCodes } from "./RpcErrorCodes";

export default {
  // InMemory
  //, BinRPC
  JsonRPC,
  PatientAuthenticationResult,
  PatientAuthenticationStep,
  PatientAuthenticationError,
  ConnectionError,
  getAuthenticatedPatient,
  Credentials,
  RpcErrorCodes,
};
