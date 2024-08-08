import {ArticleCard, Container} from '@/Components'
import Link from 'next/link'
import {Pagination} from "@nextui-org/react";
import {useState} from "react";

export const Articles = ({
                             title,
                             btnName,
                             isBtn = false,
                             btnLink = '/',
                             cards,
                             style,
                             maxData = cards?.length
                         }) => {
    const [page, setPage] = useState(1);

    const rowsPerPage = 10;
    const pages = Math.ceil((maxData || cards?.length) / rowsPerPage);

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, maxData || cards?.length);
    return (
        <section style={style} className='pt-16'>
            <Container>
                <h1 className='text-center pb-5 text-3xl font-medium'>{title}</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {cards?.slice(maxData > cards?.length ? 0 : startIndex, maxData > cards?.length ? maxData : endIndex).map((el, i) => (
                        <ArticleCard {...el} key={i}/>
                    ))}
                </div>
                {
                    maxData === cards?.length && (
                        <div className="flex w-full py-5 justify-center">
                            <Pagination
                                isCompact
                                showShadow
                                color="success"
                                initialPage={3}
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    )
                }

                {isBtn && (
                    <div className='flex justify-center pt-5'>
                        <Link href={btnLink}>
                            <button
                                className='bg-[#37AF24] text-white p-[10px] w-[150px] rounded-2xl font-semibold text-nowrap'>
                                {btnName}
                            </button>
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    )
}
