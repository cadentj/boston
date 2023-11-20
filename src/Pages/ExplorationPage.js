import React from "react";
import { Exploration } from "../Components/Data";
import BasicGrid from "../Components/Main";
import { ExplorationContents } from "../Components/ExplorationContents";

export default function ExplorationPage() {
    return (
        <BasicGrid data={Exploration} contents={ExplorationContents}/>
    );
}