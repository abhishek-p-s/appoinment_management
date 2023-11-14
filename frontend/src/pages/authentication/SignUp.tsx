import { Link, useNavigate } from 'react-router-dom';
import LoginPageImage from '../../assets/loginPageImage.webp';
import { InputField, Button } from '../../components/index';
import { Form } from 'antd';
import useAlerts from '../../components/notification/useAlerts';
import { useAddPatientMutation } from '../../redux/queries/appointment';

type FieldType = {
  email: string;
  password: string;
  name: string;
  phone: string;
  confirm_password: string;
};

const SignUp: React.FC = () => {
  const [addPatient] = useAddPatientMutation();
  const navigate = useNavigate();
  const { alert } = useAlerts();

  const onFinish = async (values: FieldType) => {
    try {
      if (values.password === values.confirm_password) {
        const responce: any = await addPatient(values);
        if (responce.data) {
          navigate('/login');
        }
      } else {
        alert({
          type: 'error',
          message: 'Signup',
          description: 'Mismatch in password',
        });
      }
    } catch (error: any) {
      alert({
        type: 'error',
        message: 'Signup',
        description: error?.response?.data?.message,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="w-full md:h-[100vh] h-[50vh]">
          <img
            src={LoginPageImage}
            className="w-full md:h-full h-full object-cover"
            width=" w-full"
            alt="login page image"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-[2rem]">
        <div className="w-2/3">
          <Form onFinish={onFinish}>
            <Form.Item<FieldType>
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
              ]}
            >
              <InputField
                type="text"
                placeHolder="name"
                className="h-[3rem]"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
              ]}
            >
              <InputField
                type="email"
                placeHolder="Email"
                className="h-[3rem]"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="phone"
              rules={[
                { required: true, message: 'Please input your phone!' },
              ]}
            >
              <InputField
                type="text"
                placeHolder="phone"
                className="h-[3rem]"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <InputField
                type="password"
                placeHolder="Password"
                className="mt-3 h-[3rem]"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="confirm_password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <InputField
                type="password"
                placeHolder="Confirm password"
                className="mt-3 h-[3rem]"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                title="Signup"
                className="w-full mt-3 hover:text-white bg-primary text-white"
              />
            </Form.Item>
          </Form>
          <div className="mt-5">
            <Link to="/login" className="text-blue-800">
              Already a account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
