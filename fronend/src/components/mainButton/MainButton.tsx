
import './mainButton.css'


interface MainButtonProps {
    title: string
    handleClick: () => void
}

export const MainButton = ({title, handleClick}: MainButtonProps) => {

    return <>
    <button className='mainButton' onClick={handleClick}>{title}</button>
    </>
}