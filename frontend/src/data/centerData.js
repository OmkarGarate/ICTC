import heroBg from "../assets/Frame 87.png";

/* REUSED IMAGES */
import defaultImg from "../assets/image 5.png";

/* GALLERY */
import p1 from "../assets/p1 (1).webp";
import p2 from "../assets/p1 (2).webp";
import p3 from "../assets/p1 (3).webp";
import p4 from "../assets/p1 (4).webp";
import p5 from "../assets/p1 (5).webp";
import p6 from "../assets/p1 (6).webp";
import p7 from "../assets/p1 (7).webp";
import p8 from "../assets/p1 (8).webp";
import p9 from "../assets/p1 (9).webp";
import p10 from "../assets/p1 (10).webp";
import p11 from "../assets/p1 (11).webp";
import p12 from "../assets/p1 (12).webp";

import s1 from "../assets/s1 (1).webp";
import s2 from "../assets/s1 (2).webp";
import s3 from "../assets/s1 (3).webp";
import s4 from "../assets/s1 (4).webp";
import s5 from "../assets/s1 (5).webp";
import s6 from "../assets/s1 (6).webp";
import s7 from "../assets/s1 (7).webp";
import s8 from "../assets/s1 (8).webp";

import gh1 from "../assets/g1 (1).webp";
import gh2 from "../assets/g1 (2).webp";
import gh3 from "../assets/g1 (3).webp";
import gh4 from "../assets/g1 (4).webp";


import kalyan1 from "../assets/Kalyan (1).webp";
import kalyan2 from "../assets/Kalyan (2).webp";
import kalyan3 from "../assets/Kalyan (3).webp";
import kalyan4 from "../assets/Kalyan (4).webp";
import kalyan5 from "../assets/Kalyan (5).webp";
import kalyan6 from "../assets/Kalyan (6).webp";
import kalyan7 from "../assets/Kalyan (7).webp";
import kalyan8 from "../assets/Kalyan (8).webp";
import kalyan9 from "../assets/Kalyan (9).webp";
import kalyan10 from "../assets/Kalyan (10).webp";

import dadar1 from "../assets/Dadar (1).webp";
import dadar2 from "../assets/Dadar (2).webp";
import dadar3 from "../assets/Dadar (3).webp";
import dadar4 from "../assets/Dadar (4).webp";
import dadar5 from "../assets/Dadar (5).webp";
import dadar6 from "../assets/Dadar (6).webp";

/* GALLERY - ALTERNATE IMAGES */
import g1 from "../assets/p1 (1).webp";
import g2 from "../assets/p1 (2).webp";
import g3 from "../assets/p1 (3).webp";
import g4 from "../assets/p1 (4).webp";

/* ===================== AREA → CENTERS MAPPING ===================== */
export const areaCentreMap = {
  Mumbai: ["Sion", "Dadar", "Ghatkopar", "Santacruz", "Goregaon", "Chembur"],
  "Navi Mumbai": ["Vashi", "Panvel"],
  Thane: ["Kalyan", "Dombivli"],
};

/* ===================== CENTER → SLUG MAP ===================== */
export const centerSlugMap = {
  Sion: "sion",
  Dadar: "dadar",
  Ghatkopar: "ghatkopar",
  Santacruz: "santacruz",
  Goregaon: "goregaon",
  Chembur: "chembur",
  Vashi: "vashi",
  Panvel: "panvel",
  Kalyan: "kalyan",
  Dombivli: "dombivli",
};

/* ===================== SLUG → CENTER NAME MAP ===================== */
export const slugToCentreName = {
  vashi: "ICTC Vashi",
  panvel: "ICTC Panvel",
  kalyan: "ICTC Kalyan",
  dombivli: "ICTC Dombivli",
  sion: "ICTC Sion",
  dadar: "ICTC Dadar",
  goregaon: "ICTC Goregaon",
  ghatkopar: "ICTC Ghatkopar",
  santacruz: "ICTC Santacruz",
  chembur: "ICTC Chembur",
  thane: "ICTC Thane",
};

