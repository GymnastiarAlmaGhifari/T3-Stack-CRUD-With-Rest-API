import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import BookDetail from '../../components/common/BookDetail';

const Detail = () => {

    const router = useRouter()
    const bookid = router.query.id as string
    console.log(bookid)

    return (
        <div className="relative w-screen h-screen bg-white">
            {/* link to dashboard */}
            <div className="absolute inset-0">
                <div className="flex items-center justify-center h-screen">
                    <div className="w-1/2">
                        <Link href="/dashboard">
                            <p>Back to dashboard</p>
                        </Link>
                        <h1>Detail</h1>
                        {/* BookDetail with props bookid */}
                        <BookDetail bookid={bookid} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Detail