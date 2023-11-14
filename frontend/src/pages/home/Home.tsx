import React, { Fragment } from 'react';
import { Layout } from '../../components';
import { useGetAppointmentQuery } from '../../redux/queries/appointment';
import Loading from '../../components/LoadingAndError/Loading';
import Error from '../../components/LoadingAndError/Error';
import { useGetDocterDataQuery, useGetPatientsQuery } from '../../redux/queries/doctor';

const Home: React.FC = () => {

  const {
    data: appointment,
    isLoading,
    isError,
    error,
  } = useGetAppointmentQuery('');
  const {
    data: patients,
  } = useGetPatientsQuery('');
  const {
    data: users
  } = useGetDocterDataQuery('');

  return (
    <Layout>
      {
        isLoading ?
          <Loading /> :
          isError ?
            <Error description={error} /> :
            <Fragment>
              <div>
                <span className="text-primary">Welcome to</span>
                <h3 className="font-thin text-2xl">Admin Dashboard!</h3>
              </div>
              <div className="flex md:flex-row flex-col justify-around">
                <div className="flex mt-5  w-full border-[1px] border-[#CCCDD5] p-4 rounded-md md:mx-2 ">
                  <div className="w-full">
                    <div className="mt-5 w-ful h-[60vh]  overflow-y-auto my-container-with-scroll">
                      <div className="flex justify-around items-center">
                        <div className="w-1/2 text-center h-full">
                          <h5 className="font-semibold">Appointments</h5>
                          <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                            <p className="text-2xl font-semibold text-green-600">{appointment?.length}</p>
                          </div>
                        </div>
                        <div className="w-1/2 mx-3 text-center">
                          <h5 className="font-semibold">Patients</h5>
                          <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                            <p className="text-2xl font-semibold text-red-500">{patients?.length}</p>
                          </div>
                        </div>
                        <div className="w-1/2 mx-3 text-center">
                          <h5 className="font-semibold">Users</h5>
                          <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                            <p className="text-2xl font-semibold text-gray-500">{users?.length}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
      }
    </Layout>
  );
};

export default Home;
