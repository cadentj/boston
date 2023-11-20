import React from "react";
import { Application } from "../Components/Data";
import BasicGrid from "../Components/Main";
import { ApplicationContents } from "../Components/ApplicationContents";

export default function ApplicationPage() {
    return (
        <BasicGrid data={Application} contents={ApplicationContents}/>
    );
}