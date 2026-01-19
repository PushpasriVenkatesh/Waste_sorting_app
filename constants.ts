
import { WasteCategory, WasteInfo, QuestionNode, WasteDataMap } from './types';

export const WASTE_DATA: WasteDataMap = {
  [WasteCategory.WET]: {
    category: WasteCategory.WET,
    binColor: 'Green Bin',
    colorHex: '#22c55e',
    icon: '🍏',
    instructions: [
      'Compost it if possible.',
      'Do not mix with plastic bags.',
      'Includes food scraps, vegetable peels, and flowers.'
    ]
  },
  [WasteCategory.DRY]: {
    category: WasteCategory.DRY,
    binColor: 'Blue Bin',
    colorHex: '#3b82f6',
    icon: '📦',
    instructions: [
      'Ensure items are clean and dry.',
      'Flatten cardboard boxes to save space.',
      'Includes paper, plastic, metal, and glass.'
    ]
  },
  [WasteCategory.E_WASTE]: {
    category: WasteCategory.E_WASTE,
    binColor: 'Black/Grey Bin',
    colorHex: '#475569',
    icon: '💻',
    instructions: [
      'Do not throw in regular trash.',
      'Drop off at designated e-waste collection centers.',
      'Includes batteries, wires, and old gadgets.'
    ]
  },
  [WasteCategory.HAZARDOUS]: {
    category: WasteCategory.HAZARDOUS,
    binColor: 'Red Bin',
    colorHex: '#ef4444',
    icon: '⚠️',
    instructions: [
      'Handle with care.',
      'Keep away from children and fire.',
      'Includes paints, chemicals, and expired medicines.'
    ]
  },
  [WasteCategory.SANITARY]: {
    category: WasteCategory.SANITARY,
    binColor: 'Yellow Bin/Bag',
    colorHex: '#eab308',
    icon: '🩹',
    instructions: [
      'Wrap securely in newspaper or a bag.',
      'Mark with a red cross if possible.',
      'Includes diapers, pads, and used bandages.'
    ]
  }
};

export const WASTE_TREE: Record<string, QuestionNode> = {
  start: {
    id: 'start',
    question: 'Is the item organic, biodegradable, or food-related?',
    options: [
      { label: 'Yes', result: WasteCategory.WET },
      { label: 'No', nextId: 'electronic' }
    ]
  },
  electronic: {
    id: 'electronic',
    question: 'Does it use batteries, electricity, or have internal circuits?',
    options: [
      { label: 'Yes', result: WasteCategory.E_WASTE },
      { label: 'No', nextId: 'dangerous' }
    ]
  },
  dangerous: {
    id: 'dangerous',
    question: 'Is it sharp, toxic, flammable, or chemically reactive (e.g., paint, bulb, syringe)?',
    options: [
      { label: 'Yes', result: WasteCategory.HAZARDOUS },
      { label: 'No', nextId: 'sanitary' }
    ]
  },
  sanitary: {
    id: 'sanitary',
    question: 'Is it personal hygiene waste (e.g., used tissue, diaper, bandage)?',
    options: [
      { label: 'Yes', result: WasteCategory.SANITARY },
      { label: 'No', nextId: 'dry' }
    ]
  },
  dry: {
    id: 'dry',
    question: 'Is it a recyclable material like Paper, Plastic, Metal, or Glass?',
    options: [
      { label: 'Yes', result: WasteCategory.DRY },
      { label: 'No, it\'s something else', result: WasteCategory.DRY } // Default fallback
    ]
  }
};
