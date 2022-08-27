import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { BiographyTextarea, Input } from 'pages/BandMembers/components';
import { BandMemberInputs, BandMember, ResponseData } from 'types';
import {
  postBandMemberRequest,
  getBandMemberRequest,
  putBandMemberRequest,
} from 'services';
import { useEffect } from 'react';

const AddBandMember = () => {
  const navigate = useNavigate();

  // Exists if user is updating band member
  const { memberId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BandMemberInputs>();

  useEffect(() => {
    const getBandMember = async () => {
      try {
        const res: ResponseData = await getBandMemberRequest(
          memberId as string
        );
        if (res.status === 'success') {
          const member: BandMember = res.data.bandMember;
          setValue('name', member.name);
          setValue('instrument', member.instrument);
          setValue('orbitWidth', member.orbitWidth);
          setValue('color', member.color);
          setValue('bio', member.bio);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (memberId) {
      getBandMember();
    }
  }, [memberId, setValue]);

  const onSubmit: SubmitHandler<BandMemberInputs> = async (data) => {
    try {
      let res: ResponseData;
      if (memberId) {
        res = await putBandMemberRequest(memberId, data);
      } else {
        res = await postBandMemberRequest(data);
      }
      if (res.status === 'success') {
        navigate('/band-members');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardPageTitle title='შეცვალე ინფორმაცია ჯგუფის წევრზე' />
      <div className='w-full h-full flex flex-col items-center justify-evenly'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center justify-center gap-3'
        >
          <Input
            id='name'
            key='name'
            name='name'
            placeholder='სახელი'
            type='text'
            register={register}
            errors={errors}
          />
          <div className='flex justify-center items-center flex-wrap gap-2 xl:gap-8'>
            <Input
              id='instrument'
              key='instrument'
              name='instrument'
              placeholder='ინსტრუმენტი'
              type='text'
              register={register}
              errors={errors}
            />
            <Input
              id='orbitWidth'
              key='orbitWidth'
              name='orbitWidth'
              placeholder='ორბიტის სიგანე'
              type='text'
              register={register}
              errors={errors}
            />
            <Input
              id='color'
              key='color'
              name='color'
              placeholder='ფერი'
              type='text'
              register={register}
              errors={errors}
            />
          </div>
          <BiographyTextarea register={register} errors={errors} />
          <button
            type='submit'
            className='button bg-member-card-blue text-content-white rounded-lg text-sm font-bold mt-12 px-10 pt-4 pb-3 tracking-wide'
          >
            {memberId ? 'წევრის ცვლილება' : 'დაამატე წევრი'}
          </button>
          <Link
            to='/band-members/'
            className='text-link-blue underline text-lg font-bold mt-3'
          >
            გადი უკან
          </Link>
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default AddBandMember;
