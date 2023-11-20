import React from "react";
import { Preparation } from "../Components/Data";
import BasicGrid from "../Components/Main";
import { PreparationContents } from "../Components/PreparationContents";

export default function PreparationPage() {
    return (
        <BasicGrid data={Preparation} contents={PreparationContents}/>
    );
}