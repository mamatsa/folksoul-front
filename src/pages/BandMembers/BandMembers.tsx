import { useEffect, useState } from 'react';
import { DashboardWrapper } from 'components';
import { MemberCard } from 'pages/BandMembers/components';
import { Link } from 'react-router-dom';
import { getBandMembersRequest } from 'services/backendRequests';
import { BandMember } from 'types';

const BandMembers = () => {
  const [bandMembers, setBandMembers] = useState<BandMember[]>();
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const showPagination = numberOfPages >= 2;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [memberChanged, setMemberChanged] = useState<number>(0);

  useEffect(() => {
    const getBandMembers = async () => {
      try {
        const members = await getBandMembersRequest();
        setBandMembers(members.data.bandMembers);
        setNumberOfPages(Math.ceil(members.data.bandMembers.length / 3));
      } catch (e) {
        console.log('something went wrong');
      }
    };
    getBandMembers();
  }, [memberChanged]);

  const memberChangeHandler = () => {
    setMemberChanged((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <>
      <DashboardWrapper>
        <div className=' w-full h-full flex flex-col items-center justify-evenly'>
          <div className='w-full flex flex-col items-center gap-6'>
            <h2 className='text-xl'>ჯგუფის წევრები</h2>
            <div className='h-[1px] w-4/5 bg-black'></div>
          </div>
          <div className='flex flex-wrap gap-4 justify-center px-2 2xl:gap-16'>
            {bandMembers &&
              bandMembers.map((bandMember, i) => {
                if (i >= currentPage * 3 && i < (currentPage + 1) * 3) {
                  return (
                    <MemberCard
                      bandMember={bandMember}
                      key={bandMember._id}
                      memberChangeHandler={memberChangeHandler}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>
          {showPagination && (
            <div className='flex gap-5'>
              {[...Array(numberOfPages)].map((e, i) => {
                return (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full cursor-pointer ${
                      i === currentPage
                        ? 'bg-pagination-active'
                        : 'bg-pagination-inactive'
                    }`}
                    onClick={() => {
                      setCurrentPage(i);
                    }}
                  ></div>
                );
              })}
            </div>
          )}

          <Link to='#' className='text-link-blue underline text-lg font-bold'>
            ახალი წევრი გვყავს?
          </Link>
        </div>
      </DashboardWrapper>
    </>
  );
};

export default BandMembers;
