//import InMemory from './inMemory/index';
//import BinRPC from './binRPC/index';
import JsonRPC from "./jsonRPC/index";
import {
  PatientAuthenticationResult,
  PatientAuthenticationStep,
  PatientAuthenticationError,
  getAuthenticatedPatient,
  getAuthenticatedPatientByExchangeToken,
  ConnectionError,
} from "./AuthService";
import { Credentials } from "./Credentials";
import { RpcErrorCodes } from "./RpcErrorCodes";

import Filters from "./filters/index";

export default {
  // InMemory
  //, BinRPC
  JsonRPC,
  PatientAuthenticationResult,
  PatientAuthenticationStep,
  PatientAuthenticationError,
  ConnectionError,
  getAuthenticatedPatient,
  getAuthenticatedPatientByExchangeToken,
  Credentials,
  RpcErrorCodes,
  Filters,
};
