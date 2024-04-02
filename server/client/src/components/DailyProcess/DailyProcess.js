export const ItemDetails = {
    observation:'',
    remarks:'',
    imageurl:''
}

export const DailyProcess = {
    Work_Station:{
        Lux_Level:{...ItemDetails , label:'Lux level of time check inspection table (1700-2300) Lux meter'},
        five_s:{...ItemDetails , label:'5S should be maintain at time check table'},
        is_organized:{...ItemDetails , label:'Is workplace organized and cleaned'},
        is_safe:{...ItemDetails , label:'Is the work area safe and is operator wearing gloves at required place'},
        is_bins_present:{...ItemDetails , label:'Are the Red bins Available at all machine for NG part'},
        is_bins_identified:{...ItemDetails , label:'Are Red bins well identified'},
        defect_identify:{...ItemDetails , label:'Are Defect part identify with there defect code Number/sticker'},
        other_part_available:{...ItemDetails , label:'Are the other part available at the place'}
    },
    Part_Product:{
        work_isntruction:{...ItemDetails , label:'Work instructions available on the shop floor'},
        should_match:{...ItemDetails , label:'work Instruction & actual process should match '},
        is_updated:{...ItemDetails , label:'Is the part updated standard display at time check table'},
        inspection_report:{...ItemDetails , label:'Is the part updated guide display at time check table'},
        is_performing_job:{...ItemDetails , label:'Frist part inspection report should be update as per running model'},
        is_match_fp:{...ItemDetails , label:'Time check should be update as per running model'},
        is_match_tc:{...ItemDetails , label:'Is the operator performing the job As per the work instructions'}
    },
    Process:{
        daily_fixture:{...ItemDetails , label:'Daily fixture and jig condition should be ok & validated '},
        part_packing:{...ItemDetails , label:'Part Packing Condition Should be OK and check cart must be covered with Proper Identification.'}
    },
    Voice_of_the_customer:{
        quality_alert:{...ItemDetails , label:'Are Quality Alert issued and visible on the production floor to contain the problem?'},
    }
}