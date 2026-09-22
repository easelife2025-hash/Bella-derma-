import { BeforeAfterCase } from '@/components/BeforeAfterSlider';

export const CLINICAL_CASES: BeforeAfterCase[] = [
  {
    id: 'acne-scar-co2',
    treatmentName: 'Acne Scar Revision & CO2 Laser',
    category: 'Acne & Scars',
    sessions: '3 Sessions (Subcision + Fractional CO2)',
    timeline: '8 Weeks Post-Protocol',
    beforeImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    description: 'Targeted mechanical release of tethered fibrous bands combined with fractional carbon dioxide ablation to resurface deep boxcar and rolling scars.',
    clinicalResults: [
      '80% reduction in textural depression depth',
      'Significant clearance of post-inflammatory erythema (redness)',
      'Substantial dermal thickening and collagen replenishment'
    ],
    doctorNote: 'By combining subcision with localized fractional resurfacing, we successfully elevated deep scar bases while safeguarding the epidermal barrier.'
  },
  {
    id: 'pico-laser-pigmentation',
    treatmentName: 'Pico Laser Pigment Clearance',
    category: 'Laser & Resurfacing',
    sessions: '4 Sessions Pico Protocol',
    timeline: '6 Weeks Post-Treatment',
    beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-short picosecond photoacoustic pulses targeting deep epidermal melasma, solar lentigines, and uneven epidermal pigmentation.',
    clinicalResults: [
      'Over 85% clearance of stubborn hyperpigmented patches',
      'Enhanced luminosity and restored uniform skin tone',
      'Zero thermal damage with minimal 2-hour redness recovery'
    ],
    doctorNote: 'The ultra-rapid acoustic pulse breaks melanin into microscopic dust without generating excessive heat, preventing rebound hyperpigmentation in Indian skin types.'
  },
  {
    id: 'dermal-fillers-sculpt',
    treatmentName: 'Dermal Fillers & Facial Balancing',
    category: 'Skin & Aesthetic',
    sessions: '1 Precision Session',
    timeline: '2 Weeks Follow-up',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512290900672-1f486ccfef90?auto=format&fit=crop&w=1200&q=80',
    description: 'High-G-prime hyaluronic acid micro-injections positioned deeply along anatomical anchor points to restore youthful mid-face support.',
    clinicalResults: [
      'Restored structural volume to flattened cheek apex',
      'Natural softening of deep shadow lines without puffiness',
      'Maintained 100% natural, expressive facial movement'
    ],
    doctorNote: 'Our philosophy focuses on anatomical support rather than volume overload. The result appears rested, elevated, and authentically youthful.'
  },
  {
    id: 'clinical-peels-glow',
    treatmentName: 'Multi-Acid Clinical Renewal Peel',
    category: 'Skin & Aesthetic',
    sessions: '2 Sessions (Mandelic + TCA)',
    timeline: '10 Days Post-Protocol',
    beforeImage: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
    description: 'Custom dermatological peeling solution formulated to dissolve keratinized surface cells, regulate sebaceous output, and tighten open pores.',
    clinicalResults: [
      'Immediate removal of congested comedones and excess sebum',
      'Noticeably refined pore architecture and smooth texture',
      'Radiant glass-skin finish with improved topical product absorption'
    ],
    doctorNote: 'A gentle yet deeply penetrating dual-acid treatment calibrated for urban environmental stress and dull skin.'
  }
];
