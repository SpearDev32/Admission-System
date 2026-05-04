// ===========================
//  PSU Online Admission Form
//  script.js
// ===========================


// ============================
//  CONTROL NUMBER
//  Only generates & shows when
//  "New applicant" is checked
// ============================
const inputs = document.querySelectorAll(".caps");

inputs.forEach(input => {
  input.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
   });
  });

function generateControlNumber() {
  var n = '';
  for (var i = 0; i < 16; i++) {
    n += Math.floor(Math.random() * 10);
  }
  return n;
}

function toggleControlNo() {
  var checkbox = document.getElementById('newApplicantCheck');
  var controlRow = document.getElementById('controlRow');
  if (checkbox.checked) {
    document.getElementById('ctrlNo').textContent = generateControlNumber();
    controlRow.style.display = 'block';
  } else {
    controlRow.style.display = 'none';
    document.getElementById('ctrlNo').textContent = '';
  }
}


// ============================
//  POPUP FUNCTIONS
// ============================

function openPopup(id) {
  document.getElementById(id).classList.add('open');
}

function closePopup(id) {
  document.getElementById(id).classList.remove('open');
}

// Close any popup when clicking outside the box
document.querySelectorAll('.popup-overlay').forEach(function (overlay) {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('open');
    }
  });
});


// ============================
//  STEP NAVIGATION
// ============================

