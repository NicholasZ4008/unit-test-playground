import React from "react";
import useInterval from "hooks/useInterval";
import { useState } from "react";

export default function Timer(){
    
    const count = useInterval();
    
    return <div className="bg-white p-4 w-64 my-8 rounded-xl border-black border-2">
        <h1> Seconds spent on this page: {count} </h1>

    </div>
}