/* ===================== MAP LINKS ===================== */
export const mapLinks = {
  vashi: "https://maps.app.goo.gl/q5mASiWVQ15ccWfv9",
  panvel: "https://maps.app.goo.gl/bzA4sg6f4V5WCqYC7",
  kalyan: "https://maps.app.goo.gl/py96ojscK7yXiBGdA",
  dombivli: "https://maps.app.goo.gl/WqLpBgyhgy8eRXzV8",
  dadar: "https://maps.app.goo.gl/quDbpjpiUJL4ML7P8",
  goregaon: "https://maps.app.goo.gl/A96PS1qUgGTyU8CF6",
  sion: "https://maps.app.goo.gl/ZzvMJTqN1rqAni9M9",
  ghatkopar: "https://maps.app.goo.gl/7a97hWyEuNbAkHXS6",
  chembur: "https://maps.app.goo.gl/Gz1JGVCbMyF2n1w48",
  santacruz: "https://maps.app.goo.gl/juHpkFo66RefWi76A",
  thane: "https://maps.app.goo.gl/BWT2qoniyASW1LXX8",
};

const centerData = {
  /* ===================== VASHI ===================== */
  vashi: {
    slug: "vashi",
    name: "ICTC Vashi",
    fullName: "ICTC Vashi Centre",
    rating: "4.9",
    reviews: "500+ Ratings",

    phone: "93249 85044",

    mapQuery: "ICTC Cancer Care Centre Vashi Navi Mumbai",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.3515059166466!2d72.99670582466513!3d19.073796452042792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c12e366befd9%3A0x422a83b108bd2893!2sDr%20Salil%20Patkar%20%2C%20Cancer%20Specialist%20in%20Vashi%20Navi%20Mumbai%2C%20Best%20Oncologist%20in%20Vashi%2C%20Navi%20Mumbai%20Oncologist%20%7C%20ICTC%20Vashi!5e1!3m2!1sen!2sin!4v1767514911613!5m2!1sen!2sin",
    lat: 19.0738,
    lng: 72.9967,

 
    address:
      "47/48 3rd floor, Mahavir Center, above Golden Punjab Restaurant, Sector 17, Vashi, Navi Mumbai, Maharashtra 400703c",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Vashi is a premier Day Care Chemotherapy Centre located in the heart of Navi Mumbai, dedicated to delivering comprehensive, patient-centric cancer care. The centre specializes in day-care chemotherapy services, allowing patients to receive advanced cancer treatment in a comfortable and efficient setting without the need for prolonged hospital stays.",
      "ICTC Vashi is equipped with state-of-the-art medical infrastructure and follows evidence-based oncology protocols to ensure precise, safe, and personalized treatment for every patient.",
      "The centre is led by Dr. Salil Patkar, a highly respected oncologist known for his clinical expertise and compassionate approach to cancer care, along with Dr. Kunal Goyal, an eminent hematologist specializing in CAR-T therapy and bone marrow transplantation. Recognized as one of the leading cancer treatment centres in Vashi, ICTC Vashi offers chemotherapy, hematology services, CAR-T therapy consultations, and comprehensive oncology care in a supportive and ethical environment.",
    ],

    image: defaultImg,
    gallery: [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12],
  },

  /* ===================== PANVEL ===================== */
  panvel: {
    slug: "panvel",
    name: "ICTC Panvel",
    fullName: "ICTC Panvel Centre",
    rating: "4.9",
    reviews: "200+ Ratings",

    phone: "83568 36498",

    mapQuery: "ICTC Cancer Care Centre Panvel Navi Mumbai",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3414.0496613381006!2d73.11214447466304!3d18.991160854631566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e94576a0d73b%3A0x36d856b6c2f8066a!2sDr%20Salil%20Patkar%2C%20Cancer%20Specialist%20Panvel%20Navi%20Mumbai%2C%20Oncologist%20in%20Navi%20Mumbai%20%7C%20ICTC!5e1!3m2!1sen!2sin!4v1767515000407!5m2!1sen!2sin",
lat: 18.9912,
lng: 73.1121,

    address: "Trimurti Hospital, Road, above ketki Hotel, Line Ali, Old Panvel, Panvel, Navi Mumbai, Maharashtra 410206",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Panvel is a leading Day Care Chemotherapy Centre serving Panvel, Navi Mumbai, and the Raigad region, dedicated to delivering high-quality, patient-focused cancer care in a comfortable outpatient setting.",
      "The centre is equipped with modern medical infrastructure and provides advanced oncology services, including chemotherapy and immunotherapy, allowing patients to receive effective and personalized treatment without prolonged hospital stays.",
      "ICTC Panvel is led by Dr. Salil Patkar, a highly experienced medical oncologist, along with Dr. Kunal Goyal, a renowned hematologist specializing in CAR-T therapy and bone marrow transplantation, ensuring access to expert care and cutting-edge cancer treatments.",
    ],

    image: defaultImg,
    gallery: [g1, g2, g3, g4],
  },

  /* ===================== KALYAN ===================== */
  kalyan: {
    slug: "kalyan",
    name: "ICTC Kalyan",
    fullName: "ICTC Kalyan Centre",
    rating: "4.9",
    reviews: "200+ Ratings",

    phone: "99200 18399",

    mapQuery: "ICTC Cancer Care Centre Kalyan West",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13635.221670262083!2d73.11858564253039!3d19.245254470594404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795d1b4ecdb4f%3A0x854c3b30dc3b1775!2sDr%20Amit%20Ghanekar%20%7C%20ICTC%2C%20Kalyan%20%7C%20Best%20Oncologist%20in%20Kalyan%2C%20Cancer%20Specialist%2C%20Hemat-Oncologist%20Kalyan!5e1!3m2!1sen!2sin!4v1767515047123!5m2!1sen!2sin",
lat: 19.2453,
lng: 73.1186,

    address: "G Business Centre, 401-404, Khadakpada Rd, next to Honda showroom, Wayle Nagar, West, Beturkar Pada, Kalyan, Maharashtra 421301",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Kalyan is a modern Day Care Chemotherapy Centre dedicated to providing advanced, accessible, and patient-focused cancer care. Conveniently located in Kalyan West, the centre serves patients from Ulhasnagar, Ambernath, Badlapur, Titwala, Murbad, Shahpur, Neral, and surrounding regions.",
      "The centre specializes in day-care chemotherapy and comprehensive oncology services, enabling patients to receive high-quality cancer treatment in a comfortable outpatient setting without prolonged hospital stays. ICTC Kalyan is equipped with modern medical infrastructure and follows evidence-based treatment protocols to ensure safety, precision, and effectiveness.",
      "ICTC Kalyan is led by Dr. Amit Ghanekar, a highly experienced oncologist recognized for his patient-centric approach and expertise in cancer management. With a skilled medical team, advanced technology, and a compassionate care philosophy, ICTC Kalyan is a trusted destination for affordable and personalized cancer care.",
    ],

    image: defaultImg,
