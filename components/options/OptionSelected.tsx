import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
    name: String,
    removeOption: (option: String) => void
}

const OptionSelected = ({ name, removeOption }: Props) => {
    function onClick(option: String) {
        removeOption(option)
    }
    return (
        <button className="btn" onClick={() => onClick(name)}>
            {name}
            <div className="badge"><XMarkIcon className="w-4 h-4" /></div>
        </button>
    )
}

export default OptionSelected