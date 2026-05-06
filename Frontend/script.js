// ===========================
//  PSU Online Admission Form
//  script.js
// ===========================

// Auto uppercase for .caps fields
const capsInputs = document.querySelectorAll(".caps");
capsInputs.forEach(input => {
  input.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
  });
});

// ============================
//  DATE OF BIRTH AUTO-FORMAT (MM/DD/YYYY)
// ============================
const dobInput = document.getElementById('pDOB');
if (dobInput) {
  dobInput.addEventListener('input', function (e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length >= 2 && value.length < 4) {
      this.value = value.slice(0, 2) + '/' + value.slice(2);
    } else if (value.length >= 4 && value.length < 8) {
      this.value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
    } else if (value.length >= 8) {
      this.value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
    } else {
      this.value = value;
    }
  });
}

// ============================
//  CONTROL NUMBER
// ============================
let isControlNumberValid = false;

function generateControlNumber() {
  let n = '';
  for (let i = 0; i < 16; i++) {
    n += Math.floor(Math.random() * 10);
  }
  return n;
}

function toggleControlNo() {
  const checkbox = document.getElementById('newApplicantCheck');
  const controlRow = document.getElementById('controlRow');
  const hint = document.getElementById('hNewApplicant');

  if (checkbox.checked) {
    document.getElementById('ctrlNo').textContent = generateControlNumber();
    controlRow.style.display = 'block';
    isControlNumberValid = true;
    if (hint) hint.textContent = '';
  } else {
    controlRow.style.display = 'none';
    document.getElementById('ctrlNo').textContent = '';
    isControlNumberValid = false;
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

document.querySelectorAll('.popup-overlay').forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('open');
    }
  });
});


// ============================
//  HELPER: SET ERROR
// ============================
function setErr(inputId, hintId, message) {
  const el = document.getElementById(inputId);
  const hint = hintId ? document.getElementById(hintId) : null;
  if (message) {
    if (el) el.classList.add('err');
    if (hint) hint.textContent = message;
    return true;
  } else {
    if (el) el.classList.remove('err');
    if (hint) hint.textContent = '';
    return false;
  }
}

// ============================
//  DISPLAY INSTRUCTION MESSAGE
// ============================
function showInstructionMessage(type) {
  const messageDiv = document.getElementById('instructionMessage');

  if (!type) {
    messageDiv.style.display = 'none';
    return;
  }

  let message = '';

  switch (type) {
    case 'Freshman':
      message = 'You selected as a FRESHMAN. Please fill out the "High School / Senior High School" section below. The "Last School Attended" section is not required for you.';
      break;
    case 'PEPT/ALS Graduate':
      message = 'You selected as a PEPT/ALS GRADUATE. Please fill out the "High School / Senior High School" section below. The "Last School Attended" section is not required for you.';
      break;
    case 'Transferee':
      message = 'You selected as a TRANSFEREE. Please fill out the "Last School Attended" section below. The "High School / Senior High School" section is not required for you.';
      break;
    case 'Shifter':
      message = 'You selected as a SHIFTER. Please fill out the "Last School Attended" section below. The "High School / Senior High School" section is not required for you.';
      break;
    case 'Returnee':
      message = 'You selected as a RETURNEE. Please fill out the "Last School Attended" section below. The "High School / Senior High School" section is not required for you.';
      break;
    default:
      messageDiv.style.display = 'none';
      return;
  }

  messageDiv.innerHTML = message;
  messageDiv.style.display = 'flex';

  setTimeout(() => {
    if (messageDiv.style.display === 'flex') {
      messageDiv.style.opacity = '0.8';
      setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.style.opacity = '1';
      }, 500);
    }
  }, 8000);
}

