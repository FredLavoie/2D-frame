import React from "react";

import styles from "./Documentation.module.scss";

function Documentation(): JSX.Element {
    return (
        <div className={styles["doc-container"]}>
            <h1>Introduction</h1>
            <p>
                2D Structural Analysis is a tool for calculating internal forces and displacements of a two-dimensional structure. The heart
                of the application is a program that implements the matrix analysis method of calculating internal forces and displacement
                of structures.
            </p>
            <br />
            <h2>How to use this software</h2>
            <p>
                The software will place a red boarder around inputted values that are not valid. The input cannot be in scientific notation,
                inputs that should be positive values will only accept positive values, and values that should be integers will only accept
                integers.
            </p>
            <br />
            <h2>Units</h2>
            <p>
                The application is unitless. It can be used with SI units or imperial units. The user must keep track of the units they use
                and be consistent in order to get reliable results. Typically, SI units will be Newtons (N) and millimeters (mm). In
                imperial units, the units used could be pounds (lbs) and inches (in).
            </p>
            <p>The global directions of force are: up is positive, to the right is positive and clockwise moments are positive.</p>
            <p>
                The results will also be reported in the same units that were used in the input. For example, forces inputted in Newtons
                will result in reactions reported in Newtons.
            </p>
            <br />
            <h2>General Input Section</h2>
            <img className={styles["doc-images"]} src="src/assets/documentation_images/general_section.png" />
            <p>
                Input the number of joints and members for the structure that you want to analyze. If your structure uses different
                materials and/or cross-sectional shapes, enter the number of different elastic moduli, cross-sectional areas and moments of
                inertia that you will need. This will populate the correct number of input fields for each of the properties.
            </p>
            <br />
            <h2>Properties Input Section</h2>
            <img className={styles["doc-images"]} src="src/assets/documentation_images/properties_input_section.png" />
            <p>
                Enter all the data for the various elastic moduli, areas and moments of inertia. Note that they all have an assigned number;
                you will need to assign the correct property number to each member in a future step.
            </p>
            <br />
            <h2>Joint Input Section</h2>
            <img className={styles["doc-images"]} src="src/assets/documentation_images/joint_input_section.png" />
            <p>
                For each joint, enter the x- and y-coordinate. The three boxes next to the coordinates is intended to input the restraints
                of the joint from movement or rotation: x-restraint and y-restraint prevent the joint from moving in the x and y direction,
                and the rotation restraint prevents members from rotating about the joint (fixed end condition).
            </p>
            <p>
                Enter a 1 if you want to restrain the joint, and enter a 0 if you don&apos;t want to restrain that joint. Note that a value
                must be entered (either 0 or 1), you cannot leave an input box empty.
            </p>
            <br />
            <h2>Member Input Section</h2>
            <img className={styles["doc-images"]} src="src/assets/documentation_images/member_input_section.png" />
            <p>
                Enter the joint number the member starts and ends at. Then, enter which moment of inertia number, area number and moment of
                inertia number that each member has.
            </p>
            <br />
            <h2>Load Input Section</h2>
            <img className={styles["doc-images"]} src="src/assets/documentation_images/load_input_section.png" />
            <p>Start by selecting the number of joint loads and member loads that you want to impart on your structure.</p>
            <p>
                For the joint loads, enter the joint number to apply the load to. Then enter the magnitude of the force in the x- and/or
                y-directions. The force directions are global (not local). Up is positive (gravity is negative) and right is positive.
            </p>
            <p>
                Moment forces at joints are considered positive in the clockwise direction. All input fields needs to be filled out with
                either a value or 0.
            </p>
            <p>
                For member loads, enter the member number to apply the load to. To apply a point load to a member, enter the x-distance
                along its length to apply the load. The distance is calculated from the member&apos;s starting joint. The point loads are
                perpendicular to the member&apos;s axis.
            </p>
            <p>
                To apply a uniformly distributed load on a member, enter the load per unit length value in the &quot;UDL&quot; field. For a
                horizontal member, a negative value will result in a downward force.
            </p>
            <h1>License</h1>
            <p>This software is licensed under the terms of the MIT License.</p>
        </div>
    );
}

export default Documentation;
