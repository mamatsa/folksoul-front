import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { getBandInformationRequest, putBandInformationRequest } from 'services';
import { AboutBandInputs, ResponseData } from 'types';

const EditBandInfo = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AboutBandInputs>();

  useEffect(() => {
    const getBandInformation = async () => {
      try {
        const res: ResponseData = await getBandInformationRequest();
        setValue('about', res.data.band.about);
      } catch (e) {
        //
      }
    };
    getBandInformation();
  }, [setValue, setError]);

  const onSubmit: SubmitHandler<AboutBandInputs> = async (data) => {
    try {
      const res: ResponseData = await putBandInformationRequest(data);

      if (res.status === 'success') {
        navigate('/about-band');
      }
    } catch (error) {
      setError('about', {
        type: 'backend',
        message: 'დაფიქსირდა სერვერთან დაკავშირებული შეცდომა',
      });
    }
  };
  return (
    <DashboardWrapper>
      <DashboardPageTitle title='ბენდის შესახებ - დაარედაქტირე' />
      <div className='w-full h-full flex flex-col items-center gap-12 pt-8 pb-5 '>
        <form
          className='flex flex-col items-center justify-between w-4/5 h-full'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-full h-full pl-6 pr-7 py-4 rounded-[10px] bg-textarea-gray shadow-small'>
            <textarea
              id='about'
              {...register('about', {
                required: {
                  value: true,
                  message: 'ველი სავალდებულოა',
                },
              })}
              className='resize-none w-full h-full pr-14 text-justify bg-textarea-gray text-primary-dark-blue border-none outline-none overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-scrollbar-blue scrollbar-thumb-primary-dark-blue scrollbar-thumb-rounded scrollbar-track-rounded'
            />
          </div>
          <p className='text-sm text-red-600 h-16 flex items-center justify-center'>
            {errors['about'] && (errors['about'].message as string)}
          </p>
          <button
            type='submit'
            className='button bg-button-green text-content-white rounded-lg text-lg mt-0.5 px-12 pt-3 pb-2 tracking-wide'
            data-cy='submit-band-info'
          >
            შეინახე
          </button>
          <Link
            to='/about-band'
            className='text-link-blue underline text-lg font-bold mt-4'
            data-cy='go-back'
          >
            გადი უკან
          </Link>
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default EditBandInfo;