gallery: [
  kalyan1,
  kalyan2,
  kalyan3,
  kalyan4,
  kalyan5,
  kalyan6,
  kalyan7,
  kalyan8,
  kalyan9,
  kalyan10,
],
  },

  /* ===================== DOMBIVLI ===================== */
  dombivli: {
    slug: "dombivli",
    name: "ICTC Dombivli",
    fullName: "ICTC Dombivli Centre",
    rating: "4.9",
    reviews: "200+ Ratings",

    phone: "99201 99490",

    mapQuery: "ICTC Cancer Care Centre Dombivli East",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3409.4320164288247!2d73.08609417715512!3d19.21506470125195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79593301ee44f%3A0x820a319785e46b87!2sDr%20Amit%20Ghanekar%20Cancer%20Specialist%20in%20Dombivli%2C%20Best%20Oncologist%20in%20Dombivli%2C%20Top%20Cancer%20Treatment%2C%20Hemat-Oncologist%20%7C%20ICTC!5e1!3m2!1sen!2sin!4v1767515112368!5m2!1sen!2sin",
lat: 19.2151,
lng: 73.0861,

    address: "1st Floor, C wing, Vaibhav Bldg, opp. Kasturi Plaza, next to Modern pride hotel, Krishna Radha Society, Dombivli East, Dombivli, Maharashtra 421201",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Dombivli is a modern Day Care Chemotherapy Centre providing advanced, patient-centric oncology services. Strategically located in Dombivli East, the centre serves patients from Bhiwandi, Diva, Palava City, Mumbra, Thakurli, Shil Phata, and surrounding areas, ensuring accessible cancer care close to home.",
      "The centre specializes in day-care chemotherapy and comprehensive cancer management, allowing patients to receive treatment in a comfortable outpatient setting without prolonged hospital stays. ICTC Dombivli is equipped with modern medical infrastructure and follows evidence-based treatment protocols to deliver safe, effective, and personalized cancer care.",
      "ICTC Dombivli is led by Dr. Amit Ghanekar, a highly experienced oncologist known for his expertise and compassionate approach to cancer treatment. With a skilled multidisciplinary team, advanced technology, and a strong focus on follow-up and supportive care, ICTC Dombivli is a trusted destination for affordable and high-quality cancer care.",
    ],

    image: defaultImg,
    gallery: [g1, g2, g3, g4],
  },

  /* ===================== SION ===================== */
  sion: {
    slug: "sion",
    name: "ICTC Sion",
    fullName: "ICTC Sion Centre",
    rating: "4.9",
    reviews: "100+ Ratings",

    phone: "85918 94047",

    mapQuery: "ICTC Cancer Care Centre Sion Mumbai",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.097349783561!2d72.85946797466435!3d19.037544753179688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf112e225555%3A0xe06806556362a1c1!2sDr.%20Rohit%20Pai%20%7C%20ICTC%2C%20Sion%20%7C%20Cancer%20Specialist%20in%20Sion%20Mumbai%2C%20Best%20Oncologist%20in%20Mumbai%2C%20Hematologist!5e1!3m2!1sen!2sin!4v1767515143953!5m2!1sen!2sin",
lat: 19.0375,
lng: 72.8595,

    address: "Rammillan G, Block No.1, Ram Niwas, Plot No.226/227, Shukla Marg, near Guru Tekbahadur Station, Sion East, Mumbai, Maharashtra 400022",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Sion is a premier Day Care Chemotherapy Centre offering advanced, patient-centric cancer care in central Mumbai. Conveniently located in Sion, the centre serves patients from Chunabhatti, Kurla, Dharavi, Bandra East, Antop Hill, Wadala, Trombay, Mahul, Kings Circle, and Matunga, ensuring easy access to high-quality oncology services.",
      "The centre specializes in day-care chemotherapy and comprehensive cancer management, enabling patients to receive effective treatment in a comfortable outpatient setting without prolonged hospital stays. ICTC Sion is equipped with modern medical infrastructure and follows evidence-based treatment protocols to deliver safe, efficient, and personalized cancer care.",
      "ICTC Sion is led by Dr. Rohit Pai, a highly respected oncologist known for his expertise in medical oncology and compassionate patient care. With a dedicated team of specialists, advanced technology, and a strong focus on supportive and follow-up care, ICTC Sion is a trusted destination for affordable, world-class cancer treatment in Mumbai.",
    ],

    image: defaultImg,
    gallery: [g1, g2, g3],
  },

  /* ===================== DADAR ===================== */
  dadar: {
    slug: "dadar",
    name: "ICTC Dadar",
    fullName: "ICTC Dadar Centre",
    rating: "4.9",
    reviews: "100+ Ratings",

    phone: "93725 30800",

    mapQuery: "ICTC Cancer Care Centre Dadar Mumbai",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.5202766536772!2d72.82636857466377!3d19.0169588538245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf005a0bf0e3%3A0x1292cb1e39e131c5!2sDr%20Viraj%20Nevrekar%20-%20Best%20Cancer%20Specialist%20in%20Mumbai%2C%20Oncologist%20in%20Dadar%20%7C%20ICTC%20Dadar!5e1!3m2!1sen!2sin!4v1767515175555!5m2!1sen!2sin",
lat: 19.0170,
lng: 72.8264,

    address: "Ground Floor, PRABHADEVI INDUSTRIAL ESTATE, Unit No. 10, 19/21, Swatantryaveer Savarkar Rd, opp. Siddhivinayak Temple, Prabhadevi, Mumbai, Maharashtra 400025",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Dadar is a state-of-the-art Day Care Chemotherapy Centre providing advanced, patient-centric cancer care in South Mumbai. Conveniently located in Dadar, the centre serves patients from Shivaji Park, Prabhadevi, Lower Parel, Worli, Mahim, and surrounding areas, ensuring easy access to high-quality oncology services.",
      "The centre specializes in day-care chemotherapy and comprehensive cancer management, allowing patients to receive effective treatment in a comfortable outpatient setting without prolonged hospital stays. ICTC Dadar is equipped with modern medical infrastructure and follows evidence-based protocols to deliver safe, efficient, and personalized cancer care.",
      "ICTC Dadar is led by Dr. Viraj Nevrekar, a highly respected oncologist known for his expertise in comprehensive cancer treatment and personalized therapy planning. With advanced technology, a skilled team of specialists, and a strong focus on compassionate care, ICTC Dadar is a trusted destination for affordable, world-class cancer treatment in Mumbai.",
    ],

    image: defaultImg,
  gallery: [
  dadar1,
  dadar2,
  dadar3,
  dadar4,
  dadar5,
  dadar6,
],
  },

  /* ===================== GOREGAON ===================== */
  goregaon: {
    slug: "goregaon",
    name: "ICTC Goregaon",
    fullName: "ICTC Goregaon Centre",
    rating: "4.9",
    reviews: "50+ Ratings",
    phone: "93266 02073",

    mapQuery: "ICTC Cancer Care Centre Goregaon Mumbai",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218401.40800536098!2d72.66141144915886!3d19.065515444445786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b767bb650fe3%3A0x8be5e9f8d1667916!2sDr%20Viraj%20Nevrekar%20-%20Best%20Cancer%20Specialist%20in%20Goregaon%2C%20Oncologist%20in%20Goregaon%2C%20Cancer%20Hospital%20%26%20Treatment!5e1!3m2!1sen!2sin!4v1767515244982!5m2!1sen!2sin",
    lat: 19.1547,
lng: 72.8486,

      address: "Gala - 3, 2nd Floor, Allure 36 SV Road, Goregaon West, Goregaon, Mumbai, Maharashtra 400104",
    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",
    heroBg,
description: [
  "ICTC Indian Cancer Treatment Centre – Goregaon is a state-of-the-art Day Care Chemotherapy Centre dedicated to delivering advanced, patient-centric oncology services with a strong focus on day-care chemotherapy. Conveniently located in Goregaon, the centre serves patients from Malad, Jogeshwari, Andheri, Oshiwara, Borivali, and surrounding western suburbs of Mumbai, ensuring easy access to high-quality cancer care close to home.",
  "Designed with patient comfort and clinical efficiency in mind, the Goregaon centre provides safe, streamlined chemotherapy treatments that allow patients to receive expert care and return home the same day. This day-care approach minimizes prolonged hospital stays while maintaining the highest standards of medical safety, infection control, and treatment effectiveness.",
  "ICTC Goregaon is led by Dr. Viraj Nevrekar, a highly respected oncologist known for his expertise in comprehensive cancer management and personalized treatment planning. Supported by modern infrastructure, advanced medical technology, and a dedicated multidisciplinary oncology team, the centre is committed to delivering affordable, advanced, and compassionate cancer care in a supportive and healing environment.",
],


    image: defaultImg,
    gallery: [g1, g2, g3],
  },

  /* ===================== GHATKOPAR ===================== */
  ghatkopar: {
    slug: "ghatkopar",
    name: "ICTC Ghatkopar",
    fullName: "ICTC Ghatkopar Centre",
    rating: "4.9",
    reviews: "100+ Ratings",

    phone: "90826 64622",

    mapQuery: "ICTC Cancer Care Centre Ghatkopar Mumbai",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.038431756734!2d72.90438177466551!3d19.088993651565527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c707f2273c3f%3A0x31d18eff35f5fe0a!2sDr.%20Deep%20Vora%20%7C%20Cancer%20Specialist%20in%20Ghatkopar%2C%20Best%20Oncologist%20in%20Ghatkopar%2C%20Top%20Cancer%20Treatment%20%7C%20ICTC%20Ghatkopar!5e1!3m2!1sen!2sin!4v1767515322582!5m2!1sen!2sin",
lat: 19.0890,
lng: 72.9044,

    address: "2nd Floor, Trimurti Arcade, 203A/205, Lal Bahadur Shastri Marg, nr. Sarvodaya Hospital, Gandhi Nagar, Kirti Vihar, Ghatkopar West, Mumbai, Maharashtra 400086",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Ghatkopar is a premier Day Care Chemotherapy Centre delivering advanced, patient-focused cancer care in Mumbai’s eastern suburbs. Conveniently located in Ghatkopar, the centre serves patients from Govandi, Chembur, Tilak Nagar, Vidyavihar, Kurla, Powai, Saki Naka, Asalpha, Deonar, and nearby areas, ensuring accessible and high-quality oncology services close to home.",
      "The centre specializes in day-care chemotherapy and comprehensive cancer management, enabling patients to receive effective treatment in a comfortable outpatient setting without the need for prolonged hospital stays. ICTC Ghatkopar is equipped with modern medical infrastructure and follows evidence-based protocols to provide safe, efficient, and personalized cancer treatment.",
      "ICTC Ghatkopar is led by Dr. Deep Vora, a highly experienced oncologist known for his patient-first approach and expertise in managing various types of cancer. Supported by advanced technology and a dedicated oncology team, the centre is committed to delivering affordable, world-class cancer care in a compassionate and supportive environment.",
    ],

    image: defaultImg,
    gallery: [gh1, gh2, gh3, gh4],
  },

  /* ===================== SANTACRUZ ===================== */
  santacruz: {
    slug: "santacruz",
    name: "ICTC Santacruz",
    fullName: "ICTC Santacruz Centre",
    rating: "4.9",
    reviews: "50+ Ratings",

    phone: "91127 35218",

    mapQuery: "ICTC Cancer Care Centre Santacruz Mumbai",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.0309507385036!2d72.83512587466552!3d19.08935665155413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c98168ba27ad%3A0x3ba3b1b97d371202!2sDr%20Shreya%20Gattani%20%7C%20Cancer%20Specialist%20in%20Santacruz%2C%20Best%20Oncologist%20in%20Santacruz%20Mumbai%20-%20ICTC!5e1!3m2!1sen!2sin!4v1767515390936!5m2!1sen!2sin",
lat: 19.0894,
lng: 72.8351,

    address: "A-Wing, Acme Mall, RIZVI PARK, Unit No. 102/103, near Reliance Digital, Rizvi Nagar, Khira Nagar, Santacruz (West), Mumbai, Maharashtra 400054",

    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

    heroBg,

    description: [
      "ICTC Indian Cancer Treatment Centre – Santacruz is a modern Day Care Chemotherapy Centre dedicated to delivering advanced, patient-centric cancer care in Western Mumbai. Conveniently located in Santacruz, the centre serves patients from Khar, Vakola, Kalina, Vile Parle, Bandra East & West, Juhu, Four Bungalows, and surrounding areas, ensuring easy access to high-quality oncology services.",
      "The centre specializes in day-care chemotherapy and comprehensive cancer management, allowing patients to receive effective treatment in a comfortable outpatient setting without the need for prolonged hospital stays. Equipped with modern medical infrastructure and following evidence-based treatment protocols, ICTC Santacruz ensures safe, efficient, and personalized cancer care.",
      "ICTC Santacruz is led by Dr. Shreya Gattani, a highly experienced medical and hemato-oncologist known for her compassionate, patient-focused approach. Supported by a skilled oncology team and advanced technology, the centre is committed to providing affordable, world-class cancer treatment in a supportive and healing environment.",
    ],

    image: defaultImg,
    gallery: [s1, s2, s3, s4, s5, s6, s7, s8],
  },

  /* ===================== CHEMBUR ===================== */
  chembur: {
    slug: "chembur",
    name: "ICTC Chembur",
    fullName: "ICTC Chembur Centre",
    rating: "4.9",
    reviews: "50+ Ratings",
    phone: "99208 14622",

    mapQuery: "ICTC Cancer Care Centre Chembur Mumbai",
    
  mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4473.346593213944!2d72.8877512758059!3d19.05653635258214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9000a95dfdb%3A0x2a286683fc41ceda!2sDr%20Deep%20Vora!5e1!3m2!1sen!2sin!4v1769246845893!5m2!1sen!2sin",
    lat: 19.0565,
lng: 72.8878,

  address: "2nd Floor, Mangal Anand Hospital, Pt CR Vyas Marg, Swastik Park, Chembur, Mumbai, Maharashtra 400071",
    timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",
    heroBg,

 description: [
  "ICTC Indian Cancer Treatment Centre – Chembur is a premier Day Care Chemotherapy Centre offering advanced, patient-centric cancer care with a strong focus on day-care chemotherapy. Strategically located in Chembur, the centre serves patients from Govandi, Tilak Nagar, Kurla, Ghatkopar, Deonar, Vashi, Trombay, and Sion, ensuring easy access to high-quality oncology services close to home.",
  "The centre is thoughtfully designed to deliver safe, comfortable, and efficient chemotherapy services, allowing patients to receive treatment and return home the same day. This approach minimizes prolonged hospital stays while maintaining the highest standards of medical safety, clinical precision, and compassionate care.",
  "ICTC Chembur is led by Dr. Deep Vora, a highly experienced oncologist known for his patient-first, evidence-based approach to cancer treatment. By tailoring treatment plans to each patient’s specific medical condition and using modern cancer therapies, the centre has earned a strong reputation as a trusted destination for advanced, affordable, and personalized cancer care in a supportive and healing environment.",
],


    image: defaultImg,
    gallery: [g1, g2, g3],
  },

    /* ===================== THANE ===================== */
  
