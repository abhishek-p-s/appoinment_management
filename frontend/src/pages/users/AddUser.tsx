import React, { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Button, InputField, Layout } from '../../components';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Col, Row, Select, Form } from 'antd';
import { useAddUserMutation, useEditUserQuery, useGetRoleDataQuery, useUpdateUserMutation } from '../../redux/queries/doctor';
import Loading from '../../components/LoadingAndError/Loading';
import Error from '../../components/LoadingAndError/Error';
import { createSelectOption } from '../../helpers';
import { useNavigate, useParams } from 'react-router-dom';
import useNotification from '../../components/notification/useNotification';

const breadCrumbs = [
  {
    title: 'User',
    href: 'user-list',
  },
  {
    title: 'Add',
  },
];

type FieldType = {
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string;
};


const AddUser: React.FC = () => {
  const { id } = useParams();
  const {
    data: roles,
    isLoading,
    isError,
    error,
  } = useGetRoleDataQuery('');
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const roleOptions = useMemo(() => {
    if (roles != undefined) {
      return createSelectOption(roles, '_id', 'name')
    }
  }, [roles]);
  const [addUser] = useAddUserMutation()
  const {
    data: edituser,
  } = useEditUserQuery(id);
  const [updateUser] = useUpdateUserMutation()

  const handleFileClick = () => {
    if (fileInputRef.current) {
      // Trigger a click event on the hidden file input element
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: edituser?.name,
      email: edituser?.email,
      phone: edituser?.phone,
      role: edituser?.role,
      specialization: edituser?.specialization
    });

  }, [edituser])

  const onFinish = async (values: FieldType) => {
    try {
      if (id) {
        const formData = new FormData();
        Object.keys(values as FieldType)?.map((key: any) => {
          const value = values[key as keyof FieldType];
          formData.append(key, value)
        })
        formData.append("image", file as Blob);
        formData.append("id", id);
        const response: any = await updateUser(formData);
        console.log(response, 'response');
        if (response?.data) {
          notify({
            type: 'success',
            message: response?.data.message,
          });
          navigate('/user-list')
          form.resetFields();
        }
        if (response?.error) {
          notify({
            type: 'error',
            message: response?.error?.data.message,
          });
        }
      } else {
        const formData = new FormData();
        Object.keys(values as FieldType)?.map((key: any) => {
          const value = values[key as keyof FieldType];
          formData.append(key, value)
        })
        formData.append("image", file as Blob);
        const response: any = await addUser(formData);
        console.log(response, 'response');
        if (response?.data) {
          notify({
            type: 'success',
            message: response?.data.message,
          });
          form.resetFields();
        }
        if (response?.error) {
          notify({
            type: 'error',
            message: response?.error?.data.message,
          });
        }
      }
      console.log(values, 'VALUES');
    } catch (error: any) {
      notify({
        type: 'error',
        message: error.message,
      });
    }
  }

  return (
    <Layout>
      <Breadcrumb itemList={breadCrumbs} />
      {
        isLoading ?
          <Loading /> :
          isError ?
            <Error description={error} /> :
            <Fragment>
              <div className="border-[1px] p-3 rounded-md flex md:flex-row flex-col">
                <div className="w-full">
                  <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="mt-5"
                  >
                    <Row gutter={6}>
                      <Col span={24}>
                        <div
                          onClick={handleFileClick}
                          className="border-[1px] p-3 mb-5 rounded-md flex justify-start items-center cursor-pointer"
                        >
                          <div className="w-20 h-20 bg-[#CCCDD5] rounded-full p-2 flex justify-center items-center">
                            {file ? (
                              <img
                                src={
                                  file
                                    ? URL.createObjectURL(file)
                                    : ''
                                }
                                alt="profile image"
                                className="rounded-full w-full"
                              />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="34"
                                height="34"
                                viewBox="0 0 44 44"
                                fill="none"
                              >
                                <path
                                  d="M39.3923 36.6095C36.6749 31.9138 32.409 28.619 27.4521 27.2216C29.8621 25.9966 31.7892 23.9956 32.9228 21.5413C34.0563 19.087 34.3303 16.3224 33.7004 13.6934C33.0706 11.0644 31.5736 8.72408 29.451 7.04989C27.3283 5.37571 24.7037 4.46521 22.0003 4.46521C19.2968 4.46521 16.6722 5.37571 14.5495 7.04989C12.4269 8.72408 10.9299 11.0644 10.3001 13.6934C9.67025 16.3224 9.94419 19.087 11.0778 21.5413C12.2113 23.9956 14.1384 25.9966 16.5484 27.2216C11.5915 28.6173 7.32557 31.9121 4.60823 36.6095C4.53361 36.7268 4.48351 36.8581 4.46094 36.9953C4.43837 37.1326 4.44379 37.273 4.47688 37.408C4.50997 37.5431 4.57004 37.6701 4.65348 37.7814C4.73693 37.8927 4.84202 37.9859 4.96243 38.0555C5.08285 38.1251 5.2161 38.1697 5.35416 38.1864C5.49223 38.2032 5.63227 38.1919 5.76584 38.1531C5.89942 38.1144 6.02378 38.049 6.13143 37.9609C6.23909 37.8729 6.32782 37.7639 6.39229 37.6407C9.69401 31.9362 15.5274 28.5313 22.0003 28.5313C28.4731 28.5313 34.3065 31.9362 37.6082 37.6407C37.6727 37.7639 37.7614 37.8729 37.8691 37.9609C37.9767 38.049 38.1011 38.1144 38.2347 38.1531C38.3682 38.1919 38.5083 38.2032 38.6463 38.1864C38.7844 38.1697 38.9177 38.1251 39.0381 38.0555C39.1585 37.9859 39.2636 37.8927 39.347 37.7814C39.4305 37.6701 39.4905 37.5431 39.5236 37.408C39.5567 37.273 39.5621 37.1326 39.5396 36.9953C39.517 36.8581 39.4669 36.7268 39.3923 36.6095ZM12.0315 16.5C12.0315 14.5284 12.6162 12.601 13.7115 10.9617C14.8069 9.32233 16.3638 8.0446 18.1854 7.29009C20.0069 6.53558 22.0113 6.33816 23.9451 6.72281C25.8788 7.10746 27.6551 8.05689 29.0492 9.45105C30.4434 10.8452 31.3928 12.6215 31.7775 14.5552C32.1621 16.489 31.9647 18.4934 31.2102 20.3149C30.4557 22.1365 29.1779 23.6934 27.5386 24.7888C25.8992 25.8841 23.9719 26.4688 22.0003 26.4688C19.3574 26.4656 16.8236 25.4143 14.9548 23.5455C13.086 21.6767 12.0347 19.1429 12.0315 16.5Z"
                                  fill="#25408F"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="mx-3">
                            <p>
                              {file ? (
                                <span className="text-success_dark">{file.name}</span>
                              ) : (
                                'Upload User Image'
                              )}
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <Form.Item<FieldType>
                          name="name"
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your name!',
                            },
                          ]}
                        >
                          <InputField type="text" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item<FieldType>
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your email!',
                            },
                          ]}
                        >
                          <InputField type="text" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item<FieldType>
                          name="phone"
                          label="Phone"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your email!',
                            },
                          ]}
                        >
                          <InputField type="text" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item<FieldType>
                          name="role"
                          label="Role"
                          rules={[
                            { required: true, message: 'Please Role Type!' },
                          ]}
                        >
                          <Select
                            size="large"
                            onChange={(e) => {
                              console.log(e, 'E');
                            }}
                            options={roleOptions}
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item<FieldType>
                          name="specialization"
                          label="Specialization"
                          rules={[
                            {
                              required: false,
                              message: 'Please input your specialization!',
                            },
                          ]}
                        >
                          <InputField type="text" size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24} className="flex justify-center mt-5">
                        <Form.Item>
                          <Button
                            title="Cancel"
                            className="w-[12rem]"
                            onClick={() => {
                              navigate('/user-list')
                            }}
                          />
                        </Form.Item>
                        <Button
                          htmlType="submit"
                          title="Submit"
                          className="hover:text-white bg-primary text-white w-[12rem] mx-5"
                        />
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Fragment>
      }
    </Layout >
  );
};

export default AddUser;
