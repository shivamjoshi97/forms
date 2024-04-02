export const itemDefinition = {
  textfieldvalue: '',
  imageurls: '',
  observations:''
}


export const F_11 = {
  basicorder:{
    compliance:{
        label:"Compliance with working hours",
        openclose:{...itemDefinition , fieldlable:'Compliance with Opening/closing'},
        prepofwork:{...itemDefinition , fieldlable:'Preperation for work'},
        finishing:{...itemDefinition , fieldlable:'Finishing/Progress'}
    },
    minimization:{
        label:"Minimization of floating people",
        floatingpeople:{...itemDefinition , fieldlable:'Managing of floating people'},
        visitors:{...itemDefinition , fieldlable:'Managing of Visitors/Indirect workers'},
        smokingarea:{...itemDefinition , fieldlable:'Managing of Smoking area/Lounge'}
    },
    appearance:{
        label:"Clothing/Apperance",
        clothappearance:{...itemDefinition , fieldlable:'Clothing/Appearance'},
        shoesgloves:{...itemDefinition , fieldlable:'Wearing of shoes/gloves'}
    },
    workerbehavior:{
        label:"Worker's behavior",
        concentration:{...itemDefinition , fieldlable:'Concentration on work'},
        absenteeism:{...itemDefinition , fieldlable:'Absenteeism and tardiness management'}
    }
  },
  cleanupsteps:{
      sortout:{
          label:"Sort-Out",
          parts:{...itemDefinition,fieldlable:'Parts/materials'},
          tools:{...itemDefinition,fieldlable:'Tools/equipment'}
      },
      setinorder:{
          label:"Set in order",
          materials:{...itemDefinition,fieldlable:'parts/materials'},
          tools:{...itemDefinition,fieldlable:'tools'},
          cleaningtools:{...itemDefinition,fieldlable:'Cleaning tools'},
      },
      shine:{
          label:"Shine",
          equipment:{...itemDefinition,fieldlable:'equipment'},
          process:{...itemDefinition,fieldlable:'Process'},
          interiorexterior:{...itemDefinition,fieldlable:'Interior/exterior of factory/'}
      },
      rightposition:{
          label:"Right Position",
          rawmaterials:{...itemDefinition,fieldlable:'parts/raw materials'},
          tools:{...itemDefinition,fieldlable:'Tools'},
      },
      rightcontainer:{
          label:"Right Container",
          standardized_rate:{...itemDefinition,fieldlable:'Standardized container/standardized rate'}
      },
      right_quantity:{
          label:"Right quantity",
          material_depot:{...itemDefinition,fieldlable:'Material Depot WIP'},
          line_side:{...itemDefinition,fieldlable:'Line Side WIP'}
      },
      status_board:{
          label:"Status board",
          production:{...itemDefinition,fieldlable:'Production status board'},
          quality:{...itemDefinition,fieldlable:'Quality status board'}
      },
      stack_height:{...itemDefinition,fieldlable:'Stack height'},
      warning_lights:{...itemDefinition,fieldlable:'Warning lights(Andon)'}
  },
  manufacturing:{
      label:"",
      products_handling:{...itemDefinition,fieldlable:'Parts/Products handling'},
      work_standards:{...itemDefinition,fieldlable:'Work Standards'},
      torque_managment:{...itemDefinition,fieldlable:'Drive/Torque management'},
      multi_skilling:{...itemDefinition,fieldlable:'Multi skilling'}
  },
  equipment_maintenance:{
      issue_improvement:{
        label:"Issue improvement",
          identification:{...itemDefinition,fieldlable:'Issue Identification  ( Tag method )'},
          observation:{...itemDefinition,fieldlable:'Issue Observation report'},
          contamination_source:{...itemDefinition,fieldlable:'(Contamination sources  -Air,water,oil,Leakages & Noise control)'}
      },
      my_machine:{
        label:"My Machine",
          cleaning:{...itemDefinition,fieldlable:'Machine Cleaning'},
          ownership:{...itemDefinition,fieldlable:'Operator ownership'}
      },
      improvement:{
        label:"Mc Improvement",
          macine_performance:{...itemDefinition,fieldlable:'Machine Performance'},
          machine_visual:{...itemDefinition,fieldlable:'Machine Visual Management'},
          cleaning_tools:{...itemDefinition,fieldlable:'TPM Machine Cleaning Tools'}
      }
  },
  smt:{
      label:"",
      temprature_control:{...itemDefinition,fieldlable:'Temperature/humidity control'},
      msl_control:{...itemDefinition,fieldlable:'MSL control'},
      reel_materials_control:{...itemDefinition,fieldlable:'Reel materials control'},
      sub_materials_control:{...itemDefinition,fieldlable:'Sub-materials control'},
      stencil_control:{...itemDefinition,fieldlable:'Stencil control'},
      screen_printer_control:{...itemDefinition,fieldlable:'Screen Printer control'},
      reflow_control:{...itemDefinition,fieldlable:'Reflow Profile control'},
      magazine_control:{...itemDefinition,fieldlable:'Magazine control'},
      electric_iron_control:{...itemDefinition,fieldlable:'Electric iron control'}
  },
  injection:{
    A_injection:{
      label:"A. Injection",
      raw_material_control:{...itemDefinition,fieldlable:'Raw material control'},
      drying_supply_control:{...itemDefinition,fieldlable:'Raw material drying & supply control'},
      mold_storage_control:{...itemDefinition,fieldlable:'Mold storage control'},
      cleaning_control:{...itemDefinition,fieldlable:'Mold repairing/cleaning control'},
      equipment_control:{...itemDefinition,fieldlable:'Mold Equipment control'},
      saftey_control:{...itemDefinition,fieldlable:'Safety control'}
    },
    press:{
        label:"B. Press",
        raw_material_control:{...itemDefinition,fieldlable:'Raw material control'},
        mold_storage_control:{...itemDefinition,fieldlable:'Mold storage control'},
        cleaning_control:{...itemDefinition,fieldlable:'Mold repairing/cleaning control'},
        equipment_control:{...itemDefinition,fieldlable:'Equipment Control '},
        saftey_control:{...itemDefinition,fieldlable:'Safety control'}
    },
  },
  warehouse:{
      materail:{
        label:"Material warehouse",
          managment:{...itemDefinition,fieldlable:'Materials Management'},
          defective_stock:{...itemDefinition,fieldlable:'Defective stock'},
          location:{...itemDefinition,fieldlable:'Location Mgt'},
          fifo:{...itemDefinition,fieldlable:'FIFO'}
      },
      materail_depot:{
        label:"Material Depot",
          managment:{...itemDefinition,fieldlable:'Materials Depot Management'},
          location:{...itemDefinition,fieldlable:'Location Management'},
          fifo:{...itemDefinition,fieldlable:'FIFO'}
      },
      product_warehouse_managment:{
        label:"Product warehouse managment",
          product_keeping:{...itemDefinition,fieldlable:'Products keeping Management'},
          defective_stock:{...itemDefinition,fieldlable:'Defective stock'},
          location:{...itemDefinition,fieldlable:'Location management'},
          fifo:{...itemDefinition,fieldlable:'FIFO'}
      }
  },
  tools:{
    label:"",
      self_check:{...itemDefinition,fieldlable:'Self/Successive Check'},
      time_check:{...itemDefinition,fieldlable:'Time/Spec. Check'},
      major_process:{...itemDefinition,fieldlable:'Major Process Control'},
      return_defects:{...itemDefinition,fieldlable:'Return Defects'},
      quality_review:{...itemDefinition,fieldlable:'Quality Review Meeting'},
      line_audit:{...itemDefinition,fieldlable:'Line Audit'}
  },
  esd:{
    label:"",
      grounding:{...itemDefinition,fieldlable:'Grounding'},
      transportaion:{...itemDefinition,fieldlable:'Transportation electrostatic measures'},
      entrance:{...itemDefinition,fieldlable:'Entrance / Exit electrostatic measures'},
      wrist_strap:{...itemDefinition,fieldlable:'Wrist Strap management'},
      pcba_handling:{...itemDefinition,fieldlable:'PCBA handling management'}
  }
}