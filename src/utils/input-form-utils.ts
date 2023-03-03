import { calculateJointCoordinates } from "./calculate-joint-coordinates.js";
import { calculateForceAngle } from "./calculate-force-angle.js";

import {
    drawJoint,
    drawMember,
    drawSupportXYR,
    drawSupportXY,
    drawSupportXR,
    drawSupportYR,
    drawSupportX,
    drawSupportY,
    drawSupportR,
    drawJointLoadX,
    drawJointLoadY,
    drawJointLoadM,
    drawMemberPointLoad,
    drawMemberUDLLoad,
} from "./draw-functions";

import { tGlobalMemberObject, tGlobalNodeObject } from "../types.js";

// instantiate the globabl objects that hold the structure and loads data
const globalNodeObject: tGlobalNodeObject = {};
const globalMemberObject: tGlobalMemberObject = {
    joints: [],
    start: [],
    end: [],
    forceAngle: -1,
};

export function redrawAllData(): void {
    // clear all svg nodes before redrawing
    document.querySelectorAll("svg>#joint").forEach((n) => n.remove());
    document.querySelectorAll("svg>#joint-tag").forEach((n) => n.remove());
    document.querySelectorAll("svg>#member").forEach((n) => n.remove());
    document.querySelectorAll("svg>#member-tag").forEach((n) => n.remove());
    document.querySelectorAll("svg>#support").forEach((n) => n.remove());
    document.querySelectorAll("svg>#joint-load").forEach((n) => n.remove());
    document.querySelectorAll("svg>#member-load").forEach((n) => n.remove());

    const windowWidth = document.querySelector("#structure-window")?.clientWidth ?? 0;
    const windowHeight = document.querySelector("#structure-window")?.clientHeight ?? 0;

    const memberArray = [...document.querySelectorAll(".member")].map((e) => Number((<HTMLInputElement>e).value));
    const jointArray = [...document.querySelectorAll(".joint")].map((e) => Number((<HTMLInputElement>e).value));
    const jointCoordinates = calculateJointCoordinates(jointArray, windowWidth, windowHeight);
    const supportsArray = [...document.querySelectorAll(".supports")].map((e) => Number((<HTMLInputElement>e).value));
    const jointLoadArray = [...document.querySelectorAll(".joint-loads")].map((e) => Number((<HTMLInputElement>e).value));
    const memberLoadArray = [...document.querySelectorAll(".member-loads")].map((e) => Number((<HTMLInputElement>e).value));

    generateJoints(jointCoordinates);
    generateMembers(memberArray);
    generateSupports(supportsArray);
    generateJointLoads(jointLoadArray);
    generateMemberLoads(memberLoadArray);
}

function generateJoints(arr: number[][]): void {
    let jointNum = 0;
    for (let i = 0; i < arr.length; i += 2) {
        jointNum += 1;
        drawJoint(jointNum, arr[i + 1], "#structure-window");
        globalNodeObject[jointNum] = [arr[i], arr[i + 1]];
    }
}

function generateMembers(arr: number[]): void {
    let memberNumber = 0;

    for (let i = 0; i < arr.length; i += 2) {
        memberNumber += 1;
        if (!arr[i] || !arr[i + 1]) return;

        drawMember(memberNumber, arr[i], arr[i + 1], globalNodeObject, "#structure-window");

        const start = globalNodeObject[arr[i]][1];
        const end = globalNodeObject[arr[i + 1]][1];

        if (start && end) {
            globalMemberObject[memberNumber] = {
                joints: [arr[i], arr[i + 1]],
                start: start,
                end: end,
                forceAngle: calculateForceAngle(start, end),
            };
        }
    }
}

function generateSupports(arr: number[]): void {
    let jointNum = 1;
    for (let i = 0; i < arr.length; i += 3) {
        globalNodeObject[jointNum].push([arr[i], arr[i + 1], arr[i + 2]]);

        if (arr[i] === 1 && arr[i + 1] === 1 && arr[i + 2] === 1) {
            drawSupportXYR(jointNum, globalNodeObject, globalMemberObject, "#structure-window"); // fixed support
        } else if (arr[i] === 1 && arr[i + 1] === 1 && arr[i + 2] === 0) {
            drawSupportXY(jointNum, globalNodeObject, "#structure-window"); // pin support
        } else if (arr[i] === 1 && arr[i + 1] === 0 && arr[i + 2] === 1) {
            drawSupportXR(jointNum, globalNodeObject, "#structure-window"); // x-rest rot-rest
        } else if (arr[i] === 1 && arr[i + 1] === 0 && arr[i + 2] === 0) {
            drawSupportX(jointNum, globalNodeObject, "#structure-window"); // x-rest > roller support
        } else if (arr[i] === 0 && arr[i + 1] === 0 && arr[i + 2] === 1) {
            drawSupportR(jointNum, globalNodeObject, "#structure-window"); // rot-rest
        } else if (arr[i] === 0 && arr[i + 1] === 1 && arr[i + 2] === 0) {
            drawSupportY(jointNum, globalNodeObject, "#structure-window"); // y-rest > roller support
        } else if (arr[i] === 0 && arr[i + 1] === 1 && arr[i + 2] === 1) {
            drawSupportYR(jointNum, globalNodeObject, "#structure-window"); // y-rest rot-rest
        }
        jointNum += 1;
    }
}

function generateJointLoads(arr: number[]): void {
    for (let i = 0; i < arr.length; i += 4) {
        if (!arr[i] || arr[i] === 0) return;
        if (arr[i] && arr[i + 1] !== 0) drawJointLoadX(arr[i], arr[i + 1], globalNodeObject, "#structure-window");
        if (arr[i] && arr[i + 2] !== 0) drawJointLoadY(arr[i], arr[i + 2], globalNodeObject, "#structure-window");
        if (arr[i] && arr[i + 3] !== 0) drawJointLoadM(arr[i], arr[i + 3], globalNodeObject, "#structure-window");
    }
}

function generateMemberLoads(arr: number[]): void {
    for (let i = 0; i < arr.length; i += 4) {
        if (!arr[i] || arr[i] === 0) return;
        if (arr[i] && arr[i + 1] !== 0 && arr[i + 2] !== 0) {
            drawMemberPointLoad(arr[i], arr[i + 1], arr[i + 2], globalNodeObject, globalMemberObject, "#structure-window");
        }
        if (arr[i] && arr[i + 3] !== 0) {
            drawMemberUDLLoad(arr[i], arr[i + 3], globalNodeObject, globalMemberObject, "#structure-window");
        }
    }
}
