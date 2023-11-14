import React, { Fragment, useMemo } from 'react';
import { Button, Header, InputField } from '../../components';
import { Col, DatePicker, Form, Row, Select } from 'antd';
import InputTextAreaField from '../../components/InputField/InputTextAreaField';
import { useAddAppointmentMutation, useGetDoctorDataQuery } from '../../redux/queries/appointment';
import useNotification from '../../components/notification/useNotification';
import Loading from '../../components/LoadingAndError/Loading';
import Error from '../../components/LoadingAndError/Error';
import { createSelectOption } from '../../helpers';

type FieldType = {
  name: string;
  email: string;
  phone: string;
  doctor: string;
  specialization: string;
  date_time: string;
  comments: string;
};

const GustUserPage: React.FC = () => {
  const [form] = Form.useForm();
  const [addAppointment] = useAddAppointmentMutation();
  const { notify } = useNotification();
  const { data: doctors, isLoading, isError, error } = useGetDoctorDataQuery('');

  const doctorsOptions = useMemo(() => {
    if (doctors?.length > 0) {
      return createSelectOption(doctors, '_id', 'name');
    }
  }, [doctors])

  const onFinish = async (values: FieldType) => {
    try {
      const response: any = await addAppointment(values);
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
      console.log(values, 'VALUES');
    } catch (error: any) {
      notify({
        type: 'error',
        message: error.message,
      });
    }
  }

  console.log(doctors, 'doctors');
  return (
    <Fragment>
      <Header isSidbarNotRequired={true} isLogin={true} />
      <div className="p-5">
        <div>
          <span className="text-primary">Welcome to</span>
          <h3 className="font-thin text-2xl">Appoinment Booking!</h3>
        </div>
        {
          isLoading ?
            <Loading /> :
            isError ?
              <Error description={error} /> :
              <Fragment>
                <div className="border-[1px] p-3 rounded-md flex md:flex-row flex-col mt-5">
                  <div className="w-full">
                    <Form
                      form={form}
                      onFinish={onFinish}
                      layout="vertical"
                      className="mt-5"
                    >
                      <Row gutter={6}>
                        <Col lg={12} xs={24}>
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
                        <Col lg={12} xs={24}>
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
                        <Col lg={12} xs={24}>
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
                        <Col lg={12} xs={24}>
                          <Form.Item<FieldType>
                            name="doctor"
                            label="Doctor"
                            rules={[
                              { required: true, message: 'Please Docter Type!' },
                            ]}
                          >
                            <Select
                              size="large"
                              onChange={(e) => {
                                console.log(e, 'E');
                              }}
                              options={doctorsOptions}
                              className="w-full"
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                          <Form.Item<FieldType>
                            name="date_time"
                            label="Date and Time"
                            rules={[
                              { required: true, message: 'Please select date and time Type!' },
                            ]}
                          >
                            <DatePicker showTime size='large' className='w-full' />
                          </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
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
                        <Col lg={24} xs={24}>
                          <Form.Item<FieldType>
                            name="comments"
                            label="Comments"
                            rules={[
                              {
                                required: false,
                                message: 'Please input your specialization!',
                              },
                            ]}
                          >
                            <InputTextAreaField rows={4} />
                          </Form.Item>
                        </Col>
                      </Row >
                      <Row>
                        <Col lg={24} className="flex justify-center mt-5">
                          <Button
                            htmlType="submit"
                            title="Book Now"
                            className="hover:text-white bg-primary text-white w-[12rem] mx-5"
                          />
                        </Col>
                      </Row >
                    </Form >
                  </div >
                </div >
              </Fragment >
        }
      </div >
    </Fragment >
  );
};

export default GustUserPage;
