import React, { useEffect, useState } from "react";
import Patients from "./landing/patients/Patients";
import DemoApp from "./elements/calendar/calendar4";
import axios from "axios";

const LandingDoc = ({ calcData, patientData }) => {
    const [patientId, setPatientId] = useState('');
    const [filteredPatients, setFilteredPatients] = useState('');

    useEffect(() => {
        if (patientData && patientId) {
            const filtered = patientData.filter(item => item.id === patientId);
            if (JSON.stringify(filtered) !== JSON.stringify(filteredPatients)) {
                setFilteredPatients(filtered);
            }
        }
    }, [patientData, patientId, filteredPatients]);

    return (
        <div className="landing-main2">
            <DemoApp setPatientId={setPatientId} mydata={calcData} />
            <Patients patientData={filteredPatients} />
        </div>
    );
};

export default LandingDoc;