import { xhr } from "./xhr";
import { AppointmentService } from './AppointmentService';
import { AppointmentResultService } from "./AppointmentResultService";
import { PrescriptionService } from "./PrescriptionService";

export default {
    Transports: {
        xhr
    },
    AppointmentService,
    AppointmentResultService,
    PrescriptionService
};