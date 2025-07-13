const subjects = {
  "Cálculo diferencial e integral": ["Ecuaciones diferenciales", "Termofísica"],
  "Química general": ["Química inorgánica", "Química orgánica básica"],
  "Electromagnetismo y óptica": ["Fisicoquímica", "Análisis instrumental"],
  "Álgebra superior": ["Ecuaciones diferenciales", "Bioestadística"],
  "Laboratorio de química biológica": ["Microbiología general", "Bioquímica estructural"],
  "Desarrollo integral I": ["Desarrollo integral II"],
  "Seminario de ciencias químico biológicas": [],

  "Ecuaciones diferenciales": ["Bioestadística", "Tecnología farmacéutica I"],
  "Química inorgánica": ["Fisicoquímica", "Química analítica"],
  "Termofísica": ["Fisicoquímica", "Diseño de medicamentos"],
  "Química orgánica básica": ["Química de compuestos orgánicos oxigenados", "Química de productos naturales"],
  "Biología celular": ["Bioquímica estructural", "Genética y biología molecular"],
  "Desarrollo integral II": ["Desarrollo integral III"],

  "Química analítica": ["Análisis instrumental", "Análisis instrumental avanzado"],
  "Fisicoquímica": ["Biofarmacia", "Tecnología farmacéutica I"],
  "Química de los compuestos orgánicos oxigenados": ["Química de productos naturales", "Farmacognosia"],
  "Bioquímica estructural": ["Bioquímica metabólica", "Farmacología general"],
  "Morfofisiología": ["Morfofisiopatología", "Hematología básica"],
  "Desarrollo integral III": ["Desarrollo integral IV"],

  "Análisis instrumental": ["Análisis instrumental avanzado", "Análisis de medicamentos"],
  "Bioestadística": ["Metodología de la investigación", "Farmacia experimental"],
  "Química de los productos naturales": ["Química farmacéutica"],
  "Bioquímica metabólica": ["Farmacología clínica"],
  "Morfofisiopatología": ["Hematología avanzada", "Farmacología clínica"],
  "Microbiología general": ["Micología", "Bacteriología", "Virología", "Parasitología", "Microbiología alimentaria"],

  "Análisis instrumental avanzado": ["Diseño y estabilidad de medicamentos", "Análisis de medicamentos"],
  "Micología": ["Microbiología alimentaria"],
  "Farmacología general": ["Farmacología clínica", "Atención farmacéutica"],
  "Genética y biología molecular": ["Inmunología aplicada", "Virología"],
  "Farmacognosia": ["Química farmacéutica"],
  "Metodología de la investigación": ["Seminario de integración clínica", "Farmacia experimental"],

  "Toxicología": [],
  "Hematología básica": ["Hematología avanzada", "Análisis clínicos"],
  "Farmacología clínica": ["Atención farmacéutica", "Farmacia experimental"],
  "Inmunología básica": ["Inmunología aplicada"],
  "Bacteriología": ["Microbiología alimentaria", "Inocuidad alimentaria"],
  "Virología": ["Inmunología aplicada"],
  "Farmacia hospitalaria": ["Aplica conocimientos clínicos"],

  "Legislación y Normatividad Farmacéutica": ["Atención farmacéutica"],
  "Microbiología alimentaria": [],
  "Tecnología farmacéutica I": ["Tecnología farmacéutica II"],
  "Biofarmacia": ["Diseño y estabilidad de medicamentos"],
  "Parasitología": ["Inocuidad alimentaria"],
  "Análisis clínicos": [],
  "Desarrollo integral IV": [],

  "Química Farmacéutica": [],
  "Tecnología Farmacéutica II": [],
  "Diseño y Estabilidad de Medicamentos": [],
  "Salud pública y epidemiología": [],
  "Inmunología aplicada": [],
  "Administración y gestión de la calidad": [],
  "Hematología avanzada": [],
  "Emprendimiento y desarrollo profesional": [],

  "Farmacia Experimental": [],
  "Inocuidad Alimentaria": [],
  "Seminario de integración clínica": [],
  "Análisis de medicamentos": [],
  "Atención farmacéutica": []
};

const state = {};
const grid = document.getElementById("grid");

// Inicializa el estado de cada materia
Object.keys(subjects).forEach(subject => {
  const prerequisites = Object.keys(subjects).filter(key => subjects[key].includes(subject));
  state[subject] = {
    prerequisites,
    unlocked: prerequisites.length === 0,
    passed: false
  };
});

function updateGrid() {
  grid.innerHTML = "";

  Object.entries(state).forEach(([name, info]) => {
    const div = document.createElement("div");
    div.classList.add("subject");
    if (!info.unlocked) div.classList.add("locked");
    if (info.passed) div.classList.add("passed");

    div.textContent = name;

    if (info.unlocked && !info.passed) {
      div.addEventListener("click", () => {
        info.passed = true;
        unlockDependents(name);
        updateGrid();
      });
    }

    grid.appendChild(div);
  });
}

function unlockDependents(passedSubject) {
  subjects[passedSubject].forEach(dependent => {
    const unmet = state[dependent].prerequisites.filter(req => !state[req].passed);
    if (unmet.length === 0) {
      state[dependent].unlocked = true;
    }
  });
}

updateGrid();
