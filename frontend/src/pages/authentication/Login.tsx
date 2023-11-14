import { Link, useNavigate } from 'react-router-dom';
import LoginPageImage from '../../assets/loginPageImage.webp';
import { InputField, Button } from '../../components/index';
import { Form } from 'antd';
import api from '../../services/service';
import useAlerts from '../../components/notification/useAlerts';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userAuth';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alert } = useAlerts();

  const onFinish = async (values: FieldType) => {
    try {
      const responce = await api.post('users/signin', values);
      if (responce.data) {
        dispatch(setUser(responce.data));
        navigate('/home');
      }
    } catch (error: any) {
      alert({
        type: 'error',
        message: 'Login',
        description: error?.response?.data?.message,
      });
    }
  };
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

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
            <Form.Item>
              <Button
                htmlType="submit"
                title="Login"
                className="w-full mt-3 hover:text-white bg-primary text-white"
              />
            </Form.Item>
          </Form>
          <div className="mt-5">
            <Link to="/" className="text-blue-800">
              Already a user?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
