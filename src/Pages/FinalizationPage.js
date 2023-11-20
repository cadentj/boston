import React from "react";
import { Finalization } from "../Components/Data";
import BasicGrid from "../Components/Main";
import { FinalizationContents } from "../Components/FinalizationContents";

export default function FinalizationPage() {
    return (
        <BasicGrid data={Finalization} contents={FinalizationContents}/>
    );
}