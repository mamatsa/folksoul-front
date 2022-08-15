import { Input, Button, LoginWrapper } from 'pages/Login/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginRequest } from 'services';
import { AxiosError } from 'axios';

type Inputs = {
  nickname: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await loginRequest(data.nickname, data.password);
      console.log(response);
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      if (status === 400) {
        setError('nickname', {
          type: 'custom',
          message: 'არასწორი მომხმარებელი ან პაროლი',
        });
        setError('password', {
          type: 'custom',
          message: 'არასწორი მომხმარებელი ან პაროლი',
        });
      }
    }
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
