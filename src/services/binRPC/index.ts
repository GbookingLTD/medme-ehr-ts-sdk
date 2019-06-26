import { xhr } from "./xhr";
import { tcp } from "./tcp";
import { AppointmentService } from './AppointmentService';

export default {
    Transports: {
        xhr,
        tcp
    },
    AppointmentService
};