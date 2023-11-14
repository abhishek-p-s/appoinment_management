import React from 'react';
import { Layout } from '../../components';

const Home: React.FC = () => {
  return (
    <Layout>
      <div>
        <span className="text-primary">Welcome to</span>
        <h3 className="font-thin text-2xl">Admin Dashboard!</h3>
      </div>
      <div className="flex md:flex-row flex-col justify-around">
        <div className="flex mt-5  w-full border-[1px] border-[#CCCDD5] p-4 rounded-md md:mx-2 ">
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <h5 className="text-primary font-semibold text-xl">
                  Appointments
                </h5>
              </div>
              <div className="border-[1px] p-3 rounded-md cursor-pointer">
                <p>Manage</p>
              </div>
            </div>
            <div className="mt-5 w-ful h-[60vh]  overflow-y-auto my-container-with-scroll">
              <div className="flex justify-around items-center">
                <div className="w-1/2 text-center">
                  <h5 className="font-semibold">New Appointments</h5>
                  <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                    <p className="text-2xl font-semibold">3</p>
                  </div>
                </div>
                <div className="w-1/2 mx-3 text-center">
                  <h5 className="font-semibold">Approved Appointments</h5>
                  <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                    <p className="text-2xl font-semibold">3</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-around items-center">
                <div className="w-1/2 text-center">
                  <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                    <p className="text-2xl font-semibold">0</p>
                  </div>
                  <span className="text-[#C5C6CB]">Taken in Jul’22</span>
                </div>
                <div className="w-1/2 mx-3 text-center">
                  <div className="flex justify-between">
                    <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                    <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5 mx-3">
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                  </div>
                  <span className="text-[#C5C6CB]">Taken in Jul’22</span>
                </div>
              </div>
              <div className="flex justify-around items-center">
                <div className="w-1/2 text-center">
                  <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                    <p className="text-2xl font-semibold">2</p>
                  </div>
                  <span className="text-[#C5C6CB]">Closing balance</span>
                </div>
                <div className="w-1/2 mx-3 text-center">
                  <div className="bg-[#ECECEC] p-5 text-center rounded-md mt-5 w-full mb-5">
                    <p className="text-2xl font-semibold">2</p>
                  </div>
                  <span className="text-[#C5C6CB]">Closing balance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
