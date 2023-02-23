import React from "react";

import styles from "./Input.module.scss";

function Input(): JSX.Element {
    return (
        <div className={styles["input-container"]}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles["structure-window"]}>
                <rect width="100%" height="100%" fill="#eee"></rect>
            </svg>

            <form className={styles["input-form"]} action="/results" method="POST">
                <h3 className={styles["section-header"]}>General Information</h3>
                <div className={styles["container-1"]}>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of joints</label>
                        <input
                            id="input-numJoints"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numJoints"
                            value="2"
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of members</label>
                        <input
                            id="input-numMembers"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numMembers"
                            value="1"
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of Elastic modulus</label>
                        <input
                            id="input-numEMs"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numElasticModulus"
                            value="1"
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of X-Sectional Areas</label>
                        <input
                            id="input-numAreas"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numAreas"
                            value="1"
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. of Moment of Inertia</label>
                        <input
                            id="input-numMOIs"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numMomentOfInertia"
                            value="1"
                        />
                    </div>
                </div>

                <h3 className={styles["section-header"]}>Properties Input</h3>
                <div className={styles["container-2"]}>
                    <div id="em-container">
                        <label>Elastic Modulus #1</label>
                        <input className={`${styles["input-style"]} form-control input-EM`} name="ElasticMods" />
                    </div>
                    <div id="area-container">
                        <label>Area # 1</label>
                        <input className={`${styles["input-style"]} form-control input-Area`} name="Areas" />
                    </div>
                    <div id="moi-container">
                        <label>Moment of Inertia # 1</label>
                        <input className={`${styles["input-style"]} form-control input-MoI`} name="MoI" />
                    </div>
                </div>
                <h3 className={styles["section-header"]}>Joint Input</h3>
                <div className={styles["container-2"]}>
                    <div id="joints-container">
                        <div className={styles["joints-sub-container"]}>
                            <label>Joint #1</label>
                            <input className={`${styles["input-style"]} form-control joint`} name="joints" placeholder="X-coord." />
                            <input className={`${styles["input-style"]} form-control joint`} name="joints" placeholder="Y-coord." />
                            <input
                                className={`${styles["input-style"]} form-control supports`}
                                type="number"
                                name="joints"
                                placeholder="x-rest."
                            />
                            <input
                                className={`${styles["input-style"]} form-control supports`}
                                type="number"
                                name="joints"
                                placeholder="y-rest."
                            />
                            <input
                                className={`${styles["input-style"]} form-control supports`}
                                type="number"
                                name="joints"
                                placeholder="rot. rest."
                            />
                        </div>
                        <div className={styles["joints-sub-container"]}>
                            <label>Joint #2</label>
                            <input className={`${styles["input-style"]} form-control joint`} name="joints" placeholder="X-coord." />
                            <input className={`${styles["input-style"]} form-control joint`} name="joints" placeholder="Y-coord." />
                            <input
                                className={`${styles["input-style"]} form-control supports`}
                                type="number"
                                name="joints"
                                placeholder="x-rest."
                            />
                            <input
                                className={`${styles["input-style"]} form-control supports`}
                                type="number"
                                name="joints"
                                placeholder="y-rest."
                            />
                            <input
                                className={`${styles["input-style"]} form-control supports`}
                                type="number"
                                name="joints"
                                placeholder="rot. rest."
                            />
                        </div>
                    </div>
                </div>

                <h3 className={styles["section-header"]}>Member Input</h3>
                <div id="members-container">
                    <div className={`${styles["container-2"]} ${styles["members-sub-container"]}"`}>
                        <label>Member #1</label>
                        <input
                            className={`${styles["input-style"]} form-control member`}
                            type="number"
                            name="members"
                            placeholder="Joint start"
                        />
                        <input
                            className={`${styles["input-style"]} form-control member`}
                            type="number"
                            name="members"
                            placeholder="Joint end"
                        />
                        <input
                            className={`${styles["input-style"]} form-control num-prop`}
                            type="number"
                            name="members"
                            placeholder="EM No."
                        />
                        <input
                            className={`${styles["input-style"]} form-control num-prop`}
                            type="number"
                            name="members"
                            placeholder="Area No."
                        />
                        <input
                            className={`${styles["input-style"]} form-control num-prop`}
                            type="number"
                            name="members"
                            placeholder="MoI No."
                        />
                    </div>
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
                            value="0"
                        />
                    </div>
                    <div className={styles["gen-info-container"]}>
                        <label>No. Member Loads</label>
                        <input
                            id="input-numMemLoads"
                            className={`${styles["input-style"]} form-control`}
                            type="number"
                            name="numMemLoads"
                            value="0"
                        />
                    </div>
                </div>
                <div id="pl-container"></div>
                <div id="ml-container"></div>

                <button type="submit" className={`${styles["analize"]} btn btn-outline-primary`}>
                    Analyze Structure
                </button>
            </form>
        </div>
    );
}

export default Input;
