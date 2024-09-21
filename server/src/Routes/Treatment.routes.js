import { Router } from "express";
import { verifyJwtForDoctor } from "../Middlewares/Auth.middleware.js";
import { CreateNewTreatment, getPatientDetails, getTreatmentDetails } from "../Controllers/Treatment.Controller.js";
import { AddReport } from "../Controllers/Reports.Controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";
const router = Router();
router.route('/createTreatment').post(verifyJwtForDoctor, CreateNewTreatment)
router.route('/getPatientDetails').get(verifyJwtForDoctor, getPatientDetails)
router.route('/addReport').post(verifyJwtForDoctor, upload.fields([
    { name: 'reports', maxCount: 5 },
    { name: 'prescriptions', maxCount: 5 },
]), AddReport)
router.route('/getTreatmentDetails/:treatmentId').get(verifyJwtForDoctor, getTreatmentDetails)
export default router