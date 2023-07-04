
interface MainButtonProps {
    title: string
    handleClick: () => void
}

export const MainButton = ({title, handleClick}: MainButtonProps) => {

    return <>
    <button onClick={handleClick}>{title}</button>
    </>
}