// ============================
//  TOGGLE FIELDS BASED ON APPLICANT TYPE
// ============================
function toggleFieldsByType() {
  const type = document.getElementById('admAs').value;

  const isFreshmanOrALS = (type === 'Freshman' || type === 'PEPT/ALS Graduate');
  const isTransShifterReturnee = (type === 'Transferee' || type === 'Shifter' || type === 'Returnee');

  const hsFields = ['sSchoolName', 'sSchoolAddr', 'sStrand', 'sYearGrad', 'sGWA'];
  const lsFields = ['tSchoolName', 'tSchoolAddr', 'tProgram', 'tLastYear', 'tLastLevel', 'tGWA'];

  const lrnField = document.getElementById('iLRN');
  const lrnAsterisk = document.getElementById('lrnAsterisk');

  showInstructionMessage(type);

  if (isFreshmanOrALS) {
    hsFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) { field.disabled = false; field.required = true; field.style.opacity = '1'; field.style.background = '#fafafa'; }
    });
    lsFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) { field.disabled = true; field.required = false; field.classList.remove('err'); field.style.opacity = '0.6'; field.style.background = '#e8e8e8'; }
    });
    lrnField.disabled = false; lrnField.required = true; lrnAsterisk.style.display = 'inline'; lrnField.style.opacity = '1'; lrnField.style.background = '#fafafa';

  } else if (isTransShifterReturnee) {
    hsFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) { field.disabled = true; field.required = false; field.classList.remove('err'); field.style.opacity = '0.6'; field.style.background = '#e8e8e8'; }
    });
    lsFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) { field.disabled = false; field.required = true; field.style.opacity = '1'; field.style.background = '#fafafa'; }
    });
    lrnField.disabled = false; lrnField.required = false; lrnAsterisk.style.display = 'none'; lrnField.style.opacity = '1'; lrnField.style.background = '#fafafa';
    setErr('iLRN', 'hLRN', '');

  } else {
    hsFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) { field.disabled = false; field.required = true; field.style.opacity = '1'; field.style.background = '#fafafa'; }
    });
    lsFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) { field.disabled = false; field.required = true; field.style.opacity = '1'; field.style.background = '#fafafa'; }
    });
    lrnField.disabled = false; lrnField.required = true; lrnAsterisk.style.display = 'inline'; lrnField.style.opacity = '1'; lrnField.style.background = '#fafafa';
  }
}

