import { MdKeyboardArrowDown } from "react-icons/md";
import Slider from "@mui/material/Slider";
import { useState } from "react";

export const AccordionItem = ({ title, content, isOpen, onClick }) => {
    const [value1, setValue1] = useState([0, 100]);
    const handleChange1 = (event, newValue, activeThumb) => {
        const minDistance = 0;
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([
                Math.min(newValue[0], value1[1] - minDistance),
                value1[1],
            ]);
        } else {
            setValue1([
                value1[0],
                Math.max(newValue[1], value1[0] + minDistance),
            ]);
        }
    };
    return (
        <div className="border-b py-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={onClick}
            >
                <p>{title}</p>
                <MdKeyboardArrowDown
                    className={`transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                    } transition-transform duration-300`}
                />
            </div>
            {Array.isArray(content) && isOpen && (
                <div className="pb-2 flex flex-col gap-1">
                    {content.map((item) => (
                        <div key={item} className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <label>{item}</label>
                        </div>
                    ))}
                </div>
            )}
            {!Array.isArray(content) && isOpen && (
                <div className="pb-2">
                    <Slider
                        value={value1}
                        onChange={handleChange1}
                        style={{
                            color: "#bef264",
                        }}
                    />
                    <div className="grid grid-cols-2 gap-1 border-b-2">
                        <input
                            readOnly
                            className="rounded-lg"
                            type="number"
                            value={value1[0]}
                        />
                        <input
                            readOnly
                            className="rounded-lg"
                            type="number"
                            value={value1[1]}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
