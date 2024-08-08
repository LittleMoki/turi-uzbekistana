import {Accordion, AccordionItem, Checkbox, CheckboxGroup, Slider} from '@nextui-org/react'

export const ToursFilter = ({
                                filteredTourTypesCountry,
                                filteredTourTypesSeason,
                                TourTypeBase,
                                setTypesFilter,
                                typesFilter,
                                moneyFilter,
                                setMoneyFilter,
                                dayFilter,
                                setDayFilter,
                                tourType
                            }) => {

    return (
        <Accordion className='md:w-[260px] w-full' variant='shadow'>
            <AccordionItem title='Loading'>

            </AccordionItem>
            {/*<AccordionItem key='1' aria-label='Цена' title='Цена'>*/}
            {/*    <Slider*/}
            {/*        value={moneyFilter}*/}
            {/*        onChange={setMoneyFilter}*/}
            {/*        label=' '*/}
            {/*        step={50}*/}
            {/*        minValue={0}*/}
            {/*        maxValue={7000}*/}
            {/*        defaultValue={[0, 7000]}*/}
            {/*        formatOptions={{style: 'currency', currency: 'USD'}}*/}
            {/*        className='w-full'*/}
            {/*    />*/}
            {/*</AccordionItem>*/}
            {/*<AccordionItem key='2' aria-label='Длительность' title='Длительность'>*/}
            {/*    <Slider*/}
            {/*        value={dayFilter}*/}
            {/*        onChange={setDayFilter}*/}
            {/*        label=' '*/}
            {/*        step={1}*/}
            {/*        minValue={0}*/}
            {/*        maxValue={21}*/}
            {/*        defaultValue={[0, 21]}*/}
            {/*        className='w-full'*/}
            {/*    />*/}
            {/*</AccordionItem>*/}
            {/*<AccordionItem key='3' aria-label='По сезону' title='По сезону'>*/}
            {/*    <CheckboxGroup*/}
            {/*        value={typesFilter}*/}
            {/*        onValueChange={e => setTypesFilter(e)}*/}
            {/*        className='flex flex-col items-start gap-2'*/}
            {/*    >*/}
            {/*        {*/}
            {/*            filteredTourTypesSeason?.map(el => (*/}
            {/*                <Checkbox value={el.id} key={el.id}>{el.name}</Checkbox>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </CheckboxGroup>*/}
            {/*</AccordionItem>*/}
            {/*{!tourType && <AccordionItem key='4' aria-label='По странам' title='По странам'>*/}
            {/*    <CheckboxGroup*/}
            {/*        value={typesFilter}*/}
            {/*        onValueChange={e => setTypesFilter(e)}*/}
            {/*        className='flex flex-col items-start gap-2'>*/}
            {/*        {filteredTourTypesCountry?.map(el => (*/}
            {/*            <Checkbox value={el.id} key={el.id}>{el.name}</Checkbox>*/}
            {/*        ))}*/}
            {/*    </CheckboxGroup>*/}
            {/*</AccordionItem>*/}
            {/*}*/}

            {/*<AccordionItem key='5' aria-label='По типу тура' title='По типу тура'>*/}
            {/*    <CheckboxGroup*/}
            {/*        value={typesFilter}*/}
            {/*        onValueChange={e => setTypesFilter(e)}*/}
            {/*        className='flex flex-col items-start gap-2'>*/}
            {/*        {TourTypeBase?.map(el => (*/}
            {/*            <Checkbox value={el.id} key={el.id}>{el.name}</Checkbox>*/}
            {/*        ))}*/}
            {/*    </CheckboxGroup>*/}
            {/*</AccordionItem>*/}
            {/*<AccordionItem key='6 ' aria-label='Комфорт' title='Комфорт'>*/}
            {/*    <div className='flex flex-col items-start gap-2'>*/}
            {/*        <Checkbox>Бутик отели</Checkbox>*/}
            {/*        <Checkbox>3 звезды </Checkbox>*/}
            {/*        <Checkbox>4 звезды </Checkbox>*/}
            {/*        <Checkbox>5 звезды </Checkbox>*/}
            {/*    </div>*/}
            {/*</AccordionItem>*/}
        </Accordion>
    )
}
