
interface TitleProps {
    title1: string;
    title2: string;
}

function Tittle({ title1, title2 }: TitleProps) {
    return (
        <div className="my-10 flex items-center justify-start gap-2">

            <p className="text-xl md:text-2xl text-gray-600">{title1}</p>
            <p className=" text-2xl text-green-900 md:text-3xl font-medium">{title2}</p>

            <div className="h-[1px] bg-green-700 w-[8px] font-medium md:w-[40px]" />
        </div>
    )
}

export default Tittle