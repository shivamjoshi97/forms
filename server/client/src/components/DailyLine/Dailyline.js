export const ItemDetails = {
    observation:'',
    judgement:'',
    remarks:''
}

export const DailyLine = {
    Basic_Follow:{
        label:'Line Basic Follow Audit',
        Hand_Gloves:{...ItemDetails,label:'Hand gloves used by each and every operator'},
        Lux_Level_1:{...ItemDetails,label:'Check the lux level Spec:- Final stage - 2000±300'},
        Lux_Level_2:{...ItemDetails,label:'Check the lux level Spec:- Other - 1000±200 '},
        Sahrp_Edge:{...ItemDetails,label:'No sharp edge at working table'},
        LQC:{...ItemDetails,label:'LQC person available on assy. line.'}
    },
    Self:{
        label:'Self & Sequential Audit',
        appearance:{...ItemDetails,label:'Verified the part appearance i.e no molding defect allowed'},
        worker_self:{...ItemDetails,label:'Woker self & sequence inspection action'},
        each_worker_self:{...ItemDetails,label:'Each woker Self & Sequence inspection data management'}
    },
    FoolProof:{
        label:'FoolProof Audit',
        is_follproof:{...ItemDetails,label:'If any Foolproof installed on line then the check working or not'}
    },
    M_4:{
        label:'4M Audit',
        new_operator:{...ItemDetails,label:'Check for new operator, shall not be deployed on critical stage'},
        basic_training:{...ItemDetails,label:'Basic training shall be given to new operator'}
    },
    Other:{
        label:'Other Details',
        packing:{...ItemDetails,label:'Packing as per packing standard'},
        storage_clean:{...ItemDetails,label:'All storage area should be clean'},
        no_dust:{...ItemDetails,label:'No dust on conveyor'}
    }
}