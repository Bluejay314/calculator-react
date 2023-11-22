import { useState } from "react";
import CalcButton from "./CalcButton";
import "../css/Calculator.css";
import Display from "./Display";
import calculate from "../math/basic";

// Thisis the sequence in which the buttons will appear (top to bottom, left to right)
const buttonSequence = [".", "/", "x", "-", "+", 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, "(", ")","clear", "="];

export default function Calculator() {
    const [content, setContent] = useState("");

    const handleClick = (value) => {
        // If equals pressed, calculate the input and display
        if(value === "=")
            setContent(calculate(content));

        // If clear pressed, reset content
        else if(value === "clear")
            setContent("");

        // If a number or negative sign is pressed, no spaces need to be added.
        // Otherwise for operators, ensure a space is added either side.
        else if([".", "/", "x", "-", "+"].includes(value)) {
            if(value === "-" && (content.length === 0 || content.charAt(content.length - 1) === " ")) 
                setContent(`${content} ${value}`)
            else 
                setContent(`${content} ${value} `);
        }
        else 
            setContent(`${content}${value}`)
    }

    const buttonList = buttonSequence.map((initialContent, index) => (
        <CalcButton
            key={index}
            content={initialContent}
            onClick={handleClick}
        />
    ));

    return (
        <div className="Calculator">
            <Display toDisplay={content} />
            <div className="Calculator-button-container">
                {buttonList}
            </div>
        </div>
    );
}