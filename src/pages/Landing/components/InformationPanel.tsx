const InformationPanel: React.FC<{ imageUrl?: string; text?: string }> = (
  props
) => {
  return (
    <div className='w-5/6 h-[60%] relative bg-panel-yellow pt-[200px] pb-[42px] pl-[65px] pr-[32px] rounded-[20px]'>
      <div className='absolute -top-[156px] left-0 w-full h-[313px] flex justify-center'>
        <div className='w-[312px] h-[312px] border-2 border-white bg-main-purple rounded-full overflow-hidden'>
          {props.imageUrl && (
            <img
              className='w-full h-full object-cover '
              src={process.env.REACT_APP_BASE_URL + props.imageUrl}
              alt=''
            />
          )}
        </div>
      </div>
      <div className='w-[15px] h-[15px] absolute top-[15px] left-[15px] bg-main-purple rounded-full'></div>
      <div className='w-[15px] h-[15px] absolute top-[15px] right-[15px] bg-main-purple rounded-full'></div>
      <p className='h-full w-full box-border pr-[50px] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-primary-dark-blue scrollbar-thumb-white scrollbar-thumb-rounded scrollbar-track-rounded'>
        {props && props.text}
      </p>
    </div>
  );
};

export default InformationPanel;