// ============================
//  STEP 1 VALIDATION
// ============================
function validateStep1() {
  let hasError = false;

  const newApplicantCheck = document.getElementById('newApplicantCheck');
  if (!newApplicantCheck.checked) {
    const hint = document.getElementById('hNewApplicant');
    if (hint) hint.textContent = 'Please check "New applicant" to generate your Control Number.';
    openPopup('popupControlRequired');
    return false;
  } else {
    const hint = document.getElementById('hNewApplicant');
    if (hint) hint.textContent = '';
  }

  hasError = setErr('pLastName', 'hLastName', !document.getElementById('pLastName').value.trim() ? 'Last name is required.' : '') || hasError;
  hasError = setErr('pFirstName', 'hFirstName', !document.getElementById('pFirstName').value.trim() ? 'First name is required.' : '') || hasError;
  hasError = setErr('pMiddleName', 'hMiddleName', !document.getElementById('pMiddleName').value.trim() ? 'Middle name is required.' : '') || hasError;
  hasError = setErr('pDOB', 'hDOB', !document.getElementById('pDOB').value.trim() ? 'Date of birth is required.' : '') || hasError;
  hasError = setErr('pCivilStatus', 'hCivilStatus', !document.getElementById('pCivilStatus').value ? 'Civil status is required.' : '') || hasError;
  hasError = setErr('pBirthPlace', 'hBirthPlace', !document.getElementById('pBirthPlace').value.trim() ? 'Birth place is required.' : '') || hasError;
  hasError = setErr('pCountry', 'hCountry', !document.getElementById('pCountry').value.trim() ? 'Country is required.' : '') || hasError;
  hasError = setErr('pRegion', 'hRegion', !document.getElementById('pRegion').value.trim() ? 'Region is required.' : '') || hasError;
  hasError = setErr('pProvince', 'hProvince', !document.getElementById('pProvince').value.trim() ? 'Province is required.' : '') || hasError;
  hasError = setErr('pMunicipality', 'hMunicipality', !document.getElementById('pMunicipality').value.trim() ? 'Municipality is required.' : '') || hasError;
  hasError = setErr('pBarangay', 'hBarangay', !document.getElementById('pBarangay').value.trim() ? 'Barangay is required.' : '') || hasError;
  hasError = setErr('pCellNo', 'hCellNo', !document.getElementById('pCellNo').value.trim() ? 'Cellphone number is required.' : '') || hasError;
  hasError = setErr('pCitizenship', 'hCitizenship', !document.getElementById('pCitizenship').value.trim() ? 'Citizenship is required.' : '') || hasError;

  const cellNo = document.getElementById('pCellNo').value.trim();
  if (cellNo && !/^\d{11}$/.test(cellNo)) {
    hasError = setErr('pCellNo', 'hCellNo', 'Cellphone number must be exactly 11 digits.') || hasError;
  }

  const sexSelected = document.querySelector('input[name="sex"]:checked');
  const sexRow = document.getElementById('sexRow');
  const sexHint = document.getElementById('hSex');
  if (!sexSelected) {
    sexRow.classList.add('err');
    sexHint.textContent = 'Please select your sex.';
    hasError = true;
  } else {
    sexRow.classList.remove('err');
    sexHint.textContent = '';
  }

  const email = document.getElementById('pEmail').value.trim();
  if (!email) {
    hasError = setErr('pEmail', 'hEmail', 'Email address is required.') || hasError;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    hasError = setErr('pEmail', 'hEmail', 'Enter a valid email address.') || hasError;
  } else {
    setErr('pEmail', 'hEmail', '');
  }

  if (hasError) { openPopup('popupRequired'); return false; }
  return true;
}

// ============================
//  STEP 2 VALIDATION
// ============================
function validateStep2() {
  let hasError = false;

  hasError = setErr('fLastName', 'hFLastName', !document.getElementById('fLastName').value.trim() ? "Father's last name is required." : '') || hasError;
  hasError = setErr('fFirstName', 'hFFirstName', !document.getElementById('fFirstName').value.trim() ? "Father's first name is required." : '') || hasError;
  hasError = setErr('fMiddleName', 'hFMiddleName', !document.getElementById('fMiddleName').value.trim() ? "Father's middle name is required." : '') || hasError;
  hasError = setErr('mLastName', 'hMLastName', !document.getElementById('mLastName').value.trim() ? "Mother's last name is required." : '') || hasError;
  hasError = setErr('mFirstName', 'hMFirstName', !document.getElementById('mFirstName').value.trim() ? "Mother's first name is required." : '') || hasError;
  hasError = setErr('mMiddleName', 'hMMiddleName', !document.getElementById('mMiddleName').value.trim() ? "Mother's middle name is required." : '') || hasError;
  hasError = setErr('gName', 'hGName', !document.getElementById('gName').value.trim() ? "Guardian's complete name is required." : '') || hasError;
  hasError = setErr('gCP', 'hGCP', !document.getElementById('gCP').value.trim() ? "Guardian's CP No. is required." : '') || hasError;
  hasError = setErr('gRelationship', 'hGRelationship', !document.getElementById('gRelationship').value ? "Relationship is required." : '') || hasError;

  const guardianCP = document.getElementById('gCP').value.trim();
  if (guardianCP && !/^\d{11}$/.test(guardianCP)) {
    hasError = setErr('gCP', 'hGCP', 'Guardian CP No. must be exactly 11 digits.') || hasError;
  }

  if (hasError) { openPopup('popupRequired'); return false; }
  return true;
}

