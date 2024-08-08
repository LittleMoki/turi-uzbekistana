import AdminButton from '@/UI/AdminButton'
import {usePathname} from "next/navigation";

const AdminHeader = ({params}) => {
    const pathName = usePathname()
    return (
        <div
            className={`gap-2 mb-3 ${
                Object.keys(params).length == 0 ? 'hidden' : 'flex'
            }`}
        >
            <AdminButton
                icon='fa fa-list mr-1'
                style={{backgroundColor: '#001f3f', padding: '6px 12px'}}
                link={
                    params.slug !== 'news'
                        ? `/admin/${params.slug}`
                        : `/admin/news/${params.newsId}`
                }
            >
                All
            </AdminButton>
            {
                pathName.startsWith('/admin/orders') ?
                    '' : <AdminButton
                        icon='fa fa-plus mr-1'
                        style={{backgroundColor: '#1e7e34', padding: '6px 12px'}}
                        link={
                            params.slug !== 'news'
                                ? `/admin/${params.slug}/create`
                                : `/admin/news/${params.newsId}/create`
                        }
                    >
                        Add
                    </AdminButton>
            }
            <AdminButton
                icon='fas fa-archive mr-1'
                link={
                    params.slug !== 'news'
                        ? `/admin/${params.slug}`
                        : `/admin/news/${params.newsId}`
                }
                style={{backgroundColor: '#d39e00', padding: '6px 12px'}}
            >
                Archive
            </AdminButton>
        </div>
    )
}

export default AdminHeader