function goStep(n) {
  if (n === 2 && !validateStep1()) return;
  if (n === 3 && !validateStep2()) return;

  // Show correct page
  document.querySelectorAll('.step-page').forEach(function (p) {
    p.classList.remove('active');
  });
  document.getElementById('page' + n).classList.add('active');

  // Update tabs
  for (var i = 1; i <= 3; i++) {
    var tab = document.getElementById('tab' + i);
    tab.classList.remove('active', 'done');
    if (i === n) tab.classList.add('active');
    else if (i < n) tab.classList.add('done');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ============================
//  VALIDATION HELPER
// ============================

function setErr(inputId, hintId, message) {
  var el = document.getElementById(inputId);
  var hint = hintId ? document.getElementById(hintId) : null;
  if (message) {
    el.classList.add('err');
    if (hint) hint.textContent = message;
    return true;
  } else {
    el.classList.remove('err');
    if (hint) hint.textContent = '';
    return false;
  }
}


// ============================
//  STEP 1 VALIDATION
// ============================

function validateStep1() {
  var hasError = false;

  hasError = setErr('pLastName',    'hLastName',    !document.getElementById('pLastName').value.trim()    ? 'Last name is required.'    : '') || hasError;
  hasError = setErr('pFirstName',   'hFirstName',   !document.getElementById('pFirstName').value.trim()   ? 'First name is required.'   : '') || hasError;
  hasError = setErr('pDOB',         'hDOB',         !document.getElementById('pDOB').value.trim()         ? 'Date of birth is required.' : '') || hasError;
  hasError = setErr('pCivilStatus', 'hCivilStatus', !document.getElementById('pCivilStatus').value        ? 'Civil status is required.'  : '') || hasError;
  hasError = setErr('pBirthPlace',  'hBirthPlace',  !document.getElementById('pBirthPlace').value.trim()  ? 'Birth place is required.'   : '') || hasError;
  hasError = setErr('pCountry',     'hCountry',     !document.getElementById('pCountry').value.trim()     ? 'Country is required.'       : '') || hasError;
  hasError = setErr('pRegion',      'hRegion',      !document.getElementById('pRegion').value.trim()      ? 'Region is required.'        : '') || hasError;
  hasError = setErr('pProvince',    'hProvince',    !document.getElementById('pProvince').value.trim()    ? 'Province is required.'      : '') || hasError;
  hasError = setErr('pMunicipality','hMunicipality',!document.getElementById('pMunicipality').value.trim()? 'Municipality is required.'  : '') || hasError;
  hasError = setErr('pBarangay',    'hBarangay',    !document.getElementById('pBarangay').value.trim()    ? 'Barangay is required.'      : '') || hasError;
  hasError = setErr('pCellNo',      'hCellNo',      !document.getElementById('pCellNo').value.trim()      ? 'Cellphone number is required.' : '') || hasError;
  hasError = setErr('pCitizenship', 'hCitizenship', !document.getElementById('pCitizenship').value.trim() ? 'Citizenship is required.'   : '') || hasError;

  // Sex radio
  var sexSelected = document.querySelector('input[name="sex"]:checked');
  var sexRow = document.getElementById('sexRow');
  var sexHint = document.getElementById('hSex');
  if (!sexSelected) {
    sexRow.classList.add('err');
    sexHint.textContent = 'Please select your sex.';
    hasError = true;
  } else {
    sexRow.classList.remove('err');
    sexHint.textContent = '';
  }

  // Email
  var email = document.getElementById('pEmail').value.trim();
  hasError = setErr('pEmail', 'hEmail',
    !email ? 'Email address is required.' :
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email address.' : ''
  ) || hasError;

  if (hasError) {
    openPopup('popupRequired');
    return false;
  }
  return true;
} 

function validateStep2() {
  var hasError = false;

  // ADDED: Father required fields
  hasError = setErr('fLastName',     'hFLastName',     !document.getElementById('fLastName').value.trim()     ? "Father's last name is required."       : '') || hasError;
  hasError = setErr('fMiddleName',   'hFMiddleName',   !document.getElementById('fMiddleName').value.trim()   ? "Father's middle name is required."     : '') || hasError;
  hasError = setErr('fFirstName',    'hFFirstName',    !document.getElementById('fFirstName').value.trim()    ? "Father's first name is required."      : '') || hasError;

  // ADDED: Mother required fields
  hasError = setErr('mLastName',     'hMLastName',     !document.getElementById('mLastName').value.trim()     ? "Mother's last name is required."       : '') || hasError;
  hasError = setErr('mMiddleName',   'hMMiddleName',   !document.getElementById('mMiddleName').value.trim()   ? "Mother's middle name is required."     : '') || hasError;
  hasError = setErr('mFirstName',    'hMFirstName',    !document.getElementById('mFirstName').value.trim()    ? "Mother's first name is required."      : '') || hasError;

  // ADDED: Guardian required fields
  hasError = setErr('gName',         'hGName',         !document.getElementById('gName').value.trim()         ? "Guardian's complete name is required." : '') || hasError;
  hasError = setErr('gCP',           'hGCP',           !document.getElementById('gCP').value.trim()           ? "Guardian's CP No. is required."        : '') || hasError;
  hasError = setErr('gRelationship', 'hGRelationship', !document.getElementById('gRelationship').value        ? "Relationship is required."             : '') || hasError;

  // ADDED: show popup banner if there are errors (same as Step 1)
  if (hasError) {
    openPopup('popupRequired');
    return false;
  }
  return true;
}



// ============================
//  STEP 3: REQUIREMENTS PER TYPE
// ============================

var requirements = {
  'Freshman': {
    title: 'Required Documents — Freshman',
    info: 'Please prepare the following documents:',
    items: [
      'Senior High School Report Card / Form 138',
      'Certificate of Graduation or Diploma',
      'Good Moral Certificate',
      'Birth Certificate (PSA)',
      '2×2 ID Photos',
      "Learner's Reference Number (LRN)"
    ]
  },
  'Transferee': {
    title: 'Required Documents — Transferee',
    info: 'Please prepare the following documents from your previous college:',
    items: [
      'Transcript of Records (TOR) from previous college',
      'Honorable Dismissal / Transfer Credential',
      'Birth Certificate (PSA)',
      'Course Description / Syllabus'
    ]
  },
  'Shifter': {
    title: 'Required Documents — Shifter',
    info: 'Please prepare the following documents for shifting:',
    items: [
      'Shifting Form / Request Letter',
      'Grades or Transcript of Records',
      'Approval from Department'
    ]
  },
  'Returnee': {
    title: 'Required Documents — Returnee',
    info: 'Please prepare the following documents for re-admission:',
    items: [
      'Previous School Record / Transcript',
      'Re-admission Form',
      'Clearance',
      'Good Moral Certificate'
    ]
  },
  'PEPT/ALS Graduate': {
    title: 'Required Documents — PEPT/ALS Graduate',
    info: 'Please prepare the following documents:',
    items: [
      'ALS Certificate or PEPT Certificate',
      'Form 138 / Equivalent Record',
      'Birth Certificate (PSA)',
      'Good Moral Certificate',
      'ID Photos'
    ]
  }
};

function onApplicantTypeChange() {
  var type = document.getElementById('admAs').value;
  var docsSection = document.getElementById('docsSection');

  if (type && requirements[type]) {
    document.getElementById('docsTypeLabel').textContent = type;
    document.getElementById('docsInfo').textContent = requirements[type].info;
    docsSection.style.display = 'block';
    // Auto-open requirements popup
    showReqPopup();
  } else {
    docsSection.style.display = 'none';
  }
}

function showReqPopup() {
  var type = document.getElementById('admAs').value;
  if (!type || !requirements[type]) return;

  var req = requirements[type];
  document.getElementById('popupReqHeader').textContent = req.title;

  var list = document.getElementById('popupReqList');
  list.innerHTML = '';
  req.items.forEach(function (item) {
    var li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  openPopup('popupReqs');
}


// ============================
//  STEP 3 SUBMIT
// ============================

function submitForm() {
  var hasError = false;

  hasError = setErr('admFor',      'hAdmFor',      !document.getElementById('admFor').value      ? 'Please select admission type.'       : '') || hasError;
  hasError = setErr('admAs',       'hAdmAs',       !document.getElementById('admAs').value       ? 'Please select applicant category.'   : '') || hasError;
  hasError = setErr('sSchoolName', 'hSchoolName',  !document.getElementById('sSchoolName').value.trim() ? 'Name of school is required.'  : '') || hasError;
  hasError = setErr('sSchoolAddr', 'hSchoolAddr',  !document.getElementById('sSchoolAddr').value.trim() ? 'Address of school is required.': '') || hasError;
  hasError = setErr('iCampus',     'hCampus',      !document.getElementById('iCampus').value.trim()     ? 'Campus is required.'           : '') || hasError;
  hasError = setErr('c1',          'hC1',          !document.getElementById('c1').value.trim()          ? 'Preferred course is required.' : '') || hasError;
  hasError = setErr('chooseDate',  'hDate',        !document.getElementById('chooseDate').value         ? 'Please choose a date.'        : '') || hasError;

  if (hasError) return;

  if (!document.getElementById('confirmCheck').checked) {
    alert('Please check the confirmation box before submitting.');
    return;
  }

  alert('Application submitted successfully!\n\nThank you for applying to Partido State University.\nPlease wait for further instructions.');
}


// ============================
//  LIVE ERROR CLEARING
// ============================

// Step 1 live fields
var step1Fields = [
  { id: 'pLastName',     hint: 'hLastName' },
  { id: 'pFirstName',    hint: 'hFirstName' },
  { id: 'pDOB',          hint: 'hDOB' },
  { id: 'pCivilStatus',  hint: 'hCivilStatus' },
  { id: 'pBirthPlace',   hint: 'hBirthPlace' },
  { id: 'pCountry',      hint: 'hCountry' },
  { id: 'pRegion',       hint: 'hRegion' },
  { id: 'pProvince',     hint: 'hProvince' },
  { id: 'pMunicipality', hint: 'hMunicipality' },
  { id: 'pBarangay',     hint: 'hBarangay' },
  { id: 'pCellNo',       hint: 'hCellNo' },
  { id: 'pEmail',        hint: 'hEmail' },
  { id: 'pCitizenship',  hint: 'hCitizenship' },
];

// Step 3 live fields
var step3Fields = [
  { id: 'admFor',      hint: 'hAdmFor' },
  { id: 'admAs',       hint: 'hAdmAs' },
  { id: 'sSchoolName', hint: 'hSchoolName' },
  { id: 'sSchoolAddr', hint: 'hSchoolAddr' },
  { id: 'iCampus',     hint: 'hCampus' },
  { id: 'c1',          hint: 'hC1' },
  { id: 'chooseDate',  hint: 'hDate' },
];

step1Fields.concat(step3Fields).forEach(function (pair) {
  var el = document.getElementById(pair.id);
  if (!el) return;
  var evt = (el.tagName === 'SELECT' || el.type === 'date') ? 'change' : 'input';
  el.addEventListener(evt, function () {
    if (this.value.trim()) {
      this.classList.remove('err');
      var hint = document.getElementById(pair.hint);
      if (hint) hint.textContent = '';
    }
  });
});

// Clear sex radio error on selection
document.querySelectorAll('input[name="sex"]').forEach(function (radio) {
  radio.addEventListener('change', function () {
    document.getElementById('sexRow').classList.remove('err');
    document.getElementById('hSex').textContent = '';
  });
});