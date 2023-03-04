export type tGlobalNodeObject = { [key: number]: number[][] };

export type tGlobalMemberObject = {
    [key: number]: {
        joints: number[];
        start: number[];
        end: number[];
        forceAngle: number;
    };
};
