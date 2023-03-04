import React, { useEffect, useReducer } from "react";

import { validateForm } from "../utils/validate-form-client";
import { redrawAllData } from "../utils/input-form-utils";

import styles from "../styles/Input.module.scss";

type tGeneralInfoState = {
    numJoints?: string[][];
    numMembers?: string[][];
    numElasticModulus?: string[];
    numAreas?: string[];
    numMomentOfInertia?: string[];
};

type tLoadsInfoState = {
    jointLoads?: string[][];
    memberLoads?: string[][];
};

function Input(): JSX.Element {
    const [generalInfoState, updateGeneralInfoState] = useReducer(
        (prev: tGeneralInfoState, next: tGeneralInfoState) => {
            return { ...prev, ...next };
        },
        {
            numJoints: [
                ["", "", "", "", ""],
                ["", "", "", "", ""],
            ],
            numMembers: [["", "", "", "", ""]],
            numElasticModulus: [""],
            numAreas: [""],
            numMomentOfInertia: [""],
        },
    );

    const [loadsInfoState, updateLoadsInfoState] = useReducer(
        (prev: tLoadsInfoState, next: tLoadsInfoState) => {
            return { ...prev, ...next };
        },
        {
            jointLoads: [],
            memberLoads: [],
        },
    );

    useEffect(() => {
        // add event listener to the resizing of the window to redraw
        // the entire structure if the window is resized
        window.addEventListener("resize", () => {
            redrawAllData();
        });

        return () => {
            window.removeEventListener("resize", () => {
                redrawAllData();
            });
        };
    }, []);

    function handleUpdateGeneralInfo(property: string, newNumProps: number): void {
        const numPropsDelta = newNumProps - generalInfoState[property].length;

        // if the number of properties is being reduced, simply return
        // the existing state with the last index removed
        if (numPropsDelta < 0) {
            const newArr = generalInfoState[property].slice(0, numPropsDelta);
            updateGeneralInfoState({ [property]: newArr });
        } else {
            const newElementsArrays: string[][] = [];
            const newElementsStrings: string[] = [];

            switch (property) {
                case "numJoints":
                    for (let i = 0; i < numPropsDelta; i++) {
                        newElementsArrays.push(["", "", "", "", ""]);
                    }
                    if (generalInfoState.numJoints) {
                        updateGeneralInfoState({ numJoints: [...generalInfoState.numJoints, ...newElementsArrays] });
                    }
                    break;

                case "numMembers":
                    for (let i = 0; i < numPropsDelta; i++) {
                        newElementsArrays.push(["", "", "", "", ""]);
                    }
                    if (generalInfoState.numMembers) {
                        updateGeneralInfoState({ numMembers: [...generalInfoState.numMembers, ...newElementsArrays] });
                    }
                    break;
                case "numElasticModulus":
                    for (let i = 0; i < numPropsDelta; i++) {
                        newElementsStrings.push("");
                    }
                    if (generalInfoState.numElasticModulus) {
                        updateGeneralInfoState({ numElasticModulus: [...generalInfoState.numElasticModulus, ...newElementsStrings] });
                    }
                    break;
                case "numAreas":
                    for (let i = 0; i < numPropsDelta; i++) {
                        newElementsStrings.push("");
                    }
                    if (generalInfoState.numAreas) {
                        updateGeneralInfoState({ numAreas: [...generalInfoState.numAreas, ...newElementsStrings] });
                    }
                    break;
                case "numMomentOfInertia":
                    for (let i = 0; i < numPropsDelta; i++) {
                        newElementsStrings.push("");
                    }
                    if (generalInfoState.numMomentOfInertia) {
                        updateGeneralInfoState({ numMomentOfInertia: [...generalInfoState.numMomentOfInertia, ...newElementsStrings] });
                    }
                    break;
            }
        }
    }

    function handleUpdateLoadsInfo(property: string, newNumProps: number): void {
        redrawAllData();
        const numPropsDelta = newNumProps - loadsInfoState[property].length;

        // if the number of properties is being reduced, simply return
        // the existing state with the last index removed
        if (numPropsDelta < 0) {
            const newArr = loadsInfoState[property].slice(0, numPropsDelta);
            updateLoadsInfoState({ [property]: newArr });
        } else {
            const newElements: string[][] = [];
            for (let i = 0; i < numPropsDelta; i++) {
                newElements.push(["", "", "", ""]);
            }
            updateLoadsInfoState({ [property]: [...loadsInfoState[property], ...newElements] });
        }
    }

    function handleJointDataUpdate(value: string, i: number, j: string): void {
        redrawAllData();

        const newJointInfoStateObj = generalInfoState.numJoints ?? [];
        newJointInfoStateObj[i][j] = value;
        updateGeneralInfoState({ numJoints: newJointInfoStateObj });
    }

    function handleMemberDataUpdate(value: string, i: number, j: string): void {
        redrawAllData();

        const newMemberInfoStateObj = generalInfoState.numMembers ?? [];
        newMemberInfoStateObj[i][j] = value;
        updateGeneralInfoState({ numMembers: newMemberInfoStateObj });
    }

    function handlePropertiesDataUpdate(property: string, value: string, i: number): void {
        const newMemberInfoStateObj = generalInfoState[property] ?? [];
        newMemberInfoStateObj[i] = value;
        updateGeneralInfoState({ [property]: newMemberInfoStateObj });
    }

    function handleLoadsDataUpdate(property: string, value: string, i: number, j: string): void {
        redrawAllData();

        const newLoadsInfoStateObj = loadsInfoState[property] ?? [];
        newLoadsInfoStateObj[i][j] = value;
        updateLoadsInfoState({ [property]: newLoadsInfoStateObj });
    }

    function handleSubmit(event: { preventDefault: () => void }): void {
        event.preventDefault();
        // print out all the form values to the console

        // change this to send the form data to be validated instead
        // of using querySelectorAll in the validation file itself
        const validForm = validateForm();
        if (!validForm) return;
    }

    return (
        <div className={styles["input-container"]}>
            <svg xmlns="http://www.w3.org/2000/svg" id="structure-window" className={styles["structure-window"]}>
                <rect width="100%" height="100%" fill="#eee"></rect>
            </svg>

            <form className={styles["input-form"]} onSubmit={handleSubmit}>
                <h3 className={styles["section-header"]}>General Information</h3>
                <div className={styles["container-1"]}>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of joints</label>
                        <input
                            id="input-numJoints"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numJoints"
                            value={generalInfoState.numJoints?.length}
                            onChange={(e) => handleUpdateGeneralInfo("numJoints", Number(e.target.value))}
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of members</label>
                        <input
                            id="input-numMembers"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numMembers"
                            value={generalInfoState.numMembers?.length}
                            onChange={(e) => handleUpdateGeneralInfo("numMembers", Number(e.target.value))}
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of Elastic modulus</label>
                        <input
                            id="input-numEMs"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numElasticModulus"
                            value={generalInfoState.numElasticModulus?.length}
                            onChange={(e) => handleUpdateGeneralInfo("numElasticModulus", Number(e.target.value))}
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of X-Sectional Areas</label>
                        <input
                            id="input-numAreas"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numAreas"
                            value={generalInfoState.numAreas?.length}
                            onChange={(e) => handleUpdateGeneralInfo("numAreas", Number(e.target.value))}
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of Moment of Inertia</label>
                        <input
                            id="input-numMOIs"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numMomentOfInertia"
                            value={generalInfoState.numMomentOfInertia?.length}
                            onChange={(e) => handleUpdateGeneralInfo("numMomentOfInertia", Number(e.target.value))}
                        />
                    </div>
                </div>

                <h3 className={styles["section-header"]}>Properties Input</h3>
                <div className={styles["container-2"]}>
                    <div id="em-container">
                        <label>Elastic Modulus #1</label>
                        {generalInfoState.numElasticModulus &&
                            generalInfoState.numElasticModulus.map((ea, i) => (
                                <input
                                    key={`numElasticModulus-${i}`}
                                    className={`${styles["input-style"]} form-control input-EM`}
                                    type="number"
                                    name="ElasticMods"
                                    value={ea}
                                    onChange={(e) => handlePropertiesDataUpdate("numElasticModulus", e.target.value, i)}
                                />
                            ))}
                    </div>
                    <div id="area-container">
                        <label>Area # 1</label>
                        {generalInfoState.numAreas &&
                            generalInfoState.numAreas.map((ea, i) => (
                                <input
                                    key={`numAreas-${i}`}
                                    className={`${styles["input-style"]} form-control input-Area`}
                                    type="number"
                                    name="Areas"
                                    value={ea}
                                    onChange={(e) => handlePropertiesDataUpdate("numAreas", e.target.value, i)}
                                />
                            ))}
                    </div>
                    <div id="moi-container">
                        <label>Moment of Inertia # 1</label>
                        {generalInfoState.numMomentOfInertia &&
                            generalInfoState.numMomentOfInertia.map((ea, i) => (
                                <input
                                    key={`numMomentOfInertia-${i}`}
                                    className={`${styles["input-style"]} form-control input-MoI`}
                                    type="number"
                                    name="MoI"
                                    value={ea}
                                    onChange={(e) => handlePropertiesDataUpdate("numMomentOfInertia", e.target.value, i)}
                                />
                            ))}
                    </div>
                </div>
                <h3 className={styles["section-header"]}>Joint Input</h3>
                <div className={styles["container-2"]}>
                    <div id="joints-container">
                        {generalInfoState.numJoints &&
                            generalInfoState.numJoints.map((ea, i) => (
                                <div key={`joint-num-${i}`} className={styles["joints-sub-container"]}>
                                    <label>{`Joint #${i + 1}`}</label>
                                    <input
                                        className={`${styles["input-style"]} form-control joint`}
                                        type="number"
                                        name="joints"
                                        placeholder="X-coord."
                                        value={ea[0]}
                                        onChange={(e) => handleJointDataUpdate(e.target.value, i, "0")}
                                    />
                                    <input
                                        className={`${styles["input-style"]} form-control joint`}
                                        type="number"
                                        name="joints"
                                        placeholder="Y-coord."
                                        value={ea[1]}
                                        onChange={(e) => handleJointDataUpdate(e.target.value, i, "1")}
                                    />
                                    <input
                                        className={`${styles["input-style"]} form-control supports`}
                                        type="number"
                                        name="joints"
                                        placeholder="x-rest."
                                        value={ea[2]}
                                        onChange={(e) => handleJointDataUpdate(e.target.value, i, "2")}
                                    />
                                    <input
                                        className={`${styles["input-style"]} form-control supports`}
                                        type="number"
                                        name="joints"
                                        placeholder="y-rest."
                                        value={ea[3]}
                                        onChange={(e) => handleJointDataUpdate(e.target.value, i, "3")}
                                    />
                                    <input
                                        className={`${styles["input-style"]} form-control supports`}
                                        type="number"
                                        name="joints"
                                        placeholder="rot. rest."
                                        value={ea[4]}
                                        onChange={(e) => handleJointDataUpdate(e.target.value, i, "4")}
                                    />
                                </div>
                            ))}
                    </div>
                </div>

                <h3 className={styles["section-header"]}>Member Input</h3>
                <div id="members-container">
                    {generalInfoState.numMembers &&
                        generalInfoState.numMembers.map((ea, i) => (
                            <div key={`member-num-${i}`} className={`${styles["container-2"]} ${styles["members-sub-container"]}`}>
                                <label>{`Member #${i + 1}`}</label>
                                <input
                                    className={`${styles["input-style"]} form-control member`}
                                    type="number"
                                    name="members"
                                    placeholder="Joint start"
                                    value={ea[0]}
                                    onChange={(e) => handleMemberDataUpdate(e.target.value, i, "0")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control member`}
                                    type="number"
                                    name="members"
                                    placeholder="Joint end"
                                    value={ea[1]}
                                    onChange={(e) => handleMemberDataUpdate(e.target.value, i, "1")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control num-prop`}
                                    type="number"
                                    name="members"
                                    placeholder="EM No."
                                    value={ea[2]}
                                    onChange={(e) => handleMemberDataUpdate(e.target.value, i, "2")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control num-prop`}
                                    type="number"
                                    name="members"
                                    placeholder="Area No."
                                    value={ea[3]}
                                    onChange={(e) => handleMemberDataUpdate(e.target.value, i, "3")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control num-prop`}
                                    type="number"
                                    name="members"
                                    placeholder="MoI No."
                                    value={ea[4]}
                                    onChange={(e) => handleMemberDataUpdate(e.target.value, i, "4")}
                                />
                            </div>
                        ))}
                </div>
                <h3 className={styles["section-header"]}>Load Input</h3>
                <div className={styles["container-1"]}>
                    <div className={styles["gen-info-container"]}>
                        <label>No. Joint Loads</label>
                        <input
                            id="input-numJointLoads"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numJointLoads"
                            value={loadsInfoState.jointLoads?.length}
                            onChange={(e) => handleUpdateLoadsInfo("jointLoads", Number(e.target.value))}
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. Member Loads</label>
                        <input
                            id="input-numMemLoads"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numMemLoads"
                            value={loadsInfoState.memberLoads?.length}
                            onChange={(e) => handleUpdateLoadsInfo("memberLoads", Number(e.target.value))}
                        />
                    </div>
                </div>
                <div id="pl-container">
                    {loadsInfoState.jointLoads &&
                        loadsInfoState.jointLoads.map((ea, i) => (
                            <div key={`joint-load-${i}`} className={`${styles["container-2"]} ${styles["joint-load-container"]}`}>
                                <label>{`Joint Load #${i + 1}`}</label>
                                <input
                                    className={`${styles["input-style"]} form-control joint-loads jl-j`}
                                    name="loads"
                                    type="number"
                                    placeholder="Joint No."
                                    value={ea[0]}
                                    onChange={(e) => handleLoadsDataUpdate("jointLoads", e.target.value, i, "0")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control joint-loads jl-x`}
                                    name="loads"
                                    type="number"
                                    placeholder="X value"
                                    value={ea[1]}
                                    onChange={(e) => handleLoadsDataUpdate("jointLoads", e.target.value, i, "1")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control joint-loads jl-y`}
                                    name="loads"
                                    type="number"
                                    placeholder="Y value"
                                    value={ea[2]}
                                    onChange={(e) => handleLoadsDataUpdate("jointLoads", e.target.value, i, "2")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control joint-loads jl-m`}
                                    name="loads"
                                    type="number"
                                    placeholder="Moment"
                                    value={ea[3]}
                                    onChange={(e) => handleLoadsDataUpdate("jointLoads", e.target.value, i, "3")}
                                />
                            </div>
                        ))}
                </div>
                <div id="ml-container">
                    {loadsInfoState.memberLoads &&
                        loadsInfoState.memberLoads.map((ea, i) => (
                            <div key={`member-load-${i}`} className={`${styles["container-2"]} ${styles["member-load-container"]}`}>
                                <label>{`Member Load #${i + 1}`}</label>
                                <input
                                    className={`${styles["input-style"]} form-control member-loads ml-m`}
                                    name="loads"
                                    type="number"
                                    placeholder="Member No."
                                    value={ea[0]}
                                    onChange={(e) => handleLoadsDataUpdate("memberLoads", e.target.value, i, "0")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control member-loads ml-xd`}
                                    name="loads"
                                    type="number"
                                    placeholder="X-distance"
                                    value={ea[1]}
                                    onChange={(e) => handleLoadsDataUpdate("memberLoads", e.target.value, i, "1")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control member-loads ml-pl`}
                                    name="loads"
                                    type="number"
                                    placeholder="Point Load"
                                    value={ea[2]}
                                    onChange={(e) => handleLoadsDataUpdate("memberLoads", e.target.value, i, "2")}
                                />
                                <input
                                    className={`${styles["input-style"]} form-control member-loads ml-udl`}
                                    name="loads"
                                    type="number"
                                    placeholder="UDL"
                                    value={ea[3]}
                                    onChange={(e) => handleLoadsDataUpdate("memberLoads", e.target.value, i, "3")}
                                />
                            </div>
                        ))}
                </div>

                <button type="submit" className={`${styles["analize"]} btn btn-outline-primary`}>
                    Analyze Structure
                </button>
            </form>
        </div>
    );
}

export default Input;
