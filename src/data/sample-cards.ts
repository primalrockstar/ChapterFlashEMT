import { FlashcardData } from '@/components/flashcard/Flashcard'import { FlashcardData } from '@/components/flashcard/Flashcard'



export const sampleFlashcards: FlashcardData[] = [export const sampleFlashcards: FlashcardData[] = [

  {  {

    id: "1",    id: "1",

    question: "What is the normal adult resting heart rate range?",    question: "What is the normal adult resting heart rate range?",

    answer: "60-100 beats per minute. In healthy adults, the resting heart rate typically falls within this range. Trained athletes may have lower resting rates.",    answer: "60-100 beats per minute. In healthy adults, the resting heart rate typically falls within this range. Trained athletes may have lower resting rates.",

    difficulty: "Basic",    difficulty: "Basic",

    type: "definition",    type: "definition",

    tags: ["vital-signs", "assessment", "cardiology"],    tags: ["vital-signs", "assessment", "cardiology"],

    chapterNumber: 10,    chapterNumber: 8,

    chapterTitle: "Comprehensive Patient Evaluation"    chapterTitle: "Patient Assessment"

  },  },

  {  {

    id: "2",     id: "2", 

    question: "A 45-year-old patient is experiencing crushing chest pain, shortness of breath, and nausea. What condition should you suspect?",    question: "A 45-year-old patient is experiencing crushing chest pain, shortness of breath, and nausea. What condition should you suspect?",

    answer: "Myocardial Infarction (Heart Attack). These are classic signs of acute myocardial infarction. Provide high-flow oxygen, aspirin if not contraindicated, and immediate transport.",    answer: "Myocardial Infarction (Heart Attack). These are classic signs of acute myocardial infarction. Provide high-flow oxygen, aspirin if not contraindicated, and immediate transport.",

    difficulty: "Intermediate",    difficulty: "Intermediate",

    type: "scenario",    type: "scenario",

    tags: ["emergency", "cardiology", "protocol", "treatment"],    tags: ["emergency", "cardiology", "protocol", "treatment"],

    chapterNumber: 17,    chapterNumber: 16,

    chapterTitle: "Cardiovascular Emergency Management"    chapterTitle: "Cardiovascular Emergencies"

  },  },

  {  {

    id: "3",    id: "3",

    question: "What does the mnemonic OPQRST stand for in pain assessment?",    question: "What does the mnemonic OPQRST stand for in pain assessment?",

    answer: "Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Time. This systematic approach helps gather comprehensive information about a patient's pain.",    answer: "Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Time. This systematic approach helps gather comprehensive information about a patient's pain.",

    difficulty: "Basic",    difficulty: "Basic",

    type: "definition",    type: "definition",

    tags: ["assessment", "pain", "mnemonic"],    tags: ["assessment", "pain", "mnemonic"],

    chapterNumber: 10,    chapterNumber: 8,

    chapterTitle: "Comprehensive Patient Evaluation"    chapterTitle: "Patient Assessment"

  },  },

  {  {

    id: "4",    id: "4",

    question: "You arrive at a scene where a patient has been exposed to carbon monoxide. What is your immediate priority?",    question: "You arrive at a scene where a patient has been exposed to carbon monoxide. What is your immediate priority?",

    answer: "Remove the patient from the contaminated environment immediately. Ensure scene safety first, then provide high-flow oxygen via non-rebreather mask.",    answer: "Remove the patient from the contaminated environment immediately. Ensure scene safety first, then provide high-flow oxygen via non-rebreather mask.",

    difficulty: "Advanced",    difficulty: "Advanced",

    type: "scenario",     type: "scenario", 

    tags: ["emergency", "hazmat", "protocol", "safety"],    tags: ["emergency", "hazmat", "protocol", "safety"],

    chapterNumber: 22,    chapterNumber: 21,

    chapterTitle: "Toxicological Emergencies"    chapterTitle: "Toxicology"

  },  },

  {  {

    id: "5",    id: "5",

    question: "What is the correct ratio for adult CPR compressions to ventilations?",    question: "What is the correct ratio for adult CPR compressions to ventilations?",

    answer: "30:2 - Thirty chest compressions followed by two rescue breaths. Compressions should be at least 2 inches deep at a rate of 100-120 per minute.",    answer: "30:2 - Thirty chest compressions followed by two rescue breaths. Compressions should be at least 2 inches deep at a rate of 100-120 per minute.",

    difficulty: "Basic",    difficulty: "Basic",

    type: "application",    type: "application",

    tags: ["emergency", "cpr", "protocol", "procedure"],    tags: ["emergency", "cpr", "protocol", "procedure"],

    chapterNumber: 14,    chapterNumber: 13,

    chapterTitle: "BLS Life Support Protocols"    chapterTitle: "BLS Resuscitation"

  },  },

  {  {

    id: "6",    id: "6",

    question: "A patient presents with altered mental status, fruity breath odor, and rapid deep breathing. What condition do you suspect?",    question: "A patient presents with altered mental status, fruity breath odor, and rapid deep breathing. What condition do you suspect?",

    answer: "Diabetic Ketoacidosis (DKA). The fruity breath odor (acetone) and Kussmaul respirations are classic signs. Check blood glucose and transport immediately.",    answer: "Diabetic Ketoacidosis (DKA). The fruity breath odor (acetone) and Kussmaul respirations are classic signs. Check blood glucose and transport immediately.",

    difficulty: "Intermediate",    difficulty: "Intermediate",

    type: "recognition",    type: "recognition",

    tags: ["medical", "diabetes", "assessment", "endocrine"],    tags: ["medical", "diabetes", "assessment", "endocrine"],

    chapterNumber: 20,    chapterNumber: 19,

    chapterTitle: "Metabolic & Hematologic Emergencies"    chapterTitle: "Endocrine Emergencies"

  },  },

  {  {

    id: "7",    id: "7",

    question: "What is the pediatric normal respiratory rate for a 2-year-old child?",    question: "What is the pediatric normal respiratory rate for a 2-year-old child?",

    answer: "20-30 breaths per minute. Toddlers (1-3 years) have higher normal respiratory rates compared to adults (12-20 bpm).",    answer: "20-30 breaths per minute. Toddlers (1-3 years) have higher normal respiratory rates compared to adults (12-20 bpm).",

    difficulty: "Basic",    difficulty: "Basic",

    type: "definition",    type: "definition",

    tags: ["pediatric", "vital-signs", "assessment"],    tags: ["pediatric", "vital-signs", "assessment"],

    chapterNumber: 35,    chapterNumber: 31,

    chapterTitle: "Pediatric Emergency Response"    chapterTitle: "Pediatric Emergencies"

  },  },

  {  {

    id: "8",    id: "8",

    question: "You suspect a patient has a pneumothorax. What assessment findings would support this?",    question: "You suspect a patient has a pneumothorax. What assessment findings would support this?",

    answer: "Diminished or absent breath sounds on affected side, chest pain, shortness of breath, possible tracheal deviation (tension pneumothorax), and unequal chest rise.",    answer: "Diminished or absent breath sounds on affected side, chest pain, shortness of breath, possible tracheal deviation (tension pneumothorax), and unequal chest rise.",

    difficulty: "Advanced",     difficulty: "Advanced", 

    type: "recognition",    type: "recognition",

    tags: ["respiratory", "trauma", "assessment", "emergency"],    tags: ["respiratory", "trauma", "assessment", "emergency"],

    chapterNumber: 16,    chapterNumber: 17,

    chapterTitle: "Respiratory Emergency Protocols"    chapterTitle: "Respiratory Emergencies"

  },  },

  {  {

    id: "9",    id: "9",

    question: "What medication can EMT-Basics assist patients in taking for chest pain?",    question: "What medication can EMT-Basics assist patients in taking for chest pain?",

    answer: "Nitroglycerin (if prescribed to patient and not contraindicated). Check blood pressure first - do not give if systolic BP is below 100 mmHg or if patient has taken erectile dysfunction medications.",    answer: "Nitroglycerin (if prescribed to patient and not contraindicated). Check blood pressure first - do not give if systolic BP is below 100 mmHg or if patient has taken erectile dysfunction medications.",

    difficulty: "Intermediate",    difficulty: "Intermediate",

    type: "application",    type: "application",

    tags: ["medication", "protocol", "cardiology", "treatment"],    tags: ["medication", "protocol", "cardiology", "treatment"],

    chapterNumber: 17,    chapterNumber: 16,

    chapterTitle: "Cardiovascular Emergency Management"    chapterTitle: "Cardiovascular Emergencies"

  },  },

  {  {

    id: "10",    id: "10",

    question: "During the primary assessment, what does AVPU stand for?",    question: "During the primary assessment, what does AVPU stand for?",

    answer: "Alert, Verbal, Painful, Unresponsive. This scale assesses the patient's level of consciousness quickly during initial evaluation.",    answer: "Alert, Verbal, Painful, Unresponsive. This scale assesses the patient's level of consciousness quickly during initial evaluation.",

    difficulty: "Basic",    difficulty: "Basic",

    type: "definition",     type: "definition", 

    tags: ["assessment", "consciousness", "mnemonic"],    tags: ["assessment", "consciousness", "mnemonic"],

    chapterNumber: 10,    chapterNumber: 8,

    chapterTitle: "Comprehensive Patient Evaluation"    chapterTitle: "Patient Assessment"

  },  },

  {  {

    id: "11",    id: "11",

    question: "A pregnant woman in her third trimester complains of severe abdominal pain and vaginal bleeding. What do you suspect?",    question: "A pregnant woman in her third trimester complains of severe abdominal pain and vaginal bleeding. What do you suspect?",

    answer: "Abruptio placentae (placental abruption). This is a life-threatening emergency for both mother and baby. Provide immediate transport, IV access, and high-flow oxygen.",    answer: "Abruptio placentae (placental abruption). This is a life-threatening emergency for both mother and baby. Provide immediate transport, IV access, and high-flow oxygen.",

    difficulty: "Advanced",    difficulty: "Advanced",

    type: "scenario",    type: "scenario",

    tags: ["obstetric", "emergency", "bleeding", "pregnancy"],    tags: ["obstetric", "emergency", "bleeding", "pregnancy"],

    chapterNumber: 34,    chapterNumber: 33,

    chapterTitle: "Obstetric & Neonatal Emergencies"    chapterTitle: "Obstetrics and Neonatal Care"

  },  },

  {  {

    id: "12",    id: "12",

    question: "What is the correct hand placement for adult chest compressions?",    question: "What is the correct hand placement for adult chest compressions?",

    answer: "Lower half of the breastbone (sternum), between the nipples. Use the heel of one hand with the other hand on top, fingers interlaced.",    answer: "Lower half of the breastbone (sternum), between the nipples. Use the heel of one hand with the other hand on top, fingers interlaced.",

    difficulty: "Basic",    difficulty: "Basic",

    type: "application",    type: "application",

    tags: ["cpr", "procedure", "protocol"],    tags: ["cpr", "procedure", "protocol"],

    chapterNumber: 14,    chapterNumber: 13,

    chapterTitle: "BLS Life Support Protocols"    chapterTitle: "BLS Resuscitation"

  },  },

  {  {

    id: "13",     id: "13", 

    question: "A patient with diabetes is conscious but confused with pale, cool, clammy skin. Blood glucose reads 45 mg/dL. What treatment should you provide?",    question: "A patient with diabetes is conscious but confused with pale, cool, clammy skin. Blood glucose reads 45 mg/dL. What treatment should you provide?",

    answer: "Oral glucose (if patient can swallow safely). If unable to swallow or unconscious, transport immediately for IV glucose. Monitor airway closely.",    answer: "Oral glucose (if patient can swallow safely). If unable to swallow or unconscious, transport immediately for IV glucose. Monitor airway closely.",

    difficulty: "Intermediate",    difficulty: "Intermediate",

    type: "scenario",    type: "scenario",

    tags: ["medical", "diabetes", "treatment", "glucose"],    tags: ["medical", "diabetes", "treatment", "glucose"],

    chapterNumber: 20,    chapterNumber: 19,

    chapterTitle: "Metabolic & Hematologic Emergencies"    chapterTitle: "Endocrine Emergencies"

  },  },

  {  {

    id: "14",    id: "14",

    question: "What does the C in C-spine immobilization stand for and why is it important?",    question: "What does the C in C-spine immobilization stand for and why is it important?",

    answer: "Cervical spine. C-spine immobilization protects the cervical vertebrae from further injury in trauma patients, preventing potential spinal cord damage that could result in paralysis or death.",    answer: "Cervical spine. C-spine immobilization protects the cervical vertebrae from further injury in trauma patients, preventing potential spinal cord damage that could result in paralysis or death.",

    difficulty: "Basic",    difficulty: "Basic",

    type: "definition",    type: "definition",

    tags: ["trauma", "spinal", "immobilization", "safety"],    tags: ["trauma", "spinal", "immobilization", "safety"],

    chapterNumber: 29,    chapterNumber: 28,

    chapterTitle: "Spinal Trauma Protocols"    chapterTitle: "Head and Spine Injuries"

  },  },

  {  {

    id: "15",    id: "15",

    question: "You respond to a patient who overdosed on opioids. They are unresponsive with slow, shallow breathing. What medication might help?",    question: "You respond to a patient who overdosed on opioids. They are unresponsive with slow, shallow breathing. What medication might help?",

    answer: "Naloxone (Narcan). This opioid antagonist can reverse opioid overdose effects. Administer per protocol and be prepared for aggressive airway management as effects may wear off.",    answer: "Naloxone (Narcan). This opioid antagonist can reverse opioid overdose effects. Administer per protocol and be prepared for aggressive airway management as effects may wear off.",

    difficulty: "Advanced",     difficulty: "Advanced", 

    type: "application",    type: "application",

    tags: ["toxicology", "medication", "overdose", "treatment"],    tags: ["toxicology", "medication", "overdose", "treatment"],

    chapterNumber: 22,    chapterNumber: 21,

    chapterTitle: "Toxicological Emergencies"    chapterTitle: "Toxicology"

  }  }

]]