// ============================
//  STEP 3 VALIDATION
// ============================
function validateStep3() {
  let hasError = false;
  const type = document.getElementById('admAs').value;
  const isFreshmanOrALS = (type === 'Freshman' || type === 'PEPT/ALS Graduate');
  const isTransShifterReturnee = (type === 'Transferee' || type === 'Shifter' || type === 'Returnee');

  hasError = setErr('admFor', 'hAdmFor', !document.getElementById('admFor').value ? 'Please select admission type.' : '') || hasError;
  hasError = setErr('admAs', 'hAdmAs', !type ? 'Please select applicant category.' : '') || hasError;

  if (isFreshmanOrALS) {
    if (!document.getElementById('sSchoolName').disabled) {
      hasError = setErr('sSchoolName', 'hSchoolName', !document.getElementById('sSchoolName').value.trim() ? 'Name of school is required.' : '') || hasError;
      hasError = setErr('sSchoolAddr', 'hSchoolAddr', !document.getElementById('sSchoolAddr').value.trim() ? 'Address of school is required.' : '') || hasError;
      hasError = setErr('sStrand', 'hStrand', !document.getElementById('sStrand').value.trim() ? 'Strand is required.' : '') || hasError;
      hasError = setErr('sYearGrad', 'hYearGrad', !document.getElementById('sYearGrad').value.trim() ? 'Year graduated is required.' : '') || hasError;
      hasError = setErr('sGWA', 'hGWA', !document.getElementById('sGWA').value.trim() ? 'G.W.A. is required.' : '') || hasError;
    }
    hasError = setErr('iLRN', 'hLRN', !document.getElementById('iLRN').value.trim() ? "Learner's Reference No. is required." : '') || hasError;
    const lrn = document.getElementById('iLRN').value.trim();
    if (lrn && !/^\d{12}$/.test(lrn)) {
      hasError = setErr('iLRN', 'hLRN', "Learner's Reference No. must be 12 digits.") || hasError;
    }
  } else if (isTransShifterReturnee) {
    if (!document.getElementById('tSchoolName').disabled) {
      hasError = setErr('tSchoolName', 'hTSchoolName', !document.getElementById('tSchoolName').value.trim() ? 'Last school name is required.' : '') || hasError;
      hasError = setErr('tSchoolAddr', 'hTSchoolAddr', !document.getElementById('tSchoolAddr').value.trim() ? 'Last school address is required.' : '') || hasError;
      hasError = setErr('tProgram', 'hTProgram', !document.getElementById('tProgram').value.trim() ? 'Program is required.' : '') || hasError;
      hasError = setErr('tLastYear', 'hTLastYear', !document.getElementById('tLastYear').value.trim() ? 'Last year attended is required.' : '') || hasError;
      hasError = setErr('tLastLevel', 'hTLastLevel', !document.getElementById('tLastLevel').value.trim() ? 'Last year level is required.' : '') || hasError;
      hasError = setErr('tGWA', 'hTGWA', !document.getElementById('tGWA').value.trim() ? 'G.W.A. from last school is required.' : '') || hasError;
    }
    setErr('iLRN', 'hLRN', '');
  } else {
    if (!type) { openPopup('popupRequired'); return false; }
  }

  hasError = setErr('iYearLevel', 'hYearLevel', !document.getElementById('iYearLevel').value.trim() ? 'Incoming year level is required.' : '') || hasError;
  hasError = setErr('iCampus', 'hCampus', !document.getElementById('iCampus').value.trim() ? 'Campus is required.' : '') || hasError;
  hasError = setErr('c1', 'hC1', !document.getElementById('c1').value.trim() ? 'Preferred course is required.' : '') || hasError;

  if (hasError) { openPopup('popupRequired'); return false; }
  return true;
}

