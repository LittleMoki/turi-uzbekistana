import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const AccordionComp = ({
    headerBoldTitle = "	",
    headerTitle,
    openGroup = false,
    cost = "",
    costRub = "",
    subtitle,
    button = false,
    isCost = false,
    accordion,
    accordionIndex,
    fn,
}) => {
    return (
        <Accordion
            expanded={accordion === accordionIndex}
            onChange={fn(accordionIndex)}
        >
            <AccordionSummary
                expandIcon={<MdOutlineKeyboardArrowDown className="w-6 h-6" />}
            >
                <Typography className="flex justify-between items-center w-full ">
                    <Typography className="font-bold">
                        <b>{headerBoldTitle}</b> {headerTitle}
                    </Typography>
                    {openGroup ? (
                        <Typography className="bg-[#198754] text-white px-2 rounded-md text-sm truncate">
                            Открыт набор в группу
                        </Typography>
                    ) : (
                        ""
                    )}
                    {isCost ? (
                        <Typography className="font-bold">{cost}</Typography>
                    ) : (
                        ""
                    )}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className="flex items-start sm:flex-row flex-col gap-3 sm:items-center justify-between">
                    <Typography>
                        <Typography className="flex items-center gap-3">
                            <Typography className="font-bold">
                                {cost}
                            </Typography>
                            {costRub ? (
                                <Typography className="text-[#555]">
                                    ({costRub} ₽)
                                </Typography>
                            ) : (
                                ""
                            )}
                        </Typography>
                        <Typography className="text-sm pt-2">
                            {subtitle}
                        </Typography>
                    </Typography>
                    {button ? (
                        <Typography className="sm:w-auto w-full">
                            <button className="bg-[#F44336] hover:bg-[#E53935] duration-150 p-[10px] w-full sm:min-w-[200px] text-white rounded-full font-medium">
                                Забронировать тур
                            </button>
                        </Typography>
                    ) : (
                        ""
                    )}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};
