export function validateForm(): boolean {
    const NumJ = document.querySelector<HTMLInputElement>("#input-numJoints");
    const NumM = document.querySelector<HTMLInputElement>("#input-numMembers");
    const NumEMs = document.querySelector<HTMLInputElement>("#input-numEMs");
    const NumA = document.querySelector<HTMLInputElement>("#input-numAreas");
    const NumMoI = document.querySelector<HTMLInputElement>("#input-numMOIs");
    const allEM = document.querySelectorAll<HTMLInputElement>(".input-EM");
    const allAreas = document.querySelectorAll<HTMLInputElement>(".input-Area");
    const allMoI = document.querySelectorAll<HTMLInputElement>(".input-MoI");
    const allJointsClasses = document.querySelectorAll<HTMLInputElement>(".joint");
    const allMembersClasses = document.querySelectorAll<HTMLInputElement>(".member");
    const allSupportsClasses = document.querySelectorAll<HTMLInputElement>(".supports");
    const allNumPropClasses = document.querySelectorAll<HTMLInputElement>(".num-prop");
    const allJLJ = document.querySelectorAll<HTMLInputElement>(".jl-j");
    const allJLX = document.querySelectorAll<HTMLInputElement>(".jl-x");
    const allJLY = document.querySelectorAll<HTMLInputElement>(".jl-y");
    const allJLM = document.querySelectorAll<HTMLInputElement>(".jl-m");
    const allMLM = document.querySelectorAll<HTMLInputElement>(".ml-m");
    const allMLXD = document.querySelectorAll<HTMLInputElement>(".ml-xd");
    const allMLPL = document.querySelectorAll<HTMLInputElement>(".ml-pl");
    const allMLUDL = document.querySelectorAll<HTMLInputElement>(".ml-udl");

    // eslint-disable-next-line no-useless-escape
    const specChar = /[!@#$%^&*()_+=\[\]{};':"\\|,<>\/?]+/;
    const alphaChar = /[a-zA-Z]/;
    let errorBool = true;

    /*************** GENERAL INFO ****************/
    if (NumJ && (Number(NumJ.value) < 0 || NumJ.value === "" || !Number.isInteger(Number(NumJ.value)))) {
        NumJ.classList.add("input-error");
        errorBool = false;
    } else if (NumJ && NumJ.classList.contains("input-error")) {
        NumJ.classList.remove("input-error");
    }

    if (NumM && (Number(NumM.value) < 0 || NumM.value === "" || !Number.isInteger(Number(NumM.value)))) {
        NumM.classList.add("input-error");
        errorBool = false;
    } else if (NumM && NumM.classList.contains("input-error")) {
        NumM.classList.remove("input-error");
    }

    if (NumEMs && (Number(NumEMs.value) < 0 || NumEMs.value === "" || !Number.isInteger(Number(NumEMs.value)))) {
        NumEMs.classList.add("input-error");
        errorBool = false;
    } else if (NumEMs && NumEMs.classList.contains("input-error")) {
        NumEMs.classList.remove("input-error");
    }

    if (NumA && (Number(NumA.value) < 0 || NumA.value === "" || !Number.isInteger(Number(NumA.value)))) {
        NumA.classList.add("input-error");
        errorBool = false;
    } else if (NumA && NumA.classList.contains("input-error")) {
        NumA.classList.remove("input-error");
    }

    if (NumMoI && (Number(NumMoI.value) < 0 || NumMoI.value === "" || !Number.isInteger(Number(NumMoI.value)))) {
        NumMoI.classList.add("input-error");
        errorBool = false;
    } else if (NumMoI && NumMoI.classList.contains("input-error")) {
        NumMoI.classList.remove("input-error");
    }

    /************* PROPERTIES INPUT **************/
    allEM.forEach((ea) => {
        if (Number(ea.value) < 0 || ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allAreas.forEach((ea) => {
        if (Number(ea.value) < 0 || ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allMoI.forEach((ea) => {
        if (Number(ea.value) < 0 || ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    /*************** JOINTS INPUT ****************/
    allJointsClasses.forEach((ea) => {
        if (Number(ea.value) < 0 || ea.value === "" || ea.value.includes("e")) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allSupportsClasses.forEach((ea) => {
        if (
            Number(ea.value) < 0 ||
            ea.value === "" ||
            ea.value.includes("e") ||
            !Number.isInteger(Number(ea.value)) ||
            Number(ea.value) > 1
        ) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    /************** MEMBERS INPUT ****************/
    allMembersClasses.forEach((ea) => {
        if (Number(ea.value) <= 0 || ea.value === "" || ea.value.includes("e") || !Number.isInteger(Number(ea.value))) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allNumPropClasses.forEach((ea) => {
        if (Number(ea.value) <= 0 || ea.value === "" || ea.value.includes("e") || !Number.isInteger(Number(ea.value))) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    /************* JOINT LOAD INPUT **************/
    allJLJ.forEach((ea) => {
        if (Number(ea.value) < 0 || ea.value === "" || ea.value.includes("e") || !Number.isInteger(Number(ea.value))) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allJLX.forEach((ea) => {
        if (ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allJLY.forEach((ea) => {
        if (ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allJLM.forEach((ea) => {
        if (ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    /************* MEMBER LOAD INPUT *************/
    allMLM.forEach((ea) => {
        if (Number(ea.value) < 0 || ea.value === "" || ea.value.includes("e") || !Number.isInteger(Number(ea.value))) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allMLXD.forEach((ea) => {
        if (Number(ea.value) < 0 || ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allMLPL.forEach((ea) => {
        if (ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    allMLUDL.forEach((ea) => {
        if (ea.value === "" || specChar.test(ea.value) || alphaChar.test(ea.value)) {
            ea.classList.add("input-error");
            errorBool = false;
        } else if (ea.classList.contains("input-error")) {
            ea.classList.remove("input-error");
        }
    });

    return errorBool;
}