thane: {
  slug: "thane",
  name: "ICTC Thane",
  fullName: "ICTC Thane Centre",
  rating: "4.9",
  reviews: "100+ Ratings",

  phone: "+91 7977225902",

  mapQuery: "ICTC Cancer Care Centre Thane",

  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120577.97431860023!2d72.81639699726561!3d19.192507400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b916b0ddc591%3A0x438c61df5cc6530d!2sDr%20Darshan%20Jain%20%7C%20Cancer%20Specialist%20in%20Thane%2C%20Best%20Oncologist%20in%20Thane%20Mumbai%20-%20ICTC!5e0!3m2!1sen!2sin!4v1776920722144!5m2!1sen!2sin",

  lat: 19.1925,
  lng: 72.8164,

  address: "Office 308, Hubtown Rhythm, Madanlal Dhingra Rd, opp. Jain Mandir, Panch Pakhdi, Thane West, Thane, Maharashtra 400602",

  timing: "Mon – Sat 9:00 a.m. to 9:00 p.m.",

  heroBg,

  description: [
    "ICTC Indian Cancer Treatment Centre – Thane is a modern Day Care Chemotherapy Centre dedicated to delivering advanced, patient-centric cancer care in Thane and surrounding regions. The centre provides comprehensive oncology services with a strong focus on safe and efficient day-care chemotherapy.",
    
    "Equipped with modern medical infrastructure and following evidence-based oncology protocols, ICTC Thane ensures precise, personalised, and high-quality cancer treatment in a comfortable outpatient setting, allowing patients to return home the same day.",
    
    "Led by experienced oncology specialists, ICTC Thane combines clinical expertise, advanced treatment modalities, and compassionate patient care to deliver affordable and world-class cancer treatment in a supportive environment.",
  ],

  image: defaultImg,
  gallery: [g1, g2, g3, g4],
},


};

export default centerData;
