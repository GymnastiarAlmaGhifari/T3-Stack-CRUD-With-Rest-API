import { FC } from "react"
import { api } from "../../../utils/api"
import { useState, useEffect } from "react";

interface BookEditProps {
    // bookid can any type
    bookid: any
}

interface FormData {
    title: string;
    author: string
    description: string
    price: number
}


const BookEdit: FC<BookEditProps> = ({ bookid }) => {

    const utils = api.useContext();

    const [data, setData] = useState<FormData>({
        title: "",
        author: "",
        description: "",
        price: 0
    });
    const { data: detail, isLoading } = api.books?.detailBook.useQuery({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: bookid
    })

    // isi data dengan data yang sudah ada tanpa menggunakan useEffect
    useEffect(() => {
        if (detail && !isLoading) {
            setData({
                title: detail.title,
                author: detail.author,
                description: detail.description,
                price: detail.price
            });
        }
        const fetchData = async () => {
            if (!detail) {
                // ambil data dari api
                await utils.books.detailBook.invalidate().then(console.log).catch(console.error);
            }
        };
        fetchData().then(console.log).catch(console.error);
    }, [detail, isLoading]);



    const editBook = api.books?.editBook.useMutation({
        onMutate: async () => {
            // Optimistically update to the new value
            const invalidateDetailBook = utils.books.detailBook.invalidate();
            const invalidateAllBooks = utils.books.allBooks.invalidate();

            // Wait for both invalidations to finish
            await Promise.all([invalidateDetailBook, invalidateAllBooks]);
        }
    });

    if (isLoading) return <p>Loading...</p>




    const handleTitileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            title: e.target.value
        });
    };

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            author: e.target.value
        });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({
            ...data,
            description: e.target.value
        });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            price: parseInt(e.target.value)
        });
    };



    return (
        <>
            <p className="mx-auto">Book Edit</p>
            <form className="mx-auto" onSubmit={(e) => {
                e.preventDefault();
                editBook.mutate({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    id: bookid,
                    title: data.title,
                    author: data.author,
                    description: data.description,
                    price: data.price
                });
                setData({
                    title: "",
                    author: "",
                    description: "",
                    price: 0
                })
            }}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={data.title} onChange={handleTitileChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="text" className="form-control" id="author" value={data.author} onChange={handleAuthorChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows={3} value={data.description} onChange={handleDescriptionChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" value={data.price} onChange={handlePriceChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default BookEdit