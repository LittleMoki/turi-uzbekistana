import React from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function Faq({faqs}) {
    return (
        faqs?.length > 0 && (
            <div className='pb-5 flex justify-center flex-col items-center'>
                <h2 className='text-2xl font-medium pb-3'>Важная информация</h2>
                <div className='max-w-[1320px] w-full'>
                    <Accordion  variant="splitted">
                        {faqs.map(el => (
                            <AccordionItem key={el.id} aria-label={el.name} title={el.name}>
                                <div dangerouslySetInnerHTML={{__html: el.description}}/>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        )
    )
}
