type tFormInputObject = {
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

/**
 * Takes the object provided by the server and creates the string that
 * the Fortran program expect
 *
 * @param obj
 * @returns
 */
export function createInputString(formInputObject: tFormInputObject): string {
    let dataString = "";

    // write first line of input file
    dataString +=
        formInputObject.numJoints.toString() +
        " " +
        formInputObject.numMembers.toString() +
        " " +
        formInputObject.numElasticModulus.toString() +
        " " +
        formInputObject.numAreas.toString() +
        " " +
        formInputObject.numMomentOfInertia.toString() +
        " " +
        formInputObject.numLoadCases.toString() +
        "\n";

    // write joint data block of input file
    let count = 1;
    for (const joint of formInputObject.joints) {
        const num = count.toString();
        dataString += num + " ";
        dataString += joint[0] + " ";
        dataString += joint[1] + " ";
        dataString += joint[2] + " ";
        dataString += joint[3] + " ";
        dataString += joint[4] + "\n";
        count += 1;
    }

    // write properties block of input file
    count = 1;
    for (const em of formInputObject.elasticMods) {
        const num = count.toString();
        dataString += num + " ";
        dataString += em + "\n";
        count += 1;
    }

    count = 1;
    for (const area of formInputObject.areas) {
        const num = count.toString();
        dataString += num + " ";
        dataString += area + "\n";
        count += 1;
    }

    count = 1;
    for (const Mo of formInputObject.MoI) {
        const num = count.toString();
        dataString += num + " ";
        dataString += Mo + "\n";
        count += 1;
    }

    // write member data block of input file
    count = 1;
    for (const member of formInputObject.members) {
        const num = count.toString();
        dataString += num + " ";
        dataString += member[0] + " ";
        dataString += member[1] + " ";
        dataString += member[2] + " ";
        dataString += member[3] + " ";
        dataString += member[4] + "\n";
        count += 1;
    }

    // write loads block of input file
    for (const ea of formInputObject.loads) {
        const removeComma = ea.reduce((acc, current): string => {
            const stringCurrent = current.toString();
            return (acc += " " + stringCurrent);
        }, "");
        dataString += removeComma + "\n";
    }

    return dataString;
}
