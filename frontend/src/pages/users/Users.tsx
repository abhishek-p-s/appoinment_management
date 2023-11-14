import React, { Fragment, useMemo } from 'react';
import { Button, Layout } from '../../components';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Loading from '../../components/LoadingAndError/Loading';
import Error from '../../components/LoadingAndError/Error';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDeleteUserMutation, useGetDocterDataQuery } from '../../redux/queries/doctor';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import useNotification from '../../components/notification/useNotification';

const breadCrumbs = [
  {
    title: 'User',
    href: '',
  },
  {
    title: 'User List',
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
    title: <p className="text-primary">Role</p>,
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: <p className="text-primary">Mobile Number</p>,
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: <p className="text-primary">Action</p>,
    dataIndex: 'action',
    key: 'action',
  },
];


const Users: React.FC = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetDocterDataQuery('');
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const { notify } = useNotification();


  const handleDelete = async (id: string) => {
    try {
      const response: any = await deleteUser(id);
      if (response?.data) {
        notify({
          type: 'success',
          message: response?.data.message,
        });
      }
      if (response?.error) {
        notify({
          type: 'error',
          message: response?.error?.data.message,
        });
      }
    } catch (error) {

    }
  }

  const tableData = useMemo(() => {
    console.log(users, 'users?.data');
    if (users?.length > 0) {
      console.log(users?.datam, 'users?.data');
      const updatedTableData = users?.map(
        (user: any, index: number) => {
          return {
            key: user?._id.toString(),
            id: index + 1,
            name: user?.name,
            role:
              user?.role?.name,
            phone: user?.phone,
            email: user?.email,
            action: <div className='flex'>
              <div onClick={() => {
                navigate(`/edit-user/${user._id}`)
              }}><Icon icon="ep:edit" className="cursor-pointer" /></div>
              <div onClick={() => {
                handleDelete(user._id)
              }} className="mx-5" > <Icon icon="mdi:delete-outline" className="cursor-pointer w-4 h-4" /></div>
            </div >
          };
        }
      );
      return updatedTableData;
    }
  }, [users]);

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
            <Button title='Add User' className="bg-primary text-white" onClick={handleNaviageToAddDocter} />
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

export default Users;
