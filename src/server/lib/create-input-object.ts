type tFormInputObject = {
    numJoints: string;
    numMembers: string;
    numElasticModulus: string;
    numAreas: string;
    numMomentOfInertia: string;
    joints: string[];
    ElasticMods: string[];
    Areas: string[];
    MoI: string[];
    members: string[];
    loads: string[];
    numJointLoads: string;
    numMemLoads: string;
};

type tOutputObject = {
    numJoints: number;
    numMembers: number;
    numElasticModulus: number;
    numAreas: number;
    numMomentOfInertia: number;
    numLoadCases: number;
    joints: number[][];
    elasticMods: number[];
    areas: number[];
    MoI: number[];
    members: number[][];
    loads: number[][];
};

export function createInputObject(formInputObj: tFormInputObject): tOutputObject {
    const outputObject: tOutputObject = {
        numJoints: Number(formInputObj.numJoints),
        numMembers: Number(formInputObj.numMembers),
        numElasticModulus: Number(formInputObj.numElasticModulus),
        numAreas: Number(formInputObj.numAreas),
        numMomentOfInertia: Number(formInputObj.numMomentOfInertia),
        numLoadCases: 1,
        joints: extractJointsAndMembers(formInputObj.joints),
        elasticMods: extractProperties(formInputObj.ElasticMods),
        areas: extractProperties(formInputObj.Areas),
        MoI: extractProperties(formInputObj.MoI),
        members: extractJointsAndMembers(formInputObj.members),
        loads: extractLoads(formInputObj.loads, formInputObj.numJointLoads, formInputObj.numMemLoads),
    };

    return outputObject;
}

/****************************************** FUNCTIONS ******************************************************/
/***********************************************************************************************************/

function extractJointsAndMembers(data: string[]): number[][] {
    const resultArr = [];
    const num = data.length / 5;
    for (let i = 0; i < num; i++) {
        const arr = [];
        const section = i * 5;
        for (let i = 0; i < 5; i++) {
            arr.push(Number(data[section + i]));
        }
        resultArr.push(arr);
    }
    return resultArr;
}

function extractProperties(data: string[]): number[] {
    if (typeof data === "string") data = [data];
    const resultArr = data.map((e) => Number(e));
    return resultArr;
}

function extractLoads(data: string[], njl: string, nml: string): number[][] {
    const resultArr = [[Number(njl), Number(nml)]];
    const num = data.length / 4;
    for (let i = 0; i < num; i++) {
        const arr = [];
        const section = i * 4;
        for (let i = 0; i < 4; i++) {
            arr.push(Number(data[section + i]));
        }
        resultArr.push(arr);
    }
    return resultArr;
}
