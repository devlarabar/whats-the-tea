import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

type Props = {
	message: String
}

const Alert = ({ message }: Props) => {
	return (
		<div role="alert" className="alert alert-error">
			<ExclamationTriangleIcon className="w-6 h-6" />
			<span>{message}</span>
		</div>
	)
}

export default Alert