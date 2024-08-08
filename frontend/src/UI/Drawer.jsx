import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {useState} from 'react'
import {FiMenu} from 'react-icons/fi'
import {Accordion, AccordionItem, Divider} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const CustomDrawer = ({countryData, filteredTourTypes}) => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = newOpen => () => {
        setOpen(newOpen)
    }
    const DrawerList = (
        <Box sx={{width: '290px'}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={1} disablePadding>
                    <Accordion>
                        <AccordionItem title="Страны">
                            <div className='flex flex-col gap-4'>
                                {
                                    countryData?.length > 0 ? countryData?.map(el => (
                                            <div key={el.id}
                                                 className='relative w-full h-full rounded-[15px] overflow-hidden'>
                                                <Link href={`/country/${el.url}`}>
                                                    <Image
                                                        className='object-cover'
                                                        width={300}
                                                        height={300}
                                                        src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
                                                        alt={el.photo}
                                                    />
                                                    <div
                                                        className='absolute top-0 left-0
                                                                    w-full h-full flex
                                                                    justify-center items-center bg-black/50 text-white'
                                                    >
                                                        <h2 className='text-xl font-medium'>{el.name}</h2>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                        : 'Пусто'
                                }
                                {
                                    countryData?.length > 0 && <Link className='' href='/country'>
                                        Все страны
                                    </Link>
                                }
                            </div>
                        </AccordionItem>
                    </Accordion>
                </ListItem>

            </List>
            <Divider/>
            <List>
                <ListItem key={2} disablePadding>
                    <Accordion>
                        <AccordionItem title="Туры">
                            <div className='flex flex-col gap-4'>
                                {
                                    filteredTourTypes?.length > 0 ? filteredTourTypes?.map(el => (
                                        <div key={el.id}
                                             className='relative w-full h-full rounded-[15px] overflow-hidden'>
                                            <Link href={`/country/${el.url}`}>
                                                <Image
                                                    className='object-cover'
                                                    width={300}
                                                    height={300}
                                                    src={`https://api.turi-uzbekistana.ru/uploads/${el.photo}`}
                                                    alt={el.photo}
                                                />
                                                <div
                                                    className='absolute top-0 left-0
                                                                    w-full h-full flex
                                                                    justify-center items-center bg-black/50 text-white'
                                                >
                                                    <h2 className='text-xl font-medium'>{el.name}</h2>
                                                </div>
                                            </Link>
                                        </div>
                                    )) : 'Пусто'
                                }
                                {
                                    filteredTourTypes?.length > 0 && <Link href='/tour'>Все туры</Link>
                                }
                            </div>
                        </AccordionItem>
                    </Accordion>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <Link href='review'>
                    <ListItem sx={{padding: '20px 8px'}} disablePadding>
                        Review
                    </ListItem>
                </Link>
            </List>
            <Divider/>
            <List>
                <Link href='/about.html'>
                    <ListItem sx={{padding: '20px 8px'}} disablePadding>
                        About
                    </ListItem>
                </Link>
            </List>
            <Divider/>
        </Box>
    )

    return (
        <>
            <FiMenu
                onClick={toggleDrawer(true)}
                className='lg:hidden block w-7 h-7 cursor-pointer'
            />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default CustomDrawer
