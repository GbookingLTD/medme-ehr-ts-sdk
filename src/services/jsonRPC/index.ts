import { xhr } from "./xhr";
import { AppointmentService } from './AppointmentService';
import { AppointmentResultService } from "./AppointmentResultService";

export default {
    Transports: {
        xhr
    },
    AppointmentService,
    AppointmentResultService

};