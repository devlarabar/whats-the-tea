type Props = {
    name: String,
    selectOption: (option: String) => void
}

const Option = ({ name, selectOption }: Props) => {
    function onClick() {
        selectOption(name)
    }
    return (
        <button className="btn btn-neutral" onClick={onClick}>{name}</button>
    )
}

export default Option