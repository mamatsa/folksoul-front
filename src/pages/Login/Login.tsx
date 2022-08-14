import { Input, Button, LoginWrapper } from 'pages/Login/components';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  nickname: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <LoginWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=' flex flex-col m-auto gap-3 w-full xs:w-80 '
      >
        <Input
          id='nickname'
          key='nickname'
          name='nickname'
          placeholder='მეტსახელი'
          type='text'
          register={register}
          errors={errors}
        />
        <Input
          id='password'
          key='password'
          name='password'
          placeholder='პაროლი'
          type='password'
          register={register}
          errors={errors}
        />
        <Button />
      </form>
    </LoginWrapper>
  );
};

export default Login;
