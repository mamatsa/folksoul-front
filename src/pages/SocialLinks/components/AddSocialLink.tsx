import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SocialLinkInputs, ResponseData, SocialLink } from 'types';
import {
  postSocialLinkRequest,
  putSocialLinkRequest,
  getSocialLinkRequest,
} from 'services';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { Input } from 'pages/SocialLinks/components';

const AddSocialLink = () => {
  const navigate = useNavigate();

  // If exists, user is updating social link
  const { socialLinkId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SocialLinkInputs>();

  useEffect(() => {
    const getSocialLink = async () => {
      try {
        const res: ResponseData = await getSocialLinkRequest(
          socialLinkId as string
        );
        if (res.status === 'success') {
          const socialLink: SocialLink = res.data.socialLink;
          setValue('name', socialLink.name);
          setValue('link', socialLink.link);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (socialLinkId) {
      getSocialLink();
    } else {
      // Remove saved values if backend request is already sent
      if (localStorage.getItem('alreadyAdded') === 'true') {
        localStorage.removeItem('name');
        localStorage.removeItem('link');
        localStorage.removeItem('alreadyAdded');
      } else {
        // Set saved values to inputs
        setValue('name', localStorage.getItem('socialLinkName') || '');
        setValue('link', localStorage.getItem('link') || '');
      }
      // Save values on unmount
      return () => {
        localStorage.setItem('socialLinkName', getValues('name'));
        localStorage.setItem('link', getValues('link'));
      };
    }
  }, [socialLinkId, setValue, getValues]);

  const onSubmit: SubmitHandler<SocialLinkInputs> = async (data) => {
    try {
      let res: ResponseData;
      if (socialLinkId) {
        res = await putSocialLinkRequest(socialLinkId, data);
      } else {
        res = await postSocialLinkRequest(data);
        localStorage.setItem('alreadyAdded', 'true');
      }
      if (res.status === 'success') {
        navigate('/social-links');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardPageTitle
        title={
          socialLinkId ? 'შეცვალე სოციალური ბმული' : 'დაამატე სოციალური ბმული'
        }
      />
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
              id='link'
              key='link'
              name='link'
              placeholder='ბმული'
              type='text'
              register={register}
              errors={errors}
            />
          </div>
          <button
            type='submit'
            className='button bg-member-card-blue text-content-white rounded-lg text-sm font-bold mt-12 px-10 pt-4 pb-3 tracking-wide'
          >
            {socialLinkId
              ? 'შეცვალე სოციალური ბმული'
              : 'დაამატე სოციალური ბმული'}
          </button>
          <Link
            to='/social-links'
            className='text-link-blue underline text-lg font-bold mt-3'
          >
            გადი უკან
          </Link>
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default AddSocialLink;
