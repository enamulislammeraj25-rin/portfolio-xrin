/**
 * DATA & CONTENT ARCHITECTURE
 * Edit this file only when changing text, links, papers, projects.
 */
export const PORTFOLIO_DATA = {
  emailjs: {
    serviceId: "service_u8iy4ur",
    templateId: "template_taxlr0e",
    publicKey: "Q-t9gaQi9qfH8bVY3"
  },

  // --- EDITABLE: Personal Profile Info ---
  profile: {
    name: "Md Enamul Islam Bhuiyan Meraj",
    title: "Geotechnical Earthquake Engineering Researcher | M.Sc., BUET",
    institution: "Bangladesh University of Engineering & Technology (BUET)",
    tagline: "Geotechnical Earthquake Engineering Researcher | M.Sc., BUET · Soil Liquefaction · Vs-Based Site Characterization · Probabilistic Geo-Hazard Assessment",
    bio: "I am an M.Sc. researcher in Civil and Geotechnical Engineering at Bangladesh University of Engineering & Technology (BUET), with a primary research focus on geotechnical earthquake engineering. My work centers on shear-wave-velocity-based liquefaction assessment, seismic site characterization, regional geo-hazard mapping, and probabilistic treatment of geotechnical uncertainty.\n\nI also work on ground improvement of soft soils, embankment and slope stability, and numerical geotechnical modelling. I have developed and benchmarked embankment models in PLAXIS 2D and PLAXIS 3D by reproducing published studies and comparing the numerical outputs with reported results. My long-term research goal is to integrate field measurements, geotechnical data analysis, probabilistic methods, and numerical modelling to improve the assessment and mitigation of earthquake-related ground hazards.",
    email: "enamulislammeraj.25@gmail.com",
    location: "Dhaka, Bangladesh",
    cvLink: "/Enamul_Islam_Meraj_WebsiteCV.pdf",
    photo: "/profile.png",
    
    // --- EDITABLE: Social Links URLs ---
    social: {
      scholar: "https://scholar.google.com/citations?user=3FnVQfEAAAAJ&hl=en&authuser=1",
      researchgate: "https://www.researchgate.net/profile/Md-Enamul-Islam-Meraj",
      orcid: "https://orcid.org/0009-0008-2293-0272",
      email: "mailto:enamulislammeraj.25@gmail.com",
      linkedin: "https://www.linkedin.com/in/md-enamul-islam-bhuiyan-meraj/", 
      whatsapp: "https://wa.me/8801639146076",
      facebook: "https://www.facebook.com/enamulislam.meraj25/",
      instagram: "https://www.instagram.com/enamul_islam_meraj/",
      twitter: "https://x.com/eimerajxrin",
      telegram: "https://t.me/eimerajxrin"
    }
  },
  
  // --- EDITABLE: Key Performance Metrics ---
  metrics: [
    // OMITTED on academic site until citation counts exist (restore when non-zero).
    // { label: "Citations", value: "—" },
    // { label: "h-index", value: "—" },
    // { label: "Projects", value: "3" },
    // { label: "Years Active", value: "5" }
  ],

  // --- EDITABLE: Education History ---
  education: [
    {
      degree: "M.Sc. Engg. (Civil & Geotechnical)",
      institution: "Bangladesh University of Engineering & Technology (BUET)",
      year: "May 2025 – Jan 2027 (expected)",
      advisor: "Prof. Dr. Mehedi Ahmed Ansary",
      thesis: "Thesis: Assessing Regional Liquefaction Susceptibility Using Shear Wave Velocity Profiling and the Liquefaction Potential Index.",
      achievement: "Postgraduate Fellowship (December 2025–present)"
    },
    {
      degree: "B.Sc. in Civil Engineering",
      institution: "Rajshahi University of Engineering & Technology (RUET)",
      year: "February, 2019 - April, 2024",
      advisor: "Prof. Dr. Md. Abdul Alim",
      thesis: "Thesis: Behavior of single pile in cohesionless soil on horizontal & sloping ground surface under lateral loading",
      achievement: "Technical Education Scholarship (2019, 2020, 2021, 2022)"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Dhaka College",
      year: "2016 - 2018",
      group: "Science"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Motijheel Government Boys’ High School",
      year: "2014 - 2016",
      group: "Science",
      achievement: "General Board Scholarship"
    },
    {
      degree: "Junior School Certificate (JSC)",
      institution: "Motijheel Government Boys’ High School",
      year: "2011 - 2013"
    },
    {
      degree: "Primary School Certificate (PSC)",
      institution: "Sehachar Government Primary School",
      year: "2010",
      achievement: "General Board Scholarship"
    }
  ],

  // --- EDITABLE: Certifications ---
  certifications: [
    // OMITTED for PhD academic site (padding for research audience). Uncomment to restore.
    // { title: "Microsoft 365 Fundamentals", issuer: "Microsoft", date: "April, 2025", link: "https://www.microsoft.com" },
    // { title: "Construction Management", issuer: "Columbia University (Coursera)", date: "April 2025", link: "https://www.coursera.org" },
    // { title: "Concrete Multi Storey Building - System Design", issuer: "L&T EduTech", date: "March, 2025", link: "https://lntedutech.com" },
    // { title: "Financial Markets", issuer: "Yale University (Coursera)", date: "February, 2025", link: "https://www.coursera.org" },
  ],

  // --- EDITABLE: Skills & Expertise ---
  skills: [
    // Plain names for academic site (percentage bars omitted in App.js; level kept for restore).
    { name: "PLAXIS 2D and PLAXIS 3D", level: 40 },
    { name: "GeoStudio (seepage analysis)", level: 30 },
    { name: "ArcGIS Pro", level: 30 },
    { name: "AutoCAD", level: 45 },
    { name: "ATC-20 rapid evaluation", level: 50 },
    { name: "ERT — electrode layout & data acquisition (assisted)", level: 25 },
    { name: "Direct shear testing", level: 40 },
    { name: "Python (basic, in active development)", level: 25 },
    // OMITTED from academic list (restore if needed):
    // { name: "Microsoft Office Suite", level: 75 },
    // { name: "CSI ETABS & SAFE", level: 40 },
    // { name: "C/C++", level: 25 },
    // { name: "SketchUP", level: 30 },
  ],
  
  // --- EDITABLE: Standardized Tests ---
  tests: [
    { name: "IELTS", score: "—" },
    { name: "GRE", score: "—" }
  ],

  // --- EDITABLE: Professional Experience ---
  experience: [
    {
      role: "Postgraduate Fellow",
      institution: "Bangladesh University of Engineering & Technology (BUET)",
      department: "Civil & Geotechnical Engineering",
      period: "December, 2025 – Present",
      description: "Fellowship researcher (40 hours/week) working on Vs-based liquefaction assessment for the DMDP area, with additional work on LCA and HVDM."
    },
    {
      role: "Post-Earthquake Rapid Visual Reconnaissance Survey",
      institution: "BUET research team (Prof. Dr. Mehedi Ahmed Ansary)",
      department: "Field investigation",
      period: "29 November – 1 December 2025",
      description: "Rapid visual reconnaissance in Narsingdi and Narayanganj after the 21 November 2025 Madhabdi earthquake."
    },
    {
      role: "Private Tutor — Mathematics, Physics, Chemistry, Information Technology",
      institution: "Caretutors and independent engagements",
      department: "Education",
      period: "2019 – present",
      description: "Individual and small-group instruction for more than twenty secondary and higher-secondary students; syllabus content, problem-solving, and examination preparation."
    }
    // OMITTED duplicate tutoring entries (merged above). Uncomment to restore separate rows.
    // { role: "Tutor", institution: "Caretutors", department: "Education", period: "May 2024 – Present", description: "Structured tutoring for Classes VI–XII in mathematics, physics, chemistry, and ICT." },
    // { role: "Private Tutor", institution: "Independent", department: "Education", period: "2019 – Present", description: "One-to-one coaching for Classes VI–XII; more than 20 students." },
  ],

  // --- EDITABLE: Research Topic Keywords ---
  research_interests: [
    { id: "eq", topic: "Geotechnical earthquake engineering", short: "Geotechnical earthquake engineering", size: 22, note: "Seismic soil response, ground failure, and earthquake-resistant geo-design." },
    { id: "liq", topic: "Soil liquefaction", short: "Soil liquefaction", size: 20, note: "M.Sc. work: Vs-based deterministic and probabilistic liquefaction assessment." },
    { id: "site", topic: "Shear-wave-velocity site characterization", short: "Vs site characterization", size: 18, note: "Measured Vs profiling and site response for liquefaction screening." },
    { id: "haz", topic: "Regional hazard mapping", short: "Regional hazard mapping", size: 17, note: "Spatial interpolation of Vs and liquefaction indices in ArcGIS Pro." },
    { id: "prob", topic: "Probabilistic methods", short: "Probabilistic methods", size: 16, note: "Monte Carlo propagation of Vs and CSR uncertainty." },
    { id: "gi", topic: "Ground improvement", short: "Ground improvement", size: 17, note: "Vacuum consolidation and HVDM; manuscript under peer review." },
    { id: "slope", topic: "Embankment and slope stability", short: "Embankment and slope stability", size: 15, note: "Static and seismic stability of slopes and earthworks." },
    // OMITTED unworked future directions (restore if needed):
    // { id: "found", topic: "Foundation engineering", short: "Foundation engineering", size: 19, note: "Shallow and deep foundations under static and seismic load." },
    // { id: "ssi", topic: "Soil–structure interaction", short: "Soil–structure interaction", size: 18, note: "Coupled foundation–structure response under cyclic loading." },
    // { id: "comp", topic: "Computational geomechanics", short: "Computational geomechanics", size: 16, note: "Finite-element and constitutive modelling of soils." },
    // { id: "off", topic: "Offshore geotechnics", short: "Offshore geotechnics", size: 18, note: "Marine foundations for energy and coastal structures." },
    // { id: "deep", topic: "Deep foundations", short: "Deep foundations", size: 17, note: "Piles and pile groups under axial and lateral load." },
  ],

  research_links: [
    { from: "core", to: "eq", strength: 3 },
    { from: "core", to: "found", strength: 3 },
    { from: "core", to: "comp", strength: 3 },
    { from: "core", to: "off", strength: 3 },
    { from: "core", to: "gi", strength: 3 },
    { from: "eq", to: "liq", strength: 3 },
    { from: "eq", to: "site", strength: 3 },
    { from: "eq", to: "ssi", strength: 2 },
    { from: "found", to: "ssi", strength: 3 },
    { from: "found", to: "deep", strength: 3 },
    { from: "gi", to: "slope", strength: 2 },
    { from: "comp", to: "deep", strength: 1 },
    { from: "off", to: "found", strength: 2 }
  ],

  // --- EDITABLE: Citation Graph Data ---
  citation_history: [
    { year: 2019, citations: 0 },
    { year: 2020, citations: 0 },
    { year: 2021, citations: 0 },
    { year: 2022, citations: 0 },
    { year: 2023, citations: 0 },
    { year: 2024, citations: 0 },
    { year: 2025, citations: 0 },
    { year: 2026, citations: 0 },
    { year: 2027, citations: 0 },
    { year: 2028, citations: 0 },
  ],

  // --- EDITABLE: Selected Publications ---
  publications: [
    {
      id: 1,
      title: "Behavior of Single Pile in Cohesionless Soil on Horizontal & Sloping Ground Surface under Lateral Loading",
      authors: "M. E. I. B. Meraj, K. H. Hridoy, M. A. Alim",
      journal: "7th International Conference on Advances in Civil Engineering (ICACE 2024), CUET, Bangladesh (Paper ID: 194)",
      year: 2024,
      citations: "—",
      type: "Conference",
      tags: ["Lateral Load", "Soil - Structure Interaction", "Sloping Ground"],
      url: "https://www.researchgate.net/publication/389965030_Behavior_of_single_pile_in_cohesionless_soil_on_horizontal_and_sloping_ground_surface_under_lateral_loading",
      pdf: "/papers/ICACE2024_paper_ID194.pdf",
      certificate: "/papers/ICACE2024_participation_certificate.pdf",
      citation: "Meraj, M. E. I. B., Hridoy, K. H., & Alim, M. A. (2024). Behavior of single pile in cohesionless soil on horizontal & sloping ground surface under lateral loading. Proceedings of the 7th International Conference on Advances in Civil Engineering (ICACE 2024), CUET, Bangladesh (Paper ID: 194)."
    },
  ],

  current_research: [
    {
      id: "wp-liq",
      title: "Assessing Regional Liquefaction Susceptibility Using Shear Wave Velocity Profiling and the Liquefaction Potential Index",
      venue: "M.Sc. thesis, BUET",
      year: "2025–",
      note: "Supervisor: Prof. Dr. Mehedi Ahmed Ansary. Defence expected January 2027."
    },
    {
      id: "wp-lca",
      title: "Life Cycle Analysis of a Rural Road with Wrapped-Face Wall Against Conventional Slope-Based Construction",
      venue: "Working paper",
      year: "2025–",
      note: "Comparative LCA of earthworks alternatives."
    }
  ],

  under_review: [
    {
      id: "wp-hvdm",
      title: "Vacuum-Based Soft Soil Improvement: A PRISMA-Guided Systematic Review with Special Emphasis on the High Vacuum Densification Method (HVDM)",
      authors: "A. Mottaqi, M. E. I. B. Meraj, M. A. Ansary",
      venue: "Geotechnical and Geological Engineering (Springer Nature)",
      year: "2026",
      submitted: "25 July 2026",
      status: "Under peer review",
      note: "Submitted 25 July 2026. Currently in peer review."
    }
  ],

  // --- EDITABLE: Selected work (field + undergraduate practice) ---
  // Thesis / Vs–LPI work stays in Research, not here.
  projects: [
    {
      title: "Post-earthquake reconnaissance, Madhabdi earthquake",
      group: "Field work",
      period: "November–December 2025",
      summary: "ATC-20 rapid screening after the 21 November 2025 Madhabdi earthquake, Narsingdi and Narayanganj.",
      description: "Rapid visual screening after the 21 November 2025 Madhabdi earthquake across Ghorashal, Palash, Madhabdi, Narsingdi and Rupganj, as part of the BUET team supervised by Prof. Dr. Mehedi Ahmed Ansary. ATC-20 damage classification, safety postings, and a georeferenced record of building performance.",
      stack: ["ATC-20", "Reconnaissance", "Earthquake engineering"],
      link: "",
      photos: [
        { src: "/projects/eq_madhabdi/01_team_palash_residential_model_college.jpg", caption: "Reconnaissance team at Palash Residential Model College, Palash, Narsingdi." },
        { src: "/projects/eq_madhabdi/03_team_collapsed_masonry.jpg", caption: "With the reconnaissance team at a collapsed masonry building." },
        { src: "/projects/eq_madhabdi/05_classroom_horizontal_crack_delamination.jpg", caption: "Classroom: horizontal crack and plaster delamination, Palash / Narsingdi area." },
        { src: "/projects/eq_madhabdi/04_interior_diagonal_wall_cracks.jpg", caption: "Interior wall: diagonal and stepped cracking." },
        // OMITTED: abutment/vegetation photo (long-term wear, not clear EQ damage). File remains in public/projects/eq_madhabdi/.
        // { src: "/projects/eq_madhabdi/02_retaining_wall_hex_panels_vegetation.jpg", caption: "Hexagonal facing / abutment wall with staining and vegetation." }
      ]
    },
    {
      title: "ERT field survey, BUET campus",
      group: "Field work",
      period: "BUET campus",
      summary: "Assisted electrode layout, cabling, and data acquisition on a PASI ERT survey, BUET campus.",
      description: "Assisted an electrical resistivity tomography (ERT) field survey on the BUET campus using a PASI resistivity/tomography system: electrode layout, cabling, and data acquisition.",
      stack: ["ERT", "Field survey", "Site characterization"],
      link: "",
      photos: [
        { src: "/projects/ert_buet/02_operator_at_console.jpg", caption: "At the PASI acquisition console during the ERT survey, BUET campus." },
        { src: "/projects/ert_buet/01_setup_pasi_cases_operator.jpg", caption: "Field setup: PASI cases, batteries, and cabling." },
        { src: "/projects/ert_buet/05_electrode_line_wide.jpg", caption: "Electrode line on the BUET campus lawn." },
        { src: "/projects/ert_buet/04_electrode_line_close.jpg", caption: "Electrode stakes and take-out cables." },
        { src: "/projects/ert_buet/06_instrument_spread_overhead.jpg", caption: "Instrument spread: console, link boxes, and electrode cables." },
        { src: "/projects/ert_buet/07_console_p300tn_link_boxes.jpg", caption: "PASI acquisition console and link boxes." }
      ]
    },
    {
      title: "15-storied residential building design",
      group: "Undergraduate projects",
      period: "B.Sc., RUET",
      summary: "ETABS and SAFE design studio for a 15-storied residential building.",
      description: "Undergraduate structural design studio at RUET: complete analysis and design of a 15-storied residential building for code-compliant gravity and lateral loads using CSI ETABS and CSI SAFE. Coursework / design practice, not a research project.",
      stack: ["CSI ETABS", "CSI SAFE", "Structural design"],
      link: "",
      photos: []
    },
    /* OMITTED undergraduate water-supply investigation (not geotech/research). Uncomment to restore.
    {
      title: "Water-supply system investigation, Rajshahi City Corporation",
      group: "Undergraduate projects",
      period: "B.Sc., RUET",
      summary: "Investigation of RCC water-supply plants and network utilization.",
      description: "Undergraduate investigation of the existing water-supply system of Rajshahi City Corporation (RCC).",
      stack: ["Water supply", "Urban infrastructure", "Field investigation"],
      link: "",
      photos: []
    }
    */
  ],

  // --- EDITABLE: Hobbies (Photos & Videos) ---
  hobbies: [
    { 
        title: "Site Photography", 
        type: "image", 
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop",
        description: "Capturing structural details during field visits." 
    },
    { 
        title: "Engineering Simulations", 
        type: "video", 
        src: "", 
        description: "Visualizing stress distribution in FEA models." 
    },
    { 
        title: "Travel & Nature", 
        type: "image", 
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop",
        description: "Exploring the natural landscapes of Bangladesh." 
    },
  ]
};
