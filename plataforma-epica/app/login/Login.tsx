import React, {useState} from "react"
import {Button, Flex, Form, Image, Input, Typography} from "antd"
import { LockOutlined, UserOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import SubmitButton from "@/src/uiComponents/SubmitButton"
import {APIError, ErrorKind} from "@/src/ApiRequestHandler";
import { useLogin } from "./hooks/useLogin"

const { Text } = Typography;

interface LoginProps {
	loginFunction: (username: string, password: string) => Promise<{ userToken: string }>;
	onSuccess: (jwtToken: string) => void;
	switchToSignUp: () => void;
}

export default function Login({ loginFunction, onSuccess, switchToSignUp }: LoginProps){
	const [form] = Form.useForm();

	//Login hook
	const { loginInProgress, login, invalidCredentials, undefinedError } = useLogin({
		loginFunction,
		onSuccess,
	  });

	return (
		<Flex className="bg-zinc-100 px-16 py-10 rounded-2xl shadow-2xl items-center" gap="middle" vertical>
			{/* <Image preview={false} src="/LogoMain.png" alt="Login" width={350}/> */}
			<Form onFinish={login} form={form} className="mt-10" >

				<Form.Item name="email" rules={[
					{ required: true, message: "Email is required"}
				]}>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
				</Form.Item>

				<Form.Item name="password" rules={[
					{required: true, message: "Password is required"}
				]}>
					<Flex vertical justify="start" align="start">
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Flex>
				</Form.Item>

				{invalidCredentials && <Text type="danger">Invalid credentials<br/>Check that you have entered the right email<br/>and password and try again</Text>}
				{undefinedError && <Text type="danger">Error during login<br/>Try again later</Text>}


				<Flex className="mt-3" justify="center">
					<Form.Item>
						<Flex justify="center" vertical>
							<SubmitButton label={"Login"} form={form} isLoading={loginInProgress} fullWidth />
							{ !process.env.NEXT_PUBLIC_SIGNUP_DISABLED &&
								<Button type="link" onClick={switchToSignUp}>Don&apos;t you have an account?</Button>
							}
						</Flex>
					</Form.Item>
				</Flex>
			</Form>
		</Flex>
	)
}
