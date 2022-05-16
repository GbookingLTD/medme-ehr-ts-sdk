import { IClientPrice } from "interfaces/index";

export interface IService {
  id: string;
  name: string;
  price: IClientPrice;
  duration: number;}
