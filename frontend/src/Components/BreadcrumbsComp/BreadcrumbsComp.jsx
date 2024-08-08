'use client';
import React from 'react';
import {Container} from '..';
import {usePathname} from "next/navigation";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";

export const BreadcrumbsComp = ({style = ''}) => {
    const path = usePathname().split('/').filter(Boolean); // Получаем путь и удаляем пустые элементы
    const generateHref = (index) => '/' + path.slice(0, index + 1).join('/'); // Генерация ссылки для каждого элемента
    return (
        <Container>
            <div className={`flex gap-1 items-center flex-wrap py-5 ${style}`}>
                <Breadcrumbs>
                    <BreadcrumbItem
                        color='foreground'
                        size='lg'
                        href="/">
                        Главная
                    </BreadcrumbItem>
                    {path.map((el, i) => (
                        <BreadcrumbItem
                            key={i}
                            color='foreground'
                            size='lg'
                            href={generateHref(i)}>
                            {el}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
            </div>
        </Container>
    );
}