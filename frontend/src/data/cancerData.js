const cancerData = {
"breast-cancer": {
  Name: "Breast Cancer",

  Introduction:
    "Breast cancer is the most common cancer in women worldwide. Outcomes are excellent when the disease is detected early and treated appropriately using modern, evidence-based therapies. Although far more common in women, breast cancer can also occur in men.",

  Overview: [
    "Breast cancer occurs when cells in the breast grow uncontrollably and form a tumor.",
    "It usually begins in the milk ducts (ductal cancer) or lobules (lobular cancer).",
    "Breast cancer can occur at any age but is more common after 40–50 years.",
    "There are multiple subtypes including hormone receptor-positive, HER2-positive, and triple-negative breast cancer.",
    "Treatment is personalized based on tumor biology, stage, and patient factors."
  ],

  Classification: {
    Types: [
      "Ductal Carcinoma In Situ (DCIS)",
      "Invasive Ductal Carcinoma",
      "Invasive Lobular Carcinoma",
      "Triple-Negative Breast Cancer",
      "HER2-Positive Breast Cancer"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Increasing age",
      "Female sex",
      "Family history of breast or ovarian cancer",
      "BRCA1 and BRCA2 gene mutations",
      "Early menarche and late menopause"
    ],
    Modifiable: [
      "Obesity after menopause",
      "Physical inactivity",
      "Alcohol consumption",
      "Smoking",
      "Hormone replacement therapy"
    ],
    Infections: [],
    PreventionTips: [
      "Maintain healthy weight",
      "Exercise regularly",
      "Limit alcohol",
      "Avoid tobacco",
      "Regular screening for high-risk individuals"
    ]
  },

  Symptoms: {
    Early: [
      "Often asymptomatic in early stages"
    ],
    Common: [
      "Breast lump",
      "Change in breast shape or size",
      "Nipple discharge or inversion",
      "Skin dimpling or redness"
    ],
    Advanced: [
      "Bone pain",
      "Breathlessness",
      "Weight loss",
      "Enlarged lymph nodes"
    ],
    OrganSpecific: {},
    WarningNote:
      "Any new breast lump or persistent change should be evaluated promptly."
  },

  Diagnosis: {
    Approach:
      "Diagnosis is based on triple assessment: clinical examination, imaging, and biopsy.",
    ClinicalEvaluation: [
      "Breast examination",
      "Axillary lymph node examination"
    ],
    Tests: [
      "Blood tests for baseline evaluation"
    ],
    Imaging: [
      "Mammography",
      "Breast ultrasound",
      "Breast MRI (selected cases)"
    ],
    Biopsy: [
      "Core needle biopsy",
      "Vacuum-assisted biopsy"
    ],
    MolecularTests: [
      "ER/PR receptor testing",
      "HER2 testing",
      "Genomic assays (selected cases)"
    ],
    Staging: [
      "CT scan",
      "Bone scan",
      "PET-CT when indicated"
    ]
  },

  Treatment: {
    Principle:
      "Treatment combines local and systemic therapies depending on disease stage and biology.",
    Surgery: [
      "Breast-conserving surgery",
      "Mastectomy",
      "Sentinel lymph node biopsy"
    ],
    RadiationTherapy: [
      "Adjuvant radiotherapy",
      "Palliative radiotherapy"
    ],
    SystemicTherapy: [
      "Chemotherapy",
      "Hormonal therapy",
      "Targeted therapy",
      "Immunotherapy (selected cases)"
    ],
    SupportiveCare: [
      "Pain management",
      "Physiotherapy",
      "Psychological counseling",
      "Nutritional support"
    ]
  },

  Prognosis: {
    Factors: [
      "Stage at diagnosis",
      "Tumor biology",
      "Response to treatment",
      "Patient age and comorbidities"
    ],
    Note:
      "Early-stage breast cancer has excellent long-term survival."
  },

  DosAndDonts: {
    Dos: [
      "Attend regular screening",
      "Complete full treatment",
      "Maintain healthy lifestyle",
      "Seek emotional support"
    ],
    Donts: [
      "Do not ignore symptoms",
      "Do not stop medicines without advice",
      "Avoid smoking and alcohol abuse"
    ]
  },

  FAQs: [
    {
      Question: "Can men get breast cancer?",
      Answer: "Yes, although rare, men can develop breast cancer."
    },
    {
      Question: "Is breast cancer curable?",
      Answer: "Yes, especially when detected early."
    }
  ]
},

"lung-cancer": {
  Name: "Lung Cancer",

  Introduction:
    "Lung cancer is one of the leading causes of cancer-related deaths worldwide. It arises from abnormal growth of cells in the lungs and can spread early to lymph nodes, brain, bones, liver, and other organs. While smoking is the most common cause, lung cancer can also occur in non-smokers. Advances in molecular testing, targeted therapy, and immunotherapy have significantly improved outcomes.",

  Overview: [
    "Lung cancer develops when lung cells grow uncontrollably and form a tumor.",
    "It is broadly divided into Non-Small Cell Lung Cancer (NSCLC) and Small Cell Lung Cancer (SCLC).",
    "NSCLC accounts for nearly 80–85% of cases.",
    "SCLC is less common but grows and spreads rapidly.",
    "Treatment depends on cancer type, stage, molecular profile, and patient health."
  ],

  Classification: {
    Types: [
      "Non-Small Cell Lung Cancer (Adenocarcinoma)",
      "Non-Small Cell Lung Cancer (Squamous Cell Carcinoma)",
      "Non-Small Cell Lung Cancer (Large Cell Carcinoma)",
      "Small Cell Lung Cancer"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Increasing age, usually over 50 years",
      "Male sex (though incidence in women is increasing)",
      "Family history of lung cancer",
      "Genetic susceptibility"
    ],
    Modifiable: [
      "Cigarette smoking",
      "Second-hand smoke exposure",
      "Occupational exposure to asbestos, silica, nickel, chromium",
      "Radon gas exposure",
      "Air pollution",
      "Chronic lung diseases such as COPD or pulmonary fibrosis"
    ],
    Infections: [],
    PreventionTips: [
      "Quit smoking and avoid second-hand smoke",
      "Use protective equipment in high-risk occupations",
      "Reduce exposure to indoor and outdoor air pollution",
      "Maintain lung health with regular exercise",
      "Low-dose CT screening for high-risk individuals"
    ]
  },

  Symptoms: {
    Early: [
      "Often no symptoms in early stages"
    ],
    Common: [
      "Persistent cough",
      "Coughing up blood",
      "Chest pain",
      "Shortness of breath",
      "Hoarseness of voice",
      "Recurrent respiratory infections"
    ],
    Advanced: [
      "Unintentional weight loss",
      "Fatigue",
      "Bone pain",
      "Headache or seizures due to brain spread",
      "Swelling of face or neck"
    ],
    OrganSpecific: {},
    WarningNote:
      "Persistent cough, coughing up blood, or breathlessness lasting more than two weeks should be evaluated promptly."
  },

  Diagnosis: {
    Approach:
      "Diagnosis aims to confirm lung cancer, identify its type, molecular profile, and determine disease stage.",
    ClinicalEvaluation: [
      "Detailed medical and smoking history",
      "Physical and respiratory examination"
    ],
    Tests: [
      "Blood tests for baseline assessment"
    ],
    Imaging: [
      "Chest X-ray",
      "CT scan of chest and upper abdomen",
      "PET-CT for staging",
      "MRI brain in selected cases"
    ],
    Biopsy: [
      "Bronchoscopy-guided biopsy",
      "CT-guided lung biopsy",
      "Endobronchial ultrasound (EBUS) biopsy",
      "Pleural fluid analysis if effusion present"
    ],
    MolecularTests: [
      "EGFR mutation testing",
      "ALK rearrangement testing",
      "ROS1, BRAF, KRAS, MET, RET, NTRK mutations",
      "PD-L1 expression testing"
    ],
    Staging: [
      "TNM staging system",
      "Assessment of lymph node and distant organ involvement"
    ]
  },

  Treatment: {
    Principle:
      "Treatment is individualized based on lung cancer type, stage, molecular findings, and patient fitness.",
    Surgery: [
      "Lobectomy or segmentectomy for early-stage disease",
      "Pneumonectomy in selected cases",
      "Lymph node dissection"
    ],
    RadiationTherapy: [
      "Adjuvant radiotherapy after surgery",
      "Definitive radiotherapy when surgery is not possible",
      "Stereotactic Body Radiation Therapy (SBRT)",
      "Palliative radiotherapy"
    ],
    SystemicTherapy: [
      "Chemotherapy",
      "Targeted therapy for mutation-positive cancers",
      "Immunotherapy using checkpoint inhibitors",
      "Chemo-immunotherapy combinations"
    ],
    SupportiveCare: [
      "Management of breathlessness and cough",
      "Pain control",
      "Nutritional support",
      "Pulmonary rehabilitation",
      "Psychological and palliative care"
    ]
  },

  Prognosis: {
    Factors: [
      "Stage at diagnosis",
      "Cancer subtype",
      "Molecular profile",
      "Response to treatment",
      "Overall health and lung function"
    ],
    Note:
      "Early-stage lung cancer is potentially curable, and advanced disease can often be controlled with modern therapies."
  },

  DosAndDonts: {
    Dos: [
      "Quit smoking immediately",
      "Seek early medical evaluation for persistent respiratory symptoms",
      "Follow treatment and follow-up schedules",
      "Maintain nutrition and physical activity as tolerated",
      "Report treatment side effects promptly"
    ],
    Donts: [
      "Do not ignore coughing up blood",
      "Do not rely on alternative or unproven treatments",
      "Avoid smoking and exposure to pollutants",
      "Do not stop prescribed treatment without consulting doctors"
    ]
  },

  FAQs: [
    {
      Question: "Can non-smokers get lung cancer?",
      Answer:
        "Yes. Lung cancer can occur in non-smokers due to genetic factors, pollution, radon exposure, or occupational hazards."
    },
    {
      Question: "Is lung cancer curable?",
      Answer:
        "Yes. Early-stage lung cancer can be cured, and advanced disease can often be controlled with modern treatment."
    },
    {
      Question: "What is targeted therapy?",
      Answer:
        "Targeted therapy uses drugs that specifically attack genetic mutations in cancer cells."
    },
    {
      Question: "Is immunotherapy effective?",
      Answer:
        "Yes. Immunotherapy has significantly improved survival in many lung cancer patients."
    }
  ]
},

"brain-cancer": {
  Name: "Brain Cancer (Brain Tumors)",

  Introduction:
    "Brain cancer refers to malignant tumors that originate in the brain or spread to the brain from other parts of the body. Because the brain controls vital functions such as movement, speech, memory, vision, and behavior, even small tumors can cause significant symptoms. Advances in imaging, neurosurgery, radiation techniques, and systemic therapies have improved safety, outcomes, and quality of life.",

  Overview: [
    "Brain tumors develop when abnormal cells grow uncontrollably within the brain or surrounding structures.",
    "They may be primary (originating in the brain) or secondary (metastatic tumors spreading from other organs).",
    "Brain tumors can be benign or malignant, but both can be life-threatening due to pressure on vital brain structures.",
    "Symptoms depend on tumor size, location, growth rate, and molecular characteristics.",
    "Management requires a multidisciplinary team including neurosurgeons, medical oncologists, radiation oncologists, neurologists, and rehabilitation specialists."
  ],

  Classification: {
    Types: [
      "Gliomas (Astrocytoma, Oligodendroglioma, Glioblastoma)",
      "Meningioma",
      "Medulloblastoma",
      "Ependymoma",
      "Primary Central Nervous System Lymphoma",
      "Pituitary Tumors",
      "Brain Metastases from Other Cancers"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Previous exposure to high-dose radiation to the head",
      "Inherited genetic syndromes such as Neurofibromatosis or Li-Fraumeni syndrome",
      "Increasing age for most adult brain tumors"
    ],
    Modifiable: [],
    Infections: [],
    PreventionTips: [
      "Avoid unnecessary exposure to radiation",
      "Seek genetic counseling if strong family history exists",
      "Prompt evaluation of neurological symptoms"
    ]
  },

  Symptoms: {
    Early: [
      "Persistent headaches",
      "Nausea or vomiting",
      "Mild memory or concentration difficulties"
    ],
    Common: [
      "Seizures, especially new-onset seizures in adults",
      "Progressive headaches worse in the morning",
      "Vision problems such as blurred or double vision",
      "Speech or language difficulties",
      "Personality or behavior changes"
    ],
    Advanced: [
      "Weakness or paralysis of limbs",
      "Loss of coordination or balance",
      "Severe cognitive impairment",
      "Reduced consciousness"
    ],
    OrganSpecific: {
      Neurological: [
        "Weakness on one side of the body",
        "Difficulty speaking or understanding speech",
        "Sensory loss or numbness",
        "Difficulty swallowing"
      ]
    },
    WarningNote:
      "Any new seizure, worsening headache with vomiting, or progressive neurological deficit requires urgent medical evaluation."
  },

  Diagnosis: {
    Approach:
      "Diagnosis focuses on identifying the tumor, determining its type and grade, and planning safe treatment.",
    ClinicalEvaluation: [
      "Detailed neurological examination",
      "Assessment of motor, sensory, speech, and cognitive functions"
    ],
    Tests: [
      "Baseline blood investigations"
    ],
    Imaging: [
      "MRI brain with contrast (gold standard)",
      "CT scan brain for emergency evaluation",
      "Functional MRI and tractography in selected surgical cases",
      "PET scan in selected cases"
    ],
    Biopsy: [
      "Surgical biopsy or tumor resection",
      "Stereotactic biopsy for deep or inoperable tumors"
    ],
    MolecularTests: [
      "IDH mutation testing",
      "1p/19q co-deletion analysis",
      "MGMT promoter methylation",
      "ATRX and TP53 mutation analysis"
    ],
    Staging: [
      "Tumor grading based on WHO classification",
      "Assessment of local brain involvement"
    ]
  },

  Treatment: {
    Principle:
      "Treatment is individualized based on tumor type, grade, location, molecular profile, and patient condition.",
    Surgery: [
      "Maximal safe surgical resection",
      "Use of neuronavigation and intraoperative monitoring",
      "Awake craniotomy in selected cases"
    ],
    RadiationTherapy: [
      "External beam radiotherapy after surgery",
      "Stereotactic radiosurgery (Gamma Knife / CyberKnife)",
      "Whole brain radiotherapy for selected metastatic cases"
    ],
    SystemicTherapy: [
      "Chemotherapy such as temozolomide",
      "Targeted therapy for selected molecular alterations",
      "Immunotherapy in selected tumors",
      "Participation in clinical trials"
    ],
    SupportiveCare: [
      "Steroids to reduce brain swelling",
      "Anti-epileptic drugs for seizure control",
      "Pain management",
      "Neuro-rehabilitation therapies"
    ]
  },

  Prognosis: {
    Factors: [
      "Tumor type and grade",
      "Extent of surgical resection",
      "Molecular and genetic features",
      "Patient age and neurological status"
    ],
    Note:
      "Low-grade brain tumors may be controlled for many years, while high-grade tumors require aggressive multimodal treatment."
  },

  DosAndDonts: {
    Dos: [
      "Seek immediate care for new seizures or worsening neurological symptoms",
      "Follow medication schedules strictly",
      "Attend regular follow-up imaging",
      "Participate in rehabilitation programs",
      "Seek emotional and psychological support"
    ],
    Donts: [
      "Do not ignore severe headaches with vomiting",
      "Do not stop seizure or steroid medications abruptly",
      "Avoid driving if seizures are not controlled",
      "Do not rely on unproven alternative therapies"
    ]
  },

  FAQs: [
    {
      Question: "Are all brain tumors cancerous?",
      Answer:
        "No. Some brain tumors are benign, but they may still cause serious problems due to pressure on the brain."
    },
    {
      Question: "Can brain cancer be cured?",
      Answer:
        "Some brain tumors are curable, while others can be controlled for long periods with treatment."
    },
    {
      Question: "Do brain tumors spread outside the brain?",
      Answer:
        "Primary brain tumors rarely spread outside the brain, but other cancers commonly spread to the brain."
    },
    {
      Question: "Can seizures be controlled?",
      Answer:
        "Yes. Most patients achieve good seizure control with medications."
    }
  ]
},

"blood-cancer": {
  Name: "Blood Cancer (Hematological Malignancies)",

  Introduction:
    "Blood cancers, also known as hematological malignancies, are cancers that affect the blood, bone marrow, lymphatic system, and immune system. Unlike solid tumors, blood cancers interfere with normal blood cell production and function, leading to infections, anemia, bleeding, and organ involvement. Advances in chemotherapy, targeted therapy, immunotherapy, and stem cell transplantation have significantly improved survival and quality of life.",

  Overview: [
    "Blood cancers arise when abnormal blood-forming cells grow uncontrollably and crowd out healthy cells.",
    "They commonly originate in the bone marrow, lymph nodes, or circulating blood.",
    "Major categories include leukemia, lymphoma, and multiple myeloma.",
    "Some blood cancers are slow-growing, while others are aggressive and require urgent treatment.",
    "Management requires specialized hematology-oncology care, advanced diagnostics, and long-term follow-up."
  ],

  Classification: {
    Types: [
      "Leukemia",
      "Lymphoma",
      "Multiple Myeloma",
      "Myelodysplastic Syndromes",
      "Myeloproliferative Neoplasms"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Increasing age",
      "Male sex for some blood cancers",
      "Genetic conditions such as Down syndrome",
      "Family history of blood cancers"
    ],
    Modifiable: [
      "Exposure to benzene and industrial chemicals",
      "Previous chemotherapy or radiation therapy",
      "Chronic immune suppression"
    ],
    Infections: [
      "Epstein–Barr Virus (EBV)",
      "Human T-cell Lymphotropic Virus (HTLV-1)",
      "Human Immunodeficiency Virus (HIV)",
      "Chronic Hepatitis C infection"
    ],
    PreventionTips: [
      "Avoid unnecessary exposure to chemicals and radiation",
      "Use protective equipment in high-risk workplaces",
      "Maintain good immune health",
      "Seek early evaluation for persistent symptoms"
    ]
  },

  Symptoms: {
    Early: [
      "Persistent fatigue",
      "Mild fever",
      "General weakness",
      "Loss of appetite"
    ],
    Common: [
      "Unexplained weight loss",
      "Night sweats",
      "Frequent or severe infections",
      "Easy bruising or bleeding",
      "Pale skin due to anemia"
    ],
    Advanced: [
      "Swollen lymph nodes",
      "Bone pain or fractures",
      "Abdominal fullness from enlarged liver or spleen",
      "Severe infections",
      "Neurological symptoms in advanced disease"
    ],
    OrganSpecific: {
      BloodRelated: [
        "Shortness of breath due to anemia",
        "Frequent infections due to low white blood cells",
        "Bleeding gums or nosebleeds due to low platelets"
      ]
    },
    WarningNote:
      "Persistent fatigue, fever, bleeding, or swollen lymph nodes lasting more than a few weeks should be evaluated promptly."
  },

  Diagnosis: {
    Approach:
      "Diagnosis confirms the presence of blood cancer, identifies the specific subtype, and assesses disease extent.",
    ClinicalEvaluation: [
      "Detailed medical history and physical examination",
      "Assessment for lymph node enlargement and organomegaly"
    ],
    Tests: [
      "Complete blood count with peripheral smear",
      "Kidney and liver function tests"
    ],
    Imaging: [
      "Ultrasound or CT scan for organ involvement",
      "PET-CT for lymphoma staging",
      "MRI in selected cases"
    ],
    Biopsy: [
      "Bone marrow aspiration and biopsy",
      "Lymph node biopsy for lymphoma"
    ],
    MolecularTests: [
      "Flow cytometry immunophenotyping",
      "Cytogenetic and molecular analysis",
      "Mutation testing such as BCR-ABL, FLT3, NPM1"
    ],
    Staging: [
      "Disease-specific staging systems",
      "Risk stratification based on genetic features and response to therapy"
    ]
  },

  Treatment: {
    Principle:
      "Treatment is tailored to cancer type, aggressiveness, genetic features, patient age, and overall health.",
    Surgery: [
      "Surgery is rarely used except for diagnostic biopsy or splenectomy in selected cases"
    ],
    RadiationTherapy: [
      "Used in selected lymphomas or for symptom relief"
    ],
    SystemicTherapy: [
      "Chemotherapy as the backbone of treatment",
      "Targeted therapy such as tyrosine kinase inhibitors",
      "Immunotherapy including monoclonal antibodies and CAR-T cell therapy",
      "Maintenance therapy in selected cancers"
    ],
    SupportiveCare: [
      "Blood and platelet transfusions",
      "Infection prevention and treatment",
      "Growth factor support",
      "Bone-strengthening medications",
      "Psychological and nutritional support"
    ]
  },

  Prognosis: {
    Factors: [
      "Type and subtype of blood cancer",
      "Genetic and molecular risk profile",
      "Response to initial therapy",
      "Patient age and comorbid conditions"
    ],
    Note:
      "Many blood cancers are now chronic, controllable diseases, and several are potentially curable with modern therapies."
  },

  DosAndDonts: {
    Dos: [
      "Seek medical care for persistent fatigue, infections, or bleeding",
      "Follow treatment and monitoring schedules strictly",
      "Maintain good hygiene to reduce infection risk",
      "Stay physically active as tolerated",
      "Discuss fertility preservation when relevant"
    ],
    Donts: [
      "Do not ignore persistent symptoms",
      "Do not delay treatment for aggressive blood cancers",
      "Avoid unverified alternative treatments",
      "Do not stop medicines without medical advice"
    ]
  },

  FAQs: [
    {
      Question: "Are blood cancers curable?",
      Answer:
        "Many blood cancers are curable or controllable for long periods, especially with early diagnosis and modern therapies."
    },
    {
      Question: "Is blood cancer contagious?",
      Answer:
        "No. Blood cancers are not infectious and cannot spread from person to person."
    },
    {
      Question: "What is a bone marrow transplant?",
      Answer:
        "It is a procedure that replaces diseased bone marrow with healthy stem cells to restore normal blood formation."
    },
    {
      Question: "Is treatment lifelong?",
      Answer:
        "Some blood cancers require long-term treatment, while others need treatment for a defined period."
    }
  ]
},

"gastrointestinal-cancer": {
  Name: "Gastrointestinal (GI) Cancers",

  Introduction:
    "Gastrointestinal (GI) cancers affect the organs of the digestive system, including the esophagus, stomach, small intestine, large intestine (colon and rectum), pancreas, liver, gallbladder, and bile ducts. Together, these cancers account for a significant proportion of cancer-related illness worldwide. Early detection, lifestyle modification, and modern multidisciplinary treatment significantly improve outcomes.",

  Overview: [
    "GI cancers develop when cells lining the digestive tract or associated organs grow uncontrollably.",
    "They may invade nearby tissues or spread to distant organs such as the liver, lungs, or peritoneum.",
    "Common GI cancers include esophageal, gastric, colorectal, pancreatic, liver, gallbladder, and biliary tract cancers.",
    "Many GI cancers are linked to modifiable lifestyle factors and chronic infections.",
    "Because early symptoms are often mild or absent, screening and timely evaluation are crucial."
  ],

  Classification: {
    Types: [
      "Esophageal Cancer",
      "Stomach (Gastric) Cancer",
      "Colorectal Cancer",
      "Pancreatic Cancer",
      "Liver (Hepatocellular) Cancer",
      "Gallbladder Cancer",
      "Bile Duct (Cholangiocarcinoma)"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Increasing age",
      "Male sex for several GI cancers",
      "Family history of gastrointestinal cancers",
      "Inherited syndromes such as Lynch syndrome and Familial Adenomatous Polyposis",
      "Chronic inflammatory conditions such as inflammatory bowel disease or cirrhosis"
    ],
    Modifiable: [
      "Obesity and physical inactivity",
      "Diet high in processed or red meat and low in fiber",
      "Tobacco use",
      "Heavy alcohol consumption",
      "Poor dietary habits"
    ],
    Infections: [
      "Helicobacter pylori infection (stomach cancer)",
      "Chronic Hepatitis B and C infection (liver cancer)",
      "Certain parasitic infections affecting the liver and bile ducts"
    ],
    PreventionTips: [
      "Adopt a healthy, fiber-rich diet",
      "Maintain healthy body weight and exercise regularly",
      "Avoid smoking and limit alcohol intake",
      "Treat chronic infections such as H. pylori and viral hepatitis",
      "Participate in recommended cancer screening programs"
    ]
  },

  Symptoms: {
    Early: [
      "Often no symptoms in early stages",
      "Mild indigestion or discomfort"
    ],
    Common: [
      "Persistent abdominal pain or discomfort",
      "Bloating or feeling full quickly after meals",
      "Unintentional weight loss",
      "Loss of appetite",
      "Nausea or vomiting",
      "Changes in bowel habits"
    ],
    Advanced: [
      "Blood in stool or black, tarry stools",
      "Persistent vomiting or vomiting blood",
      "Severe abdominal pain",
      "Jaundice with yellowing of eyes or skin",
      "Abdominal swelling due to fluid accumulation"
    ],
    OrganSpecific: {
      Esophagus: [
        "Difficulty swallowing",
        "Chest pain",
        "Regurgitation of food"
      ],
      Stomach: [
        "Early satiety",
        "Upper abdominal pain",
        "Black stools"
      ],
      Colorectal: [
        "Rectal bleeding",
        "Change in stool caliber",
        "Iron-deficiency anemia"
      ],
      Pancreas: [
        "Upper abdominal or back pain",
        "New-onset diabetes",
        "Jaundice"
      ],
      LiverAndBiliary: [
        "Right upper abdominal pain",
        "Itching",
        "Dark urine and pale stools"
      ]
    },
    WarningNote:
      "Persistent digestive symptoms, unexplained weight loss, blood in stool, or jaundice lasting more than a few weeks require medical evaluation."
  },

  Diagnosis: {
    Approach:
      "Diagnosis aims to confirm cancer, determine the exact organ involved, and assess disease stage.",
    ClinicalEvaluation: [
      "Detailed medical history and physical examination",
      "Abdominal examination and assessment of nutritional status"
    ],
    Tests: [
      "Complete blood count",
      "Liver and kidney function tests",
      "Tumor markers such as CEA, CA 19-9, and AFP"
    ],
    Imaging: [
      "Ultrasound of abdomen",
      "CT scan of chest, abdomen, and pelvis",
      "MRI for liver and biliary tumors",
      "PET-CT in selected cases"
    ],
    Biopsy: [
      "Endoscopic biopsy",
      "Image-guided biopsy",
      "Fine needle aspiration where appropriate"
    ],
    EndoscopicProcedures: [
      "Upper GI endoscopy",
      "Colonoscopy or sigmoidoscopy",
      "Endoscopic ultrasound in selected cases"
    ],
    Staging: [
      "TNM staging system",
      "Assessment of lymph node and distant organ involvement"
    ]
  },

  Treatment: {
    Principle:
      "Treatment is individualized based on cancer type, stage, molecular profile, and patient fitness, often using a combination of therapies.",
    Surgery: [
      "Esophagectomy for esophageal cancer",
      "Gastrectomy for stomach cancer",
      "Colectomy or rectal resection for colorectal cancer",
      "Pancreaticoduodenectomy (Whipple procedure)",
      "Liver resection or transplantation in selected cases"
    ],
    RadiationTherapy: [
      "Combined with chemotherapy for rectal and esophageal cancers",
      "Palliative radiotherapy for bleeding or pain"
    ],
    SystemicTherapy: [
      "Chemotherapy before or after surgery",
      "Targeted therapy such as HER2, EGFR, and VEGF inhibitors",
      "Immunotherapy for selected advanced GI cancers"
    ],
    SupportiveCare: [
      "Nutritional support and diet counseling",
      "Pain management",
      "Management of bowel obstruction or jaundice",
      "Psychological and palliative care support"
    ]
  },

  Prognosis: {
    Factors: [
      "Cancer type and stage at diagnosis",
      "Tumor biology and molecular features",
      "Response to treatment",
      "Overall health and nutritional status"
    ],
    Note:
      "Early-stage GI cancers are often curable, while advanced cancers can frequently be controlled with modern treatment strategies."
  },

  DosAndDonts: {
    Dos: [
      "Seek early evaluation for persistent digestive symptoms",
      "Participate in screening programs such as colonoscopy",
      "Maintain a balanced diet and healthy weight",
      "Adhere to treatment and follow-up schedules",
      "Report side effects promptly"
    ],
    Donts: [
      "Do not ignore blood in stool or black stools",
      "Do not self-medicate for prolonged digestive symptoms",
      "Avoid smoking and excessive alcohol consumption",
      "Do not stop treatment without medical advice"
    ]
  },

  FAQs: [
    {
      Question: "What are GI cancers?",
      Answer:
        "They are cancers arising from the digestive tract and associated organs such as the pancreas, liver, gallbladder, and bile ducts."
    },
    {
      Question: "Are GI cancers preventable?",
      Answer:
        "Risk can be significantly reduced with healthy lifestyle habits, screening, and treatment of chronic infections."
    },
    {
      Question: "When should I seek medical help?",
      Answer:
        "If symptoms such as unexplained weight loss, persistent abdominal pain, blood in stool, or jaundice persist for more than a few weeks."
    },
    {
      Question: "Is endoscopy painful?",
      Answer:
        "Most endoscopic procedures are done under sedation and are generally well tolerated."
    }
  ]
},

"urological-cancer": {
  Name: "Urological Cancers",

  Introduction:
    "Urological cancers arise from the organs of the urinary system and the male reproductive system. These include cancers of the prostate, bladder, kidney, testis, penis, ureter, and urethra. Many urological cancers are highly treatable and even curable when detected early. Advances in imaging, minimally invasive surgery, targeted therapy, and immunotherapy have significantly improved outcomes and quality of life.",

  Overview: [
    "Urological cancers develop when abnormal cells grow uncontrollably in the urinary tract or male reproductive organs.",
    "They affect both men and women, although some cancers such as prostate and testicular cancer occur only in men.",
    "Common urological cancers include prostate cancer, bladder cancer, kidney (renal) cancer, and testicular cancer.",
    "Symptoms may be mild or absent in early stages, making screening and awareness essential.",
    "Management typically involves a multidisciplinary team including urologists, medical oncologists, radiation oncologists, and supportive care specialists."
  ],

  Classification: {
    Types: [
      "Prostate Cancer",
      "Bladder Cancer",
      "Kidney (Renal Cell) Cancer",
      "Testicular Cancer",
      "Penile Cancer",
      "Ureteric Cancer",
      "Urethral Cancer"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Increasing age, especially for prostate, bladder, and kidney cancers",
      "Male sex",
      "Family history of urological cancers",
      "Inherited genetic syndromes such as BRCA mutations (prostate) and von Hippel–Lindau disease (kidney)"
    ],
    Modifiable: [
      "Cigarette smoking (major risk factor for bladder and kidney cancer)",
      "Occupational exposure to dyes, rubber, leather, and industrial chemicals",
      "Obesity and sedentary lifestyle",
      "Poorly controlled high blood pressure",
      "Chronic bladder irritation or infections"
    ],
    Infections: [
      "Human Papillomavirus (HPV) infection (penile cancer)",
      "Chronic schistosomiasis infection (bladder cancer in endemic regions)"
    ],
    PreventionTips: [
      "Quit smoking",
      "Maintain healthy body weight and stay physically active",
      "Control blood pressure and diabetes",
      "Use protective equipment in high-risk occupations",
      "Seek early evaluation for urinary symptoms",
      "Regular screening for prostate cancer in appropriate age groups"
    ]
  },

  Symptoms: {
    Early: [
      "Often no symptoms in early stages",
      "Mild urinary discomfort"
    ],
    Common: [
      "Blood in urine (visible or microscopic)",
      "Difficulty or pain during urination",
      "Increased frequency or urgency of urination",
      "Lower back or flank pain",
      "Unexplained weight loss",
      "Fatigue"
    ],
    Advanced: [
      "Bone pain due to spread",
      "Swelling of legs",
      "Severe urinary obstruction",
      "Loss of appetite and weakness"
    ],
    OrganSpecific: {
      Prostate: [
        "Weak urine stream",
        "Difficulty starting urination",
        "Frequent urination at night",
        "Blood in urine or semen"
      ],
      Bladder: [
        "Painless hematuria",
        "Burning sensation during urination",
        "Urgency and frequency"
      ],
      Kidney: [
        "Persistent flank pain",
        "Abdominal mass",
        "Fever of unknown origin"
      ],
      Testis: [
        "Painless lump or swelling in the testicle",
        "Heaviness in the scrotum",
        "Discomfort in the groin or lower abdomen"
      ]
    },
    WarningNote:
      "Any blood in urine, testicular lump, or persistent urinary symptoms should be evaluated promptly."
  },

  Diagnosis: {
    Approach:
      "Diagnosis aims to confirm cancer, determine its type and stage, and guide appropriate treatment planning.",
    ClinicalEvaluation: [
      "Detailed medical and urinary history",
      "Physical examination including digital rectal examination when indicated"
    ],
    Tests: [
      "Urine routine examination and cytology",
      "Blood tests including kidney function tests",
      "Tumor markers such as PSA for prostate cancer and AFP or β-hCG for testicular cancer"
    ],
    Imaging: [
      "Ultrasound of abdomen and pelvis",
      "CT scan or MRI for local and distant staging",
      "PET-CT in selected advanced cases",
      "Bone scan when bone metastasis is suspected"
    ],
    Biopsy: [
      "Prostate biopsy (TRUS-guided or MRI-guided)",
      "Biopsy of kidney or bladder tumors when indicated"
    ],
    EndoscopicProcedures: [
      "Cystoscopy for bladder cancer diagnosis and surveillance"
    ],
    Staging: [
      "TNM staging system",
      "Risk stratification to guide treatment decisions"
    ]
  },

  Treatment: {
    Principle:
      "Treatment depends on cancer type, stage, grade, patient health, and personal preferences, often involving multimodal therapy.",
    Surgery: [
      "Radical prostatectomy for prostate cancer",
      "Transurethral resection of bladder tumor (TURBT)",
      "Radical cystectomy for advanced bladder cancer",
      "Partial or radical nephrectomy for kidney cancer",
      "Orchidectomy for testicular cancer",
      "Minimally invasive and robotic surgical techniques when feasible"
    ],
    RadiationTherapy: [
      "External beam radiotherapy for prostate and bladder cancers",
      "Brachytherapy for selected prostate cancers",
      "Palliative radiation therapy for symptom control"
    ],
    SystemicTherapy: [
      "Chemotherapy for bladder and testicular cancers",
      "Hormonal therapy for prostate cancer",
      "Targeted therapy for kidney cancer",
      "Immunotherapy for bladder and kidney cancers"
    ],
    SupportiveCare: [
      "Pain management",
      "Management of urinary symptoms",
      "Sexual health and fertility counseling",
      "Psychological support and rehabilitation"
    ]
  },

  Prognosis: {
    Factors: [
      "Cancer type and stage at diagnosis",
      "Tumor grade and molecular features",
      "Response to treatment",
      "Overall health and age of the patient"
    ],
    Note:
      "Many urological cancers have excellent outcomes when detected early, and advanced cases can often be controlled with modern therapies."
  },

  DosAndDonts: {
    Dos: [
      "Seek medical care for blood in urine or urinary symptoms",
      "Participate in recommended cancer screening programs",
      "Follow prescribed treatment and follow-up schedules",
      "Maintain hydration and a healthy lifestyle",
      "Discuss fertility and sexual health concerns openly with doctors"
    ],
    Donts: [
      "Do not ignore painless blood in urine",
      "Do not delay evaluation of testicular lumps",
      "Avoid smoking and excessive alcohol consumption",
      "Do not stop treatment without consulting your medical team"
    ]
  },

  FAQs: [
    {
      Question: "Are urological cancers curable?",
      Answer:
        "Yes. Many urological cancers, especially prostate and testicular cancer, are highly curable when detected early."
    },
    {
      Question: "Is blood in urine always cancer?",
      Answer:
        "No, but it should always be evaluated to rule out serious conditions including cancer."
    },
    {
      Question: "Do all prostate cancers require treatment?",
      Answer:
        "No. Some low-risk prostate cancers can be safely monitored with active surveillance."
    },
    {
      Question: "Can kidney cancer be treated without removing the entire kidney?",
      Answer:
        "Yes. Partial nephrectomy or ablation techniques may be used in selected cases."
    }
  ]
},

"bone-soft-tissue-cancer": {
  Name: "Bone & Soft Tissue Cancers (Sarcomas)",

  Introduction:
    "Bone and soft tissue cancers, collectively known as sarcomas, are rare cancers that arise from connective tissues such as bone, muscle, fat, cartilage, blood vessels, nerves, and other supporting tissues. Although uncommon, sarcomas can occur at any age and require specialized, multidisciplinary care for optimal outcomes.",

  Overview: [
    "Sarcomas develop when cells of bone or soft tissues grow uncontrollably and form malignant tumors.",
    "They can occur anywhere in the body, most commonly in the arms, legs, pelvis, chest wall, and retroperitoneum.",
    "Sarcomas behave differently from more common epithelial cancers and require specialized diagnosis and treatment.",
    "Early diagnosis and treatment at experienced cancer centers improve survival, limb preservation, and quality of life.",
    "Management involves coordination between surgical oncologists, orthopedic oncologists, medical oncologists, radiation oncologists, radiologists, pathologists, and rehabilitation specialists."
  ],

  Classification: {
    Types: [
      "Osteosarcoma",
      "Ewing Sarcoma",
      "Chondrosarcoma",
      "Chordoma",
      "Liposarcoma",
      "Leiomyosarcoma",
      "Rhabdomyosarcoma",
      "Synovial Sarcoma",
      "Angiosarcoma",
      "Malignant Peripheral Nerve Sheath Tumor"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Inherited genetic syndromes such as Li-Fraumeni syndrome, hereditary retinoblastoma, and neurofibromatosis",
      "Previous radiation therapy (radiation-induced sarcoma)",
      "Certain inherited bone disorders such as Paget’s disease",
      "Increasing age for many soft tissue sarcomas"
    ],
    Modifiable: [
      "Chronic lymphedema",
      "Exposure to chemicals such as vinyl chloride, arsenic, or dioxins",
      "Chronic inflammation or long-standing tissue injury"
    ],
    Infections: [],
    PreventionTips: [
      "Seek evaluation for any persistent or enlarging lump",
      "Avoid unnecessary radiation exposure",
      "Follow-up regularly if you have known genetic risk factors"
    ]
  },

  Symptoms: {
    Early: [
      "Painless lump or swelling that slowly increases in size",
      "Mild discomfort in affected area"
    ],
    Common: [
      "Persistent or worsening bone pain",
      "Restricted movement of nearby joints",
      "Increasing size of a mass",
      "Swelling or tenderness"
    ],
    Advanced: [
      "Severe pain",
      "Pathological fractures after minimal trauma",
      "Nerve compression symptoms",
      "Unexplained weight loss and fatigue"
    ],
    OrganSpecific: {
      Limbs: [
        "Growing mass in arm or leg",
        "Pain or difficulty using the limb"
      ],
      AbdomenOrPelvis: [
        "Abdominal fullness",
        "Bowel or urinary symptoms due to pressure"
      ],
      Spine: [
        "Back pain",
        "Weakness or numbness due to nerve compression"
      ]
    },
    WarningNote:
      "Any lump larger than 5 cm, rapidly growing mass, or persistent bone pain should be evaluated urgently."
  },

  Diagnosis: {
    Approach:
      "Accurate diagnosis requires appropriate imaging and biopsy, preferably at a specialized sarcoma center.",
    ClinicalEvaluation: [
      "Detailed history and physical examination",
      "Assessment of mass size, depth, and mobility"
    ],
    Tests: [
      "Baseline blood investigations"
    ],
    Imaging: [
      "X-ray for suspected bone tumors",
      "MRI to assess local extent and relation to nerves and blood vessels",
      "CT scan for bone detail and lung metastasis evaluation",
      "PET-CT in selected cases"
    ],
    Biopsy: [
      "Core needle biopsy performed by experienced teams",
      "Incisional biopsy when required",
      "Careful biopsy planning to avoid compromising future surgery"
    ],
    MolecularTests: [
      "Immunohistochemistry for sarcoma subtype",
      "Molecular testing for specific translocations (e.g., EWSR1, SYT-SSX)"
    ],
    Staging: [
      "Assessment of tumor size, grade, depth, lymph node involvement, and distant metastasis",
      "Lungs are the most common site of spread"
    ]
  },

  Treatment: {
    Principle:
      "Treatment is individualized based on sarcoma type, grade, size, location, and patient factors. Multimodal therapy is often required.",
    Surgery: [
      "Wide local excision with negative margins",
      "Limb-sparing surgery whenever feasible",
      "Amputation only in selected advanced cases",
      "Complex reconstruction using grafts, flaps, or prostheses"
    ],
    RadiationTherapy: [
      "Preoperative or postoperative radiotherapy to reduce local recurrence",
      "Advanced techniques such as IMRT or proton therapy in selected cases"
    ],
    SystemicTherapy: [
      "Chemotherapy for high-grade sarcomas such as osteosarcoma and Ewing sarcoma",
      "Targeted therapy for specific subtypes (e.g., imatinib for GIST)",
      "Immunotherapy in selected advanced or refractory cases",
      "Clinical trial participation when appropriate"
    ],
    SupportiveCare: [
      "Pain management",
      "Physiotherapy and occupational therapy",
      "Psychological counseling",
      "Prosthetic and orthotic support if required"
    ]
  },

  Prognosis: {
    Factors: [
      "Sarcoma subtype and grade",
      "Tumor size and location",
      "Completeness of surgical removal",
      "Response to chemotherapy or radiotherapy",
      "Presence of metastasis at diagnosis"
    ],
    Note:
      "Early-stage sarcomas treated at specialized centers have favorable outcomes, while advanced disease requires aggressive multimodal treatment."
  },

  DosAndDonts: {
    Dos: [
      "Seek early medical evaluation for any growing lump or persistent bone pain",
      "Ensure biopsy and treatment are performed at a specialized sarcoma center",
      "Follow rehabilitation and physiotherapy programs",
      "Attend regular follow-up imaging and visits",
      "Seek emotional and social support"
    ],
    Donts: [
      "Do not ignore painless lumps",
      "Do not undergo unplanned biopsy or surgery at non-specialized centers",
      "Do not delay treatment for rapidly growing tumors",
      "Avoid unproven alternative therapies"
    ]
  },

  FAQs: [
    {
      Question: "Are bone and soft tissue sarcomas common?",
      Answer:
        "No. Sarcomas are rare, accounting for less than 1% of adult cancers, but they require specialized care."
    },
    {
      Question: "Can limbs be preserved in bone cancer?",
      Answer:
        "Yes. With modern limb-sparing surgery and reconstruction, most patients can avoid amputation."
    },
    {
      Question: "Do sarcomas spread early?",
      Answer:
        "High-grade sarcomas can spread, most commonly to the lungs, highlighting the importance of early diagnosis."
    },
    {
      Question: "Is chemotherapy always required?",
      Answer:
        "Not always. Chemotherapy use depends on sarcoma subtype and grade."
    }
  ]
},

"gynecological-cancer": {
  Name: "Gynecological Cancers",

  Introduction:
    "Gynecological cancers are cancers that arise from the female reproductive organs, including the cervix, ovaries, uterus (endometrium), vagina, vulva, and fallopian tubes. These cancers affect women across different age groups and often present with subtle or non-specific symptoms. Early detection through awareness, screening, and timely medical care significantly improves outcomes. Modern treatments combining surgery, radiation, chemotherapy, targeted therapy, and immunotherapy have led to substantial advances in survival and quality of life.",

  Overview: [
    "Gynecological cancers develop when abnormal cells grow uncontrollably in the female reproductive organs.",
    "The most common gynecological cancers are cervical, ovarian, and endometrial (uterine) cancers.",
    "Some gynecological cancers are preventable through vaccination and routine screening.",
    "Symptoms may overlap with benign gynecological conditions, leading to delayed diagnosis.",
    "Management requires a multidisciplinary team including gynecologic oncologists, medical oncologists, radiation oncologists, radiologists, pathologists, and supportive care specialists."
  ],

  Classification: {
    Types: [
      "Cervical Cancer",
      "Ovarian Cancer",
      "Endometrial (Uterine) Cancer",
      "Vaginal Cancer",
      "Vulvar Cancer",
      "Fallopian Tube Cancer",
      "Gestational Trophoblastic Disease"
    ]
  },

  RiskFactors: {
    NonModifiable: [
      "Increasing age",
      "Family history of breast, ovarian, or uterine cancer",
      "Inherited genetic mutations such as BRCA1, BRCA2, and Lynch syndrome",
      "Early menarche or late menopause"
    ],
    Modifiable: [
      "Human Papillomavirus (HPV) infection",
      "Obesity and sedentary lifestyle",
      "Hormonal imbalance and prolonged estrogen exposure",
      "Smoking",
      "Poorly controlled diabetes and metabolic disorders"
    ],
    Infections: [
      "Human Papillomavirus (HPV) infection (cervical and vulvar cancer)"
    ],
    PreventionTips: [
      "HPV vaccination",
      "Regular cervical screening (Pap smear and HPV testing)",
      "Maintaining healthy body weight",
      "Managing hormonal and metabolic conditions",
      "Seeking early evaluation for abnormal gynecological symptoms"
    ]
  },

  Symptoms: {
    Early: [
      "Often asymptomatic in early stages",
      "Mild pelvic discomfort"
    ],
    Common: [
      "Abnormal vaginal bleeding",
      "Pelvic or lower abdominal pain",
      "Abnormal vaginal discharge",
      "Abdominal bloating",
      "Loss of appetite and fatigue"
    ],
    Advanced: [
      "Persistent pelvic pain",
      "Unintentional weight loss",
      "Bowel or bladder symptoms due to local spread",
      "Leg swelling",
      "Breathlessness in advanced disease"
    ],
    OrganSpecific: {
      Cervix: [
        "Post-coital bleeding",
        "Intermenstrual bleeding",
        "Foul-smelling vaginal discharge"
      ],
      Ovary: [
        "Abdominal bloating",
        "Early satiety",
        "Increased urinary frequency"
      ],
      Endometrium: [
        "Heavy or irregular menstrual bleeding",
        "Bleeding after menopause"
      ],
      VulvaAndVagina: [
        "Persistent itching or burning",
        "Skin changes or ulcers",
        "Pain during intercourse"
      ]
    },
    WarningNote:
      "Any abnormal vaginal bleeding, persistent pelvic pain, or abdominal bloating lasting more than a few weeks should be medically evaluated."
  },

  Diagnosis: {
    Approach:
      "Diagnosis involves confirming the cancer type, determining disease extent, and planning appropriate treatment.",
    ClinicalEvaluation: [
      "Detailed gynecological and menstrual history",
      "Pelvic and speculum examination"
    ],
    Tests: [
      "Pap smear and HPV testing",
      "Blood tests including tumor markers such as CA-125 in selected cases"
    ],
    Imaging: [
      "Pelvic ultrasound",
      "CT scan or MRI for staging",
      "PET-CT in selected advanced cases"
    ],
    Biopsy: [
      "Cervical biopsy",
      "Endometrial biopsy",
      "Image-guided biopsy for ovarian or pelvic masses"
    ],
    MolecularTests: [
      "BRCA mutation testing in ovarian cancer",
      "Mismatch repair (MMR) testing in endometrial cancer"
    ],
    Staging: [
      "FIGO staging system",
      "Assessment of lymph node and distant organ involvement"
    ]
  },

  Treatment: {
    Principle:
      "Treatment is individualized based on cancer type, stage, patient age, fertility wishes, and overall health.",
    Surgery: [
      "Radical hysterectomy for cervical cancer",
      "Total hysterectomy with bilateral salpingo-oophorectomy",
      "Cytoreductive (debulking) surgery for ovarian cancer",
      "Fertility-preserving surgery in selected early-stage cases"
    ],
    RadiationTherapy: [
      "External beam radiotherapy for cervical and endometrial cancers",
      "Brachytherapy for cervical cancer",
      "Palliative radiotherapy for symptom control"
    ],
    SystemicTherapy: [
      "Chemotherapy for ovarian, cervical, and advanced uterine cancers",
      "Targeted therapy such as PARP inhibitors for BRCA-mutated ovarian cancer",
      "Immunotherapy for selected recurrent or advanced cancers",
      "Hormonal therapy for hormone-sensitive uterine cancers"
    ],
    SupportiveCare: [
      "Pain management",
      "Management of treatment-related side effects",
      "Psychological and sexual health counseling",
      "Fertility and menopause counseling",
      "Nutritional and rehabilitative support"
    ]
  },

  Prognosis: {
    Factors: [
      "Cancer type and stage at diagnosis",
      "Tumor biology and genetic features",
      "Response to initial treatment",
      "Patient age and comorbidities"
    ],
    Note:
      "Gynecological cancers detected early have high cure rates, and outcomes continue to improve with modern therapies."
  },

  DosAndDonts: {
    Dos: [
      "Attend regular gynecological check-ups and screenings",
      "Seek early medical advice for abnormal bleeding or pelvic pain",
      "Complete prescribed treatment and follow-up",
      "Maintain healthy lifestyle and body weight",
      "Discuss fertility and sexual health concerns openly with doctors"
    ],
    Donts: [
      "Do not ignore abnormal vaginal bleeding",
      "Do not delay Pap smear or HPV testing",
      "Avoid smoking",
      "Do not stop treatment without medical consultation"
    ]
  },

  FAQs: [
    {
      Question: "Are gynecological cancers preventable?",
      Answer:
        "Some, such as cervical cancer, are largely preventable through HPV vaccination and regular screening."
    },
    {
      Question: "Can fertility be preserved?",
      Answer:
        "Yes. Fertility-preserving treatment is possible in selected early-stage cases."
    },
    {
      Question: "Is ovarian cancer always detected late?",
      Answer:
        "Not always, but early symptoms are subtle and require awareness."
    },
    {
      Question: "Can women live normally after treatment?",
      Answer:
        "Yes. Many women resume normal lives with appropriate treatment, follow-up, and support."
    }
  ]
},

};

export default cancerData;
