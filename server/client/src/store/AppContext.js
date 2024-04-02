import { createContext, useState } from "react";
import { TimeCheck } from "../components/TimeCheck/TimeCheck";
import { FirstFive } from "../components/FirstFive/FirstFive";
import { DailyProcess } from "../components/DailyProcess/DailyProcess";
import { DailyLine } from "../components/DailyLine/Dailyline";
import { F_11 } from "../components/F_11/F_11";

const AllFroms = createContext();

const AppContext = ({ children }) => {
    const [formDetails, setFormDetails] = useState(TimeCheck);
    const [firstfiveformDetails, setFirstFiveFormDetails] = useState(FirstFive);
    const [dailyprocessFrom, setDailyProcessFrom] = useState(DailyProcess);
    const [dailyLineFrom, setDailyLineFrom] = useState(DailyLine);
    const [customineFrom, setCustomineFrom] = useState({});
    const [f_11From, setF_11From] = useState(F_11);
    return (
        <AllFroms.Provider value=
        {{
            formDetails, setFormDetails,
            firstfiveformDetails, setFirstFiveFormDetails,
            dailyprocessFrom, setDailyProcessFrom,
            dailyLineFrom, setDailyLineFrom,
            customineFrom, setCustomineFrom,
            f_11From, setF_11From
        }}>
            {children}
        </AllFroms.Provider>
    )
}

export { AppContext, AllFroms }