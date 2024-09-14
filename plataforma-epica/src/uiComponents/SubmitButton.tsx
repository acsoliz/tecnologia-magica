import {Button, Form, FormInstance} from "antd"
import React from "react"
import classNames from 'classnames'

interface Props {
	form: FormInstance;
	isLoading?: boolean;
	label?: string;
	fullWidth?: boolean;
	enabled?: boolean
}

export default function SubmitButton ({ form, isLoading, label, fullWidth, enabled = true }: Props) {
	const [submittable, setSubmittable] = React.useState(false);

	// Watch all values
	const values = Form.useWatch([], form);

	React.useEffect(() => {
		form.validateFields({ validateOnly: true }).then(
			() => {
				setSubmittable(true);
			},
			() => {
				setSubmittable(false);
			},
		);
	}, [values, form]);

	// using classNames library to conditionally add class
	const buttonClass = classNames({
		'w-full': fullWidth,
	});

	return (
		<Button type="primary" htmlType="submit" disabled={(!submittable && !isLoading) || !enabled} loading={isLoading} className={buttonClass}>
			{label}
		</Button>
	);
};
