//This code gets the children data from the childrenData.json file
//and stores it in the variable children
const fs = require('fs');
let rawData = fs.readFileSync('childrenData.json', 'utf8');
let children = JSON.parse(rawData);

//Your code goes below

// 1:
let arrayOfAtRiskChildren = [];

// 2:
function calculateChildScore(childObject) {
    let riskScore = 0;
    let riskCategoriesMet = 0;

    // Ethnicity
    if (childObject.ethnicity === "nonwestern") {
        riskScore = riskScore + 500;
        riskCategoriesMet++;
    }

    // Missed Dentist Appointments
    if (childObject.missedDentistAppointments > 0) {
        riskScore = riskScore + childObject.missedDentistAppointments * 300;
        riskCategoriesMet++;
    }

    // Missed Doctor Appointments
    if (childObject.missedDoctorAppointments > 0) {
        riskScore = riskScore + childObject.missedDoctorAppointments * 600;
        riskCategoriesMet++;
    }

    // Time in employment: 2920 = 8 years in days
    if (childObject.mother.timeInEmployment > 0) {
        let motherUnemployment = Math.floor((2920 - childObject.mother.timeInEmployment) / 365) * 500;
        riskScore = riskScore + motherUnemployment;
        riskCategoriesMet++;
    }

    if (childObject.father.timeInEmployment > 0) {
        let fatherUnemployment = Math.floor((2920 - childObject.father.timeInEmployment) / 365) * 500;
        riskScore = riskScore + fatherUnemployment;
        riskCategoriesMet++;
    }

    // Civil status
    if (childObject.mother.civilStatus === "divorced") {
        riskScore = riskScore + 1000;
        riskCategoriesMet++;
    }

    if (childObject.mother.civilStatus === "single") {
        riskScore = riskScore + 1000;
        riskCategoriesMet++;
    }

    if (childObject.father.civilStatus === "divorced") {
        riskScore = riskScore + 1000;
        riskCategoriesMet++;
    }

    if (childObject.father.civilStatus === "single") {
    riskScore = riskScore + 1000;
    riskCategoriesMet++;
    }

    // Psychological condition
    if (childObject.mother.psychologicalCondition !== "none") {
    riskScore = riskScore + 3000;
    riskCategoriesMet++;
    }

    if (childObject.father.psychologicalCondition !== "none") {
        riskScore = riskScore + 3000;
        riskCategoriesMet++
    }

    return [riskScore, riskCategoriesMet]
}

// console.log(calculateChildScore(children[2]))

// 3:
function updateChildObject(childObject, riskScore, riskCategoriesMet) {
    childObject.riskScore = riskScore;
    childObject.riskCategoriesMet = riskCategoriesMet;
}

// 4:
function determineIfChildAtRisk(childObject) {
    if (childObject.riskScore >= 13000 && childObject.riskCategoriesMet >= 2) {
    arrayOfAtRiskChildren.push(childObject.cpr);
}
}

// determineIfChildAtRisk(children[2])

// 5: riskAssessment[0] = riskScore, riskAssessment[1] = riskCategoriesMet
for(childObject of children) {
    let riskAssessment = calculateChildScore(childObject);
    updateChildObject(childObject, riskAssessment[0], riskAssessment[1]);
    determineIfChildAtRisk(childObject);
}

// 6:
console.log(arrayOfAtRiskChildren);
console.log(arrayOfAtRiskChildren.length);

















