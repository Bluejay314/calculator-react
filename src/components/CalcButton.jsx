import "../css/CalcButton.css";

export default function CalcButton({content, onClick}) {
    const handleClick = () => {
        return onClick(content);
    }

    return (
        <button className="CalcButton" onClick={handleClick}>
            {content}
        </button>
    )
}