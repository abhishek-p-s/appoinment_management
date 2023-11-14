import React, { Fragment, useMemo, useState } from 'react';
import { Button, Layout } from '../../components';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Loading from '../../components/LoadingAndError/Loading';
import Error from '../../components/LoadingAndError/Error';
import { Modal, Select, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useGetAppointmentQuery, useUpdateAppointmentMutation } from '../../redux/queries/appointment';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import useNotification from '../../components/notification/useNotification';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const breadCrumbs = [
  {
    title: 'Appointment',
    href: '',
  },
  {
    title: 'Appointment List',
  },
];

interface DataType {
  key: string;
  holiday_date: string;
  reason_for_holiday: string;
  holiday_type: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: <p className="text-primary">No.</p>,
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: <p className="text-primary">Name</p>,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: <p className="text-primary">Email</p>,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: <p className="text-primary">Mobile Number</p>,
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: <p className="text-primary">Doctor</p>,
    dataIndex: 'doctor',
    key: 'doctor',
  },
  {
    title: <p className="text-primary">Date</p>,
    dataIndex: 'date_time',
    key: 'date_time',
  },
  {
    title: <p className="text-primary">Status</p>,
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: <p className="text-primary">Action</p>,
    dataIndex: 'action',
    key: 'action',
  },
];


const ApponitmentList: React.FC = () => {
  const {
    data: appointment,
    isLoading,
    isError,
    error,
  } = useGetAppointmentQuery('');
  const navigate = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);
  const [updateAppointment] = useUpdateAppointmentMutation();
  const { notify } = useNotification();
  const [status, setStatus] = useState('');
  const [appointmentId, setappoimentId] = useState('');
  const { userDetails } = useSelector((state: RootState) => state.user);


  const handleChangeStatus = async () => {
    try {
      const response: any = await updateAppointment({ status: status, id: appointmentId });
      // console.log(response, 'RES')
      if (response?.data?.message) {
        notify({
          type: 'success',
          message: response?.data?.message,
        });
        setModal2Open(false)
      }
      if (response?.error) {
        notify({
          type: 'error',
          message: response?.error?.data.message,
        });
      }
    } catch (error: any) {
      notify({
        type: 'error',
        message: error.message,
      });
    }
  }

  const tableData = useMemo(() => {
    console.log(appointment, 'appointment?.data');
    if (appointment?.length > 0) {
      const updatedTableData = appointment?.map(
        (appoint: any, index: number) => {
          return {
            key: appoint?._id.toString(),
            id: index + 1,
            name: appoint?.name,
            doctor:
              appoint?.doctor?.name,
            phone: appoint?.phone,
            email: appoint?.email,
            date_time: moment(appoint?.date_time).format("MMMM Do YYYY, h:mm:ss a"),
            status: <Tag color={appoint?.status === 'In Progress' ? 'orange' : 'green'}>
              {appoint?.status}
            </Tag >,
            action: < div>
              {
                userDetails.role === 2 &&
                <div onClick={() => {
                  setModal2Open(true);
                  setappoimentId(appoint?._id)
                }}><Icon icon="ep:edit" className="cursor-pointer" /></div>
              }
            </div>
          };
        }
      );
      return updatedTableData;
    }
  }, [appointment]);

  return (
    <Layout>
      <Breadcrumb itemList={breadCrumbs} />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error description={error} />
      ) : (
        <Fragment>
          <div className="flex justify-end mb-4">
            <Button title='Add Appointment' className="bg-primary text-white" onClick={() => {
              navigate('/')
            }} />
          </div>
          <div className="border-[1px] p-3 bg-[#F3F3F3] rounded-md flex md:flex-row flex-col">
            <div className="w-full overflow-y-auto md:mx-4 sm:mt-5">
              <Table columns={columns} dataSource={tableData} />
            </div>
          </div>
        </Fragment>
      )
      }
      <Modal
        title="Change status"
        centered
        open={modal2Open}
        footer={null}
        onCancel={() => setModal2Open(false)}
      >
        <Select
          size="large"
          onChange={(e) => {
            console.log(e, 'E');
            setStatus(e);
          }}
          options={[{
            value: "In Progress",
            label: 'In Progress'
          }, {
            value: "Completed",
            label: "Completed"
          }]}
          className="w-full"
        />
        <div className="mt-5 flex justify-end w-full">
          <Button title='Update' onClick={handleChangeStatus} />
        </div>
      </Modal>
    </Layout >
  );
};

export default ApponitmentList;
