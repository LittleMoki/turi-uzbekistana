'use client';
import {
    Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, Checkbox, Pagination, Input,
} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import DropDownDoted from './DropDownDoted';
import Image from 'next/image';
import {useCallback, useMemo, useState} from "react";
import {base} from "next/dist/build/webpack/config/blocks/base.js";

const AdminTable = ({handleDelete, dataItems, loading, params}) => {
    const router = useRouter();

    const generateColumns = columns => {
        return columns.map(column => ({
            key: column.key, label: column.label || column.key.toUpperCase(),
        }));
    };

    const roleMapping = {
        1: 'Администратор', 2: 'Турист', 3: 'Гид', 4: 'Травел Эксперт',
    };

    let columns = [];

    switch (params.slug) {
        case 'page':
            columns = generateColumns([{key: 'titlename', label: 'Страница'}, {
                key: 'url', label: 'Url'
            }, {key: 'metakeywords', label: 'Metakeywords'}, {key: 'metadescription', label: 'Metadescription'},]);
            break;
        case 'tour':
            columns = generateColumns([{key: 'main_title', label: 'Тур'}, {key: 'types', label: 'Тип тура'},]);
            break;
        case 'tour_type':
        case 'country':
        case 'city':
        case 'places':
        case 'hotel':
        case 'faq':
        case 'team':
            columns = generateColumns([{key: 'name', label: 'Название'}]);
            if (params.slug === 'hotel') {
                columns.push({
                    key: 'country.name', label: 'Страна',
                });
            }
            break;
        case 'services':
            columns = generateColumns([{key: 'icon', label: 'Иконка'}, {
                key: 'title', label: 'Название услуги'
            }, {key: 'price', label: 'Цена'},]);
            break;
        case 'users':
            columns = generateColumns([{key: 'login', label: 'Login'}, {key: 'role', label: 'Role'},]);
            break;
        case 'about':
            columns = generateColumns([{key: 'photo', label: 'Фото'}, {
                key: 'name', label: 'Сотрудник'
            }, {key: 'publick', label: 'Опубликовать на сайте?'}, {
                key: 'order_number', label: 'Порядок показа карточек на сайте'
            },]);
            break;
        case 'exchange':
            columns = generateColumns([{key: 'title', label: 'Название валюты'}, {
                key: 'exchange_rate', label: 'Значение'
            }, {key: 'primary_valuta', label: 'Главная валюта'},]);
            break;
        case 'news':
            columns = generateColumns([{key: 'header', label: 'Название'}, {
                key: 'new_date', label: 'Дата'
            }, {key: 'view', label: 'Просмотров'},]);
            break;
        case 'news_type':
            columns = generateColumns([{key: 'name', label: 'Название'}, {
                key: '_count.news', label: 'Количетсво статей'
            },]);
            break;
        case 'orders':
            columns = generateColumns([{key: 'id', label: 'id'}, {
                key: 'order_created', label: 'order_created'
            }, {key: 'order_updated', label: 'order_updated'},]);
            break
        default:
            columns = generateColumns([]);
            break;
    }

    columns.push({
        key: 'action', label: 'Управление', width: '0px', // Adding width here
    });

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(dataItems?.length / rowsPerPage);

    const columnSearch = columns.filter(el =>
        el.key === 'login' || el.key === 'name' || el.key === 'titlename' ||
        el.key === 'main_title' || el.key === 'icon' || el.key === 'title' ||
        el.key === 'header'
    ).map(el => el.key);

    const filteredData = dataItems?.filter((data) =>
        columnSearch.some((key) =>
            data[key]?.toLowerCase().includes(search.toLowerCase())
        )
    );

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataItems?.slice(start, end);
    }, [page, dataItems, filteredData]);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setSearch(value);
            setPage(1);
        } else {
            setSearch("");
        }
    }, []);

    return (<Table
        isStriped
        className='text-white dark mt-3'
        aria-label='Example table with dynamic content'
        topContentPlacement='outside'
        topContent={
            <Input
                className='sm:max-w-[44%]'
                isClearable
                onValueChange={onSearchChange}
                startContent={<i className="fa-solid fa-magnifying-glass"/>} labelPlacement='outside-left'
                label='Поиск:'/>
        }
        bottomContent={pages > 1 ? (<div className="flex w-full justify-center">
            <Pagination
                isDisabled={search.length > 0}
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
            />
        </div>) : null}
    >
        <TableHeader columns={columns}>
            {column => (!loading && items.length > 0 ? <TableColumn
                        key={column.key}
                        style={{width: column.width || 'auto'}}
                    >
                        {column.label}
                    </TableColumn>
                    :
                    <TableColumn
                        key={column.key}
                        style={{display: "none"}}
                    >
                    </TableColumn>
            )}
        </TableHeader>
        <TableBody
            isLoading={loading}
            items={search.length > 0 ? filteredData : items}
            emptyContent={'No rows to display.'}
            loadingContent={<Spinner label='Loading...'/>}
        >
            {item => (<TableRow
                key={item.id}
                onClick={() => params.slug !== 'news' ? router.push(`/admin/${params.slug}/edit/${item.id}`) : router.push(`/admin/news/${params.newsId}/edit/${item.id}`)}
            >
                {columnKey => (<TableCell className='cursor-pointer' key={columnKey}>
                    {columnKey === 'action' ? (
                        <DropDownDoted onDelete={handleDelete} params={params} id={item.id} />
                    ) : columnKey === 'icon' ? (
                        <i className={getKeyValue(item, columnKey)} />
                    ) : columnKey === 'role' ? (
                        roleMapping[getKeyValue(item, columnKey)] || 'Unknown'
                    ) : columnKey === 'primary_valuta' ? (
                        getKeyValue(item, columnKey) ? <i className='fas fa-star' /> : ''
                    ) : columnKey === 'publick' ? (
                        <Checkbox isSelected={getKeyValue(item, columnKey) === 1} readOnly />
                    ) : columnKey === 'types' && Array.isArray(getKeyValue(item, columnKey)) ? (
                        getKeyValue(item, columnKey).join(', ')
                    ) : columnKey.includes('.') ? (
                        columnKey.split('.').reduce((o, i) => (o ? o[i] : ''), item)
                    ) : columnKey === 'photo' ? (
                        <Image
                            className='rounded-full min-w-[100px] object-center min-h-[100px]'
                            width={100}
                            height={100}
                            alt={getKeyValue(item, columnKey)}
                            src={`https://api.turi-uzbekistana.ru/uploads/${getKeyValue(item, columnKey)}`}
                        />
                    ) : typeof getKeyValue(item, columnKey) === 'string' || typeof getKeyValue(item, columnKey) === 'number' ? (
                        getKeyValue(item, columnKey)
                    ) : (
                        'Invalid value'
                    )}

                </TableCell>)}
            </TableRow>)}
        </TableBody>
    </Table>);
};

export default AdminTable;
