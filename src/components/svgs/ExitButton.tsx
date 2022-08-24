const ExitButton: React.FC<{ closeHandler: () => void }> = ({
  closeHandler,
}) => (
  <svg
    width='33'
    height='33'
    viewBox='0 0 33 33'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='absolute top-4 right-4 cursor-pointer'
    onClick={closeHandler}
  >
    <path
      d='M32.4996 16.5C32.4996 25.3376 25.352 32.5 16.5374 32.5C7.7228 32.5 0.575195 25.3376 0.575195 16.5C0.575195 7.66236 7.7228 0.5 16.5374 0.5C25.352 0.5 32.4996 7.66236 32.4996 16.5Z'
      stroke='#333333'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M23.5721 24.7879L7.85736 9.03707L8.43938 8.45371L24.1541 24.2045L23.5721 24.7879Z'
      fill='#EB5757'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.85736 24.7879L23.5721 9.03707L24.1541 9.62044L8.43938 25.3712L7.85736 24.7879Z'
      fill='#EB5757'
    />
  </svg>
);

export default ExitButton;