// ============================
//  STEP NAVIGATION
// ============================
function goStep(n) {
  if (n === 2 && !validateStep1()) return;
  if (n === 3 && !validateStep2()) return;

  document.querySelectorAll('.step-page').forEach(p => p.classList.remove('active'));
  document.getElementById('page' + n).classList.add('active');

  for (let i = 1; i <= 3; i++) {
    const tab = document.getElementById('tab' + i);
    tab.classList.remove('active', 'done');
    if (i === n) tab.classList.add('active');
    else if (i < n) tab.classList.add('done');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================
//  REQUIREMENTS PER TYPE
// ============================
const requirements = {
  'Freshman': {
    title: 'Required Documents — Freshman',
    info: 'Please prepare the following documents:',
    items: ['Senior High School Report Card / Form 138', 'Certificate of Graduation or Diploma', 'Good Moral Certificate', 'Birth Certificate (PSA)', '2×2 ID Photos', "Learner's Reference Number (LRN)"]
  },
  'Transferee': {
    title: 'Required Documents — Transferee',
    info: 'Please prepare the following documents from your previous college:',
    items: ['Transcript of Records (TOR) from previous college', 'Honorable Dismissal / Transfer Credential', 'Birth Certificate (PSA)', 'Course Description / Syllabus']
  },
  'Shifter': {
    title: 'Required Documents — Shifter',
    info: 'Please prepare the following documents for shifting:',
    items: ['Shifting Form / Request Letter', 'Grades or Transcript of Records', 'Approval from Department']
  },
  'Returnee': {
    title: 'Required Documents — Returnee',
    info: 'Please prepare the following documents for re-admission:',
    items: ['Previous School Record / Transcript', 'Re-admission Form', 'Clearance', 'Good Moral Certificate']
  },
  'PEPT/ALS Graduate': {
    title: 'Required Documents — PEPT/ALS Graduate',
    info: 'Please prepare the following documents:',
    items: ['ALS Certificate or PEPT Certificate', 'Form 138 / Equivalent Record', 'Birth Certificate (PSA)', 'Good Moral Certificate', 'ID Photos']
  }
};

function onApplicantTypeChange() {
  const type = document.getElementById('admAs').value;
  const docsSection = document.getElementById('docsSection');

  if (type && requirements[type]) {
    document.getElementById('docsTypeLabel').textContent = type;
    document.getElementById('docsInfo').textContent = requirements[type].info;
    docsSection.style.display = 'block';
    showReqPopup();
  } else {
    docsSection.style.display = 'none';
  }
  toggleFieldsByType();
}

function showReqPopup() {
  const type = document.getElementById('admAs').value;
  if (!type || !requirements[type]) return;

  const req = requirements[type];
  document.getElementById('popupReqHeader').textContent = req.title;

  const list = document.getElementById('popupReqList');
  list.innerHTML = '';
  req.items.forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  openPopup('popupReqs');
}

// ============================
//  SUBMIT FORM — connected to Spring Boot API
// ============================
const API_BASE = "http://localhost:8080";

async function submitForm() {
  // 1. Validation Checks
  if (!validateStep3()) return;
  if (!document.getElementById('confirmCheck').checked) {
    alert('Please check the confirmation box before submitting.');
    return;
  }

  const controlNo = document.getElementById('ctrlNo').textContent.trim();
  const type = document.getElementById('admAs').value;
  const isFreshmanOrALS = (type === 'Freshman' || type === 'PEPT/ALS Graduate');

  // 2. The Clustered Payload (Must match your ApplicationDTO structure)
  const payload = {
    controlNo: controlNo,

    // Matches ApplicationDTO.personalData
    personalData: {
      lastName:      document.getElementById('pLastName').value.trim(),
      firstName:     document.getElementById('pFirstName').value.trim(),
      middleName:    document.getElementById('pMiddleName').value.trim(),
      nameExt:       document.getElementById('pNameExt').value.trim(),
      dob:           document.getElementById('pDOB').value,
      sex:           document.querySelector('input[name="sex"]:checked')?.value || '',
      religion:      document.getElementById('pReligion').value,
      civilStatus:   document.getElementById('pCivilStatus').value,
      birthPlace:    document.getElementById('pBirthPlace').value.trim(),
      country:       document.getElementById('pCountry').value.trim(),
      region:        document.getElementById('pRegion').value.trim(),
      province:      document.getElementById('pProvince').value.trim(),
      municipality:  document.getElementById('pMunicipality').value.trim(),
      barangay:      document.getElementById('pBarangay').value.trim(),
      street:        document.getElementById('pStreet').value.trim(),
      tempAddress:   document.getElementById('pTempAddr').value.trim(),
      telNo:         document.getElementById('pTelNo').value.trim(),
      cellNo:        document.getElementById('pCellNo').value.trim(),
      email:         document.getElementById('pEmail').value.trim(),
      cultural:      document.getElementById('pCultural').value.trim(),
      indigenous:    document.getElementById('pIndigenous').value.trim(),
      citizenship:   document.getElementById('pCitizenship').value.trim()
    },

    // Matches ApplicationDTO.familyData
    familyData: {
      fatherLastName:   document.getElementById('fLastName').value.trim(),
      fatherFirstName:  document.getElementById('fFirstName').value.trim(),
      fatherMiddleName: document.getElementById('fMiddleName').value.trim(),
      fatherCpNo:       document.getElementById('fCP').value.trim(),
      fatherOccupation: document.getElementById('fOccupation').value.trim(),
      fatherIncome:     document.getElementById('fIncome').value,
      motherLastName:   document.getElementById('mLastName').value.trim(),
      motherFirstName:  document.getElementById('mFirstName').value.trim(),
      motherMiddleName: document.getElementById('mMiddleName').value.trim(),
      motherCpNo:       document.getElementById('mCP').value.trim(),
      motherOccupation: document.getElementById('mOccupation').value.trim(),
      motherIncome:     document.getElementById('mIncome').value,
      guardianName:     document.getElementById('gName').value.trim(),
      guardianCpNo:     document.getElementById('gCP').value.trim(),
      guardianRelationship: document.getElementById('gRelationship').value
    },

    // Matches ApplicationDTO.admissionData
    admissionData: {
      admissionFor:      document.getElementById('admFor').value,
      applicantType:     type,
      incomingYearLevel: document.getElementById('iYearLevel').value.trim(),
      lrn:               document.getElementById('iLRN').value.trim(),
      campus:            document.getElementById('iCampus').value.trim(),
      course1:           document.getElementById('c1').value.trim(),
      course2:           document.getElementById('c2').value.trim(),
      course3:           document.getElementById('c3').value.trim(),
      hsName:            isFreshmanOrALS ? document.getElementById('sSchoolName').value.trim() : '',
      hsAddr:            isFreshmanOrALS ? document.getElementById('sSchoolAddr').value.trim() : '',
      hsStrand:          isFreshmanOrALS ? document.getElementById('sStrand').value.trim() : '',
      hsYearGrad:        isFreshmanOrALS ? document.getElementById('sYearGrad').value.trim() : '',
      hsGwa:             isFreshmanOrALS ? document.getElementById('sGWA').value.trim() : '',
      prevSchoolName:    !isFreshmanOrALS ? document.getElementById('tSchoolName').value.trim() : '',
      prevProgram:       !isFreshmanOrALS ? document.getElementById('tProgram').value.trim() : '',
      prevGwa:           !isFreshmanOrALS ? document.getElementById('tGWA').value.trim() : ''
    }
  };

  // 3. UI Feedback
  const submitBtn = document.querySelector('#page3 .btn-next');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  // 4. The API Call
  try {
    const response = await fetch('http://localhost:8080/api/v1/admissions/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('Application submitted successfully!');
      location.reload(); 
    } else {
      const errorMsg = await response.text();
      alert('Submission failed: ' + errorMsg);
    }
  } catch (error) {
    alert('Server Connection Error: Is Spring Boot running?');
    console.error(error);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// ============================
//  LIVE ERROR CLEARING
// ============================
const allValidationFields = [
  { id: 'pLastName', hint: 'hLastName' }, { id: 'pMiddleName', hint: 'hMiddleName' }, { id: 'pFirstName', hint: 'hFirstName' },
  { id: 'pDOB', hint: 'hDOB' }, { id: 'pCivilStatus', hint: 'hCivilStatus' }, { id: 'pBirthPlace', hint: 'hBirthPlace' },
  { id: 'pCountry', hint: 'hCountry' }, { id: 'pRegion', hint: 'hRegion' }, { id: 'pProvince', hint: 'hProvince' },
  { id: 'pMunicipality', hint: 'hMunicipality' }, { id: 'pBarangay', hint: 'hBarangay' }, { id: 'pCellNo', hint: 'hCellNo' },
  { id: 'pEmail', hint: 'hEmail' }, { id: 'pCitizenship', hint: 'hCitizenship' }, { id: 'fLastName', hint: 'hFLastName' },
  { id: 'fMiddleName', hint: 'hFMiddleName' }, { id: 'fFirstName', hint: 'hFFirstName' }, { id: 'mLastName', hint: 'hMLastName' },
  { id: 'mMiddleName', hint: 'hMMiddleName' }, { id: 'mFirstName', hint: 'hMFirstName' }, { id: 'gName', hint: 'hGName' },
  { id: 'gCP', hint: 'hGCP' }, { id: 'gRelationship', hint: 'hGRelationship' }, { id: 'admFor', hint: 'hAdmFor' },
  { id: 'admAs', hint: 'hAdmAs' }, { id: 'sSchoolName', hint: 'hSchoolName' }, { id: 'sSchoolAddr', hint: 'hSchoolAddr' },
  { id: 'sStrand', hint: 'hStrand' }, { id: 'sYearGrad', hint: 'hYearGrad' }, { id: 'sGWA', hint: 'hGWA' },
  { id: 'iYearLevel', hint: 'hYearLevel' }, { id: 'iLRN', hint: 'hLRN' }, { id: 'iCampus', hint: 'hCampus' },
  { id: 'c1', hint: 'hC1' }, { id: 'tSchoolName', hint: 'hTSchoolName' }, { id: 'tSchoolAddr', hint: 'hTSchoolAddr' },
  { id: 'tProgram', hint: 'hTProgram' }, { id: 'tLastYear', hint: 'hTLastYear' }, { id: 'tLastLevel', hint: 'hTLastLevel' },
  { id: 'tGWA', hint: 'hTGWA' }
];

allValidationFields.forEach(pair => {
  const el = document.getElementById(pair.id);
  if (!el) return;
  const evt = (el.tagName === 'SELECT') ? 'change' : 'input';
  el.addEventListener(evt, function () {
    if (this.value && this.value.trim() !== '') {
      this.classList.remove('err');
      const hint = document.getElementById(pair.hint);
      if (hint) hint.textContent = '';
    }
  });
});

document.querySelectorAll('input[name="sex"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.getElementById('sexRow').classList.remove('err');
    document.getElementById('hSex').textContent = '';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const hsFields = ['sSchoolName', 'sSchoolAddr', 'sStrand', 'sYearGrad', 'sGWA'];
  const lsFields = ['tSchoolName', 'tSchoolAddr', 'tProgram', 'tLastYear', 'tLastLevel', 'tGWA'];

  [...hsFields, ...lsFields].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) { field.disabled = false; field.required = true; field.style.opacity = '1'; field.style.background = '#fafafa'; }
  });

  const lrnField = document.getElementById('iLRN');
  if (lrnField) { lrnField.disabled = false; lrnField.required = true; lrnField.style.opacity = '1'; lrnField.style.background = '#fafafa'; }
});