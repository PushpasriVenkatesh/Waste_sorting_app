
export enum WasteCategory {
  WET = 'Wet Waste',
  DRY = 'Dry Waste',
  E_WASTE = 'E-Waste',
  HAZARDOUS = 'Hazardous Waste',
  SANITARY = 'Sanitary Waste'
}

export interface WasteInfo {
  category: WasteCategory;
  binColor: string;
  colorHex: string;
  instructions: string[];
  icon: string;
}

export interface QuestionNode {
  id: string;
  question: string;
  options: {
    label: string;
    nextId?: string;
    result?: WasteCategory;
  }[];
}

export type WasteDataMap = Record<WasteCategory, WasteInfo>;
