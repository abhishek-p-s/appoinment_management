import React, { Fragment, useMemo } from 'react';
import { Button, Layout } from '../../components';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Loading from '../../components/LoadingAndError/Loading';
import Error from '../../components/LoadingAndError/Error';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useGetPatientsQuery } from '../../redux/queries/doctor';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

const breadCrumbs = [
  {
    title: 'Patients',
    href: '',
  },
  {
    title: 'Patients List',
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
];


const PatientList: React.FC = () => {
  const {
    data: patients,
    isLoading,
    isError,
    error,
  } = useGetPatientsQuery('');
  const navigate = useNavigate();


  const tableData = useMemo(() => {
    console.log(patients, 'patients?.data');
    if (patients?.length > 0) {
      console.log(patients?.datam, 'patients?.data');
      const updatedTableData = patients?.map(
        (user: any, index: number) => {
          return {
            key: user?._id.toString(),
            id: index + 1,
            name: user?.name,
            role:
              user?.role?.name,
            phone: user?.phone,
            email: user?.email,
            action: <div><Icon icon="ep:edit" className="cursor-pointer" /></div>
          };
        }
      );
      return updatedTableData;
    }
  }, [patients]);

  const handleNaviageToAddDocter = () => {
    navigate("/add-user");
  }

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
            <Button title='Add Patients' className="bg-primary text-white" onClick={handleNaviageToAddDocter} />
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

export default PatientList;
