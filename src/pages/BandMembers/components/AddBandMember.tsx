import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { BiographyTextarea, Input } from 'pages/BandMembers/components';
import { BandMemberInputs } from 'types';
import { postBandMemberRequest } from 'services/backendRequests';

const AddBandMember = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BandMemberInputs>();

  const onSubmit: SubmitHandler<BandMemberInputs> = async (data) => {
    try {
      const res = await postBandMemberRequest(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardPageTitle title='დაამატე ჯგუფის ახალი წევრი' />
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
            დაამატე წევრი
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
