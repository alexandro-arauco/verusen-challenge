export interface Material {
  "Unnamed: 0": number;
  id: number;
  name: null | string;
  description: null | string;
  long_description: null;
  customer_part_id: null;
  manufacturer_name: string;
  manufacturer_part_id: string;
  competitor_name: null;
  competitor_part_name: null;
  competitor_part_id: null;
  category: Category;
  unit_of_measure: null;
  unit_quantity: null;
  requested_quantity: null;
  requested_unit_price: number;
}

export enum Category {
  CalPsc = "CAL-PSC",
  CatTools = "CAT TOOLS",
  CategoryCalPsc = "cal-psc",
  CategoryCst = "cst",
  CategoryDSCElect = "DSC-Elect",
  CategoryDrives = "drives",
  CategoryDscElect = "dsc-elect",
  CategoryDscMech = "dsc-mech",
  CategoryDscMotors = "dsc-motors",
  CategoryDscSpindl = "dsc-spindl",
  CategoryDscVrg = "dsc-vrg",
  CategoryIsg = "isg",
  CategoryMechtronix = "Mechtronix",
  CategoryMrt = "mrt",
  CategoryOag = "oag",
  Cst = "CST",
  DSCElect = "DSC-elect",
  DSCMOtors = "DSC-MOtors",
  DSCMech = "DSC-mech",
  DSCMotors = "DSC-Motors",
  DSCSpindl = "DSC-Spindl",
  Drives = "DRIVES",
  Drv = "DRV",
  DscElecT = "dsc-elecT",
  DscElect = "DSC-ELECT",
  DscMech = "DSC-MECH",
  DscMotors = "DSC-MOTORS",
  DscSPINDL = "dsc-SPINDL",
  DscSpindl = "DSC-SPINDL",
  DscVrg = "DSC-VRG",
  Isg = "ISG",
  Legacy = "LEGACY",
  Mechtronix = "MECHTRONIX",
  Mrt = "MRT",
  OaG = "oaG",
  Oag = "OAG",
  Outpats = "OUTPATS",
  Panelmate = "PANELMATE",
  Panelmtrpr = "PANELMTRPR",
  PurpleDrives = "Drives",
  PurpleDscElect = "Dsc-elect",
  PurpleMechtronix = "mechtronix",
  PurpleOag = "Oag",
}
