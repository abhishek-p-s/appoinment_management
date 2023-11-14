import React, { Fragment, useMemo } from 'react';
import { Button, Layout } from '../../components';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Loading from '../../components/LoadingAndError/Loading';
import Error from '../../components/LoadingAndError/Error';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useGetAppointmentQuery } from '../../redux/queries/appointment';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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
];


const ApponitmentList: React.FC = () => {
  const {
    data: appointment,
    isLoading,
    isError,
    error,
  } = useGetAppointmentQuery('');
  const navigate = useNavigate();

  const tableData = useMemo(() => {
    console.log(appointment, 'appointment?.data');
    if (appointment?.length > 0) {
      console.log(appointment?.datam, 'appointment?.data');
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
            date_time: moment(appoint?.date_time).format("MMMM Do YYYY, h:mm:ss a")
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
    </Layout >
  );
};

export default ApponitmentList;
