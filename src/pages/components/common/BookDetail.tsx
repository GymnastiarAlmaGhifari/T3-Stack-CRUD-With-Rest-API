import { FC } from "react"
import { api } from "../../../utils/api"

interface BookDetailProps {
    // bookid can any type
    bookid: any
}

const BookDetail: FC<BookDetailProps> = ({ bookid }) => {

    const { data: messageDetail, isLoading } = api.books?.detailBook.useQuery({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: bookid
    })

    return (
        <>
            <p>{messageDetail?.id}</p>
            <p>{messageDetail?.title}</p>
            <p>{messageDetail?.author}</p>
            <p>{messageDetail?.description}</p>
            <p>{messageDetail?.price}</p>
        </>
    )
}

export default BookDetail